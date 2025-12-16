export function getUserRole(email: string): 'b2c' | 'b2b' {
  // Logique pour déterminer le rôle
  // B2B: Espace professionnel (spa, instituts, salons, entreprises)
  // B2C: Espace client (particuliers)
  // Pour l'instant, on utilise le domaine de l'email
  // Vous pouvez aussi vérifier en base de données
  
  const businessDomains = [
    'spa',
    'institut',
    'salon',
    'beaute',
    'esthetique',
    'pro',
    'enterprise',
    'company',
  ];
  
  const emailDomain = email.split('@')[1]?.toLowerCase() || '';
  
  // Vérifie si le domaine contient des mots-clés pro
  const isBusinessEmail = businessDomains.some(keyword => 
    emailDomain.includes(keyword)
  );
  
  return isBusinessEmail ? 'b2b' : 'b2c';
}

export function getRedirectUrl(role: 'b2c' | 'b2b', currentDomain: string): string {
  if (role === 'b2b') {
    // Redirige vers le portail B2B
    if (currentDomain.includes('localhost')) {
      return 'http://localhost:3004/accueil'; // Port B2B en dev
    }
    return 'https://pro.mishki.com/accueil';
  } else {
    // Redirige vers le site B2C
    if (currentDomain.includes('localhost')) {
      return 'http://localhost:3003/'; // Port B2C en dev
    }
    return 'https://www.mishki.com/';
  }
}
