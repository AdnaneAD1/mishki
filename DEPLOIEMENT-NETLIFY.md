# Déploiement Netlify - Mishki Monorepo

## 📦 Deux applications séparées

Le monorepo contient deux applications qui doivent être déployées séparément :

- **B2C** (espace client) → `apps/b2c/`
- **B2B** (espace professionnel) → `apps/b2b/`

---

## 🚀 Méthode 1 : Déploiement via Dashboard Netlify (Recommandé)

### Étape 1 : Préparer le repository
```bash
git add .
git commit -m "Ajout configuration Netlify"
git push origin main
```

### Étape 2 : Créer le site B2C sur Netlify

1. Va sur [netlify.com](https://netlify.com) et connecte-toi
2. Clique sur **"Add new site"** → **"Import an existing project"**
3. Sélectionne **GitHub** et choisis le repo `mishki`
4. **Configuration du build** :
   - **Base directory** : `apps/b2c`
   - **Build command** : `cd ../.. && npm install && npm run build:b2c`
   - **Publish directory** : `apps/b2c/.next`
5. **Variables d'environnement** (optionnel) :
   - `NODE_VERSION` = `18`
6. Clique sur **"Deploy site"**

### Étape 3 : Créer le site B2B sur Netlify

1. Répète le processus pour créer un **deuxième site**
2. **Configuration du build** :
   - **Base directory** : `apps/b2b`
   - **Build command** : `cd ../.. && npm install && npm run build:b2b`
   - **Publish directory** : `apps/b2b/.next`
3. Clique sur **"Deploy site"**

### Étape 4 : Configurer les domaines

- **B2C** : Configure ton domaine principal (ex: `www.mishki.com`)
- **B2B** : Configure un sous-domaine (ex: `pro.mishki.com`)

---

## 🚀 Méthode 2 : Déploiement via CLI Netlify

### Installation
```bash
npm install -g netlify-cli
netlify login
```

### Déployer B2C
```bash
cd apps/b2c
netlify init
# Suis les instructions, choisis :
# - Base directory: apps/b2c
# - Build command: cd ../.. && npm install && npm run build:b2c
# - Publish directory: apps/b2c/.next

netlify deploy --prod
```

### Déployer B2B
```bash
cd apps/b2b
netlify init
# Même processus avec apps/b2b

netlify deploy --prod
```

---

## ⚙️ Configuration des fichiers

Les fichiers `netlify.toml` ont été créés dans :
- `/netlify.toml` (racine - config par défaut)
- `/apps/b2c/netlify.toml` (spécifique B2C)
- `/apps/b2b/netlify.toml` (spécifique B2B)

---

## 📋 Checklist avant déploiement

- [ ] Les deux apps se buildent en local : `npm run build`
- [ ] Les variables d'environnement sont configurées (si nécessaire)
- [ ] Le code est pushé sur GitHub/GitLab
- [ ] Plugin `@netlify/plugin-nextjs` sera installé automatiquement par Netlify

---

## 🔗 URLs après déploiement

Après déploiement, tu auras :
- **B2C** : `https://ton-site-b2c.netlify.app` (ou ton domaine custom)
- **B2B** : `https://ton-site-b2b.netlify.app` (ou ton domaine custom)

Tu pourras ensuite configurer des domaines personnalisés dans le dashboard Netlify.

---

## 🐛 Troubleshooting

### Erreur : "Command failed"
- Vérifie que `npm run build:b2c` et `npm run build:b2b` fonctionnent en local
- Assure-toi que Node 18+ est configuré

### Erreur : "Module not found"
- Netlify doit installer les dépendances depuis la racine avec `npm install`
- Les workspaces sont gérés automatiquement

### Les deux sites partagent le même code
- C'est normal, ils sont dans le même repo
- Netlify build uniquement le dossier spécifié dans `base directory`
