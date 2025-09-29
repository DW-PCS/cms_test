import { User } from '@/app/(payload)/payload-types';
import type { FieldHook } from 'payload';

export const protectRoles: FieldHook<{ id: string } & User> = ({ data, req }) => {
  if (!req.user || !req.user.roles || !data) {
    return ['user'];
  }
  const isAdmin =
    req.user?.roles.includes('admin') || data.email === 'kontakt.danielwisniewski@gmail.com';

  if (!isAdmin) {
    return ['user'];
  }

  const userRoles = new Set(data?.roles || []);
  userRoles.add('user');
  return [...userRoles];
};
