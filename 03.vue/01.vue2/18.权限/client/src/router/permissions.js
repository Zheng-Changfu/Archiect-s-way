import loadable from '@/utils/loadable'
// 动态路由
export default [
  {
    "path": "zcf1",
    component: loadable(() => import('@/views/user/zcf1')),
    "children": [
      {
        "path": "zcf2",
        component: loadable(() => import('@/views/user/zcf1/zcf2')),
      }
    ]
  },
  {
    "path": "zcf11",
    component: loadable(() => import('@/views/user/zcf11')),
    "children": [
      {
        "path": "zcf22",
        component: loadable(() => import('@/views/user/zcf11/zcf22')),
      }
    ]
  },
  {
    "path": "cxh1",
    component: loadable(() => import('@/views/user/cxh1')),
    "children": [
      {
        "path": "cxh2",
        component: loadable(() => import('@/views/user/cxh1/cxh2')),
      }
    ]
  },
  {
    "path": "cxh11",
    component: loadable(() => import('@/views/user/cxh11')),
    "children": [
      {
        "path": "cxh22",
        component: loadable(() => import('@/views/user/cxh11/cxh22')),
      }
    ]
  }
]