'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Eye, Download } from 'lucide-react';

export default function Commandes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');

  const orders = [
    {
      id: 'CMD-001',
      client: 'Spa Beauté Paris',
      clientEmail: 'contact@spabeaute.fr',
      date: '05/01/2026',
      amount: '€1,234',
      items: 5,
      status: 'En cours',
    },
    {
      id: 'CMD-002',
      client: 'Institut Belle Vie',
      clientEmail: 'info@bellevie.fr',
      date: '04/01/2026',
      amount: '€890',
      items: 3,
      status: 'Livrée',
    },
    {
      id: 'CMD-003',
      client: 'Wellness Center',
      clientEmail: 'contact@wellness.fr',
      date: '04/01/2026',
      amount: '€2,100',
      items: 12,
      status: 'En attente',
    },
    {
      id: 'CMD-004',
      client: 'Spa Zen',
      clientEmail: 'hello@spazen.fr',
      date: '03/01/2026',
      amount: '€756',
      items: 4,
      status: 'En cours',
    },
    {
      id: 'CMD-005',
      client: 'Spa Harmonie',
      clientEmail: 'marie@spaharmonie.fr',
      date: '02/01/2026',
      amount: '€1,567',
      items: 8,
      status: 'Livrée',
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tous' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-gray-900 mb-2">Commandes</h1>
        <p className="text-gray-600">Gérer toutes les commandes</p>
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
                placeholder="Rechercher par N° ou client..."
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
            <option value="En attente">En attente</option>
            <option value="En cours">En cours</option>
            <option value="Livrée">Livrée</option>
            <option value="Annulée">Annulée</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Total</p>
          <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">En attente</p>
          <p className="text-2xl font-bold text-yellow-600">
            {orders.filter((o) => o.status === 'En attente').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">En cours</p>
          <p className="text-2xl font-bold text-blue-600">
            {orders.filter((o) => o.status === 'En cours').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Livrées</p>
          <p className="text-2xl font-bold text-green-600">
            {orders.filter((o) => o.status === 'Livrée').length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">N° Commande</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Articles</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Montant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.client}</p>
                      <p className="text-sm text-gray-500">{order.clientEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'Livrée'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'En cours'
                          ? 'bg-blue-100 text-blue-700'
                          : order.status === 'En attente'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/commandes/${order.id}`}
                        className="p-2 text-gray-600 hover:text-[#235730] hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-gray-600 hover:text-[#235730] hover:bg-gray-100 rounded-lg transition-colors">
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
    </div>
  );
}
