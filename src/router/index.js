// Composables
import { createRouter, createWebHistory } from 'vue-router'

import FrmCiudad from '@/views/FrmCiudad.vue'
import FrmBarrio from '@/views/FrmBarrio.vue'
import FacturaLayout from '@/layouts/Factura.vue'
import Factura from '@/views/venta/ventas/Factura.vue'


const routes = [
  {
    path: '/generarFactura',
    component: FacturaLayout,
    children: [
      {
        path: '',
        name: 'GenerarFactura',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Factura,
      },
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/Login.vue'),
    children: [
      {
        path: '',
        name: 'LoginT',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "barrio" */ '@/views/LoginT.vue'),
      },
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: 'frmciudad',
        name: 'Home',
        component: FrmCiudad,
      },
      {
        path: 'frmbarrio',
        name: 'FrmBarrio',
        component: FrmBarrio,
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
      path: 'compras',
      name: 'Compras',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/Compras.vue'),
    },
    {
      path: 'proveedor',
      name: 'Proveedor',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/Proveedor.vue'),
    }, 
    {
      path: 'producto',
      name: 'Producto',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/Producto.vue'),
    },
    {
      path: 'orden_compra',
      name: 'Orden_Compra',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/Orden_Compra.vue'),
    },
    {
      path: 'presupuesto',
      name: 'Presupuesto',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/Presupuesto.vue'),
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
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/urbanizacion/urbanizar/index.vue'),
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
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/Nota_Remision_Compra.vue'),
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
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/manzana.vue'),
    },
    {
      path: 'frmcaja',
      name: 'FrmCaja',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/FrmCaja.vue'),
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
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/urbanizacion/precio/indexPrecio.vue'),
    },

    {
      path: 'contrato',
      name: 'Contrato',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/urbanizacion/contrato/indexContrato.vue'),
    },
    {
      path: 'resccontrato',
      name: 'RescContrato',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/urbanizacion/rescision_contrato/indexRescContrato.vue'),
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
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/urbanizacion/Orden_Compra_Lote.vue'),
    },
    {
      path: 'compra_lote',
      name: 'Compra_Lote',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/urbanizacion/Compra_Lote.vue'),
    },
   
    {
      path: 'frmaperturacaja',
      name: 'FrmAperturaCaja',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/FrmAperturaCaja.vue'),
    },
    {
      path: 'cierrecaja',
      name: 'CierreCaja',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/CierreCaja.vue'),
    },
    {
      path: 'arqueo_caja',
      name: 'Arqueo_Caja',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/Arqueo_Caja.vue'),
    },
    {
      path: 'recaudacion_depositar',
      name: 'Recaudacion_Depositar',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/Recaudacion_Depositar.vue'),
    },
    {
      path: 'pedido_cliente',
      name: 'Pedido_Cliente',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/Pedido_Cliente.vue'),
    },
    {
      path: 'venta_cuenta_cobrar',
      name: 'Venta_Cuenta_Cobrar',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/ventas/Venta_Cuenta_Cobrar.vue'),
    },
    {
      path: 'cobranza_forma_cobro',
      name: 'Cobranza_Forma_Cobro',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/Cobranza_Forma_Cobro.vue'),
    },
    {
      path: 'nota_remision_venta',
      name: 'Nota_Remision_Venta',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/Nota_Remision_Venta.vue'),
    },
    {
      path: 'nota_credito_venta',
      name: 'Nota_Credito_Venta',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/Nota_Credito_Venta.vue'),
    },

    {
      path: 'nota_debito_venta',
      name: 'Nota_Debito_Venta',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/Nota_Debito_Venta.vue'),
    },
    {
      path: 'obtener_libro_venta',
      name: 'Obtener_Libro_Venta',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/Obtener_Libro_Venta.vue'),
    },

    {
      path: 'varios',
      name: 'Varios',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/venta/Varios.vue'),
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
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/Funcionario.vue'),
    },
    {
      path: 'tipoventa',
      name: 'TipoVenta',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/TipoVenta.vue'),
    },
    {
      path: 'motivo_rescision_contrato',
      name: 'Motivo_Rescision_Contrato',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/Motivo_Rescision_Contrato.vue'),
    },
    {
      path: 'motivo_cesion_derecho_deuda',
      name: 'Motivo_Cesion_Derecho_Deuda',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "orden_compra" */ '@/views/Motivo_Cesion_Derecho_Deuda.vue'),
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
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/Motivo_Traslado_Remision.vue'),
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
      path: 'informe_ciudad',
      name: 'Informe_Ciudad',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "barrio" */ '@/views/informe_ciudad.vue'),
    },
    {
      path: 'informes',
      name: 'informes',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "informe" */ '@/views/informes/menu_informe.vue'),
    },
    {
      path: 'tipo_producto',
      name: 'Tipo_Producto',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "informe" */ '@/views/tipo_producto.vue'),
    },
    {
      path: 'aperturacaja',
      name: 'AperturaCaja',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "informe" */ '@/views/venta/ventas/AperturaCaja.vue'),
    },
    {
      path: 'cierrecaja',
      name: 'CierreCaja',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "informe" */ '@/views/venta/ventas/CierreCaja.vue'),
    },
    {
      path: 'rescisioncontrato',
      name: 'RescisionContrato',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "informe" */ '@/views/venta/ventas/RescisionContrato.vue'),
    },
    {
      path: 'cobranza',
      name: 'Cobranza',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "informe" */ '@/views/venta/ventas/cobranza.vue'),
    },
    ],
  },
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {
  if(to.name === 'GenerarFactura') return true
  const token = localStorage.getItem('token')
  if(token) {
    if(to.name === 'LoginT') {
      return { name: 'Home' }
    }
    return true
  } else {
    if(to.name !== 'LoginT') {
      return { name: 'LoginT' }
    }
  }
})

export default router
