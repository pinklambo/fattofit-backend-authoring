import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import MainLayout from '../layouts/MainLayout.vue'
import Dashboard from '../pages/Dashboard.vue'
import { useAuthStore } from '../stores/useAuthStore'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true, allowedRoles: ['admin', 'god'] },
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../pages/ProfilePage.vue'),
        meta: { requiresAuth: true, allowedRoles: ['admin', 'god'] },
      },
      {
        path: 'programs/new',
        name: 'ProgramNew',
        component: () => import('../pages/ProgramNewPage.vue'),
        meta: { requiresAuth: true, allowedRoles: ['admin', 'god'] },
      },
      {
        path: 'programs',
        name: 'ProgramIndex',
        component: () => import('../pages/indexPages/ProgramIndexPage.vue'),
        meta: { requiresAuth: true, allowedRoles: ['admin', 'god'] },
      },
      {
        path: 'workouts',
        name: 'WorkoutIndex',
        component: () => import('../pages/indexPages/WorkoutIndexPage.vue'),
        meta: { requiresAuth: true, allowedRoles: ['admin', 'god'] },
      },
      {
        path: 'exercises',
        name: 'ExerciseIndex',
        component: () => import('../pages/indexPages/ExerciseIndexPage.vue'),
        meta: { requiresAuth: true, allowedRoles: ['admin', 'god'] },
      },
      {
        path: 'warmups',
        name: 'WarmUpIndex',
        component: () => import('../pages/indexPages/WarmUpIndexPage.vue'),
        meta: { requiresAuth: true, allowedRoles: ['admin', 'god'] },
      },
      {
        path: 'cooldowns',
        name: 'CoolDownIndex',
        component: () => import('../pages/indexPages/CoolDownIndexPage.vue'),
        meta: { requiresAuth: true, allowedRoles: ['admin', 'god'] },
      },
      // Add other children here (e.g., ProgramAuthor)
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth) {
    if (!authStore.firebaseUser) {
      return next('/login')
    }
    // Role-based check
    if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(authStore.role)) {
      return next('/login')
    }
  }
  next()
})

export default router
