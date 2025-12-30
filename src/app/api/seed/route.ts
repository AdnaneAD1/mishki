'use server';

import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@mishki/firebase/admin';
import fr from '@/public/locales/fr/common.json';

const ENABLE_SEED = process.env.NEXT_PUBLIC_ENABLE_SEED === 'true';
const SUPPORTED_LOCALES = ['fr', 'en', 'es-PE'] as const;
const frLocale = fr as typeof fr;

type Locale = (typeof SUPPORTED_LOCALES)[number];

type Product = {
  slug: string;
  category: string;
  price: number;
  image: string;
  volume?: string;
  stock?: number;
  translations: Record<Locale, {
    name: string;
    desc: string;
    long_desc: string;
    category: string;
    usage?: string;
    ingredient_base?: string;
  }>;
  deliveryDays?: { min: number; max: number };
};

type BlogPost = {
  slug: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  related: string[];
  author: { name: string; role: string; avatar: string };
  translations: Record<Locale, { title: string; excerpt: string; content: string[] }>;
};

type Ritual = {
  slug: string;
  image: string;
  products: string[];
  translations: Record<
    Locale,
    {
      title: string;
      subtitle: string;
      description: string;
      duration: string;
      difficulty: string;
      full_desc: string;
      steps: { name: string; desc: string }[];
      tips: string[];
    }
  >;
};

type DownloadAssetB2B = {
  slug: string;
  type: 'image' | 'pdf' | 'video';
  category: string;
  format: string;
  size: string;
  url: string;
  translations: Record<
    Locale,
    {
      title: string;
    }
  >;
  defaultLocale?: Locale;
};

type Podcast = {
  slug: string;
  image: string;
  date: string;
  duration: string;
  guest: string;
  translations: Record<
    Locale,
    {
      title: string;
      description: string;
      guest_title: string;
    }
  >;
};

// --- B2B Protocoles ---
type ProtocoleB2B = {
  slug: string;
  type: 'fiche' | 'rituel';
  category: string;
  duration: string;
  image: string;
  translations: Record<
    Locale,
    {
      title: string;
      description: string;
    }
  >;
};

type RituelB2B = {
  slug: string;
  reference: string;
  category: string;
  image: string;
  theme: string;
  ambiance: string;
  duration: string;
  preparation: {
    cabine: string[];
    materiel: string[];
    produits: string[];
  };
  deroulement: {
    phase: string;
    duree: string;
    description: string;
    actions: string[];
  }[];
  retail: string[];
  notes: string[];
  translations: Record<
    Locale,
    {
      title: string;
      introduction: string;
      theme: string;
      ambiance: string;
      category: string;
      duration: string;
      preparation: RituelB2B['preparation'];
      deroulement: RituelB2B['deroulement'];
      retail: string[];
      notes: string[];
    }
  >;
};

type FicheB2B = {
  slug: string;
  reference: string;
  category: string;
  extraction: string;
  volume: string;
  image: string;
  description: string;
  proprietes: string[];
  actifs: { nom: string; role: string }[];
  utilisation: {
    frequence: string;
    methode: string;
    temps: string;
    retrait: string;
  };
  caracteristiques: {
    texture: string;
    odeur: string;
    ph: string;
    conservation: string;
  };
  avis_experts: string;
  translations: Record<
    Locale,
    {
      title: string;
      description: string;
      category: string;
      reference: string;
      extraction: string;
      volume: string;
      proprietes: string[];
      actifs: { nom: string; role: string }[];
      utilisation: FicheB2B['utilisation'];
      caracteristiques: FicheB2B['caracteristiques'];
      avis_experts: string;
    }
  >;
};

function duplicateLocales<T>(frData: T): Record<Locale, T> {
  return SUPPORTED_LOCALES.reduce((acc, locale) => {
    acc[locale] = frData;
    return acc;
  }, {} as Record<Locale, T>);
}

