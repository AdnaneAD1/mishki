'use client';

import { useState } from 'react';
import { FileCheck, Upload, Plus, Trash2, ShoppingCart, X } from 'lucide-react';

interface SelectedProduct {
  id: string;
  nom: string;
  reference: string;
  quantite: number;
  prixHT: number;
}

const mockProducts = [
  { id: '1', reference: 'CV-PRO-001', nom: 'Crème Visage Pro', prixHT: 45.0 },
  { id: '2', reference: 'SA-PRO-002', nom: 'Sérum Anti-âge', prixHT: 68.0 },
  { id: '3', reference: 'GC-SPA-003', nom: 'Gommage Corps Spa', prixHT: 32.0 },
  { id: '4', reference: 'HM-REL-004', nom: 'Huile Massage Relaxante', prixHT: 42.0 },
  { id: '5', reference: 'MP-PUR-005', nom: 'Masque Purifiant', prixHT: 38.0 },
  { id: '6', reference: 'LT-TON-006', nom: 'Lotion Tonique', prixHT: 28.0 },
];

export default function DemandeDevis() {
  const [formData, setFormData] = useState({
    sujet: '',
    description: '',
    quantiteEstimee: '',
    budget: '',
    dateProjet: '',
    typeProjet: '',
  });

  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addProduct = (product: any) => {
    const existing = selectedProducts.find((p) => p.id === product.id);
    if (existing) {
      setSelectedProducts(
        selectedProducts.map((p) =>
          p.id === product.id ? { ...p, quantite: p.quantite + 1 } : p
        )
      );
    } else {
      setSelectedProducts([
        ...selectedProducts,
        {
          id: product.id,
          nom: product.nom,
          reference: product.reference,
          quantite: 1,
          prixHT: product.prixHT,
        },
      ]);
    }
  };

  const removeProduct = (id: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== id));
  };

  const updateQuantity = (id: string, quantite: number) => {
    if (quantite <= 0) {
      removeProduct(id);
      return;
    }
    setSelectedProducts(
      selectedProducts.map((p) => (p.id === id ? { ...p, quantite } : p))
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map((f) => f.name);
      setUploadedFiles([...uploadedFiles, ...fileNames]);
    }
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter((f) => f !== fileName));
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((sum, p) => sum + p.prixHT * p.quantite, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Demande de devis envoyée avec succès ! Notre équipe reviendra vers vous sous 24-48h.');
    // Reset form
    setFormData({
      sujet: '',
      description: '',
      quantiteEstimee: '',
      budget: '',
      dateProjet: '',
      typeProjet: '',
    });
    setSelectedProducts([]);
    setUploadedFiles([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2 flex items-center gap-2">
          <FileCheck className="w-7 h-7" style={{ color: '#235730' }} />
          Demande de Devis Personnalisé
        </h1>
        <p className="text-gray-600">
          Obtenez un devis sur mesure pour vos projets professionnels
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations générales */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Informations générales</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Sujet de la demande *</label>
                <input
                  type="text"
                  name="sujet"
                  value={formData.sujet}
                  onChange={handleChange}
                  placeholder="Ex: Commande en gros pour nouveau spa"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Type de projet *</label>
                <select
                  name="typeProjet"
                  value={formData.typeProjet}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Sélectionner...</option>
                  <option value="nouvelle_ouverture">Nouvelle ouverture</option>
                  <option value="renouvellement">Renouvellement stock</option>
                  <option value="evenement">Événement spécial</option>
                  <option value="commande_volume">Commande en volume</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Description du projet *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Décrivez votre projet, vos besoins spécifiques, vos contraintes..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Quantité estimée (unités)
                </label>
                <input
                  type="number"
                  name="quantiteEstimee"
                  value={formData.quantiteEstimee}
                  onChange={handleChange}
                  placeholder="100"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Budget estimé (€ HT)</label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="5000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Date souhaitée</label>
                <input
                  type="date"
                  name="dateProjet"
                  value={formData.dateProjet}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sélection produits */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Produits souhaités (optionnel)</h2>
            <button
              type="button"
              onClick={() => setShowProductSelector(!showProductSelector)}
              className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors"
              style={{ backgroundColor: '#235730' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a4023')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#235730')}
            >
              <Plus className="w-4 h-4" />
              Ajouter des produits
            </button>
          </div>

          {showProductSelector && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-3">Sélectionnez des produits du catalogue :</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {mockProducts.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => addProduct(product)}
                    className="text-left px-3 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <p className="text-sm text-gray-900">{product.nom}</p>
                    <p className="text-xs text-gray-500">{product.reference}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedProducts.length > 0 ? (
            <div className="space-y-3">
              {selectedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{product.nom}</p>
                    <p className="text-xs text-gray-500">{product.reference}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      min="1"
                      value={product.quantite}
                      onChange={(e) =>
                        updateQuantity(product.id, parseInt(e.target.value) || 1)
                      }
                      className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-900 w-24 text-right">
                      {(product.prixHT * product.quantite).toFixed(2)} € HT
                    </span>
                    <button
                      type="button"
                      onClick={() => removeProduct(product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total estimatif :</span>
                  <span className="text-xl text-gray-900">{calculateTotal().toFixed(2)} € HT</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              Aucun produit sélectionné. Décrivez vos besoins dans la description ou ajoutez des
              produits.
            </p>
          )}
        </div>

        {/* Upload fichiers */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Documents joints (optionnel)</h2>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                Glissez vos fichiers ici ou cliquez pour parcourir
              </p>
              <p className="text-xs text-gray-500 mb-4">
                PDF, images, documents (max 10 Mo par fichier)
              </p>
              <label className="inline-block px-4 py-2 text-white rounded-lg transition-colors cursor-pointer"
                style={{ backgroundColor: '#235730' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a4023')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#235730')}
              >
                Parcourir
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-700">Fichiers joints :</p>
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-900">{file}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(file)}
                      className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-gray-900 mb-1">Prêt à envoyer votre demande ?</h3>
              <p className="text-sm text-gray-600">
                Notre équipe commerciale vous répondra sous 24-48h ouvrées
              </p>
            </div>
            <button
              type="submit"
              className="whitespace-nowrap px-8 py-3 text-white rounded-lg transition-all flex items-center gap-2"
              style={{ backgroundColor: '#235730' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a4023')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#235730')}
            >
              <FileCheck className="w-5 h-5" />
              Envoyer la demande de devis
            </button>
          </div>
        </div>
      </form>

      {/* Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="text-gray-900 mb-2">⚡ Réponse rapide</h4>
          <p className="text-sm text-gray-600">Devis personnalisé sous 24-48h ouvrées</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="text-gray-900 mb-2">💰 Tarifs négociés</h4>
          <p className="text-sm text-gray-600">Remises spéciales sur les volumes importants</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="text-gray-900 mb-2">🎯 Sur mesure</h4>
          <p className="text-sm text-gray-600">Accompagnement personnalisé de votre projet</p>
        </div>
      </div>
    </div>
  );
}

// Force SSR pour éviter les erreurs de build
export async function getServerSideProps() {
  return { props: {} };
}
