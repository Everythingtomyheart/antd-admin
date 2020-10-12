import { throttle } from 'lodash';
export interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}
type Fn = (...args: unknown[]) => unknown;
function useThrottle<T extends Fn>(fn: T, wait: number = 1000, options?: ThrottleOptions) {
  const throttled = throttle<T>(fn, wait, options);
  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush
  };
}

export default useThrottle;
