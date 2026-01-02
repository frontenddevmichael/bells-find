import { Item, User } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@bellstech.edu',
    username: 'johndoe',
    fullName: 'John Doe',
    role: 'user',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    email: 'jane.smith@bellstech.edu',
    username: 'janesmith',
    fullName: 'Jane Smith',
    role: 'user',
    createdAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '3',
    email: 'admin@bellstech.edu',
    username: 'admin',
    fullName: 'System Admin',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export const mockItems: Item[] = [
  {
    id: '1',
    type: 'lost',
    title: 'MacBook Pro 14" Space Gray',
    description: 'Lost my MacBook Pro in the main library, 2nd floor study area. It has a "Code is Poetry" sticker on the lid. Contains important coursework files.',
    category: 'electronics',
    location: 'Main Library',
    date: '2024-12-28',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    status: 'open',
    userId: '1',
    user: mockUsers[0],
    createdAt: '2024-12-28T09:15:00Z',
    updatedAt: '2024-12-28T09:15:00Z',
  },
  {
    id: '2',
    type: 'found',
    title: 'Student ID Card - Engineering Dept',
    description: 'Found a student ID card near the Engineering Building entrance. The card belongs to a Computer Science student. Please contact to claim.',
    category: 'documents',
    location: 'Engineering Building',
    date: '2024-12-29',
    status: 'open',
    userId: '2',
    user: mockUsers[1],
    createdAt: '2024-12-29T11:30:00Z',
    updatedAt: '2024-12-29T11:30:00Z',
  },
  {
    id: '3',
    type: 'lost',
    title: 'Black Leather Wallet',
    description: 'Lost my black leather wallet somewhere between the cafeteria and lecture hall A. Contains some cash and debit cards. Urgent!',
    category: 'accessories',
    location: 'Cafeteria',
    date: '2024-12-30',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop',
    status: 'open',
    userId: '1',
    user: mockUsers[0],
    createdAt: '2024-12-30T15:45:00Z',
    updatedAt: '2024-12-30T15:45:00Z',
  },
  {
    id: '4',
    type: 'found',
    title: 'Blue North Face Backpack',
    description: 'Found a blue North Face backpack at the Sports Center locker room. Contains textbooks and a water bottle. Contact with description to claim.',
    category: 'bags',
    location: 'Sports Center',
    date: '2024-12-31',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    status: 'matched',
    userId: '2',
    user: mockUsers[1],
    createdAt: '2024-12-31T08:20:00Z',
    updatedAt: '2024-12-31T16:00:00Z',
  },
  {
    id: '5',
    type: 'lost',
    title: 'Car Keys with Toyota Keychain',
    description: 'Lost car keys in the parking lot area. Toyota key with a red keychain and a small flashlight attached. Please help!',
    category: 'keys',
    location: 'Parking Lot',
    date: '2025-01-01',
    status: 'open',
    userId: '2',
    user: mockUsers[1],
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2025-01-01T10:00:00Z',
  },
  {
    id: '6',
    type: 'found',
    title: 'AirPods Pro (2nd Gen)',
    description: 'Found AirPods Pro in their case at the bus stop near the main entrance. Case has minor scratches. Contact to verify ownership.',
    category: 'electronics',
    location: 'Bus Stop',
    date: '2025-01-02',
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=300&fit=crop',
    status: 'open',
    userId: '1',
    user: mockUsers[0],
    createdAt: '2025-01-02T13:10:00Z',
    updatedAt: '2025-01-02T13:10:00Z',
  },
];

export const getItemById = (id: string): Item | undefined => {
  return mockItems.find(item => item.id === id);
};

export const getItemsByType = (type: 'lost' | 'found'): Item[] => {
  return mockItems.filter(item => item.type === type);
};

export const getItemsByUser = (userId: string): Item[] => {
  return mockItems.filter(item => item.userId === userId);
};
