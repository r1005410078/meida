export interface User {
  id: string;
  username: string;
  password_hash: string;
  phone: string;
  avatar: string;
  is_active: boolean;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface UserFrom {
  id?: string;
  username?: string;
  password?: string;
  phone?: string;
  is_active?: boolean;
}
