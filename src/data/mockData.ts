import { Product } from '../types';
import { ProductCategory, ProductType } from '../types/enums';

// ============================================
// 1. TRAVESSEIROS
// ============================================
const TRAVESSEIROS: Product[] = [
  {
    id: '10052',
    sku: 'TRAV-GM-5070',
    name: 'Travesseiro GM Confecções 50x70 cm',
    description:
      'Travesseiro com enchimento 100% fibra de poliéster e revestimento em poliéster, higiênico, não alérgico e indeformável.',
    category: ProductCategory.CAMA,
    type: ProductType.TRAVESSEIRO,
    price: 0,
    images: [require('../../assets/travesseiro-comforte.png')],
    inStock: true,
    featured: true,
    onSale: true,
    brand: 'GM Confecções',
    composition: {
      enchimento: '100% Fibra de Poliéster',
      revestimento: '100% Poliéster',
      material: 'Poliéster',
      acabamento: 'Não se aplica'
    },
    dimensions: {
      fronha: '50 x 70 cm'
    },
    unitCount: 1,
    features: [
      'Alta durabilidade',
      'Higiênico',
      'Indeformável',
      'Mantém a temperatura constante',
      'Não alérgico',
      'Produto inodoro',
      'Postura ideal para dormir'
    ],
    rating: 4.7,
    reviewCount: 12,
    color: 'Branco',
    pattern: 'Liso'
  },
  {
    id: '101044',
    sku: 'TRAV-GM-NASAX-ALTO',
    name: 'Travesseiro Viscoelástico NASA X Alto',
    description:
      'Travesseiro viscoelástico automoldável, que proporciona conforto e suporte anatômico.',
    category: ProductCategory.CAMA,
    type: ProductType.TRAVESSEIRO,
    price: 0,
    images: [require('../../assets/travesseiro-nasa-x.png')],
    inStock: true,
    featured: true,
    onSale: false,
    brand: 'Duoflex | GM Confecções',
    composition: {
      enchimento: 'Espuma 100% Poliuretano Viscoelástica',
      revestimento: 'Malha 100% Algodão',
      material: 'Viscoelástico',
      acabamento: 'Não se aplica'
    },
    dimensions: {
      fronha: '50 x 70 cm',
      medidas: '40 cm x 60 cm x 13 cm'
    },
    unitCount: 1,
    features: [
      'Automoldável e anti-pressão',
      'Macio e extremamente confortável',
      'Acomodação da cabeça e pescoço',
      'Suporte anatômico',
      'Antiácaros, fungos e bactérias'
    ],
    rating: 4.9,
    reviewCount: 34,
    color: 'Bege',
    pattern: 'Liso'
  }
];

