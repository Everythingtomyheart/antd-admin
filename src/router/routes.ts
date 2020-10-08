import { guid } from '@/utils';
import { RouteRecordRaw } from 'vue-router';
import { getComponent } from './componentMap';
const defaultRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: getComponent('login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    redirect: '/auth',
    component: getComponent('defaultLayout')
  }
];
const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    redirect: '/auth/user',
    component: getComponent('defaultLayout'),
    meta: {
      title: '账号管理'
    },
    children: [
      {
        path: 'user',
        component: getComponent('user'),
        meta: {
          title: '用户管理'
        }
      }
    ]
  }
];
export interface Navigation {
  id: string;
  path: string;
  title: string;
  children?: Navigation[];
}
export function getNavigation() {
  const navigations: Navigation[] = [];
  for (const route of authRoutes) {
    const navigation = { id: guid(), path: route.path, title: route.meta?.title } as Navigation;
    if (route.children) {
      const children: Navigation[] = [];
      for (const child of route.children) {
        children.push({
          id: guid(),
          path: child.path,
          title: child.meta?.title
        });
      }
      navigation.children = children;
    }
    navigations.push(navigation);
  }
  return navigations;
}
export default [...defaultRoutes, ...authRoutes];
