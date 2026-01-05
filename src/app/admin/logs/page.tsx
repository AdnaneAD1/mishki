'use client';

import { useState } from 'react';
import { Search, Filter, Download, AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

export default function Logs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('Tous');

  const logs = [
    {
      id: '1',
      type: 'success',
      action: 'Connexion',
      user: 'admin@mishki.com',
      details: 'Connexion réussie depuis 192.168.1.1',
      timestamp: '05/01/2026 14:23:15',
    },
    {
      id: '2',
      type: 'info',
      action: 'Commande créée',
      user: 'marie@spaharmonie.fr',
      details: 'Nouvelle commande CMD-045 créée (€890)',
      timestamp: '05/01/2026 14:15:42',
    },
    {
      id: '3',
      type: 'warning',
      action: 'Stock faible',
      user: 'Système',
      details: 'Produit SV-CHS-50 - Stock: 5 unités',
      timestamp: '05/01/2026 13:45:00',
    },
    {
      id: '4',
      type: 'success',
      action: 'Professionnel validé',
      user: 'admin@mishki.com',
      details: 'Validation du compte: Spa Harmonie',
      timestamp: '05/01/2026 12:30:18',
    },
    {
      id: '5',
      type: 'error',
      action: 'Échec de paiement',
      user: 'jean@institut-beaute.fr',
      details: 'Paiement refusé pour CMD-044',
      timestamp: '05/01/2026 11:22:33',
    },
    {
      id: '6',
      type: 'info',
      action: 'Produit modifié',
      user: 'admin@mishki.com',
      details: 'Prix mis à jour pour SC-CH-150',
      timestamp: '05/01/2026 10:15:27',
    },
    {
      id: '7',
      type: 'success',
      action: 'Inscription',
      user: 'sophie@wellness.fr',
      details: 'Nouveau professionnel inscrit',
      timestamp: '05/01/2026 09:45:12',
    },
    {
      id: '8',
      type: 'warning',
      action: 'Tentative connexion',
      user: 'unknown@email.com',
      details: '3 tentatives échouées depuis 45.123.45.67',
      timestamp: '05/01/2026 08:30:55',
    },
  ];

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'Tous' || log.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">Logs d'activité</h1>
          <p className="text-gray-600">Historique des événements système</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#235730] text-white rounded-lg hover:bg-[#1a4023] transition-colors">
          <Download className="w-4 h-4" />
          Exporter
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher dans les logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235730]"
              />
            </div>
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235730]"
          >
            <option value="Tous">Tous les types</option>
            <option value="success">Succès</option>
            <option value="info">Info</option>
            <option value="warning">Avertissement</option>
            <option value="error">Erreur</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Total</p>
          <p className="text-2xl font-bold text-gray-900">{logs.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Succès</p>
          <p className="text-2xl font-bold text-green-600">
            {logs.filter((l) => l.type === 'success').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Avertissements</p>
          <p className="text-2xl font-bold text-yellow-600">
            {logs.filter((l) => l.type === 'warning').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Erreurs</p>
          <p className="text-2xl font-bold text-red-600">
            {logs.filter((l) => l.type === 'error').length}
          </p>
        </div>
      </div>

      {/* Logs List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">{getIcon(log.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-gray-900">{log.action}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(log.type)}`}>
                      {log.type === 'success'
                        ? 'Succès'
                        : log.type === 'error'
                        ? 'Erreur'
                        : log.type === 'warning'
                        ? 'Avertissement'
                        : 'Info'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{log.details}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Utilisateur: {log.user}</span>
                    <span>•</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
