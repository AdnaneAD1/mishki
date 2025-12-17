# 🔐 Système d'Authentification Unifié Mishki

## 🎯 Fonctionnement

### Redirection Automatique selon le Rôle

Lorsqu'un utilisateur se connecte, le système :

1. **Récupère l'utilisateur depuis la base de données** avec son rôle (B2C ou B2B)
2. **Redirige automatiquement** vers l'application appropriée selon le rôle stocké

---

## 👤 Détermination du Rôle

Le rôle de l'utilisateur est **défini lors de l'inscription** et **stocké en base de données**.

### B2B (Espace Professionnel)
- Rôle attribué lors de l'inscription professionnelle
- Nécessite : SIRET, raison sociale, KBIS
- Accès à l'espace professionnel avec tarifs préférentiels

### B2C (Espace Client)
- Rôle attribué lors de l'inscription client
- Particuliers
- Accès à l'espace client standard

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

### Exemple 1 : Client Particulier
```
Inscription → Formulaire client (B2C)
→ Rôle stocké en BDD : 'b2c'
→ Connexion : sophie.martin@gmail.com
→ Redirection : www.mishki.com (B2C)
```

### Exemple 2 : Professionnel - SPA
```
Inscription → Formulaire professionnel (B2B)
→ Documents : SIRET, KBIS
→ Rôle stocké en BDD : 'b2b'
→ Connexion : contact@spa-beaute-paris.fr
→ Redirection : pro.mishki.com (B2B)
```

### Exemple 3 : Professionnel - Institut
```
Inscription → Formulaire professionnel (B2B)
→ Documents : SIRET, KBIS
→ Rôle stocké en BDD : 'b2b'
→ Connexion : marie@institut-harmonie.com
→ Redirection : pro.mishki.com (B2B)
```

---

## 🛠️ Intégration Backend

### Lors de l'inscription
```typescript
// L'utilisateur choisit son type de compte
const user = {
  email: "contact@spa.fr",
  role: "b2b", // Défini selon le formulaire d'inscription
  // ... autres champs
};
await db.users.create(user);
```

### Lors de la connexion
```typescript
// L'API retourne l'utilisateur avec son rôle
const user = await api.login(email, password);
// user.role provient de la base de données
// Redirection automatique selon user.role
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
