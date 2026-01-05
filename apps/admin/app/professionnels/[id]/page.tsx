'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, TrendingUp, Package } from 'lucide-react';

export default function ProfessionnelDetail() {
  const params = useParams();
  const id = params.id;

  // Mock data - à remplacer par des vraies données
  const professional = {
    id,
    name: 'Marie Dubois',
    email: 'marie@spaharmonie.fr',
    phone: '+33 6 12 34 56 78',
    company: 'Spa Harmonie',
    siret: '123 456 789 00012',
    address: '15 Rue de la Paix, 75002 Paris',
    status: 'Validé',
    remise: 15,
    joinDate: '15/03/2025',
    totalOrders: 24,
    totalSpent: '€12,450',
    avgOrderValue: '€518',
  };

  const recentOrders = [
    { id: 'CMD-045', date: '02/01/2026', amount: '€890', status: 'Livrée', items: 5 },
    { id: 'CMD-038', date: '15/12/2025', amount: '€1,234', status: 'Livrée', items: 8 },
    { id: 'CMD-032', date: '01/12/2025', amount: '€567', status: 'Livrée', items: 3 },
    { id: 'CMD-025', date: '20/11/2025', amount: '€2,100', status: 'Livrée', items: 12 },
  ];

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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{professional.name}</h1>
            <p className="text-gray-600">{professional.company}</p>
          </div>
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              professional.status === 'Validé'
                ? 'bg-green-100 text-green-700'
                : professional.status === 'En attente'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {professional.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-gray-600">
            <Mail className="w-5 h-5" />
            <span>{professional.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Phone className="w-5 h-5" />
            <span>{professional.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>{professional.address}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Calendar className="w-5 h-5" />
            <span>Membre depuis le {professional.joinDate}</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-1">SIRET</p>
          <p className="font-medium text-gray-900">{professional.siret}</p>
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
          <p className="text-2xl font-bold text-gray-900 mb-1">{professional.totalOrders}</p>
          <p className="text-sm text-gray-600">Commandes totales</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{professional.totalSpent}</p>
          <p className="text-sm text-gray-600">Montant total</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{professional.avgOrderValue}</p>
          <p className="text-sm text-gray-600">Panier moyen</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{professional.remise}%</p>
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
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.items} articles</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.amount}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-[#235730] text-white rounded-lg hover:bg-[#1a4023] transition-colors">
            Modifier la remise
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Envoyer un email
          </button>
          <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors">
            Suspendre le compte
          </button>
          <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
            Supprimer le compte
          </button>
        </div>
      </div>
    </div>
  );
}
