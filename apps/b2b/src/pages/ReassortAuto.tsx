'use client';

import { useState } from 'react';
import { RotateCcw, Plus, Edit2, Trash2, Power, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ReassortConfig {
  id: string;
  produit: string;
  reference: string;
  seuilMin: number;
  quantiteAuto: number;
  frequence: string;
  actif: boolean;
  dernierReassort: string | null;
  prochainReassort: string;
}

const mockConfigs: ReassortConfig[] = [
  {
    id: '1',
    produit: 'Crème Visage Pro',
    reference: 'CV-PRO-001',
    seuilMin: 10,
    quantiteAuto: 20,
    frequence: 'Hebdomadaire',
    actif: true,
    dernierReassort: '25 Nov 2025',
    prochainReassort: '2 Déc 2025',
  },
  {
    id: '2',
    produit: 'Huile Massage Relaxante',
    reference: 'HM-REL-004',
    seuilMin: 5,
    quantiteAuto: 15,
    frequence: 'Bi-mensuel',
    actif: true,
    dernierReassort: '15 Nov 2025',
    prochainReassort: '29 Nov 2025',
  },
  {
    id: '3',
    produit: 'Gommage Corps Spa',
    reference: 'GC-SPA-003',
    seuilMin: 8,
    quantiteAuto: 25,
    frequence: 'Mensuel',
    actif: false,
    dernierReassort: '1 Nov 2025',
    prochainReassort: '1 Déc 2025',
  },
  {
    id: '4',
    produit: 'Sérum Anti-âge',
    reference: 'SA-PRO-002',
    seuilMin: 3,
    quantiteAuto: 10,
    frequence: 'Hebdomadaire',
    actif: true,
    dernierReassort: '27 Nov 2025',
    prochainReassort: '4 Déc 2025',
  },
];

interface HistoriqueItem {
  id: string;
  date: string;
  produit: string;
  quantite: number;
  montant: number;
  statut: 'complete' | 'en_cours' | 'annule';
}

const mockHistorique: HistoriqueItem[] = [
  {
    id: 'R-2401',
    date: '27 Nov 2025',
    produit: 'Sérum Anti-âge',
    quantite: 10,
    montant: 680.0,
    statut: 'complete',
  },
  {
    id: 'R-2398',
    date: '25 Nov 2025',
    produit: 'Crème Visage Pro',
    quantite: 20,
    montant: 900.0,
    statut: 'complete',
  },
  {
    id: 'R-2395',
    date: '15 Nov 2025',
    produit: 'Huile Massage Relaxante',
    quantite: 15,
    montant: 630.0,
    statut: 'complete',
  },
  {
    id: 'R-2390',
    date: '1 Nov 2025',
    produit: 'Gommage Corps Spa',
    quantite: 25,
    montant: 800.0,
    statut: 'annule',
  },
];

export default function ReassortAuto() {
  const [configs, setConfigs] = useState<ReassortConfig[]>(mockConfigs);
  const [historique] = useState<HistoriqueItem[]>(mockHistorique);
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleActive = (id: string) => {
    setConfigs(
      configs.map((config) =>
        config.id === id ? { ...config, actif: !config.actif } : config
      )
    );
  };

  const deleteConfig = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette configuration ?')) {
      setConfigs(configs.filter((config) => config.id !== id));
    }
  };

  const activeConfigs = configs.filter((c) => c.actif).length;
  const totalProductsMonitored = configs.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-gray-900 mb-2 flex items-center gap-2">
            <RotateCcw className="w-7 h-7 text-orange-600" />
            Réassort Automatique
          </h1>
          <p className="text-gray-600">
            Configurez le réapprovisionnement automatique de vos produits essentiels
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouveau réassort
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">{activeConfigs}</p>
              <p className="text-sm text-gray-600">Réassorts actifs</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">{totalProductsMonitored}</p>
              <p className="text-sm text-gray-600">Produits surveillés</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">2</p>
              <p className="text-sm text-gray-600">Prochains 7 jours</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">1</p>
              <p className="text-sm text-gray-600">Seuil atteint</p>
            </div>
          </div>
        </div>
      </div>

      {/* Configurations */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-gray-900">Configurations de réassort</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Produit</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Seuil minimum</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Quantité auto</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Fréquence</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Dernier réassort</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Prochain</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Statut</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {configs.map((config) => (
                <tr key={config.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900">{config.produit}</p>
                      <p className="text-xs text-gray-500">{config.reference}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{config.seuilMin} unités</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{config.quantiteAuto} unités</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{config.frequence}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {config.dernierReassort || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{config.prochainReassort}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleActive(config.id)}
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                        config.actif
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Power className="w-3 h-3" />
                      {config.actif ? 'Actif' : 'Inactif'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteConfig(config.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historique */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-gray-900">Historique des réassorts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Référence</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Date</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Produit</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Quantité</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Montant HT</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {historique.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.produit}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.quantite}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.montant.toFixed(2)} €</td>
                  <td className="px-6 py-4">
                    {item.statut === 'complete' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        <CheckCircle2 className="w-3 h-3" />
                        Terminé
                      </span>
                    ) : item.statut === 'en_cours' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        <Clock className="w-3 h-3" />
                        En cours
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        Annulé
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
          <h4 className="text-gray-900 mb-2">⚡ Automatique</h4>
          <p className="text-sm text-gray-600">
            Les commandes sont passées automatiquement selon vos paramètres
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
          <h4 className="text-gray-900 mb-2">📊 Optimisation</h4>
          <p className="text-sm text-gray-600">
            Évitez les ruptures de stock et optimisez votre trésorerie
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-4 border border-green-200">
          <h4 className="text-gray-900 mb-2">🔔 Notifications</h4>
          <p className="text-sm text-gray-600">
            Recevez des alertes avant chaque réassort programmé
          </p>
        </div>
      </div>
    </div>
  );
}
