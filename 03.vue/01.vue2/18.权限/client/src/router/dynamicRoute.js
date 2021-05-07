// 动态路由,需要和后台接口一一对应
export default [
  {
    path: '/zcf1',
    component: () => import('@/views/zcf1'),
    meta: {
      auth: true
    },
    children: [
      {
        path: 'zcf2',
        component: () => import('@/views/zcf1/zcf2'),
        meta: {
          auth: true
        }
      }
    ]
  },
  {
    path: '/zcf11',
    component: () => import('@/views/zcf11'),
    meta: {
      auth: true
    },
    children: [
      {
        path: 'zcf22',
        component: () => import('@/views/zcf11/zcf22'),
        meta: {
          auth: true
        }
      }
    ]
  },

]