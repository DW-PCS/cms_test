import type { Access } from 'payload';

export const isAdminOrHasSiteAccess =
  (): Access =>
  ({ req: { user } }) => {
    if (!user?.roles) return false;

    if (user.roles.includes('admin')) return true;

    if (user.roles.includes('editor')) return true;

    return false;
  };
