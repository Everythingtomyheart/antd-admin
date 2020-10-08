import { MessageOptions } from 'ant-design-vue/types/message';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import 'axios';
declare module 'axios' {
  // eslint-disable-next-line @typescript-eslint/class-name-casing
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AxiosRequestConfig {
    success?: MessageOptions;
    error?: MessageOptions | boolean;
    loading?: boolean;
  }
}