// ============================================
// 2. LENÇÓIS
// ============================================
const LENCOIS: Product[] = [
  {
    id: '10001',
    sku: 'JL-MALHA-001',
    name: 'Jogo de Lençol Malha Algodão, Liso | Vermelho',
    description:
      'Jogo de lençol 100% algodão, macio e respirável. Inclui lençol de baixo, lençol de cima e fronha(s). Disponível em diversos estampados e cores.',
    category: ProductCategory.CAMA,
    type: ProductType.READY_MADE,
    price: 0,
    images: [require('../../assets/jogo-de-lençol-vermelho.jpeg')],
    inStock: true,
    featured: true,
    onSale: false,
    brand: 'GM Confecções',
    color: 'N/A',
    pattern: 'Liso',
    colors: ['Branco', 'Bege', 'Cinza', 'Azul Bebê', 'Rosa Bebê'],
    composition: {
      enchimento: 'Não se aplica',
      revestimento: '100% Algodão',
      material: 'Algodão',
      acabamento: 'Tecido plano'
    },
    variants: [
      {
        id: '10001-0',
        name: 'Solteiro',
        dimensions: 'Tamanho Solteiro: C 1,88 X L 0,88 X A 0,23',
        includes: '1 lençol e 1 fronha',
        price: 0
      },
      {
        id: '10001-1',
        name: 'Solteirão',
        dimensions: 'Tamanho Solteirão: 2,68m x 1,78m',
        includes: '1 lençol e 1 fronha',
        price: 0
      },
      {
        id: '10001-2',
        name: 'Casal',
        dimensions: 'Tamanho Casal:  C 1,88 X L 1,38 X A 0,25',
        includes: '1 lençol e 2 fronhas',
        price: 0
      },
      {
        id: '10001-3',
        name: 'Queen',
        dimensions: 'Tamanho Queen:  C 1,98 X L 1,58 X A 0,25',
        includes: '1 lençol e 2 fronhas',
        price: 0
      },
      {
        id: '10001-4',
        name: 'King',
        dimensions: 'Tamanho King: C 1,98 X L 1,58 X A 0,30',
        includes: '1 lençol e 2 fronhas',
        price: 0
      },
      {
        id: '10001-5',
        name: 'Super King',
        dimensions: 'Tamanho Super King: C 2,03 X L 1,93 X A 0,38',
        includes: '1 lençol e 2 fronhas',
        price: 0
      }
    ],
    unitCount: 1,
    features: [
      '100% algodão macio e respirável',
      'Conforto térmico',
      'Fácil manutenção',
      'Não desbota',
      'Disponível em várias cores'
    ],
    rating: 4.8,
    reviewCount: 24
  },
  {
    id: '10002',
    sku: 'JL-MALHA-002',
    name: 'Jogo de Lençol Malha Algodão, Estampado',
    description:
      'Jogo de lençol 100% algodão, macio e respirável com estampas exclusivas. Inclui lençol de baixo, lençol de cima e fronha(s). Disponível em diversas cores.',
    category: ProductCategory.CAMA,
    type: ProductType.READY_MADE,
    price: 0,
    images: [require('../../assets/JogodeLençolMalhaAlgodão.jpeg')],
    inStock: true,
    featured: true,
    onSale: false,
    brand: 'GM Confecções',
    color: 'N/A',
    pattern: 'Estampado',
    colors: ['Azul', 'Rosa', 'Verde', 'Cinza', 'Bege'],
    composition: {
      enchimento: 'Não se aplica',
      revestimento: '100% Algodão',
      material: 'Algodão',
      acabamento: 'Tecido plano'
    },
    variants: [
      {
        id: '10002-0',
        name: 'Solteiro',
        dimensions: 'Tamanho Solteiro: C 1,88 X L 0,88 X A 0,23',
        includes: '1 lençol e 1 fronha',
        price: 0
      },
      {
        id: '10002-1',
        name: 'Solteirão',
        dimensions: 'Tamanho Solteirão: 2,68m x 1,78m',
        includes: '1 lençol e 1 fronha',
        price: 0
      },
      {
        id: '10002-2',
        name: 'Casal',
        dimensions: 'Tamanho Casal: C 1,88 X L 1,38 X A 0,25',
        includes: '1 lençol e 2 fronhas',
        price: 0
      },
      {
        id: '10002-3',
        name: 'Queen',
        dimensions: 'Tamanho Queen: C 1,98 X L 1,58 X A 0,25',
        includes: '1 lençol e 2 fronhas',
        price: 0
      },
      {
        id: '10002-4',
        name: 'King',
        dimensions: 'Tamanho King: C 1,98 X L 1,58 X A 0,38',
        includes: '1 lençol e 2 fronhas',
        price: 0
      },
      {
        id: '10002-5',
        name: 'Super King',
        dimensions: 'Tamanho Super King: C 2,03 X L 1,93 X A 0,40',
        includes: '1 lençol e 2 fronhas',
        price: 0
      }
    ],
    unitCount: 1,
    features: [
      '100% algodão macio e respirável',
      'Conforto térmico',
      'Fácil manutenção',
      'Não desbota',
      'Disponível em várias cores',
      'Estampas exclusivas'
    ],
    rating: 4.8,
    reviewCount: 18
  }
];

