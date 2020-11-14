import home from './components/home.vue'
import addBlog from './components/addBlog.vue'
import showBlogs from './components/showBlogs.vue'
import listBlogs from './components/listBlogs.vue'
import singleBlog from './components/singleBlog.vue'

export default [
  {
    path: '/',
    component: home
  },
  {
    path: '/add',
    component: addBlog
  },
  {
    path: '/articles',
    component: showBlogs
  },
  {
    path: '/titles',
    component: listBlogs
  },
  {
    path: '/blog/:id',
    component: singleBlog
  }
]