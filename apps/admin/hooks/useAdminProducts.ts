'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import {
    db,
    collection,
    query,
    orderBy,
    onSnapshot,
    deleteDoc,
    doc,
    type QuerySnapshot,
    type DocumentData,
} from '@mishki/firebase';

export type ProductDb = {
    slug: string;
    category: string;
    translations?: Record<string, {
        name?: string;
        desc?: string;
        long_desc?: string;
        category?: string;
        usage?: string;
        ingredient_base?: string;
    }>;
    price: number;
    image: string;
    defaultLocale?: string;
    volume?: string;
    oldPrice?: number | string;
    inStock?: boolean;
    stock?: number;
    deliveryDate?: string;
    deliveryDays?: { min: number; max: number };
    loyaltyPoints?: number;
    rating?: number;
    reviews?: number;
    nutritionalInfo?: { name: string; value: string }[];
};

export type AdminProduct = {
    id: string; // Document ID
    slug: string;
    name: string;
    category: string;
    categoryLabel: string;
    price: number;
    stock: number;
    image: string;
    status: 'Actif' | 'Rupture';
    desc: string;
    volume?: string;
};

function mapAdminProduct(
    docId: string,
    data: ProductDb,
    locale: string
): AdminProduct {
    const fallbackLocale = data.defaultLocale || 'fr';
    const trans =
        data.translations?.[locale] ||
        data.translations?.[fallbackLocale] ||
        {};

    return {
        id: docId,
        slug: data.slug || docId,
        name: trans?.name || data.slug || docId,
        category: data.category || 'N/A',
        categoryLabel: trans?.category || data.category || 'N/A',
        price: data.price || 0,
        stock: data.stock || 0,
        image: data.image || '/placeholder.jpg',
        status: (data.stock || 0) > 0 ? 'Actif' : 'Rupture',
        desc: trans?.desc || '',
        volume: data.volume,
    };
}

export function useAdminProducts() {
    const locale = useLocale();
    const [products, setProducts] = useState<AdminProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const q = query(collection(db, 'products'), orderBy('slug', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
            const productsData = snapshot.docs.map(doc =>
                mapAdminProduct(doc.id, doc.data() as ProductDb, locale)
            );

            setProducts(productsData);
            setLoading(false);
        }, (err: Error) => {
            console.error('Error fetching admin products:', err);
            setError(err.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [locale]);

    const deleteProduct = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'products', id));
        } catch {
            alert('Erreur lors de la suppression du produit');
            throw new Error('Failed to delete product');
        }
    };

    return { products, loading, error, deleteProduct };
}

export function useAdminProduct(id: string) {
    const locale = useLocale();
    const [product, setProduct] = useState<AdminProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const unsubscribe = onSnapshot(doc(db, 'products', id), (snapshot) => {
            if (snapshot.exists()) {
                setProduct(mapAdminProduct(snapshot.id, snapshot.data() as ProductDb, locale));
            } else {
                setProduct(null);
                setError('Produit introuvable');
            }
            setLoading(false);
        }, (err: Error) => {
            console.error('Error fetching admin product:', err);
            setError(err.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [id, locale]);

    return { product, loading, error };
}
