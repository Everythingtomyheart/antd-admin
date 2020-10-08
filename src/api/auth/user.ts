import { ResPage, User } from '@/models';
import request from '@/plugins/axios';

export function listUser(page: number, pageSize: number, filters?: object) {
  return request.list<ResPage<User>>('/user', { page, pageSize, filters: { username: '' } });
}