function buildProducts(): Product[] {
  const productsData = [
    // Soins du corps
    {
      id: "SC-SE-150",
      name: {
        fr: "Savon exfoliant",
        en: "Exfoliating Soap",
        "es-PE": "Jabón Exfoliante"
      },
      category: {
        fr: "Soins du corps",
        en: "Body Care",
        "es-PE": "Cuidado del Cuerpo"
      },
      volume: "150g",
      desc: {
        fr: "À base de la graine d'Ungurahui - fruit de l'Amazonie péruvienne",
        en: "Based on Ungurahui seed - fruit from the Peruvian Amazon",
        "es-PE": "A base de semilla de Ungurahui - fruto de la Amazonía peruana"
      },
      long_desc: {
        fr: "Savon exfoliant contenant la graine du fruit d'ungurahui - Oenocarpus bataua l. provenant de la forêt Amazonienne Péruvienne. Il nettoie et exfolie en douceur. Grâce à sa formule idéale, il n'irrite pas et se rince facilement. Il laisse la peau sans impuretés et douce de manière naturelle.",
        en: "Exfoliating soap containing the seed of the ungurahui fruit - Oenocarpus bataua l. from the Peruvian Amazon forest. It gently cleanses and exfoliates. Thanks to its ideal formula, it does not irritate and rinses easily. It leaves the skin free of impurities and naturally soft.",
        "es-PE": "Jabón exfoliante que contiene la semilla del fruto de ungurahui - Oenocarpus bataua l. proveniente de la selva amazónica peruana. Limpia y exfolia suavemente. Gracias a su fórmula ideal, no irrita y se aclara fácilmente. Deja la piel libre de impurezas y suave de forma natural."
      },
      usage: {
        fr: "Appliquer un peu de savon exfoliant sur la peau humide du corps et masser doucement du bout des doigts d'un mouvement circulaire ascendant pour raffermir la peau. Rincer avec de l'eau et sécher le visage. Après chaque utilisation, bien refermer le tube et le protéger de la chaleur et de la lumière.",
        en: "Apply a small amount of exfoliating soap to damp body skin and gently massage with fingertips in an upward circular motion to firm the skin. Rinse with water and pat dry. After each use, close the tube tightly and protect it from heat and light.",
        "es-PE": "Aplicar un poco de jabón exfoliante sobre la piel húmeda del cuerpo y masajear suavemente con las yemas de los dedos con un movimiento circular ascendente para reafirmar la piel. Enjuagar con agua y secar. Después de cada uso, cerrar bien el tubo y protegerlo del calor y la luz."
      },
      ingredient_base: {
        fr: "L'ungurahui est un fruit péruvien provenant d'un palmier de l'Amazonie. Après en avoir extrait l'huile, la graine est moulue suivant une récolte sauvage biologique.",
        en: "Ungurahui is a Peruvian fruit from an Amazonian palm tree. After extracting the oil, the seed is ground following an organic wild harvest.",
        "es-PE": "El ungurahui es un fruto peruano que proviene de una palmera de la Amazonía. Tras extraer el aceite, la semilla se muele siguiendo una recolección silvestre orgánica."
      },
      price: 18,
      stock: 45
    },
    {
      id: "SC-CH-150",
      name: {
        fr: "Crème corporelle hydratante",
        en: "Moisturizing Body Cream",
        "es-PE": "Crema Corporal Hidratante"
      },
      category: {
        fr: "Soins du corps",
        en: "Body Care",
        "es-PE": "Cuidado del Cuerpo"
      },
      volume: "150g",
      desc: {
        fr: "À base d'huile de Muña des Andes Péruviennes",
        en: "Based on Muña oil from the Peruvian Andes",
        "es-PE": "A base de aceite de Muña de los Andes peruanos"
      },
      long_desc: {
        fr: "Crème corporelle hydratante qui offre des actifs antioxydants présents dans l’huile essentielle de Muña, Satureja, provenant des Andes Péruviennes, lesquels améliorent l’état de la peau. Sa formule idéale garantit une absorption rapide, hydratant la peau tout en lui donnant élasticité et douceur, sans laisser de film gras. La crème offre une sensation de fraîcheur.",
        en: "Moisturizing body cream that provides antioxidant active ingredients present in the essential oil of Muña, Satureja, from the Peruvian Andes, which improve skin condition. Its ideal formula guarantees rapid absorption, moisturizing the skin while giving it elasticity and softness, without leaving a greasy film. The cream offers a feeling of freshness.",
        "es-PE": "Crema corporal hidratante que aporta activos antioxidantes presentes en el aceite esencial de Muña, Satureja, procedente de los Andes peruanos, que mejoran el estado de la piel. Su fórmula ideal garantiza una rápida absorción, hidratando la piel a la vez que le aporta elasticidad y suavidad, sin dejar película grasa. La crema ofrece una sensación de frescor."
      },
      usage: {
        fr: "Appliquer sur le corps propre une légère couche de crème et masser doucement du bout des doigts, d'un mouvement circulaire ascendant pour raffermir la peau. Après chaque utilisation, bien refermer le tube et le protéger de la chaleur et de la lumière.",
        en: "Apply a thin layer of cream to clean body and gently massage with fingertips in an upward circular motion to firm the skin. After each use, close the tube tightly and protect it from heat and light.",
        "es-PE": "Aplicar una fina capa de crema sobre el cuerpo limpio y masajear suavemente con las yemas de los dedos, con un movimiento circular ascendente para reafirmar la piel. Después de cada uso, cerrar bien el tubo y protegerlo del calor y la luz."
      },
      ingredient_base: {
        fr: "La muña est une plante des Andes Péruviennes de laquelle on extrait une huile essentielle et une eau, lesquelles contiennent des agents antioxydants et antibactériens. Cette plante sauvage ou cultivée de manière biologique suit un processus d’extraction par distillation par entraînement à la vapeur d’eau.",
        en: "Muña is a plant from the Peruvian Andes from which an essential oil and a water are extracted, which contain antioxidant and antibacterial agents. This wild or organically cultivated plant follows an extraction process by steam distillation.",
        "es-PE": "La muña es una planta de los Andes peruanos de la que se extrae un aceite esencial y un agua, que contienen agentes antioxidantes y antibacterianos. Esta planta silvestre o cultivada orgánicamente sigue un proceso de extracción por destilación al vapor."
      },
      price: 22,
      stock: 40
    },
    {
      id: "SC-AN-000",
      name: {
        fr: "Argiles naturelles",
        en: "Natural Clays",
        "es-PE": "Arcillas Naturales"
      },
      category: {
        fr: "Soins du corps",
        en: "Body Care",
        "es-PE": "Cuidado del Cuerpo"
      },
      volume: "-",
      desc: {
        fr: "Des Andes Péruviennes.",
        en: "From the Peruvian Andes.",
        "es-PE": "De los Andes Peruanos."
      },
      long_desc: {
        fr: "Source naturelle d’oligo-éléments et de minéraux pour la peau. Elles sont recommandées pour les peaux mixtes ou sensibles (jaune) ou grasses (noire). Elles offrent un nettoyage doux en profondeur. Les argiles des Andes Péruviennes proviennent du sol de façon naturelle.",
        en: "Natural source of trace elements and minerals for the skin. They are recommended for mixed or sensitive skin (yellow) or oily skin (black). They offer gentle deep cleansing. Clays from the Peruvian Andes come from the soil naturally.",
        "es-PE": "Fuente natural de oligoelementos y minerales para la piel. Están recomendadas para pieles mixtas o sensibles (amarilla) o grasas (negra). Ofrecen una limpieza profunda y suave. Las arcillas de los Andes peruanos proceden del suelo de forma natural."
      },
      usage: {
        fr: "Mélanger 1 dose d’argile pour 2 doses d’eau et l’appliquer sur le corps. Laisser agir de 8 à 14 minutes et retirer avec de l’eau. Après chaque utilisation, bien refermer le paquet et le protéger de l’humidité.",
        en: "Mix 1 part clay with 2 parts water and apply to the body. Leave on for 8 to 14 minutes and remove with water. After each use, close the package tightly and protect it from humidity.",
        "es-PE": "Mezclar 1 parte de arcilla por 2 partes de agua y aplicar sobre el cuerpo. Dejar actuar de 8 a 14 minutos y retirar con agua. Después de cada uso, cerrar bien el envase y protegerlo de la humedad."
      },
      ingredient_base: {
        fr: "Argiles naturelles des Andes Péruviennes.",
        en: "Natural clays from the Peruvian Andes.",
        "es-PE": "Arcillas naturales de los Andes Peruanos."
      },
      price: 15,
      stock: 60
    },
    {
      id: "SC-EN-000",
      name: {
        fr: "Éponge naturelle",
        en: "Natural Sponge",
        "es-PE": "Esponja Natural"
      },
      category: {
        fr: "Soins du corps",
        en: "Body Care",
        "es-PE": "Cuidado del Cuerpo"
      },
      volume: "-",
      desc: {
        fr: "De l’Amazonie Péruvienne",
        en: "From the Peruvian Amazon",
        "es-PE": "De la Amazonía Peruana"
      },
      long_desc: {
        fr: "La luffa, (L. aegyptiaca) est une éponge naturelle de grande qualité pour exfolier le corps. Il s’agit d’une plante grimpante tropicale et sous-tropicale qui provient de l’Amazonie Péruvienne. Sa popularité est née dès le début de son utilisation dans l’élaboration des éponges exfoliantes.",
        en: "Luffa, (L. aegyptiaca) is a high-quality natural sponge for exfoliating the body. It is a tropical and sub-tropical climbing plant that comes from the Peruvian Amazon. Its popularity was born from the beginning of its use in the creation of exfoliating sponges.",
        "es-PE": "La luffa, (L. aegyptiaca) es una esponja natural de gran calidad para exfoliar el cuerpo. Se trata de una planta trepadora tropical y subtropical que procede de la Amazonía peruana. Su popularidad nació desde el inicio de su uso en la elaboración de esponjas exfoliantes."
      },
      usage: {
        fr: "Appliquer sur le corps l’exfoliant Mishki et masser doucement avec l’éponge humide, d'un mouvement circulaire ascendant pour raffermir la peau. Après chaque utilisation, bien laver l’éponge et la protéger de l’humidité.",
        en: "Apply Mishki exfoliant to the body and massage gently with a damp sponge in an upward circular motion to firm the skin. After each use, wash the sponge well and protect it from humidity.",
        "es-PE": "Aplicar el exfoliante Mishki sobre el cuerpo y masajear suavemente con la esponja húmeda, con un movimiento circular ascendente para reafirmar la piel. Después de cada uso, lavar bien la esponja y protegerla de la humedad."
      },
      price: 12,
      stock: 100
    },
    // Soins du cheveu
    {
      id: "SCH-SG-250",
      name: {
        fr: "Shampooing pour cheveux gras",
        en: "Shampoo for Oily Hair",
        "es-PE": "Champú para Cabello Graso"
      },
      category: {
        fr: "Soins du cheveu",
        en: "Hair Care",
        "es-PE": "Cuidado del Cabello"
      },
      volume: "250ml",
      desc: {
        fr: "À base de muña, une plante de la Sierra péruvienne, et de castaña",
        en: "Based on muña, a plant from the Peruvian Sierra, and castaña",
        "es-PE": "A base de muña, una planta de la Sierra peruana y castaña"
      },
      long_desc: {
        fr: "Grâce à la castaña qui contient des acides gras comme le palmitique, les omégas 6 et 9; et la muña qui fournit des antioxydants, ce shampoing aidera à réduire la sensibilité du cuir chevelu, tandis qu'il renforcera et hydratera les cheveux, les laissant brillants.",
        en: "Thanks to castaña which contains fatty acids like palmitic, omegas 6 and 9; and muña which provides antioxidants, this shampoo will help reduce scalp sensitivity while strengthening and moisturizing the hair, leaving it shiny.",
        "es-PE": "Gracias a la castaña que contiene ácidos grasos como el palmítico, omegas 6 y 9; y la muña que aporta antioxidantes, este champú ayudará a reducir la sensibilidad del cuero cabelludo, a la vez que fortalecera e hidratara el cabello, dejándolo brillante."
      },
      price: 24,
      stock: 40
    },
    {
      id: "SCH-SS-250",
      name: {
        fr: "Shampooing pour cheveux secs",
        en: "Shampoo for Dry Hair",
        "es-PE": "Champú para Cabello Seco"
      },
      category: {
        fr: "Soins du cheveu",
        en: "Hair Care",
        "es-PE": "Cuidado del Cabello"
      },
      volume: "250ml",
      desc: {
        fr: "À base d'ungurahui, plante de la jungle péruvienne et de castaña",
        en: "Based on ungurahui, a plant from the Peruvian jungle, and castaña",
        "es-PE": "A base de ungurahui, planta de la selva peruana y castaña"
      },
      long_desc: {
        fr: "Grâce à la castaña et à l'ungurahui qui contiennent des acides gras comme le palmitique, les omégas 3, 6 et 9 ; ce shampoing renforcera et hydratera les cheveux, les laissant brillants.",
        en: "Thanks to castaña and ungurahui which contain fatty acids like palmitic, omegas 3, 6 and 9; this shampoo will strengthen and moisturize the hair, leaving it shiny.",
        "es-PE": "Gracias a la castaña y al ungurahui que contienen ácidos grasos como el palmítico, omegas 3, 6 y 9 ; este champú fortalecerá e hidratará el cabello, dejándolo brillante."
      },
      price: 24,
      stock: 35
    },
    {
      id: "SCH-HC-100",
      name: {
        fr: "Huile de Castaña",
        en: "Castaña Oil",
        "es-PE": "Aceite de Castaña"
      },
      category: {
        fr: "Soins du cheveu",
        en: "Hair Care",
        "es-PE": "Cuidado del Cabello"
      },
      volume: "100ml",
      desc: {
        fr: "De l'Amazonie péruvienne",
        en: "From the Peruvian Amazon",
        "es-PE": "De la Amazonía peruana"
      },
      long_desc: {
        fr: "L'huile de castaña aide à hydrater les cheveux secs et fins et à les rendre brillants. L'huile de castaña contient des omégas 6 et 9 qui agissent comme antioxydant et protègent les cheveux des radicaux libres. Et des acides palmitiques.",
        en: "Castaña oil helps to moisturize dry and fine hair and make it shiny. Castaña oil contains omegas 6 and 9 which act as antioxidants and protect hair from free radicals. And palmitic acids.",
        "es-PE": "El aceite de castaña ayuda a hidratar los cabellos secos y finos y a darles brillo. El aceite de castaña contiene omegas 6 y 9 que actúan como antioxidantes y protegen el cabello de los radicales libres. Y de los ácidos palmíticos."
      },
      ingredient_base: {
        fr: "La castaña est un fruit, c’est une capsule pixide incomplète, communément appelée 'noix de coco'. Elle est cultivée de manière biologique en Amazonie par une association de producteurs indépendants.",
        en: "The castaña is a fruit, it is an incomplete pixide capsule, commonly called 'coconut'. It is organically grown in the Amazon by an association of independent producers.",
        "es-PE": "La castaña es un fruto, es una cápsula pixide incompleta, comúnmente llamada 'coco'. Se cultiva de forma orgánica en la Amazonía por una asociación de productores independientes."
      },
      price: 28,
      stock: 50
    },
    // Soins du visage
    {
      id: "SV-LN-100",
      name: {
        fr: "Lotion de nettoyage",
        en: "Cleansing Lotion",
        "es-PE": "Loción de Limpieza"
      },
      category: {
        fr: "Soins du visage",
        en: "Face Care",
        "es-PE": "Cuidado Facial"
      },
      volume: "100ml",
      desc: {
        fr: "À base d'extrait de pomme de terre native des Andes Péruviennes",
        en: "Based on native potato extract from the Peruvian Andes",
        "es-PE": "A base de extracto de papa nativa de los Andes peruanos"
      },
      long_desc: {
        fr: "La lotion de nettoyage naturelle contient des antioxydants présents dans l'extrait végétal de pomme de terre (Solanum tuberosum), provenant des Andes Péruviennes. Cette lotion rafraîchissante nettoie en douceur sans laisser de surface grasse, tout en donnant une onctuosité à la peau.",
        en: "The natural cleansing lotion contains antioxidants present in the native potato plant extract (Solanum tuberosum), from the Peruvian Andes. This refreshing lotion gently cleanses without leaving a greasy surface, while providing creaminess to the skin.",
        "es-PE": "La loción limpiadora natural contiene antioxidantes presentes en el extracto vegetal de papa nativa (Solanum tuberosum), procedente de los Andes peruanos. Esta loción refrescante limpia suavemente sin dejar una superficie grasa, a la vez que aporta cremosidad a la piel."
      },
      usage: {
        fr: "Imbiber un coton avec la lotion de nettoyage ou verser directement quelques gouttes dans la paume de la main et masser doucement le visage avec le bout des doigts dans un mouvement circulaire ascendant pour raffermir la peau. Rincer avec de l´eau et sécher le visage. Après chaque utilisation, bien refermer la bouteille et la protéger de l'excès de chaleur et de lumière.",
        en: "Soak a cotton pad with the cleansing lotion or pour a few drops directly into the palm of your hand and gently massage the face with fingertips in an upward circular motion to firm the skin. Rinse with water and pat dry. After each use, close the bottle tightly and protect it from excess heat and light.",
        "es-PE": "Empapar un algodón con la loción limpiadora o verter directamente unas gotas en la palma de la mano y masajear suavemente el rostro con las yemas de los dedos con un movimiento circular ascendente para reafirmar la piel. Enjuagar con agua y secar el rostro. Después de cada uso, cerrar bien el frasco y protegerlo del exceso de calor y de la luz."
      },
      ingredient_base: {
        fr: "Cette pomme de terre, unique au monde par sa composition, pousse à 3500 mètres d´altitude dans les montagnes andines. Elle est cultivée de manière organique par des producteurs indépendants regroupés en association.",
        en: "This potato, unique in the world for its composition, grows at 3,500 meters above sea level in the Andean mountains. It is organically cultivated by independent producers grouped in an association.",
        "es-PE": "Esta papa, única en el mundo por su composición, crece a 3500 metros de altitud en las montañas andinas. Es cultivada de forma orgánica por productores independientes agrupados en asociación."
      },
      price: 19,
      stock: 45
    },
    {
      id: "SV-EN-100",
      name: {
        fr: "Eau de nettoyage",
        en: "Cleansing Water",
        "es-PE": "Agua de Limpieza"
      },
      category: {
        fr: "Soins du visage",
        en: "Face Care",
        "es-PE": "Cuidado Facial"
      },
      volume: "100ml",
      desc: {
        fr: "Extraite de la muña - plante des Andes Péruviennes",
        en: "Extracted from muña - plant from the Peruvian Andes",
        "es-PE": "Extraída de la muña - planta de los Andes peruanos"
      },
      long_desc: {
        fr: "L’eau de nettoyage Mishki contient des antioxydants présents dans la muña, Satureia Hortensis, provenant des Andes Péruviennes. Cette lotion rafraîchissante aide à décongestionner et détendre la peau tout en procurant un sentiment de bien être naturel. Le parfum offre une agréable sensation de fraîcheur.",
        en: "Mishki cleansing water contains antioxidants present in muña, Satureia Hortensis, from the Peruvian Andes. This refreshing lotion helps decongest and relax the skin while providing a feeling of natural well-being. The fragrance offers a pleasant sensation of freshness.",
        "es-PE": "El agua limpiadora Mishki contiene antioxidantes presentes en la muña, Satureia Hortensis, procedente de los Andes peruanos. Esta loción refrescante ayuda a descongestionar y relajar la piel proporcionando al mismo tiempo una sensación de bienestar natural. Su fragancia ofrece una agradable sensación de frescura."
      },
      usage: {
        fr: "Vaporiser l´eau de nettoyage sur le visage et masser doucement, en utilisant le bout des doigts dans un mouvement circulaire ascendant pour raffermir la peau. Sécher le visage. Après chaque utilisation, bien refermer la bouteille et la protéger de l´excès de chaleur et de lumière.",
        en: "Spray the cleansing water onto the face and gently massage using fingertips in an upward circular motion to firm the skin. Dry the face. After each use, close the bottle tightly and protect it from excess heat and light.",
        "es-PE": "Vaporizar el agua de limpieza sobre el rostro y masajear suavemente con la punta de los dedos con un movimiento circular ascendente para reafirmar la piel. Secar el rostro. Después de cada uso, cerrar bien el frasco y protegerlo del exceso de calor y de la luz."
      },
      ingredient_base: {
        fr: "La muña est une plante des Andes Péruviennes de laquelle on extrait une huile essentielle et une eau, lesquelles contiennent des agents antioxydants et antibactériens. Cette plante sauvage ou cultivée de manière biologique suit un processus d’extraction par distillation par entraînement à la vapeur d ‘eau.",
        en: "Muña is a plant from the Peruvian Andes from which an essential oil and a water are extracted, which contain antioxidant and antibacterial agents. This wild or organically cultivated plant follows an extraction process by steam distillation.",
        "es-PE": "La muña es una planta de los Andes peruanos de la que se extrae un aceite esencial y un agua, que contienen agentes antioxidantes y antibacterianos. Esta planta silvestre o cultivada orgánicamente sigue un proceso de extracción por destilación al vapor."
      },
      price: 18,
      stock: 50
    },
    {
      id: "SV-SE-80",
      name: {
        fr: "Savon exfoliant visage",
        en: "Facial Exfoliating Soap",
        "es-PE": "Jabón Exfoliante Facial"
      },
      category: {
        fr: "Soins du visage",
        en: "Face Care",
        "es-PE": "Cuidado Facial"
      },
      volume: "80g",
      desc: {
        fr: "À base d'ungurahui - fruit de l'Amazonie Péruvienne",
        en: "Based on ungurahui - fruit from the Peruvian Amazon",
        "es-PE": "A base de ungurahui - fruto de la Amazonía peruana"
      },
      long_desc: {
        fr: "Savon exfoliant qui contient la graine du fruit d'ungurahui - Oenocarpus bataua l. provenant de la forêt Amazonienne Péruvienne. Il nettoie et exfolie en douceur. Grâce à sa formule idéale, il n'irrite pas et se rince facilement. Il laisse la peau sans impuretés et douce de manière naturelle.",
        en: "Exfoliating soap containing the seed of the ungurahui fruit - Oenocarpus bataua l. from the Peruvian Amazon forest. It gently cleanses and exfoliates. Thanks to its ideal formula, it does not irritate and rinses easily. It leaves the skin free of impurities and naturally soft.",
        "es-PE": "Jabón exfoliante que contiene la semilla del fruto de ungurahui - Oenocarpus bataua l. proveniente de la selva amazónica peruana. Limpia y exfolia suavemente. Gracias a su fórmula ideal, no irrita y se aclara fácilmente. Deja la piel libre de impurezas y suave de forma natural."
      },
      usage: {
        fr: "Mettre un peu de savon exfoliant sur la peau humide du visage et masser doucement en utilisant le bout des doigts dans un mouvement circulaire ascendant pour raffermir la peau. Rincer avec de l´eau et sécher le visage. Après chaque utilisation, bien refermer le tube et le protéger de l´excès de chaleur et de lumière.",
        en: "Put a small amount of exfoliating soap on damp face and gently massage using fingertips in an upward circular motion to firm the skin. Rinse with water and pat dry. After each use, close the tube tightly and protect it from excess heat and light.",
        "es-PE": "Poner un poco de jabón exfoliante sobre la piel húmeda del rostro y masajear suavemente con las yemas de los dedos con un movimiento circular ascendente para reafirmar la piel. Enjuagar con agua y secar el rostro. Después de cada uso, cerrar bien el tubo y protegerlo del exceso de calor y de la luz."
      },
      ingredient_base: {
        fr: "L'ungurahui est un fruit péruvien provenant d'un palmier de l'Amazonie.",
        en: "Ungurahui is a Peruvian fruit from an Amazonian palm tree.",
        "es-PE": "El ungurahui es un fruto peruano procedente de una palmera de la Amazonía."
      },
      price: 16,
      stock: 60
    },
    {
      id: "SV-CHG-50",
      name: {
        fr: "Crème Hydratante (Grasses)",
        en: "Moisturizing Cream (Oily)",
        "es-PE": "Crema Hidratante (Grasas)"
      },
      category: {
        fr: "Soins du visage",
        en: "Face Care",
        "es-PE": "Cuidado Facial"
      },
      volume: "50g",
      desc: {
        fr: "Peau normale à grasse. À base d'extrait de pomme de terre native",
        en: "Normal to oily skin. Based on native potato extract",
        "es-PE": "Piel normal a grasa. A base de extracto de papa nativa"
      },
      long_desc: {
        fr: "Crème faciale hydratante naturelle. Les antioxydants, présents dans l´extrait végétal de pomme de terre violette (Solanum tuberosum) des Andes Péruviennes, améliorent l´état de la peau, aident à prévenir les rides et protègent des effets nocifs des radicaux libres. Grâce à sa formule idéale, la crème pénètre rapidement, protégeant et hydratant la peau, tout en lui donnant élasticité et douceur, sans laisser de surface grasse.",
        en: "Natural moisturizing facial cream. Antioxidants present in the purple native potato plant extract (Solanum tuberosum) from the Peruvian Andes improve skin condition, help prevent wrinkles and protect against the harmful effects of free radicals. Thanks to its ideal formula, the cream penetrates quickly, protecting and moisturizing the skin, while providing elasticity and softness, without leaving a greasy surface.",
        "es-PE": "Crema facial hidratante natural. Los antioxidantes presentes en el extracto vegetal de papa nativa morada (Solanum tuberosum) de los Andes peruanos mejoran el estado de la piel, ayudan a prevenir las arrugas y protegen de los efectos nocivos de los radicales libres. Gracias a su fórmula ideal, la crema penetra rápidamente, protegiendo e hidratando la piel, a la vez que le aporta elasticidad y suavidad, sin dejar una superficie grasa."
      },
      usage: {
        fr: "Appliquer un peu de crème sur une peau propre et masser doucement du bout des doigts, d'un mouvement circulaire ascendant pour raffermir la peau. Après chaque utilisation, bien refermer le tube et le protéger de la chaleur et de la lumière.",
        en: "Apply a small amount of cream to clean skin and gently massage with fingertips in an upward circular motion to firm the skin. After each use, close the tube tightly and protect it from heat and light.",
        "es-PE": "Aplicar un poco de crema sobre la piel limpia y masajear suavemente con las yemas de los dedos, con un movimiento circular ascendente para reafirmar la piel. Después de cada uso, cerrar bien el tubo y protegerlo del calor y la luz."
      },
      ingredient_base: {
        fr: "Cette pomme de terre, unique au monde par sa composition, pousse à 3500 mètres d´altitude dans les montagnes andines. Elle est cultivée de manière organique par des producteurs indépendants regroupés en association.",
        en: "This potato, unique in the world for its composition, grows at 3,500 meters above sea level in the Andean mountains. It is organically cultivated by independent producers grouped in an association.",
        "es-PE": "Esta papa, única en el mundo por su composición, crece a 3500 metros de altitud en las montañas andinas. Es cultivada de forma orgánica por productores independientes agrupados en asociación."
      },
      price: 32,
      stock: 25
    },
    {
      id: "SV-CHS-50",
      name: {
        fr: "Crème Hydratante (Sèches)",
        en: "Moisturizing Cream (Dry)",
        "es-PE": "Crema Hidratante (Secas)"
      },
      category: {
        fr: "Soins du visage",
        en: "Face Care",
        "es-PE": "Cuidado Facial"
      },
      volume: "50g",
      desc: {
        fr: "À base d'huile d'Ungurahui – fruit de L’Amazonie péruvienne",
        en: "Based on Ungurahui oil – fruit from the Peruvian Amazon",
        "es-PE": "A base de aceite de Ungurahui – fruto de la Amazonía peruana"
      },
      long_desc: {
        fr: "Crème faciale hydratante naturelle. Contient des acides gras, Omega 9, 6 et 3, provenant de l’huile d’ungurahui - Oenocarpus bataua L. de la forêt Amazonienne Péruvienne. Ces acides gras sont des éléments essentiels pour le soin de la peau qui aident à prévenir l’apparition des rides grâce à la régénération plus efficace des cellules. Sa formule idéale garantie une absorption rapide, hydratant la peau tout en lui donnant élasticité et douceur, sans laisser de surface grasse. La crème exhale une délicate odeur boisée.",
        en: "Natural moisturizing facial cream. Contains fatty acids, Omega 9, 6 and 3, from ungurahui oil - Oenocarpus bataua L. from the Peruvian Amazon forest. These fatty acids are essential elements for skin care that help prevent the appearance of wrinkles through more efficient cell regeneration. Its ideal formula guarantees rapid absorption, moisturizing the skin while giving it elasticity and softness, without leaving a greasy surface. The cream exudes a delicate woody scent.",
        "es-PE": "Crema facial hidratante natural. Contiene ácidos grasos, Omega 9, 6 y 3, procedentes del aceite de ungurahui - Oenocarpus bataua L. de la selva amazónica peruana. Estos ácidos grasos son elementos esenciales para el cuidado de la piel que ayudan a prevenir la aparición de arrugas gracias a una regeneración celular más eficaz. Su fórmula ideal garantiza una rápida absorción, hidratando la piel a la vez que le aporta elasticidad y suavidad, sin dejar una superficie grasa. La crema exhala un delicado aroma a madera."
      },
      usage: {
        fr: "Appliquer un peu de crème sur une peau propre et masser doucement du bout des doigts, d'un mouvement circulaire ascendant pour raffermir la peau. Après chaque utilisation, bien refermer le tube et le protéger de la chaleur et de la lumière.",
        en: "Apply a small amount of cream to clean skin and gently massage with fingertips in an upward circular motion to firm the skin. After each use, close the tube tightly and protect it from heat and light.",
        "es-PE": "Aplicar un poco de crema sobre la piel limpia y masajear suavemente con las yemas de los dedos, con un movimiento circular ascendente para reafirmar la piel. Después de cada uso, cerrar bien el tubo y protegerlo del calor y la luz."
      },
      ingredient_base: {
        fr: "L’ungurahui est un fruit péruvien provenant d’un palmier de l’Amazonie. Après en avoir extrait l’huile, la graine est moulue suivant une récolte sauvage biologique.",
        en: "Ungurahui is a Peruvian fruit from an Amazonian palm tree. After extracting the oil, the seed is ground following an organic wild harvest.",
        "es-PE": "El ungurahui es un fruto peruano que proviene de una palmera de la Amazonía. Tras extraer el aceite, la semilla se muele siguiendo una recolección silvestre orgánica."
      },
      price: 32,
      stock: 20
    },
    {
      id: "SV-HJ-100",
      name: {
        fr: "Huile de jojoba",
        en: "Jojoba Oil",
        "es-PE": "Aceite de Jojoba"
      },
      category: {
        fr: "Soins du visage",
        en: "Face Care",
        "es-PE": "Cuidado Facial"
      },
      volume: "100ml",
      desc: {
        fr: "De la Côte Péruvienne",
        en: "From the Peruvian Coast",
        "es-PE": "De la Costa Peruana"
      },
      long_desc: {
        fr: "L'huile de jojoba, mélangée avec la crème Mishki pour peau normale à sèche, aide à prévenir les rides et à hydrater la peau sèche. Seule, elle permet d'éviter l'accumulation de sébum. L'application quotidienne de l'huile de jojoba facilite la régénération des cellules et améliore l'élasticité de la peau, elle donne aussi douceur et fermeté á la peau. L'huile de jojoba contient de la vitamine E qui agit comme un antioxydant et protège la peau des effets nocifs des radicaux libres.",
        en: "Jojoba oil, mixed with Mishki cream for normal to dry skin, helps prevent wrinkles and moisturize dry skin. On its own, it helps prevent sebum buildup. Daily application of jojoba oil facilitates cell regeneration and improves skin elasticity, it also provides softness and firmness to the skin. Jojoba oil contains vitamin E that acts as an antioxidant and protects the skin from the harmful effects of free radicals.",
        "es-PE": "El aceite de jojoba, mezclado con la crema Mishki para pieles normales a secas, ayuda a prevenir las arrugas e hidratar la piel seca. Por sí solo, ayuda a prevenir la acumulación de sebo. La aplicación diaria de aceite de jojoba facilita la regeneración celular y mejora la elasticidad de la piel, aportando además suavidad y firmeza. El aceite de jojoba contiene vitamina E que actúa como antioxidante y protege la piel de los efectos nocivos de los radicales libres."
      },
      usage: {
        fr: "Mettre un peu de crème Mishki pour peau normale à sèche dans votre main et ajouter une ou deux gouttes d`huile de jojoba. Mélanger et appliquer sur votre visage. Masser doucement, utilisant le bout de vos doigts, dans un mouvement circulaire ascendant pour raffermir la peau. Après chaque utilisation, bien refermer la bouteille et la protéger de l´excès de chaleur et de lumière.",
        en: "Put a small amount of Mishki cream for normal to dry skin in your hand and add one or two drops of jojoba oil. Mix and apply to your face. Gently massage using fingertips in an upward circular motion to firm the skin. After each use, close the bottle tightly and protect it from excess heat and light.",
        "es-PE": "Poner un poco de crema Mishki para piel normal a seca en la mano y añadir una o dos gotas de aceite de jojoba. Mezclar y aplicar sobre el rostro. Masajear suavemente con las yemas de los dedos con un movimiento circular ascendente para reafirmar la piel. Después de cada uso, cerrar bien el frasco y protegerlo del exceso de calor y de la luz."
      },
      ingredient_base: {
        fr: "Le jojoba est une plante qui vit 100 ans en moyenne et qui peut atteindre une hauteur de 5 mètres. Le fruit du jojoba contient une graine d`una longueur de 2 à 4 cm de laquelle nous extrayons l`huile. Les plantes que nous utilisons sont cultivées de manière biologique à Ica par une association de producteurs indépendants.",
        en: "Jojoba is a plant that lives an average of 100 years and can reach a height of 5 meters. The jojoba fruit contains a seed 2 to 4 cm long from which we extract the oil. The plants we use are organically grown in Ica by an association of independent producers.",
        "es-PE": "La jojoba es una planta que vive 100 años en promedio y puede alcanzar una altura de 5 metros. El fruto de la jojoba contiene una semilla de 2 a 4 cm de longitud de la que extraemos el aceite. Las plantas que utilizamos se cultivan de forma orgánica en Ica por una asociación de productores independientes."
      },
      price: 35,
      stock: 40
    },
    {
      id: "SV-CS-50",
      name: {
        fr: "Crème solaire",
        en: "Sunscreen",
        "es-PE": "Protector Solar"
      },
      category: {
        fr: "Soins du visage",
        en: "Face Care",
        "es-PE": "Cuidado Facial"
      },
      volume: "50g",
      desc: {
        fr: "À base de tara, plante des Andes Péruviennes. 30+ SPF - UVA / UVB protection",
        en: "Based on tara, plant from the Peruvian Andes. 30+ SPF - UVA / UVB protection",
        "es-PE": "A base de tara, planta de los Andes Peruanos. 30+ SPF - UVA / UVB protección"
      },
      long_desc: {
        fr: "Crème solaire contenant une plante provenant des Andes Péruviennes, tara - (Caesalpinia Spinosa). Offre une protection contre les brûlures et le vieillissement précoce de la peau provenant des rayons UVA et UVB. N’IRRITE PAS LES YEUX. Contient de la vitamine E grâce à l’huile de jojoba, qui donne à la peau un effet hydratant et doux.",
        en: "Sunscreen containing a plant from the Peruvian Andes, tara - (Caesalpinia Spinosa). Offers protection against burns and premature skin aging from UVA and UVB rays. DOES NOT IRRITATE THE EYES. Contains vitamin E from jojoba oil, which gives the skin a moisturizing and soft effect.",
        "es-PE": "Protector solar que contiene una planta de los Andes peruanos, tara - (Caesalpinia Spinosa). Ofrece protección contra las quemaduras y el envejecimiento prematuro de la piel causado por los rayos UVA y UVB. NO IRRITA LOS OJOS. Contiene vitamina E gracias al aceite de jojoba, que aporta a la piel un efecto hidratante y suave."
      },
      usage: {
        fr: "Appliquer sa crème Mishki, et une fois absorbée, mettre la crème solaire. Après chaque utilisation, bien refermer le tube et le protéger de la chaleur et de la lumière.",
        en: "Apply your Mishki cream, and once absorbed, apply the sunscreen. After each use, close the tube tightly and protect it from heat and light.",
        "es-PE": "Aplicar su crema Mishki, y una vez absorbida, poner el protector solar. Después de cada uso, cerrar bien el tubo y protegerlo del calor y la luz."
      },
      ingredient_base: {
        fr: "La tara provient des Andes Péruviennes et a un effet photoprotecteur naturel.",
        en: "Tara comes from the Peruvian Andes and has a natural photoprotective effect.",
        "es-PE": "La tara procede de los Andes peruanos y tiene un efecto fotoprotector natural."
      },
      price: 29,
      stock: 30
    },
    {
      id: "SV-MPC-25",
      name: {
        fr: "Masque de pétales de Calendula",
        en: "Calendula Flower Mask",
        "es-PE": "Mascarilla de Pétalos de Caléndula"
      },
      category: {
        fr: "Soins du visage",
        en: "Face Care",
        "es-PE": "Cuidado Facial"
      },
      volume: "25g",
      desc: {
        fr: "Des Andes Péruviennes",
        en: "From the Peruvian Andes",
        "es-PE": "De los Andes Peruanos"
      },
      long_desc: {
        fr: "La calendula est une fleur avec des propriétés anti inflammatoires qui connaît aussi une légère activité anti microbienne. Utilisée comme masque, les pétales de calendula aident à décongestionner la peau et ont un effet anti microbien.",
        en: "Calendula is a flower with anti-inflammatory properties that also has some anti-microbial activity. Used as a mask, calendula petals help decongest the skin and have an anti-microbial effect.",
        "es-PE": "La caléndula es una flor con propiedades antiinflamatorias que también tiene una ligera actividad antimicrobiana. Utilizados como mascarilla, los pétalos de caléndula ayudan a descongestionar la piel y tienen un efecto antimicrobiano."
      },
      usage: {
        fr: "Mettre une poignée de fleurs de calendula dans un bol et recouvrir les pétales avec de l`eau bouillante. Retirer les pétales de l`eau et les mettre directement sur la peau, tout en gardant le reste de l`eau. Laisser le masque durant 15-20 minutes. Si les pétales de calendula se sèchent au cours de la période, humidifier les avec l`eau de calendula, utilisant du coton. Aprés 15-20 minutes, assurez vous de retirer tout le produit du visage et appliquer une crème Mishki. Après chaque utilisation, bien refermer le sac et le protéger de l´excès de chaleur et d`humidité.",
        en: "Put a handful of calendula flowers in a bowl and cover the petals with boiling water. Remove the petals from the water and place them directly on the skin, keeping the rest of the water. Leave the mask on for 15-20 minutes. If the calendula petals dry out during the period, moisten them with the calendula water using cotton. After 15-20 minutes, make sure to remove all the product from the face and apply a Mishki cream. After each use, close the bag tightly and protect it from excess heat and humidity.",
        "es-PE": "Poner un puñado de flores de caléndula en un cuenco y cubrir los pétalos con agua hirviendo. Retirar los pétalos del agua y colocarlos directamente sobre la piel, conservando el resto del agua. Dejar actuar la mascarilla durante 15-20 minutos. Si los pétalos de caléndula se secan durante el periodo, humedecerlos con el agua de caléndula utilizando un algodón. Transcurridos 15-20 minutos, asegúrese de retirar todo el producto del rostro y aplicar una crema Mishki. Después de cada uso, cierre bien la bolsa y protéjala del exceso de calor y humedad."
      },
      ingredient_base: {
        fr: "Les fleurs de calendula sont cultivées de manière biologique par une association de producteurs indépendants.",
        en: "Calendula flowers are organically grown by an association of independent producers.",
        "es-PE": "Las flores de caléndula son cultivadas orgánicamente por una asociación de productores independientes."
      },
      price: 26,
      stock: 15
    }
  ];

  return productsData.map((item) => ({
    slug: item.id,
    category: item.category.fr,
    price: item.price,
    image: `/b2c/${item.id}.png`,
    volume: item.volume,
    stock: item.stock,
    translations: {
      fr: {
        name: item.name.fr,
        desc: item.desc.fr,
        long_desc: item.long_desc.fr,
        category: item.category.fr,
        usage: item.usage?.fr || "",
        ingredient_base: item.ingredient_base?.fr || ""
      },
      en: {
        name: item.name.en,
        desc: item.desc.en,
        long_desc: item.long_desc.en,
        category: item.category.en,
        usage: item.usage?.en || "",
        ingredient_base: item.ingredient_base?.en || ""
      },
      "es-PE": {
        name: item.name["es-PE"],
        desc: item.desc["es-PE"],
        long_desc: item.long_desc["es-PE"],
        category: item.category["es-PE"],
        usage: item.usage?.["es-PE"] || "",
        ingredient_base: item.ingredient_base?.["es-PE"] || ""
      }
    }
  }));
}

