import { User } from '@/types';

export function can(user: Partial<User>, permission: string): boolean {
  return user.permissions?.includes(permission) ?? false;
}

export function hasRole(user: Partial<User>, role: string): boolean {
  return user.roles?.includes(role) ?? false;
}
