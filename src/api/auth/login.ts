import request from '@/plugins/axios';
export function postLogin(data: { username: string; password: string }) {
  return request.post('/login', data);
}
