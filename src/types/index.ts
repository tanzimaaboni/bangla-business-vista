
export interface Company {
  id: string;
  name: string;
  sector: string;
  logo: string;
  headquarters: string;
  founded: string;
  revenue?: string;
  employees?: string;
  website?: string;
  description?: string;
}

export interface User {
  username: string;
  password: string;
  isAdmin: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export interface PaginationOptions {
  currentPage: number;
  totalPages: number;
  pageSize: number;
}
