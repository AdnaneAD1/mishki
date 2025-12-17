'use client';

import { useState } from 'react';
import { Zap, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface OrderLine {
  id: string;
  reference: string;
  nom: string;
  quantite: number;
  prixHT: number;
  image: string;
}

const mockProductsDb = [
  { reference: 'CV-PRO-001', nom: 'Crème Visage Pro', prixHT: 45.0, image: 'https://images.unsplash.com/photo-1556229010-aa9e5a4e7e4d?w=200' },
  { reference: 'SA-PRO-002', nom: 'Sérum Anti-âge', prixHT: 68.0, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200' },
  { reference: 'GC-SPA-003', nom: 'Gommage Corps Spa', prixHT: 32.0, image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=200' },
  { reference: 'HM-REL-004', nom: 'Huile Massage Relaxante', prixHT: 42.0, image: 'https://images.unsplash.com/photo-1556229010-aa9e5a4e7e4d?w=200' },
  { reference: 'MP-PUR-005', nom: 'Masque Purifiant', prixHT: 38.0, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200' },
  { reference: 'LT-TON-006', nom: 'Lotion Tonique', prixHT: 28.0, image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=200' },
];

export default function CommandeRapide() {
  const [orderLines, setOrderLines] = useState<OrderLine[]>([
    { id: '1', reference: '', nom: '', quantite: 1, prixHT: 0, image: '' },
  ]);
  const [validatedProducts, setValidatedProducts] = useState<Map<string, any>>(new Map());
  const { addToCart } = useCart();

  const addLine = () => {
    setOrderLines([
      ...orderLines,
      { id: Date.now().toString(), reference: '', nom: '', quantite: 1, prixHT: 0, image: '' },
    ]);
  };

  const removeLine = (id: string) => {
    if (orderLines.length > 1) {
      setOrderLines(orderLines.filter((line) => line.id !== id));
      setValidatedProducts((prev) => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
    }
  };

  const updateReference = (id: string, reference: string) => {
    setOrderLines(
      orderLines.map((line) =>
        line.id === id ? { ...line, reference: reference.toUpperCase() } : line
      )
    );

    // Validate reference
    const product = mockProductsDb.find((p) => p.reference === reference.toUpperCase());
    if (product) {
      setValidatedProducts((prev) => new Map(prev).set(id, product));
    } else {
      setValidatedProducts((prev) => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
    }
  };

  const updateQuantity = (id: string, quantite: number) => {
    if (quantite > 0) {
      setOrderLines(
        orderLines.map((line) => (line.id === id ? { ...line, quantite } : line))
      );
    }
  };

  const handleSubmitOrder = () => {
    let hasError = false;
    orderLines.forEach((line) => {
      if (!line.reference) {
        hasError = true;
        return;
      }
      const product = validatedProducts.get(line.id);
      if (!product) {
        hasError = true;
        return;
      }
      addToCart(
        {
          id: product.reference,
          nom: product.nom,
          reference: product.reference,
          prixHT: product.prixHT,
          image: product.image,
        },
        line.quantite
      );
    });

    if (!hasError) {
      alert('Produits ajoutés au panier avec succès !');
      setOrderLines([{ id: Date.now().toString(), reference: '', nom: '', quantite: 1, prixHT: 0, image: '' }]);
      setValidatedProducts(new Map());
    } else {
      alert('Veuillez vérifier toutes les références avant de valider');
    }
  };

  const calculateTotal = () => {
    return orderLines.reduce((sum, line) => {
      const product = validatedProducts.get(line.id);
      if (product) {
        return sum + product.prixHT * line.quantite;
      }
      return sum;
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-gray-900 mb-2 flex items-center gap-2">
            <Zap className="w-7 h-7" style={{ color: '#235730' }} />
            Commande Rapide
          </h1>
          <p className="text-gray-600">
            Commandez directement par référence produit pour un gain de temps maximal
          </p>
        </div>
      </div>

      {/* References Table */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-gray-900 mb-3">Références courantes :</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-sm">
          {mockProductsDb.map((product) => (
            <div
              key={product.reference}
              className="bg-white rounded-lg px-3 py-2 text-gray-700 hover:bg-blue-100 transition-colors cursor-pointer"
              onClick={() => {
                const emptyLine = orderLines.find((line) => !line.reference);
                if (emptyLine) {
                  updateReference(emptyLine.id, product.reference);
                } else {
                  const newLine = { id: Date.now().toString(), reference: product.reference, nom: product.nom, quantite: 1, prixHT: product.prixHT, image: product.image };
                  setOrderLines([...orderLines, newLine]);
                  updateReference(newLine.id, product.reference);
                }
              }}
            >
              {product.reference}
            </div>
          ))}
        </div>
      </div>

      {/* Order Form */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-gray-900">Saisie de commande</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Référence</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Produit</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Prix HT</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Quantité</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Total HT</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orderLines.map((line) => {
                const product = validatedProducts.get(line.id);
                const isValid = !!product;
                const hasReference = !!line.reference;

                return (
                  <tr key={line.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={line.reference}
                        onChange={(e) => updateReference(line.id, e.target.value)}
                        placeholder="Ex: CV-PRO-001"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          hasReference && !isValid
                            ? 'border-red-300 focus:ring-red-500 bg-red-50'
                            : isValid
                            ? 'border-green-300 focus:ring-green-500 bg-green-50'
                            : 'border-gray-200 focus:ring-blue-500'
                        }`}
                      />
                      {hasReference && !isValid && (
                        <p className="text-xs text-red-600 mt-1">Référence invalide</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isValid ? (
                        <div className="flex items-center gap-2">
                          <img
                            src={product.image}
                            alt={product.nom}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span className="text-sm text-gray-900">{product.nom}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isValid ? (
                        <span className="text-sm text-gray-900">{product.prixHT.toFixed(2)} €</span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="1"
                        value={line.quantite}
                        onChange={(e) => updateQuantity(line.id, parseInt(e.target.value) || 1)}
                        className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      {isValid ? (
                        <span className="text-sm text-gray-900">
                          {(product.prixHT * line.quantite).toFixed(2)} €
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => removeLine(line.id)}
                        disabled={orderLines.length === 1}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={addLine}
              className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors"
              style={{ color: '#235730' }}
            >
              <Plus className="w-4 h-4" />
              Ajouter une ligne
            </button>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-gray-600">Total commande</p>
                <p className="text-2xl text-gray-900">{calculateTotal().toFixed(2)} € HT</p>
              </div>
              <button
                onClick={handleSubmitOrder}
                disabled={validatedProducts.size === 0}
                className="flex items-center gap-2 px-6 py-3 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#235730' }}
                onMouseEnter={(e) => validatedProducts.size > 0 && (e.currentTarget.style.backgroundColor = '#1a4023')}
                onMouseLeave={(e) => validatedProducts.size > 0 && (e.currentTarget.style.backgroundColor = '#235730')}
              >
                <ShoppingCart className="w-5 h-5" />
                Valider la commande ({validatedProducts.size})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="text-gray-900 mb-2">💡 Astuce</h4>
          <p className="text-sm text-gray-600">
            Cliquez sur une référence courante pour l'ajouter automatiquement
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <h4 className="text-gray-900 mb-2">⚡ Gain de temps</h4>
          <p className="text-sm text-gray-600">
            Commandez plusieurs produits en une seule fois
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <h4 className="text-gray-900 mb-2">📋 Format</h4>
          <p className="text-sm text-gray-600">
            Les références respectent le format XX-XXX-000
          </p>
        </div>
      </div>
    </div>
  );
}

// Force SSR pour éviter les erreurs de build avec useCart/useAuth
export async function getServerSideProps() {
  return { props: {} };
}
