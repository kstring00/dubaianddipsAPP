import { colors } from '@/constants/theme';
import type { toastLinks } from '@/lib/toast';

export type ToastLinkKey = keyof typeof toastLinks;

export type MenuItem = {
  slug: string;
  name: string;
  subtitle: string;
  category: 'Frappes' | 'Matcha' | 'Coffee' | 'Desserts';
  code: string;
  destination: string;
  flight: string;
  gate: string;
  seat: string;
  price: string;
  accent: string;
  toastKey: ToastLinkKey;
};

export const menuItems: MenuItem[] = [
  {
    slug: 'dubai-chocolate-frappe',
    name: 'Dubai Chocolate Frappe',
    subtitle: 'Chocolate · pistachio · whipped cream',
    category: 'Frappes',
    code: 'DXB',
    destination: 'DUBAI',
    flight: 'NA2381',
    gate: 'A101',
    seat: '2D',
    price: '$8.50',
    accent: colors.sugar,
    toastKey: 'frappes',
  },
  {
    slug: 'strawberry-matcha',
    name: 'Strawberry Matcha',
    subtitle: 'Matcha · strawberry · cream',
    category: 'Matcha',
    code: 'NRT',
    destination: 'TOKYO',
    flight: 'NA1170',
    gate: 'A202',
    seat: '4B',
    price: '$7.50',
    accent: colors.pistachio,
    toastKey: 'matcha',
  },
  {
    slug: 'spanish-latte',
    name: 'Spanish Latte',
    subtitle: 'Espresso · milk · sweet cream',
    category: 'Coffee',
    code: 'FCO',
    destination: 'ITALY',
    flight: 'NA2204',
    gate: 'B104',
    seat: '7A',
    price: '$6.75',
    accent: colors.green,
    toastKey: 'coffee',
  },
  {
    slug: 'pistachio-kunafa',
    name: 'Pistachio Kunafa',
    subtitle: 'Crisp pastry · pistachio · chocolate',
    category: 'Desserts',
    code: 'CAI',
    destination: 'CAIRO',
    flight: 'NA3009',
    gate: 'C301',
    seat: '9C',
    price: '$9.00',
    accent: colors.bark,
    toastKey: 'order',
  },
];

export type Departure = {
  code: string;
  label: string;
  destination: string;
  gate: string;
  status: string;
  accent: string;
  toastKey: ToastLinkKey;
};

export const departures: Departure[] = [
  {
    code: 'DXB',
    label: 'Frappes',
    destination: 'DUBAI',
    gate: 'A101',
    status: 'BOARDING',
    accent: colors.sugar,
    toastKey: 'frappes',
  },
  {
    code: 'NRT',
    label: 'Matcha',
    destination: 'TOKYO',
    gate: 'A202',
    status: 'ON TIME',
    accent: colors.pistachio,
    toastKey: 'matcha',
  },
  {
    code: 'FCO',
    label: 'Coffee',
    destination: 'ITALY',
    gate: 'B104',
    status: 'ON TIME',
    accent: colors.green,
    toastKey: 'coffee',
  },
  {
    code: 'CAI',
    label: 'Desserts',
    destination: 'CAIRO',
    gate: 'C301',
    status: 'ARRIVED',
    accent: colors.bark,
    toastKey: 'order',
  },
];

export const featuredItem = menuItems[0];
