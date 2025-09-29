import type { Access, FieldAccess } from 'payload';

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) {
    return false;
  }

  if (Boolean(user?.roles?.includes('admin'))) {
    return true;
  }

  return {
    id: { equals: user.id },
  };
};



export const fieldAdminsAndUser: FieldAccess = ({ req: { user }, doc }) => {
  if (!user) {
    return false;
  }

  if (Boolean(user?.roles?.includes('admin'))) {
    return true;
  }

  return doc?.id === user.id;
};