function buildProtocolesB2B(): { rituels: RituelB2B[]; fiches: FicheB2B[] } {
  const rituels: RituelB2B[] = [
    {
      slug: 'rituel-hydratation',
      reference: 'RC-HYD-002',
      category: 'Visage',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=400&fit=crop',
      theme: 'Hydratation & Éclat',
      ambiance: 'Zen & Cocooning',
      duration: '45 min',
      preparation: {
        cabine: ['Température : 22-24°C', 'Lumière tamisée ou bougies LED', "Diffusion d'huiles essentielles d'agrumes", 'Musique douce type spa'],
        materiel: ['Serviettes chaudes', 'Compresses tièdes', 'Bols pour préparations', 'Spatule et pinceau'],
        produits: [
          'Lait démaquillant',
          'Lotion tonique',
          'Gommage doux enzymatique',
          'Sérum hydratant',
          'Masque hydratation intense',
          'Crème confort',
        ],
      },
      deroulement: [
        {
          phase: 'Accueil & Installation',
          duree: '5 min',
          description: "Création de l'ambiance et mise en confiance",
          actions: [
            'Accueillir la cliente avec une tisane relaxante',
            'Expliquer le déroulement du rituel',
            'Installer confortablement sur la table de soin',
            'Placer des protections et bande à cheveux',
          ],
        },
        {
          phase: "Rituel d'Ouverture",
          duree: '3 min',
          description: 'Connexion et respiration',
          actions: [
            'Placer les mains sur les épaules',
            'Inviter à 3 respirations profondes',
            'Effectuer des pressions douces sur les épaules',
            'Créer une intention de détente',
          ],
        },
        {
          phase: 'Nettoyage Sensoriel',
          duree: '7 min',
          description: 'Démaquillage et purification',
          actions: [
            'Appliquer le lait démaquillant en mouvements enveloppants',
            'Retirer avec des compresses tièdes parfumées',
            'Vaporiser la lotion tonique en fine brume',
            'Sécher en tamponnant délicatement',
          ],
        },
        {
          phase: 'Exfoliation Lumière',
          duree: '8 min',
          description: "Gommage pour révéler l'éclat",
          actions: [
            'Appliquer le gommage enzymatique au pinceau',
            'Masser en mouvements circulaires doux',
            'Laisser poser 3-4 minutes',
            'Retirer avec des compresses humides',
          ],
        },
        {
          phase: 'Massage Hydratant',
          duree: '12 min',
          description: 'Massage profond du visage et décolleté',
          actions: [
            'Appliquer le sérum hydratant généreux',
            'Effectuer le massage drainant du décolleté',
            'Réaliser les manœuvres lissantes du visage',
            'Terminer par des pressions calmantes',
          ],
        },
        {
          phase: 'Pause Cocooning',
          duree: '10 min',
          description: 'Application du masque et relaxation',
          actions: [
            'Appliquer le masque hydratation en couche généreuse',
            'Placer des compresses fraîches sur les yeux',
            'Effectuer un massage des mains et bras',
            'Laisser la cliente se reposer',
          ],
        },
        {
          phase: 'Rituel de Fermeture',
          duree: '5 min',
          description: 'Retour en douceur et finalisation',
          actions: [
            'Retirer le masque délicatement',
            "Vaporiser une brume d'eau florale",
            'Appliquer la crème confort en effleurages',
            'Effectuer des pressions sur les points énergétiques',
          ],
        },
      ],
      retail: ['Crème hydratante format maison', 'Sérum hydratant voyage', 'Masque hydratation à faire chez soi'],
      notes: [
        'Adapter les textures selon le type de peau',
        'Maintenir un contact permanent avec la cliente',
        'Créer une ambiance olfactive personnalisée',
        'Proposer une tisane détox en fin de soin',
      ],
      translations: duplicateLocales({
        title: 'Rituel Hydratation Divine',
        introduction: "Un rituel dédié à l'hydratation profonde de la peau pour retrouver éclat et souplesse. Une expérience sensorielle complète.",
        theme: 'Hydratation & Éclat',
        ambiance: 'Zen & Cocooning',
        category: 'Visage',
        duration: '45 min',
        preparation: {
          cabine: ['Température : 22-24°C', 'Lumière tamisée ou bougies LED', "Diffusion d'huiles essentielles d'agrumes", 'Musique douce type spa'],
          materiel: ['Serviettes chaudes', 'Compresses tièdes', 'Bols pour préparations', 'Spatule et pinceau'],
          produits: [
            'Lait démaquillant',
            'Lotion tonique',
            'Gommage doux enzymatique',
            'Sérum hydratant',
            'Masque hydratation intense',
            'Crème confort',
          ],
        },
        deroulement: [
          {
            phase: 'Accueil & Installation',
            duree: '5 min',
            description: "Création de l'ambiance et mise en confiance",
            actions: [
              'Accueillir la cliente avec une tisane relaxante',
              'Expliquer le déroulement du rituel',
              'Installer confortablement sur la table de soin',
              'Placer des protections et bande à cheveux',
            ],
          },
          {
            phase: "Rituel d'Ouverture",
            duree: '3 min',
            description: 'Connexion et respiration',
            actions: [
              'Placer les mains sur les épaules',
              'Inviter à 3 respirations profondes',
              'Effectuer des pressions douces sur les épaules',
              'Créer une intention de détente',
            ],
          },
          {
            phase: 'Nettoyage Sensoriel',
            duree: '7 min',
            description: 'Démaquillage et purification',
            actions: [
              'Appliquer le lait démaquillant en mouvements enveloppants',
              'Retirer avec des compresses tièdes parfumées',
              'Vaporiser la lotion tonique en fine brume',
              'Sécher en tamponnant délicatement',
            ],
          },
          {
            phase: 'Exfoliation Lumière',
            duree: '8 min',
            description: "Gommage pour révéler l'éclat",
            actions: [
              'Appliquer le gommage enzymatique au pinceau',
              'Masser en mouvements circulaires doux',
              'Laisser poser 3-4 minutes',
              'Retirer avec des compresses humides',
            ],
          },
          {
            phase: 'Massage Hydratant',
            duree: '12 min',
            description: 'Massage profond du visage et décolleté',
            actions: [
              'Appliquer le sérum hydratant généreux',
              'Effectuer le massage drainant du décolleté',
              'Réaliser les manœuvres lissantes du visage',
              'Terminer par des pressions calmantes',
            ],
          },
          {
            phase: 'Pause Cocooning',
            duree: '10 min',
            description: 'Application du masque et relaxation',
            actions: [
              'Appliquer le masque hydratation en couche généreuse',
              'Placer des compresses fraîches sur les yeux',
              'Effectuer un massage des mains et bras',
              'Laisser la cliente se reposer',
            ],
          },
          {
            phase: 'Rituel de Fermeture',
            duree: '5 min',
            description: 'Retour en douceur et finalisation',
            actions: [
              'Retirer le masque délicatement',
              "Vaporiser une brume d'eau florale",
              'Appliquer la crème confort en effleurages',
              'Effectuer des pressions sur les points énergétiques',
            ],
          },
        ],
        retail: ['Crème hydratante format maison', 'Sérum hydratant voyage', 'Masque hydratation à faire chez soi'],
        notes: [
          'Adapter les textures selon le type de peau',
          'Maintenir un contact permanent avec la cliente',
          'Créer une ambiance olfactive personnalisée',
          'Proposer une tisane détox en fin de soin',
        ],
      }),
    },
  ];

  const fiches: FicheB2B[] = [
    {
      slug: 'masque-hydratation-intense',
      reference: 'FT-HYD-001',
      category: 'Soins Visage',
      extraction: 'Extrait de Rose des Sables',
      volume: '250ml (Format Pro)',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=400&fit=crop',
      description:
        'Un masque professionnel hautement concentré en actifs hydratants et régénérants. Conçu pour restaurer la barrière cutanée et apporter un confort immédiat aux peaux déshydratées.',
      proprietes: ['Hydratation longue durée (8h)', 'Restauration du film hydrolipidique', 'Apaisement immédiat', "Éclat du teint instantané"],
      actifs: [
        { nom: 'Acide Hyaluronique HPM', role: 'Hydratation de surface et lissage' },
        { nom: 'Extrait de Rose des Sables', role: "Auto-protection cellulaire et rétention d'eau" },
        { nom: 'Beurre de Karité Bio', role: 'Nutrition et protection de la barrière cutanée' },
        { nom: 'Vitamine E', role: 'Antioxydant et protection contre les radicaux libres' },
      ],
      utilisation: {
        frequence: '1 à 2 fois par semaine selon le diagnostic',
        methode: 'Appliquer en couche moyenne sur le visage et le cou parfaitement nettoyés. Éviter le contour des yeux.',
        temps: '10 à 15 minutes',
        retrait: "Retirer l'excédent avec un coton humide ou rincer à l'eau tiède.",
      },
      caracteristiques: {
        texture: 'Crème onctueuse et fraîche',
        odeur: 'Notes florales délicates',
        ph: '5.5 - 6.0',
        conservation: '12 mois après ouverture',
      },
      avis_experts:
        'Indispensable pour les rituels post-exposition solaire ou en cure d’attaque hivernale. Sa texture permet une pénétration optimale des actifs.',
      translations: duplicateLocales({
        title: 'Masque Hydratation Intense',
        description:
          'Un masque professionnel hautement concentré en actifs hydratants et régénérants. Conçu pour restaurer la barrière cutanée et apporter un confort immédiat aux peaux déshydratées.',
        category: 'Soins Visage',
        reference: 'FT-HYD-001',
        extraction: 'Extrait de Rose des Sables',
        volume: '250ml (Format Pro)',
        proprietes: ['Hydratation longue durée (8h)', 'Restauration du film hydrolipidique', 'Apaisement immédiat', "Éclat du teint instantané"],
        actifs: [
          { nom: 'Acide Hyaluronique HPM', role: 'Hydratation de surface et lissage' },
          { nom: 'Extrait de Rose des Sables', role: "Auto-protection cellulaire et rétention d'eau" },
          { nom: 'Beurre de Karité Bio', role: 'Nutrition et protection de la barrière cutanée' },
          { nom: 'Vitamine E', role: 'Antioxydant et protection contre les radicaux libres' },
        ],
        utilisation: {
          frequence: '1 à 2 fois par semaine selon le diagnostic',
          methode: 'Appliquer en couche moyenne sur le visage et le cou parfaitement nettoyés. Éviter le contour des yeux.',
          temps: '10 à 15 minutes',
          retrait: "Retirer l'excédent avec un coton humide ou rincer à l'eau tiède.",
        },
        caracteristiques: {
          texture: 'Crème onctueuse et fraîche',
          odeur: 'Notes florales délicates',
          ph: '5.5 - 6.0',
          conservation: '12 mois après ouverture',
        },
        avis_experts:
          'Indispensable pour les rituels post-exposition solaire ou en cure d’attaque hivernale. Sa texture permet une pénétration optimale des actifs.',
      }),
    },
  ];

  return { rituels, fiches };
}

