import { createRouter, createWebHistory } from 'vue-router'
import DownloadView from '../views/DownloadView.vue'
import UploadView from '../views/UploadView.vue'
import VerificationView from '../views/VerificationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/download',
      name: 'download',
      component: DownloadView
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadView
    },
    {
      path: '/v',
      name: 'verification',
      component: VerificationView
    }
  ]
})

export default router
