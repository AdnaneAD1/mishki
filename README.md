<div align="center">

# Mishki App (B2C & B2B)

Next.js (App Router) multi-app with Firebase auth/Firestore, i18n (next-intl), Tailwind UI, and seeded demo data for retail (B2C) and pro (B2B).

</div>

## Sommaire
- [Architecture](#architecture)
- [Démarrage](#démarrage)
- [Structure des apps](#structure-des-apps)
- [Auth & accès](#auth--accès)
- [Hooks principaux](#hooks-principaux)
- [Pages clés](#pages-clés)
- [Modèle de données Firestore](#modèle-de-données-firestore)
- [Seeder](#seeder)
- [i18n](#i18n)
- [Règles panier](#règles-panier)
- [Notes dev](#notes-dev)
- [Changements récents](#changements-récents)

## Architecture
- **Framework** : Next.js (App Router).
- **Apps** : `apps/b2c` (retail), `apps/b2b` (pro, routes protégées).
- **Firebase** : auth + Firestore (`packages/firebase` expose `db`, `auth`, helpers).
- **UI** : Tailwind CSS.
- **i18n** : `next-intl`.

## Démarrage
```bash
npm install
npm run dev
# build + start
npm run build && npm run start
```
Ouvrir http://localhost:3000.

## Structure des apps
```
apps/
  b2c/
    app/produits/page.tsx      # listing produits, filtres localisés
    app/panier/page.tsx        # panier retail (localStorage)
    lib/cart-context.tsx       # contexte panier B2C
  b2b/
    pages/CommandeRapide.tsx   # commande rapide, min qty 100, refs communes
    pages/CataloguePro.tsx     # catalogue pro
    pages/Protocoles.tsx       # liste fiches + rituels
    pages/RituelCabine.tsx     # détail rituel
    pages/FicheTechnique.tsx   # détail fiche technique
    pages/Telechargements.tsx  # assets téléchargeables
    pages/ReassortAuto.tsx     # configs réassort auto (CRUD Firestore)
    pages/FacturesPro.tsx      # factures depuis payments/orders + PDF FR/PE
    context/AuthContext.tsx    # auth B2B
    context/CartContext.tsx    # panier B2B (min 100)
    hooks/useProductsB2B.ts
    hooks/useProtocolesB2B.ts
    hooks/useDownloadsB2B.ts
    hooks/useReassortB2B.ts
    hooks/useInvoicesB2B.ts
packages/firebase/             # init client Firebase + helpers
src/app/api/seed/route.ts      # seeder Firestore
```

## Auth & accès
- Firebase Auth.
- B2B protégé : role `b2b` + `validated` requis (sinon redirections login/home/validation).

## Hooks principaux
- `useProductsB2B` : produits Firestore, noms/catégories localisés.
- `useProtocolesB2B` : liste protocoles + détail rituel/fiche avec fallback locale.
- `useDownloadsB2B` : assets téléchargeables B2B avec fallback locale.
- `useReassortB2B` : configs réassort auto (CRUD), historique et stats, sélection produit par liste Firestore.
- `useInvoicesB2B` : factures depuis `payments` + `orders`, dérive produits, filtres statut/mois, sélection PDF FR/PE par locale.

## Pages clés
- **B2C** : `produits` (filtres localisés, add to cart), `panier` (CRUD panier).
- **B2B** :
  - `CommandeRapide` : min qty 100, références communes depuis commandes user, quick-pick ajoute ligne si besoin.
  - `CataloguePro` : grid/list, filtres.
  - `Protocoles` / `RituelCabine` / `FicheTechnique` : Firestore, locale fallback, slugs pour navigation.
  - `Telechargements` : Firestore `downloadsB2B`, filtres type/catégorie, favoris locaux, stats, loading/erreur.
  - `ReassortAuto` : configs de réassort auto (CRUD Firestore, modal avec sélection produit), historique et stats.
  - `FacturesPro` : factures Firestore (`payments` + `orders`), filtres recherche/statut/mois, badges statut, PDF FR ou PE selon locale.

## Modèle de données Firestore
- **products**
  - `slug`, `category`, `price`, `image`, `volume?`, `inStock?`
  - `defaultLocale?`, `translations[locale]{name, desc, category}`
- **blogPosts**
  - `slug`, `image`, `date`, `readTime`, `category`
  - `author{name, role, avatar}`, `related[]`
  - `translations[locale]{title, excerpt, content[]}`
- **podcasts**
  - `slug`, `image`, `date`, `duration`, `guest`
  - `translations[locale]{title, description, guest_title}`
- **rituelsB2B**
  - `slug`, `reference`, `category`, `image`, `theme`, `ambiance`, `duration`
  - `preparation{cabine[], materiel[], produits[]}`
  - `deroulement[{phase,duree,description,actions[]}]`
  - `retail[]`, `notes[]`, `defaultLocale?`
  - `translations[locale]{title,introduction,theme,ambiance,category,duration,preparation,deroulement,retail,notes}`
- **fichesTechniquesB2B**
  - `slug`, `reference`, `category`, `extraction`, `volume`, `image`, `description`
  - `proprietes[]`, `actifs[{nom,role}]`
  - `utilisation{frequence,methode,temps,retrait}`
  - `caracteristiques{texture,odeur,ph,conservation}`
  - `avis_experts`, `defaultLocale?`
  - `translations[locale]{title,description,reference,category,extraction,volume,proprietes,actifs,utilisation,caracteristiques,avis_experts}`
- **downloadsB2B**
  - `slug`, `type` (image|pdf|video), `category`, `format`, `size`, `url`, `defaultLocale?`
  - `translations[locale]{title}`
- **reassortConfigsB2B**
  - `productSlug`, `productName`, `productRef`, `frequency`, `quantity`, `unit`, `active`, `createdAt`, `updatedAt`, `userId`
- **reassortHistoryB2B**
  - `configId`, `status`, `quantity`, `unit`, `createdAt`
- **notificationsB2B**
  - `title`, `description`, `time`, `type` (`info`|`warning`|`success`)
- **quoteRequestsB2B** (Demande de devis)
  - `form{subject,type,date?,description,quantity?,budget?}`
  - `products[{id,nom,reference,prixHT,quantite}]`
  - `totalHT`, `totalTTC`
  - `attachments[{id,name,size,status,url?,error?}]`
  - `submittedAt`, `status` (`pending` par défaut)
- **orders** (utilisé pour références communes B2B et factures)
  - `userId`, `createdAt`, `lines[{name,quantity,slug?}]`, métadonnées commande.
- **payments** (lié à `orders`)
  - `orderId`, `amountHT`, `amountTTC`, `status` (`payee`|`en_attente`|`retard`), `dueDate`, `createdAt`, `pdfFranceUrl?`, `pdfPeruUrl?`
- **users** : inclut `role` et `validated`.

### Autres collections mentionnées (non seedées ici)
- **orders** : historique commandes (B2B) pour références communes/quick-pick. Stockage attendu : lignes produit (slug/quantité) + `userId` + métadonnées commande.
- **payments** (évoquée comme table séparée) : suivi des paiements liés aux commandes.
- **users** : profil auth Firebase, rôle (`b2b`/`b2c`), champ `validated` (contrôle d’accès B2B). Cette collection existe mais n’est pas peuplée par le seeder.

## Seeder
- Endpoint `POST /api/seed` (`src/app/api/seed/route.ts`).
- Remplit : `products`, `blogPosts`, `podcasts`, `rituelsB2B`, `fichesTechniquesB2B`, `downloadsB2B`, `reassortConfigsB2B`, `reassortHistoryB2B`.
- Utilise batch Firestore + `duplicateLocales` (FR cloné sur autres locales). Pas de collection “protocoles” dérivée (on utilise fiches/rituels).

## i18n
- `next-intl` pour libellés UI.
- Fallback locale côté hooks : `defaultLocale` du document ou `fr`.
- Catégories affichées via labels traduits (B2C/B2B).

## Règles panier
- **B2C** : panier localStorage, quantités libres.
- **B2B** : panier localStorage, min 100 sur add/update. CommandeRapide force le clamp et ajoute une ligne si aucune libre pour quick-pick.

## Notes dev
- Avertissement lint Tailwind préexistant dans `apps/b2c/app/globals.css` (at-rules @tailwind) — inchangé.
- URLs protocoles utilisent `slug` (pas d’id).

## Changements récents
- Prix/HT/TTC formatés via `Intl.NumberFormat(locale, EUR)` avec libellés HT/TTC localisés (FR/ES/default) sur B2B (CommandeRapide, Panier, CataloguePro, FacturesPro) et B2C (produits, panier, paiement).
- Badge panier B2B affiche le nombre de lignes (produits distincts) et non plus la somme des quantités.
- Pages B2C affichent désormais les prix produits dans les listings/sections (produits + products-section) avec formatage i18n.
- Incrément/décrément de quantité dans CommandeRapide par pas de 1 (plancher 100), pour éviter des sauts de 100.
- ReassortAuto formatte aussi les montants selon la locale (formatter partagé, labels HT/TTC gérés via libellés spécifiques).
