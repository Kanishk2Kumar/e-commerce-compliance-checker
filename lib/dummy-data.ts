export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  imageHint: string;
  status: 'Compliant' | 'Non-compliant' | 'Warning';
  category?: string; // Added for similar products functionality
  productUrl?: string; // Added for similar products redirect functionality
};

export type ScanReport = {
  id: string;
  companyName: string;
  companyUrl: string;
  companyLogoUrl: string;
  companyLogoHint: string;
  productsScannedCount: number;
  nonCompliantProductsCount: number;
  date: string;
  scanData: string;
  products: Product[];
};

export const dummyScans: ScanReport[] = [
  {
    id: 'scan-001',
    companyName: 'Blinkit',
    companyUrl: 'blinkit.com',
    companyLogoUrl: 'https://yt3.googleusercontent.com/oe7za_pjcm3tYZKtTAs6aWuZCOzB6aHWnZOGYwrYjuZe72SMkVs3qoCElDQl-ob8CaKNimXI=s900-c-k-c0x00ffffff-no-rj',
    companyLogoHint: 'Blinkit quick commerce logo',
    productsScannedCount: 850,
    nonCompliantProductsCount: 23,
    date: '2024-07-29T10:30:00Z',
    scanData: `Scan of blinkit.com completed. Found 850 products. 
    - 827 products have proper MRP, manufacturing date, and expiry details.
    - 15 grocery items missing manufacturing dates.
    - 8 products have unclear MRP information.
    - All fresh products have proper declarations.`,
    products: [
      { 
        id: 'p-001', 
        name: 'Amul Taaza Milk 500ml', 
        imageUrl: 'https://picsum.photos/seed/201/100/100', 
        imageHint: 'milk packet', 
        status: 'Compliant',
        category: 'Dairy',
        productUrl: 'https://blinkit.com/products/amul-taaza-milk-500ml'
      },
      { 
        id: 'p-002', 
        name: 'Britannia Bread', 
        imageUrl: 'https://picsum.photos/seed/202/100/100', 
        imageHint: 'bread packet', 
        status: 'Compliant',
        category: 'Bakery',
        productUrl: 'https://blinkit.com/products/britannia-bread'
      },
      { 
        id: 'p-003', 
        name: 'Local Biscuits Pack', 
        imageUrl: 'https://picsum.photos/seed/203/100/100', 
        imageHint: 'biscuit packet', 
        status: 'Non-compliant',
        category: 'Snacks',
        productUrl: 'https://blinkit.com/products/local-biscuits-pack'
      },
      { 
        id: 'p-004', 
        name: 'Fresh Vegetables Pack', 
        imageUrl: 'https://picsum.photos/seed/204/100/100', 
        imageHint: 'vegetables', 
        status: 'Warning',
        category: 'Vegetables',
        productUrl: 'https://blinkit.com/products/fresh-vegetables-pack'
      },
      { 
        id: 'p-005', 
        name: 'Soft Drink 1L', 
        imageUrl: 'https://picsum.photos/seed/205/100/100', 
        imageHint: 'soft drink bottle', 
        status: 'Compliant',
        category: 'Beverages',
        productUrl: 'https://blinkit.com/products/soft-drink-1l'
      },
    ],
  },
  {
    id: 'scan-002',
    companyName: 'Zepto',
    companyUrl: 'zepto.com',
    companyLogoUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7d/Logo_of_Zepto.png',
    companyLogoHint: 'Zepto 10-minute delivery logo',
    productsScannedCount: 920,
    nonCompliantProductsCount: 18,
    date: '2024-07-28T14:45:00Z',
    scanData: `Scan of zepto.com completed. Found 920 products.
    - 902 products are fully compliant with FSSAI regulations.
    - 12 products missing expiry dates.
    - 6 imported snacks missing importer details.
    - All pricing information is accurate.`,
    products: [
      { 
        id: 'p-006', 
        name: 'Lays Chips', 
        imageUrl: 'https://picsum.photos/seed/206/100/100', 
        imageHint: 'chips packet', 
        status: 'Compliant',
        category: 'Snacks',
        productUrl: 'https://zepto.com/products/lays-chips'
      },
      { 
        id: 'p-007', 
        name: 'Dairy Milk Chocolate', 
        imageUrl: 'https://picsum.photos/seed/207/100/100', 
        imageHint: 'chocolate bar', 
        status: 'Non-compliant',
        category: 'Confectionery',
        productUrl: 'https://zepto.com/products/dairy-milk-chocolate'
      },
      { 
        id: 'p-008', 
        name: 'Basmati Rice 1kg', 
        imageUrl: 'https://picsum.photos/seed/208/100/100', 
        imageHint: 'rice packet', 
        status: 'Compliant',
        category: 'Grains',
        productUrl: 'https://zepto.com/products/basmati-rice-1kg'
      },
      { 
        id: 'p-025', 
        name: 'Cadbury Chocolate', 
        imageUrl: 'https://picsum.photos/seed/225/100/100', 
        imageHint: 'chocolate bar', 
        status: 'Compliant',
        category: 'Confectionery',
        productUrl: 'https://zepto.com/products/cadbury-chocolate'
      },
      { 
        id: 'p-026', 
        name: 'Premium Basmati Rice', 
        imageUrl: 'https://picsum.photos/seed/226/100/100', 
        imageHint: 'rice packet', 
        status: 'Compliant',
        category: 'Grains',
        productUrl: 'https://zepto.com/products/premium-basmati-rice'
      },
    ],
  },
  {
    id: 'scan-003',
    companyName: 'BigBasket',
    companyUrl: 'bigbasket.com',
    companyLogoUrl: 'https://wp.logos-download.com/wp-content/uploads/2021/01/Bigbasket_Logo.png?dl',
    companyLogoHint: 'BigBasket online grocery logo',
    productsScannedCount: 1500,
    nonCompliantProductsCount: 45,
    date: '2024-07-27T09:15:00Z',
    scanData: `Scan of bigbasket.com completed. Found 1500 products.
    - 1455 products are fully compliant with Legal Metrology declarations.
    - 25 products missing net quantity details.
    - 20 products with incorrect MRP labeling.`,
    products: [
      { 
        id: 'p-009', 
        name: 'Fortune Oil 1L', 
        imageUrl: 'https://picsum.photos/seed/209/100/100', 
        imageHint: 'cooking oil', 
        status: 'Compliant',
        category: 'Cooking Oil',
        productUrl: 'https://bigbasket.com/products/fortune-oil-1l'
      },
      { 
        id: 'p-010', 
        name: 'Aashirvaad Atta 5kg', 
        imageUrl: 'https://picsum.photos/seed/210/100/100', 
        imageHint: 'flour packet', 
        status: 'Compliant',
        category: 'Flour',
        productUrl: 'https://bigbasket.com/products/aashirvaad-atta-5kg'
      },
      { 
        id: 'p-027', 
        name: 'Sunflower Oil 1L', 
        imageUrl: 'https://picsum.photos/seed/227/100/100', 
        imageHint: 'cooking oil', 
        status: 'Non-compliant',
        category: 'Cooking Oil',
        productUrl: 'https://bigbasket.com/products/sunflower-oil-1l'
      },
    ],
  },
  {
    id: 'scan-004',
    companyName: 'Swiggy Instamart',
    companyUrl: 'swiggy.com',
    companyLogoUrl: 'https://images.bhaskarassets.com/thumb/360x0/web2images/1884/2025/05/27/instaprelogo_1748339306.png',
    companyLogoHint: 'Swiggy Instamart delivery logo',
    productsScannedCount: 780,
    nonCompliantProductsCount: 32,
    date: '2024-07-26T16:20:00Z',
    scanData: `Scan of swiggy instamart completed. Found 780 products.
    - 748 products are fully compliant.
    - 25 household items missing manufacturing dates.
    - 7 products with ambiguous quantity declarations.`,
    products: [
      { 
        id: 'p-011', 
        name: 'Detergent Powder', 
        imageUrl: 'https://picsum.photos/seed/211/100/100', 
        imageHint: 'detergent packet', 
        status: 'Compliant',
        category: 'Household',
        productUrl: 'https://swiggy.com/products/detergent-powder'
      },
      { 
        id: 'p-012', 
        name: 'Toilet Cleaner', 
        imageUrl: 'https://picsum.photos/seed/212/100/100', 
        imageHint: 'cleaner bottle', 
        status: 'Non-compliant',
        category: 'Household',
        productUrl: 'https://swiggy.com/products/toilet-cleaner'
      },
      { 
        id: 'p-028', 
        name: 'Liquid Detergent', 
        imageUrl: 'https://picsum.photos/seed/228/100/100', 
        imageHint: 'detergent bottle', 
        status: 'Compliant',
        category: 'Household',
        productUrl: 'https://swiggy.com/products/liquid-detergent'
      },
    ],
  },
  {
    id: 'scan-005',
    companyName: 'DMart',
    companyUrl: 'dmart.com',
    companyLogoUrl: 'https://s3-symbol-logo.tradingview.com/avenue-supermarts--600.png',
    companyLogoHint: 'DMart supermarket chain logo',
    productsScannedCount: 2100,
    nonCompliantProductsCount: 67,
    date: '2024-07-25T11:00:00Z',
    scanData: `Scan of dmart.com completed. Found 2100 products.
    - 2033 products are fully compliant.
    - 45 grocery items missing net quantity details.
    - 22 products with incorrect packaging dates.`,
    products: [
      { 
        id: 'p-013', 
        name: 'Sugar 1kg', 
        imageUrl: 'https://picsum.photos/seed/213/100/100', 
        imageHint: 'sugar packet', 
        status: 'Non-compliant',
        category: 'Sweeteners',
        productUrl: 'https://dmart.com/products/sugar-1kg'
      },
      { 
        id: 'p-014', 
        name: 'Tea Powder 500g', 
        imageUrl: 'https://picsum.photos/seed/214/100/100', 
        imageHint: 'tea packet', 
        status: 'Compliant',
        category: 'Beverages',
        productUrl: 'https://dmart.com/products/tea-powder-500g'
      },
      { 
        id: 'p-029', 
        name: 'Brown Sugar 500g', 
        imageUrl: 'https://picsum.photos/seed/229/100/100', 
        imageHint: 'sugar packet', 
        status: 'Compliant',
        category: 'Sweeteners',
        productUrl: 'https://dmart.com/products/brown-sugar-500g'
      },
    ],
  },
  {
    id: 'scan-006',
    companyName: 'Reliance Fresh',
    companyUrl: 'relianceretail.com',
    companyLogoUrl: 'https://i.pinimg.com/736x/ee/df/ab/eedfabd3beed54d31ed6132fe2e4dc14.jpg',
    companyLogoHint: 'Reliance Fresh supermarket logo',
    productsScannedCount: 1200,
    nonCompliantProductsCount: 28,
    date: '2024-07-24T13:45:00Z',
    scanData: `Scan of reliance fresh completed. Found 1200 products.
    - 1172 products are fully compliant.
    - 18 fresh products missing packaging dates.
    - 10 products with unclear quantity declarations.`,
    products: [
      { 
        id: 'p-015', 
        name: 'Fresh Fruits Basket', 
        imageUrl: 'https://picsum.photos/seed/215/100/100', 
        imageHint: 'fruits', 
        status: 'Compliant',
        category: 'Fruits',
        productUrl: 'https://relianceretail.com/products/fresh-fruits-basket'
      },
      { 
        id: 'p-016', 
        name: 'Frozen Peas', 
        imageUrl: 'https://picsum.photos/seed/216/100/100', 
        imageHint: 'frozen peas', 
        status: 'Warning',
        category: 'Frozen Foods',
        productUrl: 'https://relianceretail.com/products/frozen-peas'
      },
      { 
        id: 'p-030', 
        name: 'Mixed Fruits Pack', 
        imageUrl: 'https://picsum.photos/seed/230/100/100', 
        imageHint: 'fruits', 
        status: 'Compliant',
        category: 'Fruits',
        productUrl: 'https://relianceretail.com/products/mixed-fruits-pack'
      },
    ],
  },
  {
    id: 'scan-007',
    companyName: 'Nature\'s Basket',
    companyUrl: 'naturesbasket.co.in',
    companyLogoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRRG4q2UD8_J1f1pLHevlZlBPQGNC7nk1QWw&s',
    companyLogoHint: 'Nature\'s Basket premium grocery logo',
    productsScannedCount: 650,
    nonCompliantProductsCount: 15,
    date: '2024-07-23T15:30:00Z',
    scanData: `Scan of nature\'s basket completed. Found 650 products.
    - 635 products are fully compliant.
    - 10 imported products missing importer details.
    - 5 organic products missing certification labels.`,
    products: [
      { 
        id: 'p-017', 
        name: 'Imported Cheese', 
        imageUrl: 'https://picsum.photos/seed/217/100/100', 
        imageHint: 'cheese block', 
        status: 'Non-compliant',
        category: 'Dairy',
        productUrl: 'https://naturesbasket.co.in/products/imported-cheese'
      },
      { 
        id: 'p-018', 
        name: 'Organic Honey', 
        imageUrl: 'https://picsum.photos/seed/218/100/100', 
        imageHint: 'honey jar', 
        status: 'Compliant',
        category: 'Sweeteners',
        productUrl: 'https://naturesbasket.co.in/products/organic-honey'
      },
      { 
        id: 'p-031', 
        name: 'Local Cheese', 
        imageUrl: 'https://picsum.photos/seed/231/100/100', 
        imageHint: 'cheese block', 
        status: 'Compliant',
        category: 'Dairy',
        productUrl: 'https://naturesbasket.co.in/products/local-cheese'
      },
    ],
  },
  {
    id: 'scan-008',
    companyName: 'More Retail',
    companyUrl: 'more.retail',
    companyLogoUrl: 'https://media.licdn.com/dms/image/v2/D560BAQGWJdf6a3qMTA/company-logo_200_200/B56ZXwPcQLHEAI-/0/1743492335943/more_retail_private_limited_logo?e=2147483647&v=beta&t=sP7uBL_TpihfoSlS6lV29Onks41iJybE62AqogBmMCo',
    companyLogoHint: 'More supermarket chain logo',
    productsScannedCount: 950,
    nonCompliantProductsCount: 42,
    date: '2024-07-22T10:00:00Z',
    scanData: `Scan of more retail completed. Found 950 products.
    - 908 products are fully compliant.
    - 30 products missing manufacturing dates.
    - 12 products with incorrect MRP labeling.`,
    products: [
      { 
        id: 'p-019', 
        name: 'Cooking Spices', 
        imageUrl: 'https://picsum.photos/seed/219/100/100', 
        imageHint: 'spice jars', 
        status: 'Compliant',
        category: 'Spices',
        productUrl: 'https://more.retail/products/cooking-spices'
      },
      { 
        id: 'p-020', 
        name: 'Ready-to-Eat Meals', 
        imageUrl: 'https://picsum.photos/seed/220/100/100', 
        imageHint: 'ready meal', 
        status: 'Compliant',
        category: 'Ready-to-Eat',
        productUrl: 'https://more.retail/products/ready-to-eat-meals'
      },
      { 
        id: 'p-032', 
        name: 'Garam Masala', 
        imageUrl: 'https://picsum.photos/seed/232/100/100', 
        imageHint: 'spice powder', 
        status: 'Non-compliant',
        category: 'Spices',
        productUrl: 'https://more.retail/products/garam-masala'
      },
    ],
  },
  {
    id: 'scan-009',
    companyName: 'Spencer\'s Retail',
    companyUrl: 'spencersretail.com',
    companyLogoUrl: 'https://media.licdn.com/dms/image/v2/D560BAQEfaHQ5J95-ow/company-logo_200_200/company-logo_200_200/0/1689341480491/spencersretail_logo?e=2147483647&v=beta&t=DQ9KVqujxKG-krnY2mWBAa1Xfsz5UN0ew4-nW9OrzTM',
    companyLogoHint: 'Spencer\'s retail supermarket logo',
    productsScannedCount: 880,
    nonCompliantProductsCount: 38,
    date: '2024-07-21T14:15:00Z',
    scanData: `Scan of spencer\'s retail completed. Found 880 products.
    - 842 products are fully compliant.
    - 25 products missing expiry dates.
    - 13 imported goods missing country of origin.`,
    products: [
      { 
        id: 'p-021', 
        name: 'Bakery Items', 
        imageUrl: 'https://picsum.photos/seed/221/100/100', 
        imageHint: 'bakery products', 
        status: 'Compliant',
        category: 'Bakery',
        productUrl: 'https://spencersretail.com/products/bakery-items'
      },
      { 
        id: 'p-022', 
        name: 'Imported Chocolates', 
        imageUrl: 'https://picsum.photos/seed/222/100/100', 
        imageHint: 'chocolates', 
        status: 'Non-compliant',
        category: 'Confectionery',
        productUrl: 'https://spencersretail.com/products/imported-chocolates'
      },
      { 
        id: 'p-033', 
        name: 'Fresh Bread', 
        imageUrl: 'https://picsum.photos/seed/233/100/100', 
        imageHint: 'bread loaf', 
        status: 'Compliant',
        category: 'Bakery',
        productUrl: 'https://spencersretail.com/products/fresh-bread'
      },
    ],
  },
  {
    id: 'scan-010',
    companyName: 'Star Bazaar',
    companyUrl: 'starbazaar.com',
    companyLogoUrl: 'https://content.jdmagicbox.com/comp/pune/m7/020pxx20.xx20.220122130353.c1m7/catalogue/star-bazaar-wagholi-pune-supermarkets-pemtlgcrcm.jpg',
    companyLogoHint: 'Star Bazaar hypermarket logo',
    productsScannedCount: 1100,
    nonCompliantProductsCount: 51,
    date: '2024-07-20T12:30:00Z',
    scanData: `Scan of star bazaar completed. Found 1100 products.
    - 1049 products are fully compliant.
    - 35 products missing quantity declarations.
    - 16 products with ambiguous pricing.`,
    products: [
      { 
        id: 'p-023', 
        name: 'Household Cleaners', 
        imageUrl: 'https://picsum.photos/seed/223/100/100', 
        imageHint: 'cleaning products', 
        status: 'Compliant',
        category: 'Household',
        productUrl: 'https://starbazaar.com/products/household-cleaners'
      },
      { 
        id: 'p-024', 
        name: 'Personal Care Items', 
        imageUrl: 'https://picsum.photos/seed/224/100/100', 
        imageHint: 'personal care', 
        status: 'Warning',
        category: 'Personal Care',
        productUrl: 'https://starbazaar.com/products/personal-care-items'
      },
      { 
        id: 'p-034', 
        name: 'Bathroom Cleaner', 
        imageUrl: 'https://picsum.photos/seed/234/100/100', 
        imageHint: 'cleaner bottle', 
        status: 'Compliant',
        category: 'Household',
        productUrl: 'https://starbazaar.com/products/bathroom-cleaner'
      },
    ],
  },
];