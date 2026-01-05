'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';

export default function Produits() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Toutes');

  const products = [
    {
      id: 'SC-CH-150',
      name: 'Crème Hydratante Visage',
      category: 'Soins Cabine',
      price: 45.99,
      stock: 120,
      image: '/b2c/products/creme-hydratante.jpg',
      status: 'Actif',
    },
    {
      id: 'SV-LN-100',
      name: 'Lotion de Nettoyage',
      category: 'Soins Vente',
      price: 28.50,
      stock: 85,
      image: '/b2c/products/lotion-nettoyage.jpg',
      status: 'Actif',
    },
    {
      id: 'SV-HJ-100',
      name: 'Huile de Jojoba',
      category: 'Soins Vente',
      price: 32.00,
      stock: 45,
      image: '/b2c/products/huile-jojoba.jpg',
      status: 'Actif',
    },
    {
      id: 'SV-CHS-50',
      name: 'Crème Hydratante Spéciale',
      category: 'Soins Vente',
      price: 52.00,
      stock: 0,
      image: '/b2c/products/creme-speciale.jpg',
      status: 'Rupture',
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'Toutes' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">Produits</h1>
          <p className="text-gray-600">Gérer le catalogue de produits</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#235730] text-white rounded-lg hover:bg-[#1a4023] transition-colors">
          <Plus className="w-4 h-4" />
          Nouveau produit
        </button>
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
                placeholder="Rechercher par nom ou référence..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235730]"
              />
            </div>
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235730]"
          >
            <option value="Toutes">Toutes les catégories</option>
            <option value="Soins Cabine">Soins Cabine</option>
            <option value="Soins Vente">Soins Vente</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Total produits</p>
          <p className="text-2xl font-bold text-gray-900">{products.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">En stock</p>
          <p className="text-2xl font-bold text-green-600">
            {products.filter((p) => p.stock > 0).length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Rupture</p>
          <p className="text-2xl font-bold text-red-600">
            {products.filter((p) => p.stock === 0).length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Stock faible</p>
          <p className="text-2xl font-bold text-yellow-600">
            {products.filter((p) => p.stock > 0 && p.stock < 50).length}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all flex flex-col"
            style={{ minHeight: '420px' }}
          >
            <div className="relative h-48 bg-gray-100 overflow-hidden flex-shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-full object-contain p-4"
              />
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    product.status === 'Actif'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {product.status}
                </span>
              </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded mb-2 w-fit">
                {product.category}
              </span>
              <h3 className="font-semibold text-gray-900 mb-1" style={{ minHeight: '48px' }}>
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 mb-3">Réf: {product.id}</p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-lg font-bold text-gray-900">€{product.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">Prix HT</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `Stock: ${product.stock}` : 'Rupture'}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-auto">
                <Link
                  href={`/admin/produits/${product.id}`}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#235730] text-white rounded-lg hover:bg-[#1a4023] transition-colors text-sm"
                >
                  <Eye className="w-4 h-4" />
                  Voir
                </Link>
                <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
