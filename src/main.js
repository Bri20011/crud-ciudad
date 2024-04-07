/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components

import App from './App.vue'
import { PERMISO_POR_NIVEL } from './utils/permisos'


// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)


const tienePermiso = (permission) => {
    const nivelUsuario = localStorage.getItem('nivel-usuario')
    const busqueda = PERMISO_POR_NIVEL[nivelUsuario].find(permiso => permiso === permission)
    return !!busqueda
}

app.config.globalProperties.$tienePermiso = tienePermiso


registerPlugins(app)

app.mount('#app')
