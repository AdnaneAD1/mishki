# @mishki/shared

Package partagé contenant les composants, types et utilitaires communs aux applications B2C et B2B.

## 📦 Contenu

### Composants

#### `LoginForm`
Formulaire de connexion réutilisable et personnalisable.

```tsx
import { LoginForm } from '@mishki/shared';

<LoginForm
  onLogin={async (email, password) => {
    // Votre logique de connexion
  }}
  redirectUrl="/dashboard"
  logoSrc="/logo.png"
  title="Bienvenue"
  subtitle="Connectez-vous"
  showB2BInfo={false}
  primaryColor="#235730"
  backgroundColor="#F7F0E0"
/>
```

**Props :**
- `onLogin` : Fonction async de connexion
- `isLoading?` : État de chargement externe
- `error?` : Message d'erreur externe
- `redirectUrl?` : URL de redirection après login (défaut: `/accueil`)
- `logoSrc?` : Chemin du logo (défaut: `/images/logo-mishki.png`)
- `title?` : Titre du formulaire (défaut: `Espace Professionnel`)
- `subtitle?` : Sous-titre (défaut: `Connectez-vous à votre compte`)
- `showB2BInfo?` : Afficher l'info B2B (défaut: `true`)
- `primaryColor?` : Couleur principale (défaut: `#235730`)
- `backgroundColor?` : Couleur de fond (défaut: `#F7F0E0`)

### Types

#### `User`
```typescript
interface User {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: 'b2c' | 'b2b';
  validated?: boolean;
  remise?: number;
  societe?: string;
  siret?: string;
}
```

#### `AuthContextType`
```typescript
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}
```

## 🔧 Utilisation dans les apps

### Configuration TypeScript

Dans `tsconfig.json` de votre app :

```json
{
  "compilerOptions": {
    "paths": {
      "@mishki/shared": ["../../packages/shared/src"]
    }
  }
}
```

### Import

```tsx
import { LoginForm, User, AuthContextType } from '@mishki/shared';
```

## ➕ Ajouter du contenu

1. Créer le fichier dans `src/`
2. L'exporter dans `src/index.ts`
3. Utiliser dans vos apps

Exemple :
```typescript
// src/utils/formatPrice.ts
export function formatPrice(price: number, isB2B: boolean) {
  return isB2B ? `${price.toFixed(2)} € HT` : `${price.toFixed(2)} €`;
}

// src/index.ts
export { formatPrice } from './utils/formatPrice';
```
