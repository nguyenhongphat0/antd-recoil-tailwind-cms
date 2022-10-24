export type Role = 'GUEST' | 'EDITOR' | 'ADMIN'
export type Action = 'VIEW_STAT' | 'VIEW_POST' | 'VIEW_ACTIVITY' | 'VIEW_PERMISSION' | 'SAVE_GROUP' | 'VIEW_TAG' | 'SAVE_TAG'

export interface User {
  id: number;
  name: string;
  avt: string;
  role: Role;
}