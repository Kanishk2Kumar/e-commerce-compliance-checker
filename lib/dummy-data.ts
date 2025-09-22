export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  imageHint: string;
  status: 'Compliant' | 'Non-compliant' | 'Warning';
};

export type ScanReport = {
  id: string;
  companyName: string;
  companyUrl: string;
  companyLogoUrl: string;
  companyLogoHint: string;
  productsScannedCount: number;
  date: string;
  scanData: string; // For GenAI
  products: Product[];
};

export const dummyScans: ScanReport[] = [
  {
    id: 'scan-001',
    companyName: 'Urban Outfitters',
    companyUrl: 'urbanoutfitters.com',
    companyLogoUrl: 'https://picsum.photos/seed/1/40/40',
    companyLogoHint: 'company logo',
    productsScannedCount: 125,
    date: '2024-07-29',
    scanData: `Scan of urbanoutfitters.com completed. Found 125 products. 
    - 98 products have full MRP, manufacturing date, and country of origin.
    - 15 products are missing country of origin.
    - 12 products have unclear MRP information.
    - All electronics have proper declarations.`,
    products: [
      { id: 'p-001', name: 'Vintage Washed Tee', imageUrl: 'https://picsum.photos/seed/101/100/100', imageHint: 't-shirt', status: 'Compliant' },
      { id: 'p-002', name: 'BDG High-Waisted Jeans', imageUrl: 'https://picsum.photos/seed/102/100/100', imageHint: 'jeans', status: 'Compliant' },
      { id: 'p-003', name: 'Smoko UO Exclusive Light', imageUrl: 'https://picsum.photos/seed/103/100/100', imageHint: 'lamp', status: 'Non-compliant' },
      { id: 'p-004', name: 'Crosley Bluetooth Record Player', imageUrl: 'https://picsum.photos/seed/104/100/100', imageHint: 'record player', status: 'Warning' },
      { id: 'p-005', name: 'Fujifilm UO Exclusive Camera', imageUrl: 'https://picsum.photos/seed/105/100/100', imageHint: 'camera', status: 'Compliant' },
    ],
  },
  {
    id: 'scan-002',
    companyName: 'Nordstrom',
    companyUrl: 'nordstrom.com',
    companyLogoUrl: 'https://picsum.photos/seed/2/40/40',
    companyLogoHint: 'fashion logo',
    productsScannedCount: 480,
    date: '2024-07-28',
    scanData: `Scan of nordstrom.com completed. Found 480 products.
    - 450 products are fully compliant.
    - 30 products are imported cosmetics missing the importer's address.
    - All other declarations are correct.`,
    products: [
      { id: 'p-006', name: 'Designer Handbag', imageUrl: 'https://picsum.photos/seed/106/100/100', imageHint: 'handbag', status: 'Compliant' },
      { id: 'p-007', name: 'Luxury Perfume', imageUrl: 'https://picsum.photos/seed/107/100/100', imageHint: 'perfume bottle', status: 'Non-compliant' },
      { id: 'p-008', name: 'Cashmere Sweater', imageUrl: 'https://picsum.photos/seed/108/100/100', imageHint: 'sweater', status: 'Compliant' },
    ],
  },
  {
    id: 'scan-003',
    companyName: 'Best Buy',
    companyUrl: 'bestbuy.com',
    companyLogoUrl: 'https://picsum.photos/seed/3/40/40',
    companyLogoHint: 'electronics store',
    productsScannedCount: 1500,
    date: '2024-07-27',
    scanData: `Scan of bestbuy.com completed. Found 1500 products.
    - All products scanned are fully compliant with Legal Metrology declarations for electronics.
    - No issues found.`,
    products: [
       { id: 'p-009', name: '4K Smart TV', imageUrl: 'https://picsum.photos/seed/109/100/100', imageHint: 'television screen', status: 'Compliant' },
       { id: 'p-010', name: 'Wireless Headphones', imageUrl: 'https://picsum.photos/seed/110/100/100', imageHint: 'headphones', status: 'Compliant' },
    ],
  },
];