function buildDownloadsB2B(): DownloadAssetB2B[] {
  const assets = [
    {
      slug: 'affiche-printemps-2025',
      type: 'image',
      category: 'PLV',
      format: 'JPG',
      size: '2.4 MB',
      url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200',
      title: 'Affiche Promotionnelle Printemps 2025',
    },
    {
      slug: 'catalogue-2025',
      type: 'pdf',
      category: 'Catalogues',
      format: 'PDF',
      size: '15.2 MB',
      url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200',
      title: 'Catalogue Produits 2025',
    },
    {
      slug: 'video-tutoriel-massage-visage',
      type: 'video',
      category: 'Formations',
      format: 'MP4',
      size: '45.8 MB',
      url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200',
      title: 'Vidéo Tutoriel Massage Visage',
    },
    {
      slug: 'banniere-web-anti-age',
      type: 'image',
      category: 'Digital',
      format: 'PNG',
      size: '1.2 MB',
      url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200',
      title: 'Bannière Web Anti-âge',
    },
    {
      slug: 'presentoir-comptoir',
      type: 'image',
      category: 'PLV',
      format: 'JPG',
      size: '3.1 MB',
      url: 'https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=1200',
      title: 'Présentoir Comptoir',
    },
    {
      slug: 'guide-utilisation-produits',
      type: 'pdf',
      category: 'Documentation',
      format: 'PDF',
      size: '8.5 MB',
      url: 'https://images.unsplash.com/photo-1554224311-beee4ece8db7?w=1200',
      title: "Guide d'utilisation Produits",
    },
    {
      slug: 'post-instagram-nouveaute',
      type: 'image',
      category: 'Social Media',
      format: 'JPG',
      size: '0.8 MB',
      url: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1200',
      title: 'Post Instagram - Nouveauté',
    },
    {
      slug: 'flyer-promo-ete',
      type: 'pdf',
      category: 'PLV',
      format: 'PDF',
      size: '4.2 MB',
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200',
      title: 'Flyer Promotion Été',
    },
  ];

  return assets.map((a) => ({
    slug: a.slug,
    type: a.type as DownloadAssetB2B['type'],
    category: a.category,
    format: a.format,
    size: a.size,
    url: a.url,
    defaultLocale: 'fr',
    translations: duplicateLocales({
      title: a.title,
    }),
  }));
}

