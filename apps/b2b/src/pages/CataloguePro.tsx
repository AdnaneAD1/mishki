'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Search, Filter, Grid, List, ShoppingCart, Plus, Check } from 'lucide-react';

interface Product {
  id: string;
  nom: string;
  reference: string;
  description: string;
  prixHT: number;
  categorie: string;
  formatCabine: string;
  stock: number;
  image: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    nom: 'Crème Visage Pro',
    reference: 'CV-PRO-001',
    description: 'Crème hydratante professionnelle 50ml',
    prixHT: 45.0,
    categorie: 'Visage',
    formatCabine: '50ml',
    stock: 125,
    image: 'https://images.unsplash.com/photo-1556229010-aa9e5a4e7e4d?w=200',
  },
  {
    id: '2',
    nom: 'Sérum Anti-âge',
    reference: 'SA-PRO-002',
    description: 'Sérum concentré anti-rides 30ml',
    prixHT: 68.0,
    categorie: 'Visage',
    formatCabine: '30ml',
    stock: 80,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200',
  },
  {
    id: '3',
    nom: 'Gommage Corps Spa',
    reference: 'GC-SPA-003',
    description: 'Gommage corporel format cabine 500ml',
    prixHT: 32.0,
    categorie: 'Corps',
    formatCabine: '500ml',
    stock: 200,
    image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=200',
  },
  {
    id: '4',
    nom: 'Huile Massage Relaxante',
    reference: 'HM-REL-004',
    description: 'Huile de massage professionnelle 1L',
    prixHT: 42.0,
    categorie: 'Massage',
    formatCabine: '1L',
    stock: 150,
    image: 'https://images.unsplash.com/photo-1556229010-aa9e5a4e7e4d?w=200',
  },
  {
    id: '5',
    nom: 'Masque Purifiant',
    reference: 'MP-PUR-005',
    description: 'Masque argile purifiante 250ml',
    prixHT: 38.0,
    categorie: 'Visage',
    formatCabine: '250ml',
    stock: 95,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200',
  },
  {
    id: '6',
    nom: 'Lotion Tonique',
    reference: 'LT-TON-006',
    description: 'Lotion tonique hydratante 200ml',
    prixHT: 28.0,
    categorie: 'Visage',
    formatCabine: '200ml',
    stock: 180,
    image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=200',
  },
];

