import type { QueryFunctionContext } from '@tanstack/react-query';
import type { DefaultParams, queryKeys } from '../queries/query.keys';
import type { CustomResponse, DefaultEntity } from './types';
import APIService from './axios.service';

export class BaseService<
  QueryKey extends keyof typeof queryKeys,
  Entity extends DefaultEntity,
  Create extends object = Partial<Entity>
> {
  constructor(private _path: string) {}

  get path() {
    return this._path;
  }

  private getService = (params: DefaultParams): Promise<CustomResponse<Entity[]>> => {
    return APIService.get(this.path, { params });
  };

  get = (context: QueryFunctionContext<ReturnType<(typeof queryKeys)[QueryKey]['list']>>) => {
    const { params } = context.queryKey[0];

    return this.getService(params as DefaultParams);
  };

  getInfinite = (context: QueryFunctionContext<ReturnType<(typeof queryKeys)[QueryKey]['list']>>) => {
    const { pageParam = 10, queryKey } = context;

    const params = {
      ...(queryKey?.[0]?.params as DefaultParams),
      page: pageParam as number
    };

    return this.getService(params as DefaultParams);
  };

  getById = (context: QueryFunctionContext<ReturnType<(typeof queryKeys)[QueryKey]['detail']>>): Promise<Entity> => {
    const { id, channelId } = context.queryKey[0] as {
      id: string;
      channelId?: string;
    };
    return APIService.get(this.path + '/' + id, {
      params: {
        channelId
      }
    });
  };

  create = (payload: Create): Promise<Entity> => {
    return APIService.post(this.path, payload);
  };

  update = (payload: Partial<Entity>): Promise<Entity> => {
    const { id } = payload;
    return APIService.patch(this.path + '/' + id, payload);
  };

  delete = (id: string): Promise<unknown> => {
    return APIService.delete(this.path + '/' + id);
  };
}
