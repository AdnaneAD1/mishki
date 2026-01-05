'use client';

import { Settings, Mail, Bell, Shield, Database } from 'lucide-react';

export default function Parametres() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-gray-900 mb-2">Paramètres</h1>
        <p className="text-gray-600">Configuration de la plateforme</p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Paramètres généraux</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de la plateforme
              </label>
              <input
                type="text"
                defaultValue="Mishki B2B"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235730]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email de contact
              </label>
              <input
                type="email"
                defaultValue="contact@mishki.com"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235730]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                defaultValue="+33 1 23 45 67 89"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235730]"
              />
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Notifications Email</h2>
          </div>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-sm text-gray-700">Nouvelles commandes</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-[#235730] rounded" />
            </label>
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-sm text-gray-700">Nouveaux professionnels</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-[#235730] rounded" />
            </label>
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-sm text-gray-700">Stock faible</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-[#235730] rounded" />
            </label>
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-sm text-gray-700">Rapports hebdomadaires</span>
              <input type="checkbox" className="w-5 h-5 text-[#235730] rounded" />
            </label>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Alertes système</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seuil stock faible
              </label>
              <input
                type="number"
                defaultValue="50"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235730]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Délai validation professionnels (jours)
              </label>
              <input
                type="number"
                defaultValue="3"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235730]"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Sécurité</h2>
          </div>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-sm text-gray-700">Authentification à deux facteurs</span>
              <input type="checkbox" className="w-5 h-5 text-[#235730] rounded" />
            </label>
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-sm text-gray-700">Logs d'activité</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-[#235730] rounded" />
            </label>
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
              <span className="text-sm text-gray-700">Validation manuelle des pros</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-[#235730] rounded" />
            </label>
          </div>
        </div>
      </div>

      {/* Database Backup */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-orange-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Sauvegarde de données</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700 mb-1">Dernière sauvegarde</p>
            <p className="text-xs text-gray-500">05/01/2026 à 03:00</p>
          </div>
          <button className="px-4 py-2 bg-[#235730] text-white rounded-lg hover:bg-[#1a4023] transition-colors">
            Sauvegarder maintenant
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-[#235730] text-white rounded-lg hover:bg-[#1a4023] transition-colors font-medium">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}
