export interface PageModel {
  current: number;
  pageSize: number;
  total: number;
}

export interface ResPage<T> {
  count: number;
  rows: T[];
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
}
