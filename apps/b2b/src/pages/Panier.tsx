'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Check,
  Package,
  CreditCard,
} from 'lucide-react';

export default function Panier() {
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const calculateRemise = (prix: number) => {
    const remise = user?.remise || 0;
    return prix - (prix * remise) / 100;
  };

  const totalHT = items.reduce((sum, item) => {
    const prixRemise = calculateRemise(item.prixHT);
    return sum + prixRemise * item.quantite;
  }, 0);

  const totalRemise = total - totalHT;
  const tva = totalHT * 0.2;
  const totalTTC = totalHT + tva;

  const handleValidateOrder = () => {
    setOrderConfirmed(true);
    setTimeout(() => {
      clearCart();
      router.push('/accueil');
    }, 3000);
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-white rounded-xl border border-gray-200 p-8 md:p-12 max-w-md text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: '#235730' }}
          >
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-gray-900 mb-2 text-xl md:text-2xl">Commande validée !</h2>
          <p className="text-gray-600 mb-6">
            Votre commande a été enregistrée avec succès. Vous recevrez une confirmation par
            email.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm" style={{ color: '#235730' }}>
            <Package className="w-4 h-4" />
            Redirection en cours...
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/catalogue')}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: '#235730' }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-gray-900 text-xl md:text-2xl">Mon Panier</h1>
            <p className="text-sm md:text-base text-gray-600">Gérez vos produits</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">Votre panier est vide</h3>
          <p className="text-gray-600 mb-6">
            Ajoutez des produits depuis le catalogue pour commencer votre commande
          </p>
          <button
            onClick={() => router.push('/catalogue')}
            className="px-6 py-3 text-white rounded-lg transition-colors inline-flex items-center gap-2"
            style={{ backgroundColor: '#235730' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a4023')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#235730')}
          >
            <Package className="w-5 h-5" />
            Parcourir le catalogue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/catalogue')}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: '#235730' }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-gray-900 text-xl md:text-2xl">Mon Panier</h1>
            <p className="text-sm md:text-base text-gray-600">
              {items.length} produit{items.length > 1 ? 's' : ''} • Remise {user?.remise}%
            </p>
          </div>
        </div>
        <button
          onClick={clearCart}
          className="hidden md:flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Vider le panier
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const prixRemise = calculateRemise(item.prixHT);
            const sousTotal = prixRemise * item.quantite;

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 p-4 md:p-6"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.nom}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 truncate">{item.nom}</h3>
                        <p className="text-sm text-gray-500">{item.reference}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0 ml-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                      <div>
                        {user?.remise ? (
                          <>
                            <p className="text-xs text-gray-400 line-through">
                              {item.prixHT.toFixed(2)} € HT
                            </p>
                            <p className="text-gray-900">
                              {prixRemise.toFixed(2)} € <span className="text-sm">HT</span>
                            </p>
                          </>
                        ) : (
                          <p className="text-gray-900">
                            {item.prixHT.toFixed(2)} € <span className="text-sm">HT</span>
                          </p>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantite - 1)}
                            className="p-2 hover:bg-gray-50 transition-colors rounded-l-lg"
                            style={{ color: '#235730' }}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 text-gray-900 min-w-[3rem] text-center">
                            {item.quantite}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantite + 1)}
                            className="p-2 hover:bg-gray-50 transition-colors rounded-r-lg"
                            style={{ color: '#235730' }}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right min-w-[5rem]">
                          <p className="text-gray-900">
                            {sousTotal.toFixed(2)} €
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Clear Cart Button Mobile */}
          <button
            onClick={clearCart}
            className="md:hidden w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors bg-white border border-gray-200"
          >
            <Trash2 className="w-4 h-4" />
            Vider le panier
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
            <h3 className="text-gray-900 mb-4">Récapitulatif</h3>

            <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sous-total HT</span>
                <span className="text-gray-900">{total.toFixed(2)} €</span>
              </div>
              
              {user?.remise && totalRemise > 0 ? (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Remise pro ({user.remise}%)</span>
                  <span className="text-green-600">-{totalRemise.toFixed(2)} €</span>
                </div>
              ) : null}

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total HT</span>
                <span className="text-gray-900">{totalHT.toFixed(2)} €</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">TVA (20%)</span>
                <span className="text-gray-900">{tva.toFixed(2)} €</span>
              </div>
            </div>

            <div className="flex justify-between mb-6">
              <span className="text-gray-900">Total TTC</span>
              <span className="text-xl text-gray-900">{totalTTC.toFixed(2)} €</span>
            </div>

            <button
              onClick={handleValidateOrder}
              className="w-full py-3 rounded-lg text-white transition-colors flex items-center justify-center gap-2 mb-3"
              style={{ backgroundColor: '#235730' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a4023')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#235730')}
            >
              <CreditCard className="w-5 h-5" />
              Valider la commande
            </button>

            <button
              onClick={() => router.push('/catalogue')}
              className="w-full py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              Continuer mes achats
            </button>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <Check className="w-5 h-5 flex-shrink-0" style={{ color: '#235730' }} />
                <div>
                  <p className="mb-1">Livraison offerte dès 200€ HT</p>
                  <p className="mb-1">Paiement sécurisé</p>
                  <p>Garantie satisfait ou remboursé</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
