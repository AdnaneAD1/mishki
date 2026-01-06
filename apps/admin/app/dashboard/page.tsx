'use client';

import Link from 'next/link';
import { Users, ShoppingBag, Package, TrendingUp, ArrowUp, ArrowDown, Loader2 } from 'lucide-react';
import { useAdminDashboard } from '@/apps/admin/hooks/useAdminDashboard';
import { useAdminUsers } from '@/apps/admin/hooks/useAdminUsers';

export default function Dashboard() {
  const { stats, recentOrders, pendingProsList, loading } = useAdminDashboard();
  const { validateUser } = useAdminUsers();

  const handleValidate = async (id: string, name: string) => {
    if (confirm(`Valider le compte de ${name} ?`)) {
      try {
        await validateUser(id);
      } catch {
        alert('Erreur lors de la validation');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#235730] animate-spin" />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Professionnels',
      value: stats.professionals.toString(),
      change: stats.pendingPros > 0 ? `${stats.pendingPros} en attente` : 'À jour',
      trend: stats.pendingPros > 0 ? 'down' : 'up',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Commandes',
      value: stats.orders.toString(),
      change: '+100%', // Temporary placeholder
      trend: 'up',
      icon: ShoppingBag,
      color: 'bg-green-500',
    },
    {
      title: 'Produits',
      value: stats.products.toString(),
      change: 'Catalogue',
      trend: 'up',
      icon: Package,
      color: 'bg-purple-500',
    },
    {
      title: "Chiffre d'affaires",
      value: `${stats.revenue.toLocaleString('fr-FR')} €`,
      change: 'Total',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-gray-900 mb-2 font-bold">Dashboard</h1>
        <p className="text-gray-600">Vue d&apos;ensemble de votre plateforme en temps réel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center shadow-inner`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${stat.trend === 'up' ? 'text-green-600' : 'text-orange-600'
                }`}>
                {stat.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1 leading-none">{stat.value}</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Commandes récentes</h2>
            <Link href="/admin/commandes" className="text-xs font-bold text-[#235730] hover:underline uppercase tracking-wider">
              Voir tout
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.length === 0 ? (
              <p className="text-center py-8 text-gray-400 text-sm italic">Aucune commande enregistrée</p>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 leading-tight">#{order.id}</p>
                    <p className="text-xs text-gray-500 font-medium">{order.client}</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <p className="font-bold text-gray-900">{order.amount}</p>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${order.status === 'Livrée' ? 'bg-green-100 text-green-700 border border-green-200' :
                      order.status === 'En cours' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                        'bg-yellow-100 text-yellow-700 border border-yellow-200'
                      }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pending Professionals */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Validations en attente</h2>
            <Link href="/admin/professionnels" className="text-xs font-bold text-[#235730] hover:underline uppercase tracking-wider">
              Gérer ({stats.pendingPros})
            </Link>
          </div>
          <div className="space-y-4">
            {pendingProsList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <Users className="w-12 h-12 mb-3 opacity-20" />
                <p className="text-sm italic">Aucune demande en attente</p>
              </div>
            ) : (
              pendingProsList.map((pro) => (
                <div key={pro.id} className="p-4 bg-gray-50 rounded-xl border border-transparent hover:border-gray-200 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-900 leading-tight">{pro.name}</p>
                      <p className="text-xs text-gray-500 font-medium">{pro.company}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">{pro.date}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[10px] text-gray-400 font-mono">SIRET: {pro.siret}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleValidate(pro.id, pro.name)}
                        className="px-3 py-1.5 bg-[#235730] text-white text-[10px] font-bold uppercase rounded-lg hover:bg-[#1a4023] transition-colors shadow-sm"
                      >
                        Valider
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
