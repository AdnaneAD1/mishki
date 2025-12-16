'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Home,
  Package,
  ShoppingCart,
  Zap,
  FileText,
  Download,
  RotateCcw,
  Receipt,
  FileCheck,
  X,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Accueil Pro' },
  { to: '/catalogue', icon: Package, label: 'Catalogue' },
  { to: '/panier', icon: ShoppingCart, label: 'Mon Panier' },
  { to: '/commande-rapide', icon: Zap, label: 'Commande Rapide' },
  { to: '/protocoles', icon: FileText, label: 'Protocoles' },
  { to: '/telechargements', icon: Download, label: 'Téléchargements' },
  { to: '/reassort', icon: RotateCcw, label: 'Réassort Auto' },
  { to: '/factures', icon: Receipt, label: 'Factures' },
  { to: '/devis', icon: FileCheck, label: 'Demande de Devis' },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white border-r border-gray-200 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header with Logo */}
        <div className="p-4 md:px-6 py-3 border-b border-gray-200 flex items-center justify-between" style={{ backgroundColor: '#235730' }}>
          <div className="flex-1 flex items-center justify-center">
            <Image 
              src="/images/logo-mishki.png" 
              alt="Mishki B2B" 
              width={130} 
              height={40}
              className="object-contain"
            />
          </div>
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors absolute right-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 md:p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              onClick={onClose}
              className="flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50"
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm md:text-base truncate">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Support Section */}
        <div className="p-3 md:p-4 border-t border-gray-200">
          <div className="rounded-lg p-3 md:p-4" style={{ backgroundColor: '#F7F0E0' }}>
            <p className="text-xs text-gray-600 mb-2">Besoin d'aide ?</p>
            <button
              className="w-full px-3 py-2 bg-white rounded-md text-xs md:text-sm hover:bg-gray-50 transition-colors"
              style={{ color: '#235730' }}
            >
              Contacter le support
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
