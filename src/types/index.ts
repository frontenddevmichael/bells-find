export type ItemType = 'lost' | 'found';
export type ItemStatus = 'open' | 'matched' | 'claimed' | 'resolved';
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  username: string;
  fullName?: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
}

export interface Item {
  id: string;
  type: ItemType;
  title: string;
  description: string;
  category: ItemCategory;
  location: string;
  date: string;
  imageUrl?: string;
  status: ItemStatus;
  userId: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Claim {
  id: string;
  itemId: string;
  claimantId: string;
  claimant?: User;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export type ItemCategory = 
  | 'electronics'
  | 'documents'
  | 'clothing'
  | 'accessories'
  | 'keys'
  | 'bags'
  | 'books'
  | 'sports'
  | 'other';

export const CATEGORIES: { value: ItemCategory; label: string; icon: string }[] = [
  { value: 'electronics', label: 'Electronics', icon: '📱' },
  { value: 'documents', label: 'Documents', icon: '📄' },
  { value: 'clothing', label: 'Clothing', icon: '👕' },
  { value: 'accessories', label: 'Accessories', icon: '⌚' },
  { value: 'keys', label: 'Keys', icon: '🔑' },
  { value: 'bags', label: 'Bags', icon: '🎒' },
  { value: 'books', label: 'Books', icon: '📚' },
  { value: 'sports', label: 'Sports', icon: '⚽' },
  { value: 'other', label: 'Other', icon: '📦' },
];

export const LOCATIONS = [
  'Main Library',
  'Student Center',
  'Engineering Building',
  'Science Complex',
  'Arts Building',
  'Sports Center',
  'Cafeteria',
  'Lecture Hall A',
  'Lecture Hall B',
  'Computer Lab',
  'Parking Lot',
  'Bus Stop',
  'Other',
];
