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
