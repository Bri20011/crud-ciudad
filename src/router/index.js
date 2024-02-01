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
      path: 'nota_remision_compra',
      name: 'Nota_Remision_Compra',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/nota_remision_compra.vue'),
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
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/cliente.vue'),
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
    },
    {
      path: 'rescision_contrato',
      name: 'Rescision_contrato',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/urbanizacion/indexRescision_contrato.vue'),
    },
    {
      path: 'cesion_derecho_deuda',
      name: 'Cesion_derecho_deuda',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/urbanizacion/indexCesion_derecho_deuda.vue'),
    },
    {
      path: 'orden_compra_lote',
      name: 'Orden_Compra_Lote',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/urbanizacion/orden_compra_lote.vue'),
    },
    {
      path: 'compra_lote',
      name: 'Compra_Lote',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/urbanizacion/compra_lote.vue'),
    },
    {
      path: 'frmaperturacaja',
      name: 'FrmAperturaCaja',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/frmaperturacaja.vue'),
    },
    {
      path: 'cierrecaja',
      name: 'CierreCaja',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/cierrecaja.vue'),
    },
    {
      path: 'arqueo_caja',
      name: 'Arqueo_Caja',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/arqueo_caja.vue'),
    },
    {
      path: 'recaudacion_depositar',
      name: 'Recaudacion_Depositar',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/recaudacion_depositar.vue'),
    },
    {
      path: 'pedido_cliente',
      name: 'Pedido_Cliente',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/pedido_cliente.vue'),
    },
    {
      path: 'venta_cuenta_cobrar',
      name: 'Venta_Cuenta_Cobrar',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/venta_cuenta_cobrar.vue'),
    },
    {
      path: 'cobranza_forma_cobro',
      name: 'Cobranza_Forma_Cobro',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/cobranza_forma_cobro.vue'),
    },
    {
      path: 'nota_remision_venta',
      name: 'Nota_Remision_Venta',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/nota_remision_venta.vue'),
    },
    {
      path: 'nota_credito_venta',
      name: 'Nota_Credito_Venta',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/nota_credito_venta.vue'),
    },

    {
      path: 'nota_debito_venta',
      name: 'Nota_Debito_Venta',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/nota_debito_venta.vue'),
    },
    {
      path: 'obtener_libro_venta',
      name: 'Obtener_Libro_Venta',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/obtener_libro_venta.vue'),
    },

    {
      path: 'varios',
      name: 'Varios',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/varios.vue'),
    },
    {
      path: 'nivel',
      name: 'Nivel',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/nivel.vue'),
    },
    {
      path: 'funcionario',
      name: 'Funcionario',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/funcionario.vue'),
    },
    {
      path: 'tipoventa',
      name: 'TipoVenta',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/tipoventa.vue'),
    },
    {
      path: 'motivo_rescision_contrato',
      name: 'Motivo_Rescision_Contrato',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/motivo_rescision_contrato.vue'),
    },
    {
      path: 'motivo_cesion_derecho_deuda',
      name: 'Motivo_Cesion_Derecho_Deuda',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/motivo_cesion_derecho_deuda.vue'),
    },
    {
      path: 'moneda',
      name: 'moneda',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/moneda.vue'),
    },
 
    {
      path: 'motivo_traslado_remision',
      name: 'Motivo_Traslado_Remision',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/motivo_traslado_remision.vue'),
    },
    {
      path: 'forma_cobro',
      name: 'Forma_cobro',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/forma_cobro.vue'),
    },
    {
      path: 'efectivo',
      name: 'Efectivo',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/efectivo.vue'),
    },
    {
      path: 'logint',
      name: 'LoginT',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/logint.vue'),
    },
    // {
    //   path: 'loginusuario',
    //   name: 'LoginUsuario',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "barrio" */ '@/views/loginusuario.vue'),
    // },




    
    
    
    
    

    
    ],
  },
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
