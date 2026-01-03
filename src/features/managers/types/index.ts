export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export interface Manager {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface ManagerResponse {
  data: Manager[];
  meta?: {
    total: number;
    page: number;
    last_page: number;
  };
}

export interface SingleManagerResponse {
  data: Manager;
}