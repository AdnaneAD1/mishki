'use client';

import { useState } from 'react';
import { Search, Download, Eye, Filter, Calendar, FileText } from 'lucide-react';

interface Facture {
  id: string;
  numero: string;
  date: string;
  montantHT: number;
  montantTTC: number;
  statut: 'payee' | 'en_attente' | 'retard';
  dateEcheance: string;
  produits: string;
}

const mockFactures: Facture[] = [
  {
    id: '1',
    numero: 'F-2025-0145',
    date: '28 Nov 2025',
    montantHT: 345.0,
    montantTTC: 414.0,
    statut: 'payee',
    dateEcheance: '28 Déc 2025',
    produits: 'Crème Visage Pro x5, Sérum Anti-âge x3',
  },
  {
    id: '2',
    numero: 'F-2025-0142',
    date: '25 Nov 2025',
    montantHT: 520.0,
    montantTTC: 624.0,
    statut: 'payee',
    dateEcheance: '25 Déc 2025',
    produits: 'Pack Soin Cabine, Huile Massage x2',
  },
  {
    id: '3',
    numero: 'F-2025-0138',
    date: '22 Nov 2025',
    montantHT: 180.0,
    montantTTC: 216.0,
    statut: 'en_attente',
    dateEcheance: '22 Déc 2025',
    produits: 'Gommage Corps x10',
  },
  {
    id: '4',
    numero: 'F-2025-0132',
    date: '15 Nov 2025',
    montantHT: 890.0,
    montantTTC: 1068.0,
    statut: 'payee',
    dateEcheance: '15 Déc 2025',
    produits: 'Commande complète - 15 produits',
  },
  {
    id: '5',
    numero: 'F-2025-0125',
    date: '8 Nov 2025',
    montantHT: 245.0,
    montantTTC: 294.0,
    statut: 'payee',
    dateEcheance: '8 Déc 2025',
    produits: 'Masque Purifiant x5, Lotion Tonique x3',
  },
  {
    id: '6',
    numero: 'F-2025-0118',
    date: '1 Nov 2025',
    montantHT: 650.0,
    montantTTC: 780.0,
    statut: 'retard',
    dateEcheance: '1 Déc 2025',
    produits: 'Huile Massage x10, Crème x5',
  },
];

export default function FacturesPro() {
  const [factures] = useState<Facture[]>(mockFactures);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatut, setSelectedStatut] = useState('Tous');
  const [selectedMois, setSelectedMois] = useState('Tous');

  const statuts = ['Tous', 'Payées', 'En attente', 'En retard'];
  const mois = ['Tous', 'Novembre 2025', 'Octobre 2025', 'Septembre 2025'];

  const filteredFactures = factures.filter((facture) => {
    const matchesSearch =
      facture.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facture.produits.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatut =
      selectedStatut === 'Tous' ||
      (selectedStatut === 'Payées' && facture.statut === 'payee') ||
      (selectedStatut === 'En attente' && facture.statut === 'en_attente') ||
      (selectedStatut === 'En retard' && facture.statut === 'retard');
    const matchesMois =
      selectedMois === 'Tous' ||
      (selectedMois === 'Novembre 2025' && facture.date.includes('Nov 2025')) ||
      (selectedMois === 'Octobre 2025' && facture.date.includes('Oct 2025'));
    return matchesSearch && matchesStatut && matchesMois;
  });

  const totalHT = factures.reduce((sum, f) => sum + f.montantHT, 0);
  const totalTTC = factures.reduce((sum, f) => sum + f.montantTTC, 0);
  const enAttente = factures.filter((f) => f.statut === 'en_attente').length;
  const enRetard = factures.filter((f) => f.statut === 'retard').length;

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'payee':
        return 'bg-green-100 text-green-700';
      case 'en_attente':
        return 'bg-blue-100 text-blue-700';
      case 'retard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatutLabel = (statut: string) => {
    switch (statut) {
      case 'payee':
        return 'Payée';
      case 'en_attente':
        return 'En attente';
      case 'retard':
        return 'En retard';
      default:
        return statut;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Factures Professionnelles</h1>
          <p className="text-gray-600">
            Consultez et téléchargez vos factures en quelques clics
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors"
          style={{ backgroundColor: '#235730' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a4023')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#235730')}
        >
          <Download className="w-5 h-5" />
          Télécharger tout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total HT (année)</p>
          <p className="text-2xl text-gray-900">{totalHT.toFixed(2)} €</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total TTC (année)</p>
          <p className="text-2xl text-gray-900">{totalTTC.toFixed(2)} €</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">En attente</p>
          <p className="text-2xl text-blue-600">{enAttente}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">En retard</p>
          <p className="text-2xl text-red-600">{enRetard}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par numéro ou produits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Statut Filter */}
          <select
            value={selectedStatut}
            onChange={(e) => setSelectedStatut(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statuts.map((statut) => (
              <option key={statut} value={statut}>
                {statut}
              </option>
            ))}
          </select>

          {/* Mois Filter */}
          <select
            value={selectedMois}
            onChange={(e) => setSelectedMois(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {mois.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {filteredFactures.length} facture{filteredFactures.length > 1 ? 's' : ''} trouvée
          {filteredFactures.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Factures Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Numéro</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Date</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Produits</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Montant HT</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Montant TTC</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Échéance</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Statut</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFactures.map((facture) => (
                <tr key={facture.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{facture.numero}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{facture.date}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 max-w-xs truncate block">
                      {facture.produits}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {facture.montantHT.toFixed(2)} €
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {facture.montantTTC.toFixed(2)} €
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="w-3 h-3" />
                      {facture.dateEcheance}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs ${getStatutBadge(
                        facture.statut
                      )}`}
                    >
                      {getStatutLabel(facture.statut)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredFactures.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">Aucune facture trouvée</h3>
          <p className="text-gray-600 mb-4">
            Essayez de modifier vos critères de recherche
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedStatut('Tous');
              setSelectedMois('Tous');
            }}
            className="px-4 py-2 text-white rounded-lg transition-colors"
            style={{ backgroundColor: '#235730' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a4023')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#235730')}
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {/* Info */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-gray-900 mb-3">📄 Informations</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span style={{ color: '#235730' }}>•</span>
            Les factures sont disponibles au format PDF
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#235730' }}>•</span>
            Délai de paiement : 30 jours à réception
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#235730' }}>•</span>
            Vous pouvez télécharger vos factures à tout moment
          </li>
          <li className="flex items-start gap-2">
            <span style={{ color: '#235730' }}>•</span>
            Un récapitulatif annuel est disponible sur demande
          </li>
        </ul>
      </div>
    </div>
  );
}

// Force SSR pour éviter les erreurs de build
export async function getServerSideProps() {
  return { props: {} };
}