export default function CataloguePro() {
  const [products] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState('Toutes');
  const [selectedFormat, setSelectedFormat] = useState('Tous');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set());
  
  const { addToCart } = useCart();
  const { user } = useAuth();

  const categories = ['Toutes', 'Visage', 'Corps', 'Massage'];
  const formats = ['Tous', '30ml', '50ml', '200ml', '250ml', '500ml', '1L'];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategorie =
      selectedCategorie === 'Toutes' || product.categorie === selectedCategorie;
    const matchesFormat =
      selectedFormat === 'Tous' || product.formatCabine === selectedFormat;
    return matchesSearch && matchesCategorie && matchesFormat;
  });

  const handleAddToCart = (product: Product) => {
    addToCart(
      {
        id: product.id,
        nom: product.nom,
        reference: product.reference,
        prixHT: product.prixHT,
        image: product.image,
      },
      1
    );
    setAddedProducts((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedProducts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 2000);
  };

  const calculateRemise = (prix: number) => {
    const remise = user?.remise || 0;
    return prix - (prix * remise) / 100;
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2 text-xl md:text-2xl">Catalogue Professionnel</h1>
        <p className="text-sm md:text-base text-gray-600">
          Formats cabine • Prix HT • Remise {user?.remise}% appliquée
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-3 md:p-4">
        <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" style={{ color: '#235730' }} />
              <input
                type="text"
                placeholder="Rechercher par nom ou référence..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 text-sm md:text-base"
                style={{ '--tw-ring-color': '#235730' } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Filters - Responsive */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {/* Category Filter */}
            <select
              value={selectedCategorie}
              onChange={(e) => setSelectedCategorie(e.target.value)}
              className="px-3 md:px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 text-sm md:text-base"
              style={{ '--tw-ring-color': '#235730' } as React.CSSProperties}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'Toutes' ? 'Toutes catégories' : cat}
                </option>
              ))}
            </select>

            {/* Format Filter */}
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="px-3 md:px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 text-sm md:text-base"
              style={{ '--tw-ring-color': '#235730' } as React.CSSProperties}
            >
              {formats.map((format) => (
                <option key={format} value={format}>
                  {format === 'Tous' ? 'Tous formats' : `Format ${format}`}
                </option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={viewMode === 'grid' ? { backgroundColor: '#235730' } : {}}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={viewMode === 'list' ? { backgroundColor: '#235730' } : {}}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategorie !== 'Toutes' || selectedFormat !== 'Tous' || searchTerm) && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">Filtres actifs :</span>
            {searchTerm && (
              <span className="px-3 py-1 rounded-full text-sm text-white" style={{ backgroundColor: '#235730' }}>
                Recherche: "{searchTerm}"
              </span>
            )}
            {selectedCategorie !== 'Toutes' && (
              <span className="px-3 py-1 rounded-full text-sm text-white" style={{ backgroundColor: '#235730' }}>
                {selectedCategorie}
              </span>
            )}
            {selectedFormat !== 'Tous' && (
              <span className="px-3 py-1 rounded-full text-sm text-white" style={{ backgroundColor: '#235730' }}>
                {selectedFormat}
              </span>
            )}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategorie('Toutes');
                setSelectedFormat('Tous');
              }}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
            >
              Effacer tout
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Products Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const prixRemise = calculateRemise(product.prixHT);
            const isAdded = addedProducts.has(product.id);
            
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
              >
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.nom}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="inline-block px-2 py-1 text-xs rounded mb-2 text-white" style={{ backgroundColor: '#235730' }}>
                        {product.formatCabine}
                      </span>
                      <h3 className="text-gray-900">{product.nom}</h3>
                      <p className="text-xs text-gray-500 mb-1">{product.reference}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  <div className="flex items-end justify-between mb-3">
                    <div>
                      {user?.remise ? (
                        <>
                          <p className="text-xs text-gray-400 line-through">
                            {product.prixHT.toFixed(2)} €
                          </p>
                          <p className="text-lg text-gray-900">
                            {prixRemise.toFixed(2)} € <span className="text-sm">HT</span>
                          </p>
                        </>
                      ) : (
                        <p className="text-lg text-gray-900">
                          {product.prixHT.toFixed(2)} € <span className="text-sm">HT</span>
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{product.stock} en stock</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full py-2 rounded-lg transition-all flex items-center justify-center gap-2 text-white ${
                      isAdded ? 'bg-green-500' : ''
                    }`}
                    style={!isAdded ? { backgroundColor: '#235730' } : {}}
                    onMouseEnter={(e) => !isAdded && (e.currentTarget.style.backgroundColor = '#1a4023')}
                    onMouseLeave={(e) => !isAdded && (e.currentTarget.style.backgroundColor = '#235730')}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        Ajouté au panier
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Ajouter au panier
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-600">Produit</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600">Référence</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600">Format</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600">Prix HT</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600">Stock</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => {
                  const prixRemise = calculateRemise(product.prixHT);
                  const isAdded = addedProducts.has(product.id);
                  
                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.nom}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="text-sm text-gray-900">{product.nom}</p>
                            <p className="text-xs text-gray-500">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{product.reference}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs rounded text-white" style={{ backgroundColor: '#235730' }}>
                          {product.formatCabine}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {user?.remise ? (
                          <div>
                            <p className="text-xs text-gray-400 line-through">
                              {product.prixHT.toFixed(2)} €
                            </p>
                            <p className="text-sm text-gray-900">{prixRemise.toFixed(2)} € HT</p>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-900">{product.prixHT.toFixed(2)} € HT</p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{product.stock}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`px-4 py-2 rounded-lg transition-all text-sm flex items-center gap-2 ${
                            isAdded
                              ? 'bg-green-100 text-green-700'
                              : 'text-white'
                          }`}
                          style={!isAdded ? { backgroundColor: '#235730' } : {}}
                          onMouseEnter={(e) => !isAdded && (e.currentTarget.style.backgroundColor = '#1a4023')}
                          onMouseLeave={(e) => !isAdded && (e.currentTarget.style.backgroundColor = '#235730')}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-4 h-4" />
                              Ajouté
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4" />
                              Ajouter
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">Aucun produit trouvé</h3>
          <p className="text-gray-600 mb-4">Essayez de modifier vos filtres de recherche</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategorie('Toutes');
              setSelectedFormat('Tous');
            }}
            className="px-4 py-2 text-white rounded-lg transition-colors"
            style={{ backgroundColor: '#235730' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a4023')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#235730')}
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}
