export type MenuItem = {
  slug: string;
  name: string;
  subtitle: string;
  category: 'Frappes' | 'Matcha' | 'Coffee' | 'Desserts';
  code: string;
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
    price: '$8.50',
    accent: '#7A5A3B',
  },
  {
    slug: 'strawberry-matcha',
    name: 'Strawberry Matcha',
    subtitle: 'Matcha · strawberry · cream',
    category: 'Matcha',
    code: 'NRT',
    price: '$7.50',
    accent: '#8AA66F',
  },
  {
    slug: 'spanish-latte',
    name: 'Spanish Latte',
    subtitle: 'Espresso · milk · sweet cream',
    category: 'Coffee',
    code: 'FCO',
    price: '$6.75',
    accent: '#B78D62',
  },
  {
    slug: 'pistachio-kunafa',
    name: 'Pistachio Kunafa',
    subtitle: 'Crisp pastry · pistachio · chocolate',
    category: 'Desserts',
    code: 'CAI',
    price: '$9.00',
    accent: '#9E9F65',
  },
];

export const departures = [
  { code: 'DXB', label: 'Frappes', accent: '#6A4B38' },
  { code: 'NRT', label: 'Matcha', accent: '#8AA66F' },
  { code: 'FCO', label: 'Coffee', accent: '#B58B63' },
  { code: 'CAI', label: 'Desserts', accent: '#A69A68' },
] as const;
