import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import GoodList from '@/components/GoodList'
import KindList from '@/components/KindList'
import UserList from '@/components/UserList'
import OrderList from '@/components/OrderList'
import GetBook from '@/components/GetBook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children: [{
        path: '/goods/list',
        component: GoodList
      }, {
        path: '/kind/list',
        component: KindList
      }, {
        path: '/user/list',
        component: UserList
      }, {
        path: '/order/list',
        component: OrderList
      }, {
        path: '/getBook/list',
        component: GetBook
      }]
    }
  ]
})