// ============================================
// 3. COLCHAS
// ============================================
const COLCHAS: Product[] = [
  {
    id: '100038',
    name: 'Jogo de Colcha Lençol Malha',
    description: 'Colcha sofisticada da linha Elegance com estampas exclusivas.',
    category: ProductCategory.CAMA,
    type: ProductType.READY_MADE,
    price: 0,
    images: [require('../../assets/JogodeLençolMalhaAlgodão.jpeg')],
    inStock: true,
    featured: true,
    onSale: false,
    brand: 'GM Confecções',
    composition: {
      enchimento: '100% Algodão',
      revestimento: '100% Algodão',
      material: 'Algodão Egípcio',
      acabamento: 'Virol de cetim'
    },
    variants: [
      { id: '100038-1', name: 'Solteiro', dimensions: 'C 1,90 X L 0,89 X A 0,45', includes: '1 colcha', price: 0 },
      { id: '100038-2', name: 'King', dimensions: 'C 2.00 x L 1.58 X A 0.45', includes: '', price: 0 },
      { id: '100038-3', name: 'Casal', dimensions: 'C 1.90 x L 1.45 X A 0.45', includes: '1 colcha', price: 0 },
      { id: '100038-4', name: 'Super King', dimensions: 'C 2.03 X L 1.96 X A 0.60', includes: '1 colcha', price: 0 },
    ],
    unitCount: 1,
    features: [
      'Tecido 230 fios de algodão egípcio',
      'Estampas exclusivas',
      'Toque macio',
      'Lavável à máquina'
    ],
    rating: 4.9,
    reviewCount: 0,
    color: 'Vários',
    pattern: 'Estampado'
  },
  {
    id: '100034',
    name: 'Jogo de Colcha Malha',
    description: 'Jogo de colcha malha 100% algodão, macio e respirável.',
    category: ProductCategory.CAMA,
    type: ProductType.READY_MADE,
    price: 0,
    images: [require('../../assets/JogodeLençolMalhaAlgodão.jpeg')],
    inStock: true,
    featured: true,
    onSale: false,
    brand: 'GM Confecções',
    composition: {
      enchimento: '100% Algodão',
      revestimento: '100% Algodão',
      material: 'Algodão Egípcio',
      acabamento: 'Virol de cetim'
    },
    variants: [
      { id: '100034-1', name: 'Solteiro', dimensions: '?', includes: '1 colcha', price: 0 },
      { id: '100034-2', name: 'King', dimensions: '?', includes: '1 colcha', price: 0 },
      { id: '100034-3', name: 'Casal', dimensions: '?', includes: '1 colcha', price: 0 },
    ],
    unitCount: 1,
    features: [
      'Tecido 230 fios de algodão egípcio',
      'Estampas exclusivas',
      'Toque macio',
      'Lavável à máquina'
    ],
    rating: 4.9,
    reviewCount: 0,
    color: 'Vários',
    pattern: 'Estampado'
  },
  {
    id: '100111',
    name: 'Jogo de lençol Malha c/ Virol',
    description: 'Jogo de lençol malha 100% algodão, macio e respirável.',
    category: ProductCategory.CAMA,
    type: ProductType.READY_MADE,
    price: 0,
    images: [require('../../assets/JogodeLençolMalhaAlgodão.jpeg')],
    inStock: true,
    featured: true,
    onSale: false,
    brand: 'GM Confecções',
    composition: {
      enchimento: '100% Algodão',
      revestimento: '100% Algodão',
      material: 'Algodão Egípcio',
      acabamento: 'Virol de cetim'
    },
    variants: [
      { id: '100111-1', name: 'Solteiro', dimensions: '?', includes: '1 lençol', price: 0 },
      { id: '100111-2', name: 'King', dimensions: '?', includes: '1 lençol', price: 0 },
      { id: '100111-3', name: 'Casal', dimensions: '?', includes: '1 lençol', price: 0 },
    ],
    unitCount: 1,
    features: [
      'Tecido 230 fios de algodão egípcio',
      'Estampas exclusivas',
      'Toque macio',
      'Lavável à máquina'
    ],
    rating: 4.9,
    reviewCount: 0,
    color: 'Vários',
    pattern: 'Estampado'
  },
  {
    id: '100111',
    name: 'Jogo de lençol Malha c/ Virol',
    description: 'Jogo de lençol malha 100% algodão, macio e respirável.',
    category: ProductCategory.CAMA,
    type: ProductType.READY_MADE,
    price: 0,
    images: [require('../../assets/JogodeLençolMalhaAlgodão.jpeg')],
    inStock: true,
    featured: true,
    onSale: false,
    brand: 'GM Confecções',
    composition: {
      enchimento: '100% Algodão',
      revestimento: '100% Algodão',
      material: 'Algodão Egípcio',
      acabamento: 'Virol de cetim'
    },
    variants: [
      { id: '100112-1', name: 'Solteiro', dimensions: '?', includes: '1 lençol', price: 0 },
      { id: '100112-2', name: 'King', dimensions: '?', includes: '1 lençol', price: 0 },
      { id: '100112-3', name: 'Casal', dimensions: '?', includes: '1 lençol', price: 0 },
    ],
    unitCount: 1,
    features: [
      'Tecido 230 fios de algodão egípcio',
      'Estampas exclusivas',
      'Toque macio',
      'Lavável à máquina'
    ],
    rating: 4.9,
    reviewCount: 0,
    color: 'Vários',
    pattern: 'Estampado'
  }
];

