import type { Access } from 'payload';

export const isAdminOrHasAccess =
  (): Access =>
  ({ req: { user } }) => {
    if (!user?.roles) return false;

    return user.roles.some((role: string) => ['admin', 'editor'].includes(role));
  };
