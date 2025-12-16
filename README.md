# 🌿 Mishki Monorepo

Monorepo Next.js contenant les applications **B2C** (client final) et **B2B** (professionnels).

---

## 📁 Structure

```
mishki-monorepo/
├── apps/
│   ├── b2c/          # Site grand public
│   └── b2b/          # Portail professionnels
├── packages/         # Code partagé (à venir)
└── package.json
```

---

## 🚀 Démarrage

### Installation
```bash
npm install
```

### Lancer les applications

```bash
# Les deux en même temps
npm run dev

# Une seule
npm run dev:b2c    # B2C sur http://localhost:3000
npm run dev:b2b    # B2B sur http://localhost:3001
```

**Arrêter** : `Ctrl+C`

---

## 📋 Scripts Principaux

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance B2C + B2B simultanément |
| `npm run dev:b2c` | B2C uniquement |
| `npm run dev:b2b` | B2B uniquement |
| `npm run build` | Build des deux apps |
| `npm run clean` | Nettoie node_modules et .next |

---

## 🎯 Applications

### B2C - Grand Public
- URL : `http://localhost:3000`
- Tech : Next.js 16 + React 19 + TailwindCSS
- Fonctionnalités : Catalogue, Blog, Panier

### B2B - Professionnels
- URL : `http://localhost:3001`
- Tech : Next.js 16 + React 19 + TailwindCSS
- Fonctionnalités : Auth, Dashboard, Commandes, Factures

---

## ➕ Ajouter une Application

```bash
# 1. Créer le dossier
mkdir apps/nom-app
cd apps/nom-app

# 2. Initialiser Next.js
npx create-next-app@latest . --typescript --tailwind --app

# 3. Retourner à la racine et installer
cd ../..
npm install

# 4. Ajouter le script dans package.json racine
# "dev:nom-app": "cd apps/nom-app && npm run dev"
```

## 📦 Créer un Package Partagé

```bash
# 1. Créer la structure
mkdir -p packages/shared/src
cd packages/shared

# 2. Créer package.json
echo '{
  "name": "@mishki/shared",
  "version": "1.0.0",
  "main": "./src/index.ts"
}' > package.json

# 3. Créer vos fichiers
# packages/shared/src/types.ts
# packages/shared/src/utils.ts
# packages/shared/src/index.ts (exports)

# 4. Utiliser dans les apps
# import { ... } from '@mishki/shared'
```

---

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [TailwindCSS](https://tailwindcss.com/docs)
- [Turborepo](https://turbo.build/repo/docs)

---

**Version** : 1.0.0  
**Dernière mise à jour** : 16 décembre 2025

