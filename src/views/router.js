import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home // Reemplaza 'Home' con el componente que quieras mostrar cuando se hace clic en el icono de navegación.
  },
  // Agrega más rutas según sea necesario para tus opciones.
]

const router = new VueRouter({
  routes
})

export default router