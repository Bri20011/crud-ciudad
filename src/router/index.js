// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: 'frmciudad',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "ciudad" */ '@/views/FrmCiudad.vue'),
      },
      {
        path: 'frmbarrio',
        name: 'FrmBarrio',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "frmbarrio" */ '@/views/FrmBarrio.vue'),
      },
      {
        path: 'frmusuario',
        name: 'Usuario',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "usuario" */ '@/views/FrmUsuario.vue'),
      },
      {
        path: 'frmtipo_documento',
        name: 'Tipo_Documento',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "tipo_documento" */ '@/views/FrmTipo_Documento.vue'),
      },
      {
        path: 'frmsucursal',
        name: 'Sucursal',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "sucursal" */ '@/views/FrmSucursal.vue'),
      },
      {
        path: 'frmorden_compra',
        name: 'Orden_Compra',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/FrmOrden_Compra.vue'),
      },

      {
        path: 'frmmarca',
        name: 'Marca',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "marca" */ '@/views/FrmMarca.vue'),
      },
      {
      path: 'frmcategoria',
      name: 'Categoria',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "categoria" */ '@/views/FrmCategoria.vue'),
    },
  
    
    {
      path: 'frmnumero_establecimiento',
      name: 'Numero_Establecimiento',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "numero_establecimiento" */ '@/views/FrmNumero_Establecimiento.vue'),
    },
    
    {
      path: 'frmiva',
      name: 'Iva',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/FrmIva.vue'),
    },
    
  
    {
      path: 'frmnumero_expedicion',
      name: 'Numero_Expedicion',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/FrmNumero_Expedicion.vue'),
    },
    {
      path: 'frmpedido',
      name: 'Pedido',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/FrmPedido.vue'),
    },

    {
      path: 'frmloginCliente',
      name: 'LoginCliente',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/LoginCliente.vue'),
    },
    {
      path: 'frmloginUsuario',
      name: 'LoginUsuario',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/LoginUsuario.vue'),
    },
    {
      path: 'logint',
      name: 'LoginT',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/LoginT.vue'),
    },
    {
      path: 'frmcaja',
      name: 'Caja',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/frmcaja.vue'),
    },

    {
      path: 'compras',
      name: 'Compras',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/compras.vue'),
    },
    {
      path: 'proveedor',
      name: 'Proveedor',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/proveedor.vue'),
    }, 
    {
      path: 'producto',
      name: 'Producto',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/producto.vue'),
    },
    {
      path: 'orden_compra',
      name: 'Orden_Compra',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/orden_compra.vue'),
    },
    {
      path: 'presupuesto',
      name: 'Presupuesto',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/presupuesto.vue'),
    },
    {
      path: 'nota_credito_compras',
      name: 'Nota_Credito_Compras',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/Nota_Credito_Compras.vue'),
    },
    {
      path: 'nota_credito_compras',
      name: 'Nota_Credito_Compras',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/Nota_Credito_Compras.vue'),
    },
    {
      path: 'nota_debito_compra',
      name: 'Nota_Debito_Compra',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/Nota_Debito_Compra.vue'),
    },

    {
      path: 'orden_compra_urbanizacion',
      name: 'Orden_Compra_Urbanizacion',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/Orden_Compra_Urbanizacion.vue'),
    },

    {
      path: 'urbanizacion',
      name: 'Urbanizacion',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/urbanizacion/index.vue'),
    },
    {
      path: 'urbanizacion2',
      name: 'Urbanizacion2',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/Urbanizacion.vue'),
    },
    {
      path: 'nota_remision_compras',
      name: 'Nota_Remision_Compras',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/Nota_Remision_Compras.vue'),
    },
    {
      path: 'obtener_libro_compras',
      name: 'Obtener_Libro_Compras',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/Obtener_Libro_Compras.vue'),
    },
    {
      path: 'informes_web_compras',
      name: 'Informes_Web_Compras',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/Informes_Web_Compras.vue'),
    },
    {
      path: 'manzana',
      name: 'Manzana',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/Manzana.vue'),
    },
    {
      path: 'timbrado',
      name: 'Timbrado',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/Timbrado.vue'),
    },
    {
      path: 'cliente',
      name: 'Cliente',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/Cliente.vue'),
    },
    {
      path: 'precio',
      name: 'Precio',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/urbanizacion/indexPrecio.vue'),
    },

    {
      path: 'contrato',
      name: 'Contrato',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/urbanizacion/indexContrato.vue'),
    }




    
    ],
  },
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
