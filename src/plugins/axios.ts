/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';

import Axios, { AxiosRequestConfig, Canceler } from 'axios';
// import router from '@/router';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
Axios.defaults.timeout = 60000;
import { apiUrl } from './config';
const axios = Axios.create({
  // baseURL: '/api'
  baseURL: apiUrl
});
function guid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string): string => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
const axiosCancel: { cancel: Canceler }[] = [];
// 请求拦截器
const axiosInstances: Record<string, AxiosRequestConfig> = {};
axios.interceptors.request.use(
  config => {
    config.cancelToken = new Axios.CancelToken(cancel => {
      axiosCancel.push({
        cancel
      });
    });
    // if (UserStoreModule.token) {
    //   // 判断token是否存在
    //   config.headers.Authorization = UserStoreModule.token; // 将token设置成请求头
    //   config.headers.Token = UserStoreModule.token; // 将token设置成请求头
    // }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// function unlogin(): void {
//   const cancelArr = axiosCancel;
//   cancelArr.forEach((ele, index) => {
//     ele.cancel(); // 在失败函数中返回这里自定义的错误信息
//     delete axiosCancel[index];
//   });
// }

axios.interceptors.response.use(
  response => {
    const data = response.data;
    if (data.status === 'success') {
      return data;
    } else {
      return Promise.reject(data);
    }
  },
  error => {
    return Promise.reject(error); // 返回接口返回的错误信息
  }
);

export type Result<T> = Promise<{ err: object | null; data: T; issuccess: boolean }>;
type RequestMethod = <T>(url: string, data?: any, opt?: AxiosRequestConfig) => Result<T>;
interface Request {
  <T>(
    url: string,
    method: AxiosRequestConfig['method'],
    data?: any,
    opt?: AxiosRequestConfig
  ): Result<T>;
  list: RequestMethod;
  get: RequestMethod;
  post: RequestMethod;
  put: RequestMethod;
  delete: RequestMethod;
  patch: RequestMethod;
}

// const errorMessage: { [propName: number]: string } = {
//   500: '服务器内部错误',
//   400: '请求参数错误',
//   404: '请求不存在'
// };

const request: Request = async <T>(
  url: string,
  method: AxiosRequestConfig['method'],
  data?: any,
  opt?: AxiosRequestConfig
): Result<T> => {
  const uid = guid();
  opt = { error: true, loading: true, ...opt };
  axiosInstances[uid] = opt;
  if (opt.loading) {
    Nprogress.start();
  }
  const res: { err: object | null; data: T; issuccess: boolean } = {} as {
    err: object | null;
    data: T;
    issuccess: boolean;
  };
  try {
    const response = await axios({
      url,
      method,
      data: method !== 'get' ? data : null,
      params: method === 'get' ? data : null,
      ...opt
    });
    const result: T = response.data;
    if (opt?.success) {
      // success
    }
    res.data = result;
    res.issuccess = true;
  } catch (error) {
    if (opt.error === true) {
      if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        // 服务器超时
      } else if (error.response && typeof error.response.data === 'string') {
        // 服务器错误
      } else {
        // 业务错误
        console.log([error]);
      }
    } else {
      if (opt.error) {
        // 自定义错误展示
      }
    }
    // 只有在真正为请求错误时，才需要将error数据进行传递
    if (error.response && typeof error.response.data !== 'string') {
      res.err = error.response.data;
    } else if (error.status === 'fail') {
      res.err = error;
    } else {
      const err = {};
      res.err = err;
    }
    res.issuccess = false;
  } finally {
    if (opt?.loading) {
      Nprogress.done();
    }
    delete axiosInstances[uid];
  }
  return res;
};

request.get = <T>(url: string, data?: any, opt?: AxiosRequestConfig): Result<T> => {
  return request<T>(url, 'get', data, opt);
};
request.list = request.get;

request.post = <T>(url: string, data?: any, opt?: AxiosRequestConfig): Result<T> => {
  return request<T>(url, 'post', data, opt);
};
request.put = <T>(url: string, data?: any, opt?: AxiosRequestConfig): Result<T> => {
  return request<T>(url, 'put', data, opt);
};
request.delete = <T>(url: string, data?: any, opt?: AxiosRequestConfig): Result<T> => {
  return request<T>(url, 'delete', data, opt);
};
request.patch = <T>(url: string, data?: any, opt?: AxiosRequestConfig): Result<T> => {
  return request<T>(url, 'patch', data, opt);
};

export const requestStatic = Axios.create({});

export default request;
