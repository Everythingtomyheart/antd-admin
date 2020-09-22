
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import 'axios';
import { ElNotificationOptions } from 'element-ui/types/notification';
declare module 'axios' {
  // eslint-disable-next-line @typescript-eslint/class-name-casing
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AxiosRequestConfig {
    success?: ElNotificationOptions;
    error?: ElNotificationOptions | boolean;
    loading?: boolean;
  }
}
