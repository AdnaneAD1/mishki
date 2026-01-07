'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Eye, Download, Loader2 } from 'lucide-react';
import { useAdminOrders } from '@/apps/admin/hooks/useAdminOrders';
import { useTranslations } from 'next-intl';

const statusMap: Record<string, { labelKey: string; color: string }> = {
  payee: { labelKey: 'statuses.paid', color: 'bg-green-100 text-green-700' },
  en_attente: { labelKey: 'statuses.pending', color: 'bg-yellow-100 text-yellow-700' },
  retard: { labelKey: 'statuses.late', color: 'bg-red-100 text-red-700' },
  livree: { labelKey: 'statuses.delivered', color: 'bg-blue-100 text-blue-700' },
  annulee: { labelKey: 'statuses.cancelled', color: 'bg-gray-100 text-gray-700' },
};

export default function Commandes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const { orders, loading, error } = useAdminOrders();
  const t = useTranslations('admin.orders');

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.client.toLowerCase().includes(searchTerm.toLowerCase());

      const uiStatus = statusMap[order.status] ? t(statusMap[order.status].labelKey) : order.status;
      const matchesStatus = statusFilter === 'Tous' || uiStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter, t]);

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#235730] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-700 rounded-xl border border-red-200">
        {t('error', { error })}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle', { count: orders.length })}</p>
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
                placeholder={t('search.placeholder')}
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
            <option value="Tous">{t('filters.allStatuses')}</option>
            {Object.values(statusMap).map(s => (
              <option key={s.labelKey} value={t(s.labelKey)}>{t(s.labelKey)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">{t('stats.total')}</p>
          <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">{t('stats.pending')}</p>
          <p className="text-2xl font-bold text-yellow-600">
            {orders.filter((o) => o.status === 'en_attente').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">{t('stats.paid')}</p>
          <p className="text-2xl font-bold text-green-600">
            {orders.filter((o) => o.status === 'payee').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">{t('stats.b2bB2c')}</p>
          <p className="text-lg font-bold text-gray-900">
            {orders.filter(o => o.source === 'b2b').length} / {orders.filter(o => o.source === 'b2c').length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">{t('table.orderNumber')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">{t('table.client')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">{t('table.date')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">{t('table.items')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">{t('table.amount')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">{t('table.source')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">{t('table.status')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600">{t('table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    {t('table.noResults')}
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <span className="font-mono text-xs">{order.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.client}</p>
                        <p className="text-xs text-gray-500">{order.clientEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.itemsCount}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatPrice(order.amount, order.currency)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md ${order.source === 'b2b' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                        {order.source}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${statusMap[order.status]?.color || 'bg-gray-100 text-gray-700'
                          }`}
                      >
                        {statusMap[order.status] ? t(statusMap[order.status].labelKey) : order.status}
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
