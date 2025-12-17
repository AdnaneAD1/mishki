'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import {
  Package,
  TrendingUp,
  ShoppingCart,
  RotateCcw,
  Download,
  FileText,
  Bell,
  ArrowRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export default function AccueilPro() {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Commandes ce mois',
      value: '12',
      change: '+8%',
      icon: ShoppingCart,
      color: '#235730',
    },
    {
      label: 'Chiffre d\'affaires HT',
      value: '8 450 €',
      change: '+12%',
      icon: TrendingUp,
      color: '#235730',
    },
    {
      label: 'Produits en stock',
      value: '156',
      change: '-3',
      icon: Package,
      color: '#235730',
    },
    {
      label: 'Réassorts actifs',
      value: '4',
      change: 'Actif',
      icon: RotateCcw,
      color: '#235730',
    },
  ];

  const recentOrders = [
    {
      id: 'CMD-2401',
      date: '28 Nov 2025',
      products: 'Crème Visage Pro x5, Sérum Anti-âge x3',
      montant: '345.00',
      status: 'livree',
    },
    {
      id: 'CMD-2398',
      date: '25 Nov 2025',
      products: 'Pack Soin Cabine, Huile Massage x2',
      montant: '520.00',
      status: 'en_cours',
    },
    {
      id: 'CMD-2395',
      date: '22 Nov 2025',
      products: 'Gommage Corps x10',
      montant: '180.00',
      status: 'livree',
    },
  ];

  const notifications = [
    {
      title: 'Nouveau protocole disponible',
      description: 'Rituel Anti-âge Premium',
      time: 'Il y a 2h',
      type: 'info',
    },
    {
      title: 'Stock faible détecté',
      description: 'Crème Visage Pro - 3 unités restantes',
      time: 'Il y a 5h',
      type: 'warning',
    },
    {
      title: 'Réassort programmé',
      description: 'Commande automatique le 5 Déc',
      time: 'Hier',
      type: 'success',
    },
  ];

  const quickActions = [
    {
      title: 'Catalogue',
      description: 'Parcourir les produits',
      icon: Package,
      link: '/catalogue',
      color: '#235730',
    },
    {
      title: 'Commande Rapide',
      description: 'Commander par référence',
      icon: ShoppingCart,
      link: '/commande-rapide',
      color: '#235730',
    },
    {
      title: 'Protocoles',
      description: 'Fiches techniques',
      icon: FileText,
      link: '/protocoles',
      color: '#235730',
    },
    {
      title: 'Téléchargements',
      description: 'PLV et visuels',
      icon: Download,
      link: '/telechargements',
      color: '#235730',
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
        <h1 className="text-gray-900 mb-2 text-xl md:text-2xl">
          Bienvenue {user?.prenom} {user?.nom}
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          {user?.societe} • Remise professionnelle: {user?.remise}% • SIRET: {user?.siret}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="p-2 md:p-3 rounded-lg" style={{ backgroundColor: stat.color }}>
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-xs md:text-sm text-green-600">{stat.change}</span>
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-xl md:text-2xl text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-gray-900 mb-4">Accès rapides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.link}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: action.color }}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-gray-900 mb-1 transition-colors" style={{ '--hover-color': '#235730' } as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.color = '#235730'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                  <div className="flex items-center gap-2 mt-3 text-sm group-hover:gap-3 transition-all" style={{ color: '#235730' }}>
                    Accéder
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900 text-lg md:text-xl">Commandes récentes</h2>
              <Link href="/factures" className="text-xs md:text-sm hover:underline" style={{ color: '#235730' }}>
                Voir tout
              </Link>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 md:px-6 py-3 text-left text-xs text-gray-600">Commande</th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs text-gray-600">Date</th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs text-gray-600 hidden sm:table-cell">Produits</th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs text-gray-600">Montant HT</th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs text-gray-600">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 md:px-6 py-4 text-sm text-gray-900">{order.id}</td>
                        <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-gray-600">{order.date}</td>
                        <td className="px-4 md:px-6 py-4 text-sm text-gray-600 max-w-xs truncate hidden sm:table-cell">
                          {order.products}
                        </td>
                        <td className="px-4 md:px-6 py-4 text-sm text-gray-900">{order.montant} €</td>
                        <td className="px-4 md:px-6 py-4">
                          {order.status === 'livree' ? (
                            <span className="inline-flex items-center gap-1 px-2 md:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                              <CheckCircle2 className="w-3 h-3" />
                              <span className="hidden sm:inline">Livrée</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 md:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                              <Clock className="w-3 h-3" />
                              <span className="hidden sm:inline">En cours</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Notifications & Reassort */}
        <div className="space-y-6">
          {/* Notifications */}
          <div>
            <h2 className="text-gray-900 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </h2>
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
              {notifications.map((notif, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        notif.type === 'warning'
                          ? 'bg-yellow-500'
                          : notif.type === 'success'
                          ? 'bg-green-500'
                          : 'bg-blue-500'
                      }`}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 mb-1">{notif.title}</p>
                      <p className="text-xs text-gray-600 mb-1">{notif.description}</p>
                      <p className="text-xs text-gray-400">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reassort Widget */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#235730' }}>
                <RotateCcw className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-gray-900">Réassort Auto</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              4 produits configurés pour réassort automatique
            </p>
            <Link
              href="/reassort"
              className="w-full px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2"
              style={{ color: '#235730' }}
            >
              Gérer le réassort
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Downloads Widget */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#235730' }}>
                <Download className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-gray-900">Téléchargements</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Accédez à vos PLV et visuels marketing
            </p>
            <Link
              href="/telechargements"
              className="w-full px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2"
              style={{ color: '#235730' }}
            >
              Bibliothèque
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Force SSR pour éviter les erreurs de build avec useAuth
export async function getServerSideProps() {
  return { props: {} };
}
