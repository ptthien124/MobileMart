import type { CreateUserEntity, SignIn, UserEntity } from '../types/user.type';
import APIService from './axios.service';
import { BaseService } from './base.service';

class UserServiceClass extends BaseService<'user', UserEntity, CreateUserEntity> {
  constructor() {
    super('user');
  }

  signUp = (payload: CreateUserEntity): Promise<UserEntity> => {
    return APIService.post(this.path + '/sign-up', payload);
  };

  signIn = (payload: SignIn): Promise<{ data: UserEntity }> => {
    return APIService.post(this.path + '/sign-in', payload);
  };
}

export const userService = new UserServiceClass();
