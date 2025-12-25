# 🔐 Comptes de Test - Mishki

## 📌 Comptes disponibles

### 👤 Compte B2C (Client particulier)
- **Email**: `client@mishki.com`
- **Mot de passe**: `ClientMishki2025!`
- **Accès**: Site B2C - Boutique, Blog, Rituels, Podcast

### 🏢 Compte B2B (Professionnel)
- **Email**: `pro@mishki.com`
- **Mot de passe**: `ProMishki2025!`
- **Statut**: ✅ **Validé automatiquement** (compte de test)
- **Remise**: 15%
- **Accès**: Site B2B - Catalogue Pro, Commandes, Factures, Protocoles

---

## 🚀 Comment créer ces comptes automatiquement

### ✨ Méthode automatique avec le Seeder (Recommandé)

1. **Activer le seeder** dans `.env` :
   ```bash
   NEXT_PUBLIC_ENABLE_SEED=true
   ```

2. **Lancer l'application** :
   ```bash
   npm run dev
   ```

3. **Aller sur la page de login** :
   ```
   http://localhost:3000/login
   ```

4. **Cliquer sur "Lancer le seeder"**
   - Le seeder va créer automatiquement :
     - ✅ 2 utilisateurs (B2C + B2B) dans Firebase Auth
     - ✅ 2 documents dans Firestore `users` collection avec le bon `role`
     - ✅ **Le compte B2B est validé automatiquement** (`validated: true`)
     - ✅ Remise professionnelle de 15% pour le compte B2B
     - ✅ Toutes les données (produits, blog, rituels, podcasts, etc.)

5. **Se connecter** avec un des comptes ci-dessus
   - La redirection se fera automatiquement selon le rôle

---

## 🔧 Méthode manuelle (Alternative)

### Via l'interface
1. Aller sur `http://localhost:3000/inscription` ou `/inscription-pro`
2. Créer le compte avec l'email et mot de passe ci-dessus
3. Dans Firebase Console → Firestore → collection `users`
4. Trouver le document créé et ajouter le champ `role`:
   - `role: "b2c"` pour le compte client
   - `role: "b2b"` pour le compte pro

### Via Firebase Auth directement
1. Aller dans Firebase Console → Authentication
2. Cliquer sur "Add user"
3. Entrer email et mot de passe
4. Dans Firestore → `users` → créer un document avec l'UID du user
5. Ajouter les champs:
   ```json
   {
     "email": "client@mishki.com",
     "role": "b2c",
     "displayName": "Client Test B2C",
     "createdAt": "2025-12-25T00:00:00.000Z"
   }
   ```

---

## ⚠️ IMPORTANT

- **Ne JAMAIS commit ce fichier** avec des vrais mots de passe en production
- Ces comptes sont pour le **développement local uniquement**
- En production, utilisez des mots de passe forts et uniques
- Le fichier est déjà dans `.gitignore`

---

## 🔄 Redirection automatique

Le système détecte automatiquement le rôle de l'utilisateur :
- Si `role === "b2c"` → Redirige vers `/` (B2C)
- Si `role === "b2b"` → Redirige vers `/accueil-pro` (B2B)

La détection se fait via le champ `role` stocké dans Firestore (`users` collection).
