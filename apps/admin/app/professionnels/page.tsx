'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Eye, Check, X, MoreVertical } from 'lucide-react';

export default function Professionnels() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');

  const professionals = [
    {
      id: '1',
      name: 'Marie Dubois',
      email: 'marie@spaharmonie.fr',
      company: 'Spa Harmonie',
      siret: '123 456 789 00012',
      status: 'Validé',
      remise: 15,
      orders: 24,
      totalSpent: '€12,450',
      joinDate: '15/03/2025',
    },
    {
      id: '2',
      name: 'Jean Martin',
      email: 'jean@institut-beaute.fr',
      company: 'Institut Beauté',
      siret: '987 654 321 00034',
      status: 'En attente',
      remise: 0,
      orders: 0,
      totalSpent: '€0',
      joinDate: '04/01/2026',
    },
    {
      id: '3',
      name: 'Sophie Laurent',
      email: 'sophie@wellness.fr',
      company: 'Wellness Pro',
      siret: '456 789 123 00056',
      status: 'Validé',
      remise: 20,
      orders: 45,
      totalSpent: '€28,900',
      joinDate: '10/01/2025',
    },
    {
      id: '4',
      name: 'Pierre Durand',
      email: 'pierre@spazen.fr',
      company: 'Spa Zen',
      siret: '321 654 987 00078',
      status: 'Suspendu',
      remise: 10,
      orders: 12,
      totalSpent: '€5,600',
      joinDate: '20/06/2025',
    },
  ];

  const filteredPros = professionals.filter((pro) => {
    const matchesSearch =
      pro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tous' || pro.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-gray-900 mb-2">Professionnels</h1>
        <p className="text-gray-600">Gérer les comptes professionnels</p>
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
                placeholder="Rechercher par nom, entreprise ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235730]"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235730]"
          >
            <option value="Tous">Tous les statuts</option>
            <option value="Validé">Validé</option>
            <option value="En attente">En attente</option>
            <option value="Suspendu">Suspendu</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Total</p>
          <p className="text-2xl font-bold text-gray-900">{professionals.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Validés</p>
          <p className="text-2xl font-bold text-green-600">
            {professionals.filter((p) => p.status === 'Validé').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">En attente</p>
          <p className="text-2xl font-bold text-yellow-600">
            {professionals.filter((p) => p.status === 'En attente').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Suspendus</p>
          <p className="text-2xl font-bold text-red-600">
            {professionals.filter((p) => p.status === 'Suspendu').length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Professionnel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Entreprise</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">SIRET</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Remise</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Commandes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPros.map((pro) => (
                <tr key={pro.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{pro.name}</p>
                      <p className="text-sm text-gray-500">{pro.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{pro.company}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{pro.siret}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        pro.status === 'Validé'
                          ? 'bg-green-100 text-green-700'
                          : pro.status === 'En attente'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {pro.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{pro.remise}%</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900">{pro.orders} commandes</p>
                      <p className="text-xs text-gray-500">{pro.totalSpent}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/professionnels/${pro.id}`}
                        className="p-2 text-gray-600 hover:text-[#235730] hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      {pro.status === 'En attente' && (
                        <>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            <Check className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
