import Vue from 'vue'
import Router from 'vue-router'
import MultipleChoice from '@/student/MultipleChoice'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MultipleChoice',
      component: MultipleChoice
    }
  ]
})
