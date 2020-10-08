/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';

import { guid } from '@/utils';
import { message } from 'ant-design-vue';
import Axios, { AxiosRequestConfig, Canceler } from 'axios';
// import router from '@/router';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
Axios.defaults.timeout = 6000;
import { apiUrl } from './config';

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
const errorMessage = {
  timeout: '服务器连接超时',
  500: '服务器内部错误',
  400: '请求参数错误',
  404: '请求不存在'
};
type errorMessageType = keyof typeof errorMessage;
type RequestType<T> = { err: object | null; data: T; issuccess: boolean };
const axios = Axios.create({
  // baseURL: '/api'
  baseURL: apiUrl
});
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
    // TODO 设置token
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

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
  // 返回结果类型
  const res: RequestType<T> = {} as RequestType<T>;
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
      message.success(opt.success);
    }
    res.data = result;
    res.issuccess = true;
  } catch (error) {
    if (opt.error === true) {
      let errorMsg = '';
      if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        // 服务器超时
        errorMsg = errorMessage.timeout;
      } else if (error.response && typeof error.response.data === 'string') {
        // 服务器错误
        errorMsg = errorMessage[error.response.status as errorMessageType];
      } else {
        // 业务错误
        errorMsg = error.msg;
      }
      message.error(errorMsg);
    } else {
      if (opt.error) {
        // 自定义错误展示
        message.error(opt.error);
      }
    }
    // 只有在真正为请求错误时，才需要将error数据进行传递
    if (error.response && typeof error.response.data !== 'string') {
      res.err = error.response.data;
    } else if (error.status === 'fail') {
      res.err = error;
    } else {
      res.err = null;
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

// export const requestStatic = Axios.create({});

export default request;
