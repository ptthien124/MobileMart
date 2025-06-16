import { DefaultEntity } from '../service/types';

export type UserParams = {
  q?: string;
  page?: number;
  take?: number;
  exclude?: string;
};

export enum Role {
  ADMIN = 'admin',
  USER = 'user'
}

export type UserEntity = DefaultEntity & {
  name: string;
  username: string;
  password: string;
  role: Role;
};

export type CreateUserEntity = {
  name: string;
  username: string;
  password: string;
};

export type SignIn = {
  username: string;
  password: string;
};
