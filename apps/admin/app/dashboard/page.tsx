'use client';

import { Users, ShoppingBag, Package, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Professionnels',
      value: '248',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Commandes',
      value: '1,234',
      change: '+8%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'bg-green-500',
    },
    {
      title: 'Produits',
      value: '156',
      change: '+3',
      trend: 'up',
      icon: Package,
      color: 'bg-purple-500',
    },
    {
      title: 'Chiffre d\'affaires',
      value: '€45,231',
      change: '+23%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  const recentOrders = [
    { id: 'CMD-001', client: 'Spa Beauté Paris', amount: '€1,234', status: 'En cours', date: '05/01/2026' },
    { id: 'CMD-002', client: 'Institut Belle Vie', amount: '€890', status: 'Livrée', date: '04/01/2026' },
    { id: 'CMD-003', client: 'Wellness Center', amount: '€2,100', status: 'En attente', date: '04/01/2026' },
    { id: 'CMD-004', client: 'Spa Zen', amount: '€756', status: 'En cours', date: '03/01/2026' },
  ];

  const pendingPros = [
    { name: 'Marie Dubois', company: 'Spa Harmonie', date: '05/01/2026', siret: '123 456 789 00012' },
    { name: 'Jean Martin', company: 'Institut Beauté', date: '04/01/2026', siret: '987 654 321 00034' },
    { name: 'Sophie Laurent', company: 'Wellness Pro', date: '04/01/2026', siret: '456 789 123 00056' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Vue d'ensemble de votre plateforme</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Commandes récentes</h2>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.client}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{order.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Livrée' ? 'bg-green-100 text-green-700' :
                    order.status === 'En cours' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Professionals */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Professionnels en attente</h2>
          <div className="space-y-3">
            {pendingPros.map((pro, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{pro.name}</p>
                    <p className="text-sm text-gray-600">{pro.company}</p>
                  </div>
                  <span className="text-xs text-gray-500">{pro.date}</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">SIRET: {pro.siret}</p>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-1.5 bg-[#235730] text-white text-xs rounded-lg hover:bg-[#1a4023] transition-colors">
                    Valider
                  </button>
                  <button className="flex-1 px-3 py-1.5 bg-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-300 transition-colors">
                    Rejeter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
