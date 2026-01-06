'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Calendar, TrendingUp, Package, Loader2 } from 'lucide-react';
import { useAdminUsers, useAdminUserDetail } from '@/apps/admin/hooks/useAdminUsers';

export default function ProfessionnelDetail() {
  const params = useParams();
  const id = params.id as string;

  const { user, orders, stats, loading, error } = useAdminUserDetail(id);
  const { validateUser, suspendUser } = useAdminUsers();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#235730] animate-spin" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="p-6 bg-red-50 text-red-700 rounded-xl border border-red-200">
        Erreur : {error || 'Utilisateur non trouvé'}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/admin/professionnels"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour à la liste
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h1>
            <p className="text-gray-600">{user.company}</p>
          </div>
          <span
            className={`px-3 py-1 text-sm rounded-full ${user.status === 'Validé'
              ? 'bg-green-100 text-green-700'
              : user.status === 'En attente'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
              }`}
          >
            {user.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-gray-600 text-sm">
            <Mail className="w-5 h-5" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 text-sm">
            <Calendar className="w-5 h-5" />
            <span>Membre depuis le {user.createdAt}</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-1">SIRET</p>
          <p className="font-medium text-gray-900">{user.siret}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{stats.totalOrders}</p>
          <p className="text-sm text-gray-600">Commandes totales</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{stats.totalSpent.toLocaleString('fr-FR')} €</p>
          <p className="text-sm text-gray-600">Montant total (TTC)</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{stats.avgOrderValue.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} €</p>
          <p className="text-sm text-gray-600">Panier moyen</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{user.remise}%</p>
          <p className="text-sm text-gray-600">Remise accordée</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Commandes récentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">N° Commande</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Articles</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Montant</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500 text-sm">
                    Aucune commande trouvée
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const lines = (order.lines as { quantity: number }[]) || [];
                  const totalQuantity = lines.reduce((acc, line) => acc + (line.quantity || 0), 0) || 0;
                  const uniqueProducts = lines.length || 0;

                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">#{order.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{order.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {totalQuantity} ({uniqueProducts} {uniqueProducts > 1 ? 'produits' : 'produit'})
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.amountTTC || 0} €</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${order.paymentStatus === 'payee'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                          }`}>
                          {order.paymentStatus || 'En attente'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div >
      </div >

      {/* Actions */}
      < div className="bg-white rounded-xl border border-gray-200 p-6" >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
        <div className="flex flex-wrap gap-3">
          {user.status === 'En attente' && (
            <button
              onClick={() => validateUser(user.id)}
              className="px-4 py-2 bg-[#235730] text-white rounded-lg hover:bg-[#1a4023] transition-colors"
            >
              Valider le compte
            </button>
          )}
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Modifier la remise
          </button>
          <button
            onClick={() => suspendUser(user.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${user.status === 'Suspendu'
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              }`}
          >
            {user.status === 'Suspendu' ? 'Réactiver le compte' : 'Suspendu le compte'}
          </button>
        </div>
      </div >
    </div >
  );
}