function buildBlogPosts(): BlogPost[] {
  const posts = [
    {
      slug: 'p1',
      image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=1600',
      date: '10 Dec 2024',
      readTime: '5 min',
      category: 'Soins naturels',
      author: { name: 'Sophie Martin', role: 'Experte en cosmetique naturelle', avatar: 'SM' },
      related: ['p2', 'p3'],
      title: "Les bienfaits de l'huile de jojoba pour votre peau",
      excerpt: "Decouvrez comment l'huile de jojoba peut transformer votre routine de soins et apporter eclat et hydratation a votre peau.",
      content: [
        "L'huile de jojoba est l'un des ingredients les plus precieux dans le monde de la cosmetique naturelle. Extraite des graines du jojoba, un arbuste originaire des deserts d'Amerique du Nord, cette huile possede des proprietes exceptionnelles qui en font un allie incontournable pour la beaute de la peau.",
        "Contrairement a la plupart des huiles vegetales, l'huile de jojoba est en realite une cire liquide dont la composition se rapproche etonnamment du sebum humain. Cette caracteristique unique lui permet d'etre parfaitement assimilee par la peau, sans laisser de film gras ni obstruer les pores.",
        "Les bienfaits de l'huile de jojoba sont nombreux. Elle hydrate en profondeur tout en regulant la production de sebum, ce qui la rend adaptee a tous les types de peau, y compris les peaux grasses et a tendance acneique. Ses proprietes anti-inflammatoires apaisent les irritations et les rougeurs.",
        "Riche en vitamines E et B, ainsi qu'en mineraux essentiels, l'huile de jojoba nourrit la peau et l'aide a lutter contre les signes du vieillissement. Elle forme egalement une barriere protectrice qui preserve l'hydratation naturelle de la peau.",
        "Pour integrer l'huile de jojoba dans votre routine, vous pouvez l'appliquer pure sur le visage et le corps, ou l'utiliser comme ingredient dans vos preparations maison. Quelques gouttes suffisent pour profiter de tous ses bienfaits.",
        "Chez Mishki, nous avons fait de l'huile de jojoba l'un des piliers de nos formulations. Associee aux ingredients traditionnels peruviens, elle participe a l'efficacite de nos soins tout en respectant votre peau et l'environnement.",
      ],
    },
    {
      slug: 'p2',
      image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=1600',
      date: '5 Dec 2024',
      readTime: '7 min',
      category: 'Heritage',
      author: { name: 'Maria Santos', role: 'Ethnobotaniste', avatar: 'MS' },
      related: ['p1', 'p5'],
      title: 'Rituels de beaute peruviens ancestraux',
      excerpt: 'Plongez dans les traditions de beaute du Perou et decouvrez des secrets transmis de generation en generation.',
      content: [
        'Le Perou, terre de contrastes et de biodiversite exceptionnelle, abrite depuis des millenaires des traditions de beaute uniques. Les femmes peruviennes ont toujours su tirer parti des ressources naturelles extraordinaires de leur environnement pour prendre soin de leur peau et de leurs cheveux.',
        "Parmi les ingredients emblematiques de la cosmetique peruvienne, on trouve le quinoa, la maca, l'aguaje et le camu-camu. Chacun de ces tresors de la nature possede des proprietes specifiques qui contribuent a la beaute et a la sante de la peau.",
        "Le quinoa, par exemple, est utilise depuis l'epoque incaique pour ses vertus nourrissantes et reparatrices. Riche en proteines et en acides amines, il renforce la structure de la peau et lui redonne eclat et vitalite.",
        "L'aguaje, fruit du palmier moriche, est surnomme le \"fruit de la beaute\" par les populations amazoniennes. Sa teneur exceptionnelle en vitamine A en fait un puissant antioxydant qui protege la peau des agressions exterieures.",
        "Ces rituels ancestraux ne se limitent pas aux ingredients utilises. Ils incluent egalement des gestes et des moments particuliers dedies au bien-etre. Les femmes peruviennes accordent une grande importance au massage et a la meditation, considerant que la beaute vient aussi de l'interieur.",
        'Chez Mishki, nous nous inspirons de cette sagesse ancestrale pour creer des soins qui respectent a la fois les traditions et les besoins des peaux modernes. Chaque produit est une invitation a decouvrir les secrets de beaute du Perou.',
      ],
    },
    {
      slug: 'p3',
      image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=1600',
      date: '28 Nov 2024',
      readTime: '6 min',
      category: 'Conseils',
      author: { name: 'Claire Dubois', role: 'Dermatologue', avatar: 'CD' },
      related: ['p1', 'p4'],
      title: 'Comment choisir le bon soin pour votre type de peau',
      excerpt: 'Guide complet pour identifier votre type de peau et selectionner les produits les plus adaptes a vos besoins.',
      content: [
        "Choisir les bons soins pour sa peau peut sembler complique face a la multitude de produits disponibles. Pourtant, tout commence par une etape essentielle: identifier votre type de peau. Cette connaissance vous permettra de selectionner les produits les plus adaptes a vos besoins specifiques.",
        'Il existe quatre types de peau principaux: normale, seche, grasse et mixte. La peau normale est equilibree, ni trop grasse ni trop seche. La peau seche manque de sebum et a tendance a tiraillement. La peau grasse produit un exces de sebum et presente souvent des brillances. La peau mixte combine zones grasses et zones seches.',
        "Pour identifier votre type de peau, nettoyez votre visage et attendez une heure sans appliquer de soin. Observez ensuite votre peau: si elle brille sur l'ensemble du visage, elle est grasse. Si elle tire et presente des zones de secheresse, elle est seche. Si seule la zone T brille, elle est mixte.",
        'Une fois votre type de peau identifie, vous pouvez selectionner vos soins. Les peaux seches privilegieront les textures riches et nourrissantes. Les peaux grasses opteront pour des formules legeres et matifiantes. Les peaux mixtes pourront adapter leurs soins selon les zones du visage.',
        "N'oubliez pas que votre peau evolue au fil du temps et des saisons. Il est important de rester a l'ecoute de ses besoins et d'adapter votre routine en consequence. Un bilan regulier vous aidera a maintenir une peau en pleine sante.",
        "Chez Mishki, nos experts sont a votre disposition pour vous guider dans le choix de vos soins. N'hesitez pas a nous contacter pour beneficier de conseils personnalises adaptes a votre type de peau.",
      ],
    },
    {
      slug: 'p4',
      image: 'https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=1600',
      date: '20 Nov 2024',
      readTime: '4 min',
      category: 'Bien-etre',
      author: { name: 'Sophie Martin', role: 'Experte en cosmetique naturelle', avatar: 'SM' },
      related: ['p3', 'p6'],
      title: "L'importance de l'hydratation quotidienne",
      excerpt: 'Pourquoi hydrater sa peau chaque jour est essentiel et comment integrer cette habitude dans votre routine.',
      content: [
        "L'hydratation est la cle d'une peau saine et eclatante. Que votre peau soit seche, grasse ou mixte, elle a besoin d'eau pour fonctionner correctement et conserver sa beaute. Pourtant, l'hydratation reste souvent negligee dans les routines de soins.",
        'La peau est composee a 70% deau. Cette eau est essentielle pour maintenir lelasticite de la peau, assurer le renouvellement cellulaire et proteger contre les agressions exterieures. Une peau deshydratee perd de sa souplesse, parait terne et vieillit prematurement.',
        "L'hydratation de la peau se fait de deux manieres complementaires: de l'interieur, en buvant suffisamment d'eau, et de l'exterieur, en appliquant des soins hydratants. Les deux approches sont indispensables pour une hydratation optimale.",
        'Pour hydrater efficacement votre peau, commencez par boire au moins 1,5 litre deau par jour. Completez cette hydratation interne par lapplication quotidienne dun soin adapte a votre type de peau. Le matin, optez pour une creme legere. Le soir, privilegiez une formule plus riche.',
        "Les ingredients hydratants les plus efficaces sont l'acide hyaluronique, qui peut retenir jusqu'a 1000 fois son poids en eau, la glycerine, le beurre de karite et les huiles vegetales comme l'huile de jojoba ou d'argan.",
        'Chez Mishki, nous formulons des soins hydratants a base dingredients naturels qui apportent a la peau leau dont elle a besoin tout au long de la journee. Nos formules combinent tradition peruvienne et efficacite moderne pour une hydratation optimale.',
      ],
    },
    {
      slug: 'p5',
      image: 'https://images.pexels.com/photos/3737579/pexels-photo-3737579.jpeg?auto=compress&cs=tinysrgb&w=1600',
      date: '15 Nov 2024',
      readTime: '8 min',
      category: 'Ingredients',
      author: { name: 'Maria Santos', role: 'Ethnobotaniste', avatar: 'MS' },
      related: ['p1', 'p2'],
      title: 'Les ingredients stars de la cosmetique naturelle',
      excerpt: 'Focus sur les ingredients naturels les plus efficaces et leurs proprietes exceptionnelles pour votre peau.',
      content: [
        'La cosmetique naturelle connait un essor sans precedent, et pour cause: les ingredients issus de la nature offrent des bienfaits exceptionnels pour la peau, sans les effets indesirables des molecules de synthese. Decouvrez les stars de la beaute naturelle.',
        "L'aloe vera est sans doute l'ingredient naturel le plus connu. Cette plante grasse contient plus de 200 composants actifs qui hydratent, apaisent et reparent la peau. Elle est particulierement recommandee pour les peaux sensibles et irritees.",
        'Le beurre de karite, issu du karite dAfrique, est un tresor de nutrition pour la peau. Riche en vitamines A, E et F, il nourrit intensement, protege et regenere les peaux les plus seches. Il est egalement excellent pour les cheveux.',
        "L'huile d'argan, appelee \"or liquide du Maroc\", est reconnue pour ses proprietes anti-age exceptionnelles. Sa richesse en antioxydants et en acides gras essentiels en fait un soin precieux pour lutter contre le vieillissement cutane.",
        'Le the vert est un puissant antioxydant qui protege la peau des radicaux libres responsables du vieillissement premature. Il possede egalement des proprietes anti-inflammatoires et antibacteriennes.',
        'Chez Mishki, nous associons ces ingredients universels aux tresors de la biodiversite peruvienne pour creer des formules uniques et efficaces. Chaque produit est le fruit dune selection rigoureuse des meilleurs ingredients naturels.',
      ],
    },
    {
      slug: 'p6',
      image: 'https://images.pexels.com/photos/3762874/pexels-photo-3762874.jpeg?auto=compress&cs=tinysrgb&w=1600',
      date: '10 Nov 2024',
      readTime: '5 min',
      category: 'Routines',
      author: { name: 'Claire Dubois', role: 'Dermatologue', avatar: 'CD' },
      related: ['p4', 'p3'],
      title: 'Routine du soir: les etapes essentielles',
      excerpt: 'Decouvrez la routine du soir ideale pour preparer votre peau au renouvellement cellulaire nocturne.',
      content: [
        "La routine du soir est un moment crucial pour la beaute de votre peau. Pendant la nuit, votre peau se regenere et se repare. En adoptant les bons gestes avant le coucher, vous optimisez ce processus naturel et vous vous reveillez avec une peau reposee et eclatante.",
        "La premiere etape, et la plus importante, est le demaquillage. Meme si vous ne vous etes pas maquillee, cette etape permet d'eliminer les impuretes et les polluants accumules tout au long de la journee. Utilisez une huile ou un lait demaquillant doux.",
        'Apres le demaquillage, procedez au nettoyage. Cette double cleansing, comme lappellent les experts, assure une peau parfaitement propre. Choisissez un nettoyant adapte a votre type de peau: gel moussant pour les peaux grasses, lait ou creme pour les peaux seches.',
        "L'etape suivante est l'application d'un tonique ou d'une lotion. Ce soin permet de retablir le pH de la peau et de la preparer a recevoir les soins suivants. Appliquez-le avec un coton ou directement avec les mains.",
        'Terminez votre routine par lapplication dun serum et dune creme de nuit. Le serum, concentre en actifs, cible des problematiques specifiques. La creme de nuit, plus riche que celle du jour, nourrit et repare la peau pendant votre sommeil.',
        "Chez Mishki, nous avons concu une gamme complete pour votre rituel du soir. Nos soins travaillent en synergie pour offrir a votre peau tout ce dont elle a besoin pour se regenerer pendant la nuit.",
      ],
    },
  ];

  return posts.map((p) => ({
    slug: p.slug,
    image: p.image,
    date: p.date,
    readTime: p.readTime,
    category: p.category,
    related: p.related,
    author: p.author,
    translations: duplicateLocales({
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
    }),
  }));
}

