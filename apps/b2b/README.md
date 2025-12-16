This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Identifiants de test (Développement local)

L'application utilise actuellement un système d'authentification mock pour le développement. Vous pouvez vous connecter avec n'importe quel email et mot de passe, mais voici les identifiants de test recommandés :

- **Email** : `test@mishki.com`
- **Mot de passe** : `test123`

L'utilisateur mock créé à la connexion aura les informations suivantes :
- Nom : Dupont
- Prénom : Marie
- Société : Spa Beauté Paris
- SIRET : 12345678900012
- Compte validé : ✅ Oui
- Remise : 15%

> ⚠️ **Note** : Ces identifiants sont uniquement pour le développement local. En production, l'authentification sera connectée à une vraie API.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
