export type MenuItem = {
  slug: string;
  name: string;
  subtitle: string;
  category: 'Frappes' | 'Matcha' | 'Coffee' | 'Desserts';
  code: string;
  destination: string;
  gate: string;
  seat: string;
  price: string;
  accent: string;
};

export const menuItems: MenuItem[] = [
  {
    slug: 'dubai-chocolate-frappe',
    name: 'Dubai Chocolate Frappe',
    subtitle: 'Chocolate · pistachio · whipped cream',
    category: 'Frappes',
    code: 'DXB',
    destination: 'DUBAI',
    gate: 'A101',
    seat: '2D',
    price: '$8.50',
    accent: '#C2835F',
  },
  {
    slug: 'strawberry-matcha',
    name: 'Strawberry Matcha',
    subtitle: 'Matcha · strawberry · cream',
    category: 'Matcha',
    code: 'NRT',
    destination: 'TOKYO',
    gate: 'A202',
    seat: '4B',
    price: '$7.50',
    accent: '#D1E3D2',
  },
  {
    slug: 'spanish-latte',
    name: 'Spanish Latte',
    subtitle: 'Espresso · milk · sweet cream',
    category: 'Coffee',
    code: 'FCO',
    destination: 'ITALY',
    gate: 'B104',
    seat: '7A',
    price: '$6.75',
    accent: '#475842',
  },
  {
    slug: 'pistachio-kunafa',
    name: 'Pistachio Kunafa',
    subtitle: 'Crisp pastry · pistachio · chocolate',
    category: 'Desserts',
    code: 'CAI',
    destination: 'CAIRO',
    gate: 'C301',
    seat: '9C',
    price: '$9.00',
    accent: '#E3D3D0',
  },
];

export const departures = [
  { code: 'DXB', label: 'Frappes', destination: 'DUBAI', accent: '#C2835F' },
  { code: 'NRT', label: 'Matcha', destination: 'TOKYO', accent: '#D1E3D2' },
  { code: 'FCO', label: 'Coffee', destination: 'ITALY', accent: '#475842' },
  { code: 'CAI', label: 'Desserts', destination: 'CAIRO', accent: '#E3D3D0' },
] as const;