// function buildRituals(): Ritual[] {
//   const r = frLocale.b2c.rituals.items;
//   type RitualKey = keyof typeof r;
//   const list: { slug: string; key: RitualKey; image: string; products: string[] }[] = [
//     { slug: 'morning', key: 'morning', image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800', products: ['SC-SE-150', 'SC-AN-000'] },
//     { slug: 'evening', key: 'evening', image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=800', products: ['SC-CH-150', 'SC-AN-000'] },
//     { slug: 'weekly', key: 'weekly', image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800', products: ['SC-SE-150', 'SC-CH-150', 'SC-EN-000'] },
//     { slug: 'detox', key: 'detox', image: 'https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=800', products: ['SC-SE-150', 'SC-EN-000'] },
//   ];

//   return list.map((item) => {
//     const data = r[item.key];
//     return {
//       slug: item.slug,
//       image: item.image,
//       products: item.products,
//       translations: duplicateLocales({
//         title: data.title,
//         subtitle: data.subtitle,
//         description: data.desc,
//         duration: data.duration,
//         difficulty: data.difficulty,
//         full_desc: data.full_desc ?? data.desc,
//         steps: (data.steps || []).map((s) => ({ name: s.name, desc: s.desc })),
//         tips: data.tips || [],
//       }),
//     };
//   });
// }