// ============================================
// 4. COBERTORES
// ============================================
const COBERTORES: Product[] = [
  {
    id: '100059',
    name: 'Coberdrom Folhagem',
    description: 'Coberdrom estampado com delicado motivo de folhagens.',
    category: ProductCategory.CAMA,
    type: ProductType.COBERTO,
    price: 0,
    images: [require('../../assets/JogodeLençolMalhaAlgodão.jpeg')],
    inStock: true,
    featured: true,
    onSale: false,
    brand: 'GM Confecções',
    composition: {
      enchimento: 'Fibra siliconada',
      revestimento: '100% Algodão',
      material: 'Algodão',
      acabamento: 'Não se aplica'
    },
    variants: [
      { id: '100059-1', name: 'Casal', dimensions: '2,30m x 2,30m', includes: '1 cobertor', price: 0 },
      { id: '100059-2', name: 'Queen', dimensions: '2,60m x 2,40m', includes: '1 cobertor', price: 0 }
    ],
    unitCount: 1,
    features: ['Estampa de folhagens', 'Tecido macio', 'Aconchegante', 'Lavável à máquina'],
    rating: 4.8,
    reviewCount: 0,
    color: 'Verde',
    pattern: 'Estampado'
  }
];

// ============================================
// 5. KITS DE CAMA
// ============================================
const KITS_CAMA: Product[] = [
  {
    id: '100039',
    name: 'Kit Colcha Casal Luna C/Cortina Casal',
    description: 'Kit completo com colcha e cortina combinando.',
    category: ProductCategory.CAMA,
    type: ProductType.KIT,
    price: 0,
    images: [require('../../assets/JogodeLençolMalhaAlgodão.jpeg')],
    inStock: true,
    featured: true,
    onSale: false,
    brand: 'GM Confecções',
    composition: {
      enchimento: 'Algodão',
      revestimento: '100% Algodão',
      material: 'Algodão',
      acabamento: '200 fios'
    },
    variants: [
      {
        id: '100039-1',
        name: 'Casal',
        dimensions: 'Colcha: 1,80m x 2,10m | Cortina: 1,40m x 2,50m',
        includes: '1 colcha + 2 painéis de cortina',
        price: 0
      }
    ],
    unitCount: 1,
    features: [
      'Kit completo para quarto',
      'Estampa lua e estrelas',
      'Tecido 200 fios de algodão',
      'Lavável à máquina'
    ],
    rating: 4.9,
    reviewCount: 0,
    color: 'Azul',
    pattern: 'Estampado'
  }
];

// ============================================
// 6. TOALHAS
// ============================================
const TOALHAS: Product[] = [
  {
    id: '100042',
    name: 'Capa de Travesseiro Percal',
    description: 'Capa de travesseiro em tecido percal de alta qualidade.',
    category: ProductCategory.BANHO,
    type: ProductType.TOALHA,
    price: 0,
    images: [require('../../assets/JogodeLençolMalhaAlgodão.jpeg')],
    inStock: true,
    featured: true,
    onSale: false,
    brand: 'GM Confecções',
    composition: {
      enchimento: 'Não se aplica',
      revestimento: 'Percal 200 fios',
      material: 'Algodão',
      acabamento: 'Costura reforçada'
    },
    variants: [
      {
        id: '100042-1',
        name: 'Padrão',
        dimensions: '50cm x 70cm',
        includes: '1 capa de travesseiro',
        price: 0
      }
    ],
    unitCount: 1,
    features: ['Tecido percal 200 fios', 'Maciez e durabilidade', 'Lavável à máquina'],
    rating: 4.7,
    reviewCount: 0,
    color: 'Vários',
    pattern: 'Liso'
  }
];

// ============================================
// EXPORTAÇÃO DOS DADOS
// ============================================
export const mockProducts: Product[] = [
  ...TRAVESSEIROS,
  ...LENCOIS,
  ...COLCHAS,
  ...COBERTORES,
  ...KITS_CAMA,
  ...TOALHAS
];
