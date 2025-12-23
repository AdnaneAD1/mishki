'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { collection, db, getDocs } from '@mishki/firebase';

type PaymentDoc = {
  orderId?: string;
  amountHT?: number;
  amountTTC?: number;
  status?: 'payee' | 'en_attente' | 'retard' | string;
  dueDate?: string;
  createdAt?: string;
  pdfFranceUrl?: string;
  pdfPeruUrl?: string;
};

type OrderLine = {
  name?: string;
  quantity?: number;
};

type OrderDoc = {
  lines?: OrderLine[];
  createdAt?: string;
  userId?: string;
};

export type Invoice = {
  id: string;
  numero: string;
  date: string;
  montantHT: number;
  montantTTC: number;
  statut: 'payee' | 'en_attente' | 'retard' | string;
  dateEcheance: string;
  produits: string;
  pdfFranceUrl?: string;
  pdfPeruUrl?: string;
};

export function useInvoicesB2B() {
  const locale = useLocale();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [paymentsSnap, ordersSnap] = await Promise.all([
          getDocs(collection(db, 'payments')),
          getDocs(collection(db, 'orders')),
        ]);
        if (!mounted) return;

        const orderMap = new Map<string, OrderDoc>();
        ordersSnap.docs.forEach((d) => {
          orderMap.set(d.id, d.data() as OrderDoc);
        });

        const mapped: Invoice[] = paymentsSnap.docs.map((d) => {
          const data = d.data() as PaymentDoc;
          const order = data.orderId ? orderMap.get(data.orderId) : undefined;
          const lines = order?.lines || [];
          const produits =
            lines.length > 0
              ? lines
                  .map((l) => {
                    const qty = l.quantity ?? 0;
                    const name = l.name || '';
                    return qty ? `${name} x${qty}` : name;
                  })
                  .filter(Boolean)
                  .join(', ')
              : '';

          const dateStr = data.createdAt || order?.createdAt || '';
          const dueStr = data.dueDate || '';

          return {
            id: d.id,
            numero: data.orderId || d.id,
            date: dateStr,
            montantHT: data.amountHT ?? 0,
            montantTTC: data.amountTTC ?? 0,
            statut: (data.status as Invoice['statut']) || 'en_attente',
            dateEcheance: dueStr,
            produits,
            pdfFranceUrl: data.pdfFranceUrl,
            pdfPeruUrl: data.pdfPeruUrl,
          };
        });

        // Optionnel: trier par date décroissante si date parseable
        mapped.sort((a, b) => {
          const ta = Date.parse(a.date || '');
          const tb = Date.parse(b.date || '');
          if (Number.isNaN(ta) || Number.isNaN(tb)) return 0;
          return tb - ta;
        });

        setInvoices(mapped);
      } catch (err: unknown) {
        if (!mounted) return;
        const message = err instanceof Error ? err.message : 'Erreur de récupération des factures';
        setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, [locale]);

  const months = useMemo(() => {
    const set = new Set<string>();
    invoices.forEach((inv) => {
      const d = inv.date ? new Date(inv.date) : null;
      if (d && !Number.isNaN(d.getTime())) {
        const label = d.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
        set.add(label);
      }
    });
    return Array.from(set);
  }, [invoices, locale]);

  return { invoices, months, loading, error };
}
