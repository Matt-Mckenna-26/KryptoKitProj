import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'Washington',
      city: 'Seattle',
      street: '1234 My Street'
    },
    avatarUrl: '/static/images/avatars/avatar_13.png',
    createdAt: 1555016400000,
    email: 'dannjing@gmail.com',
    name: 'Dan Garcia',
    phone: '206-123-1234'
  },
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'New York',
      city: 'New York',
      street: '1234 My Street'
    },
    avatarUrl: '/static/images/avatars/avatar_12.png',
    createdAt: 1555016400000,
    email: 'matt.mckenna@outlook.com',
    name: 'Matt Mckenna',
    phone: '800-123-1234'
  },
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'Massachusetts',
      city: 'Boston',
      street: '2849 Fulton Street'
    },
    avatarUrl: '/static/images/avatars/avatar_3.png',
    createdAt: 1555016400000,
    email: 'ledermanmusic@gmail.com',
    name: 'Andrew Lederman',
    phone: '304-428-3097'
  },
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'Houston',
      city: 'Texas',
      street: '1865  Pleasant Hill Road'
    },
    avatarUrl: '/static/images/avatars/avatar_4.png',
    createdAt: 1555016400000,
    email: 'morherudaen@hotmail.com',
    name: 'Azreal Morherudaen',
    phone: '712-351-5711'
  },
  {
    id: uuid(),
    address: {
      country: 'USA',
      state: 'Georgia',
      city: 'Atlanta',
      street: '4894  Lakeland Park Drive'
    },
    avatarUrl: '/static/images/avatars/avatar_7.png',
    createdAt: 1555016400000,
    email: 'djhindu17@gmail.com',
    name: 'Dan Henderson',
    phone: '770-635-2682'
  }
];
