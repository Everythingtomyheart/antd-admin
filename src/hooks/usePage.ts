import { PageModel } from '@/models';
import { reactive } from 'vue';

export default function usePage() {
  const page: PageModel = reactive({ current: 1, pageSize: 20, total: 0 });
  return page;
}
