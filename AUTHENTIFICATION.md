# 🔐 Système d'Authentification Unifié Mishki

## 🎯 Fonctionnement

### Redirection Automatique selon le Rôle

Lorsqu'un utilisateur se connecte, le système :

1. **Analyse l'email** pour déterminer le rôle (B2C ou B2B)
2. **Redirige automatiquement** vers l'application appropriée

---

## 📧 Détection du Rôle par Email

### B2B (Espace Professionnel)
Un utilisateur est redirigé vers l'espace professionnel si son email contient :
- `spa` (ex: `contact@spa-zen.fr`)
- `institut` (ex: `marie@institut-beaute.com`)
- `salon` (ex: `admin@salon-coiffure.fr`)
- `beaute`, `esthetique`
- `pro` (ex: `service@mishki-pro.com`)
- `enterprise`, `company`

### B2C (Espace Client)
Tous les autres emails - particuliers (ex: `sophie@gmail.com`)

---

## 🔀 Redirections

### En Développement (localhost)

| Rôle | Redirection |
|------|-------------|
| B2C  | `http://localhost:3003/` |
| B2B  | `http://localhost:3004/accueil` |

### En Production

| Rôle | Redirection |
|------|-------------|
| B2C  | `https://www.mishki.com/` |
| B2B  | `https://pro.mishki.com/accueil` |

---

## 💡 Exemples d'Utilisation

### Exemple 1 : Email Grand Public
```
Email : sophie.martin@gmail.com
→ Rôle détecté : B2C
→ Redirection : www.mishki.com (B2C)
```

### Exemple 2 : Email Professionnel - SPA
```
Email : contact@spa-beaute-paris.fr
→ Rôle détecté : B2B (contient "spa")
→ Redirection : pro.mishki.com (B2B)
```

### Exemple 3 : Email Professionnel - Institut
```
Email : marie@institut-harmonie.com
→ Rôle détecté : B2B (contient "institut")
→ Redirection : pro.mishki.com (B2B)
```

---

## 🛠️ Personnaliser la Détection

Pour modifier la logique de détection, éditer :
`packages/shared/src/utils/auth.ts`

```typescript
export function getUserRole(email: string): 'b2c' | 'b2b' {
  // Votre logique personnalisée
  
  // Option 1 : Par domaine
  const businessDomains = ['spa', 'institut', 'salon', ...];
  
  // Option 2 : Vérification en base de données (recommandé en prod)
  // const user = await db.users.findByEmail(email);
  // return user.role;
  
  // Option 3 : Liste blanche d'emails
  // const b2bEmails = ['admin@mishki.com', ...];
  // return b2bEmails.includes(email) ? 'b2b' : 'b2c';
}
```

---

## 🔒 Sécurité

### ⚠️ Important

La détection par email est **temporaire** et **peu sécurisée**.

### ✅ En Production

**Utiliser une vérification backend :**

```typescript
export async function getUserRole(email: string): Promise<'b2c' | 'b2b'> {
  // Appel API backend
  const response = await fetch('/api/auth/get-user-role', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  
  const { role } = await response.json();
  return role;
}
```

**Avec Supabase :**

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUserRole(email: string): Promise<'b2c' | 'b2b'> {
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('email', email)
    .single();
    
  if (error) throw error;
  return data.role;
}
```

---

## 🧪 Tests

### Tester la Redirection B2C
```
Email : test@gmail.com
Mot de passe : (n'importe quoi en mock)
→ Devrait rediriger vers localhost:3003
```

### Tester la Redirection B2B
```
Email : test@spa-beaute.fr
Mot de passe : (n'importe quoi en mock)
→ Devrait rediriger vers localhost:3004/accueil
```

---

## 📝 Todo - Améliorations Futures

- [ ] Remplacer la détection par email par une vérification backend
- [ ] Ajouter JWT pour sécuriser les sessions
- [ ] Implémenter SSO (Single Sign-On) entre B2C et B2B
- [ ] Logger les tentatives de connexion
- [ ] Ajouter rate limiting (limite de tentatives)

---

**Dernière mise à jour** : 16 décembre 2025
