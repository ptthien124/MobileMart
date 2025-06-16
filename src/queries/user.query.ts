import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { userService } from '../service/user.service';
import { queryKeys, QueryKeyTypes } from './query.keys';
import { CreateUserEntity, SignIn, UserEntity } from '../types/user.type';
import { notification } from 'antd';
import { DetailResponse } from '../service/types';

type MutationCreate = UseMutationOptions<UserEntity, Error & { response?: unknown }, CreateUserEntity>;

export const useSignUp = (options: MutationCreate = {}) => {
  const mutation = useMutation({
    mutationFn: userService.signUp,
    mutationKey: queryKeys.user.invalidateListsKey(),
    meta: { showError: false },
    onError: (error, vars, context) => {
      console.log(error);
      notification.error({
        message: 'username already exists'
      });
    },
    ...options
  });

  return mutation;
};

export const useSignIn = (
  options: UseMutationOptions<{ data: UserEntity }, Error & { response?: unknown }, SignIn>
) => {
  const mutation = useMutation({
    mutationFn: userService.signIn,
    mutationKey: queryKeys.user.invalidateListsKey(),
    meta: { showError: false },
    onError: (error, vars, context) => {
      console.log(error);
    },
    ...options
  });

  return mutation;
};

type DetailQuery = Partial<UseQueryOptions<UserEntity, Error, DetailResponse<UserEntity>, QueryKeyTypes>>;

export const useGetUserById = (props: { id: string; options?: DetailQuery }) => {
  const { id, options } = props ?? {};

  const query = useQuery({
    queryKey: queryKeys.user.detail(id),
    queryFn: userService.getById,
    ...options
  });

  return query;
};