// function buildPodcasts(): Podcast[] {
//   const p = frLocale.b2c.podcast;
//   type PodcastKey = keyof typeof p.episodes;
//   const episodes: { slug: string; key: PodcastKey; duration: string; date: string; image: string; guest: string }[] = [
//     {
//       slug: 'e1',
//       key: 'e1',
//       duration: '45 min',
//       date: '10 Dec 2024',
//       image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800',
//       guest: 'Dr. Maria Santos',
//     },
//     {
//       slug: 'e2',
//       key: 'e2',
//       duration: '38 min',
//       date: '3 Dec 2024',
//       image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=800',
//       guest: 'Sophie Durand',
//     },
//     {
//       slug: 'e3',
//       key: 'e3',
//       duration: '52 min',
//       date: '26 Nov 2024',
//       image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800',
//       guest: 'Jean-Pierre Martin',
//     },
//     {
//       slug: 'e4',
//       key: 'e4',
//       duration: '48 min',
//       date: '19 Nov 2024',
//       image: 'https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=800',
//       guest: 'Amelia Chen',
//     },
//     {
//       slug: 'e5',
//       key: 'e5',
//       duration: '42 min',
//       date: '12 Nov 2024',
//       image: 'https://images.pexels.com/photos/3737579/pexels-photo-3737579.jpeg?auto=compress&cs=tinysrgb&w=800',
//       guest: 'Dr. Claire Dubois',
//     },
//     {
//       slug: 'e6',
//       key: 'e6',
//       duration: '35 min',
//       date: '5 Nov 2024',
//       image: 'https://images.pexels.com/photos/3762874/pexels-photo-3762874.jpeg?auto=compress&cs=tinysrgb&w=800',
//       guest: 'Yuki Tanaka',
//     },
//   ];

