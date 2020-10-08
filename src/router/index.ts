import { setPageTitle } from '@/utils';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  setPageTitle(to.meta.title);
  next();
});
export default router;