//   return episodes.map((ep) => {
//     const data = p.episodes[ep.key];
//     return {
//       slug: ep.slug,
//       image: ep.image,
//       date: ep.date,
//       duration: ep.duration,
//       guest: ep.guest,
//       translations: duplicateLocales({
//         title: data.title,
//         description: data.description,
//         guest_title: data.guest_title,
//       }),
//     };
//   });
// }

// async function createTestUsers() {
//   if (!adminAuth) {
//     throw new Error('Admin Auth not configured');
//   }

//   const users = [
//     {
//       email: 'client@mishki.com',
//       password: 'ClientMishki2025!',
//       role: 'b2c',
//       displayName: 'Client Test B2C',
//     },
//     {
//       email: 'pro@mishki.com',
//       password: 'ProMishki2025!',
//       role: 'b2b',
//       displayName: 'Professionnel Test B2B',
//     },
//   ];

//   const createdUsers = [];

//   for (const userData of users) {
//     try {
//       // Vérifier si l'utilisateur existe déjà
//       let userRecord;
//       try {
//         userRecord = await adminAuth.getUserByEmail(userData.email);
//         console.log(`User ${userData.email} already exists, skipping creation`);
//       } catch (error: any) {
//         if (error.code === 'auth/user-not-found') {
//           // Créer l'utilisateur dans Firebase Auth
//           userRecord = await adminAuth.createUser({
//             email: userData.email,
//             password: userData.password,
//             displayName: userData.displayName,
//             emailVerified: true,
//           });
//           console.log(`Created user: ${userData.email} with UID: ${userRecord.uid}`);
//         } else {
//           throw error;
//         }
//       }

//       // Créer/mettre à jour le document dans Firestore
//       if (userRecord) {
//         const userDoc: any = {
//           email: userData.email,
//           role: userData.role,
//           displayName: userData.displayName,
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//         };

//         // Ajouter des champs spécifiques pour le B2B
//         if (userData.role === 'b2b') {
//           userDoc.validated = true; // Compte validé automatiquement pour les tests
//           userDoc.remise = 15; // Remise pro de 15%
//           userDoc.societe = 'Société Test B2B';
//           userDoc.siret = '12345678901234';
//           userDoc.nom = 'Test';
//           userDoc.prenom = 'Pro';
//         }

//         await adminDb?.collection('users').doc(userRecord.uid).set(userDoc, { merge: true });
//         console.log(`Created/updated Firestore document for ${userData.email}`);

//         createdUsers.push({
//           uid: userRecord.uid,
//           email: userData.email,
//           role: userData.role,
//         });
//       }
//     } catch (error: any) {
//       console.error(`Error creating user ${userData.email}:`, error.message);
//       // Continue avec les autres utilisateurs même en cas d'erreur
//     }
//   }

//   return createdUsers;
// }

export async function POST() {
  if (!ENABLE_SEED) {
    return NextResponse.json({ ok: false, error: 'Seed disabled' }, { status: 403 });
  }

  try {
    const db = adminDb;
    if (!db) {
      return NextResponse.json({ ok: false, error: 'Admin not configured' }, { status: 500 });
    }

    // Créer les utilisateurs de test
    // console.log('Creating test users...');
    // const testUsers = await createTestUsers();
    // console.log(`Created ${testUsers.length} test users`);

    const batch = db.batch();
    const b2bData = buildProtocolesB2B();
    const downloads = buildDownloadsB2B();

    // Products (B2C & B2B shared collection)
    const products = buildProducts();
    for (const prod of products) {
      const ref = db.collection('products').doc(prod.slug);
      batch.set(ref, {
        slug: prod.slug,
        category: prod.category,
        price: prod.price,
        image: prod.image,
        volume: prod.volume,
        stock: prod.stock,
        translations: prod.translations,
        usage: prod.translations.fr.usage || "",
        ingredient_base: prod.translations.fr.ingredient_base || "",
        deliveryDays: { min: 4, max: 10 }
      });
    }

    // Blog posts
    for (const post of buildBlogPosts()) {
      const ref = db.collection('blogPosts').doc(post.slug);
      batch.set(ref, {
        slug: post.slug,
        image: post.image,
        date: post.date,
        readTime: post.readTime,
        category: post.category,
        related: post.related,
        author: post.author,
        defaultLocale: 'fr',
        translations: post.translations,
      });
    }

    // Rituals
    // for (const ritual of buildRituals()) {
    //   const ref = db.collection('rituals').doc(ritual.slug);
    //   batch.set(ref, {
    //     slug: ritual.slug,
    //     image: ritual.image,
    //     products: ritual.products,
    //     defaultLocale: 'fr',
    //     translations: ritual.translations,
    //   });
    // }

    // // Podcasts
    // for (const pod of buildPodcasts()) {
    //   const ref = db.collection('podcasts').doc(pod.slug);
    //   batch.set(ref, {
    //     slug: pod.slug,
    //     image: pod.image,
    //     date: pod.date,
    //     duration: pod.duration,
    //     guest: pod.guest,
    //     defaultLocale: 'fr',
    //     translations: pod.translations,
    //   });
    // }

    // B2B Rituels détaillés
    for (const rituel of b2bData.rituels) {
      const ref = db.collection('rituelsB2B').doc(rituel.slug);
      batch.set(ref, {
        slug: rituel.slug,
        reference: rituel.reference,
        category: rituel.category,
        image: rituel.image,
        theme: rituel.theme,
        ambiance: rituel.ambiance,
        duration: rituel.duration,
        preparation: rituel.preparation,
        deroulement: rituel.deroulement,
        retail: rituel.retail,
        notes: rituel.notes,
        defaultLocale: 'fr',
        translations: rituel.translations,
      });
    }

    // B2B Fiches techniques
    for (const fiche of b2bData.fiches) {
      const ref = db.collection('fichesTechniquesB2B').doc(fiche.slug);
      batch.set(ref, {
        slug: fiche.slug,
        reference: fiche.reference,
        category: fiche.category,
        extraction: fiche.extraction,
        volume: fiche.volume,
        image: fiche.image,
        description: fiche.description,
        proprietes: fiche.proprietes,
        actifs: fiche.actifs,
        utilisation: fiche.utilisation,
        caracteristiques: fiche.caracteristiques,
        avis_experts: fiche.avis_experts,
        defaultLocale: 'fr',
        translations: fiche.translations,
      });
    }

    // B2B Téléchargements (assets)
    for (const asset of downloads) {
      const ref = db.collection('downloadsB2B').doc(asset.slug);
      batch.set(ref, {
        slug: asset.slug,
        type: asset.type,
        category: asset.category,
        format: asset.format,
        size: asset.size,
        url: asset.url,
        defaultLocale: asset.defaultLocale || 'fr',
        translations: asset.translations,
      });
    }

    await batch.commit();
    return NextResponse.json({
      ok: true,
      message: 'Seed completed successfully',
      // users: testUsers,
    });
  } catch (error: unknown) {
    console.error('Seed error', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
