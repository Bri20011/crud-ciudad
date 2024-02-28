<template>
  <v-app>
    <v-toolbar color="blue-grey">
      <v-app-bar-nav-icon @click="toggleSecondCard"></v-app-bar-nav-icon>

      <v-toolbar-title>Inmobiliaria Nuevo Horizonte</v-toolbar-title>

      <v-spacer></v-spacer>
     
    </v-toolbar>
    
    <v-navigation-drawer v-model="showSecondCard" color="blue-grey" width="700px" theme="dark" temporary>
      <v-card class="color=black"></v-card> 

 
     
         
          <v-container >
            
            <v-img class="bg-white" width="400" height="150" src="../default/LogiInicial1.png" cover></v-img>
            
          </v-container>
          <v-divider class="ma-0" ></v-divider>
        
      <v-list v-model:opened="open">
        <v-list-item prepend-icon="mdi-home" title="Menu Pricipal"></v-list-item>

        <v-list-group value="Users">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-account-circle" title="Sistema"></v-list-item>
          </template>



          <v-list-group value="Compras">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props"  prepend-icon="mdi-folder-plus"  title="Compras"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, link], i) in compras" :key="i" :value="title" :title="title"
              :prepend-icon="icon" :to="link"></v-list-item>
          </v-list-group>
          
          <v-list-group  value="Produccion">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props"  prepend-icon="mdi-image-filter-hdr" title="Produccion"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, link], i) in Produccion" :key="i" :value="title" :title="title"
              :prepend-icon="icon" :to="link"></v-list-item>
          </v-list-group>

          <v-list-group value="Ventas">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props"   prepend-icon="mdi-printer-pos"  title="Ventas"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, link], i) in ventas" :key="i" :value="title" :title="title"
              :prepend-icon="icon" :to="link"></v-list-item>
          </v-list-group>

          <v-list-group value="Mantemiento">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props"  prepend-icon="mdi-wrench-cog-outline"  title="Mantenimiento"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, link], i) in mantenimiento" :key="i" :title="title" :prepend-icon="icon"
              :value="title" :to="link"></v-list-item>
          </v-list-group>

          

        </v-list-group>
        <v-list-item to="/informes" prepend-icon="mdi-chart-bar" title="Informes"></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout()">
            Cerrar sesión
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <default-view />
  </v-app>
</template>





<script>
import DefaultView from './View.vue'
export default {
  components: {
    DefaultView
  },
  data() {
    return {
      showSecondCard: false,
      open: ['Users'],
    
      compras: [
       
        ['Pedido', 'mdi-folder-plus', '/frmpedido'],
        ['Presupuesto', 'mdi-folder-plus', '/presupuesto'],
        ['Orden de Compras', 'mdi-folder-plus', '/orden_compra'],
        ['Compras', 'mdi-folder-plus', '/compras'],
        ['*Nota de Credito', 'mdi-folder-plus', '/nota_credito_compras'],
        ['*Nota de Debito', 'mdi-folder-plus','/nota_debito_compra'],
        ['Nota de Remision', 'mdi-folder-plus','/nota_remision_compra'],
        ['x-Obtener Libro de Compras', 'mdi-folder-plus', '/obtener_libro_compras'],

      ],
  
      Produccion: [
        ['Orden de Compra Urbanizacion', 'mdi-image-filter-hdr', 'orden_compra_lote'],
        ['x-Registro de Compras de Lotes', 'mdi-image-filter-hdr', '/compra_lote'],
        ['*Registro Urbanizacion', 'mdi-image-filter-hdr', '/urbanizacion'],
        ['x-Registro Precio de Lotes', 'mdi-image-filter-hdr', '/precio'],
        ['x-Registro Contrato', 'mdi-image-filter-hdr', '/contrato'],
        ['x-Registro Rescision de Contrato', 'mdi-image-filter-hdr', '/rescision_contrato'],
        ['x-Registro Cesión de Derechos y Deudas', 'mdi-image-filter-hdr', '/cesion_derecho_deuda'],
      
      ],

      ventas: [
        ['x-Apertura de Caja', 'mdi-printer-pos', '/frmaperturacaja'],
        ['x-Cierre de Caja', 'mdi-printer-pos', '/cierrecaja'],
        ['x-Arqueo de Caja', 'mdi-printer-pos', '/arqueo_caja'],
        ['x-Recaudaciones a depositar', 'mdi-printer-pos', '/recaudacion_depositar'],
        ['x-Pedido de Cliente', 'mdi-printer-pos', '/pedido_cliente'],
        ['x-Venta y Cuentas a pagar', 'mdi-printer-pos', '/venta_cuenta_cobrar'],
        ['x-Cobranzas por forma de cobro', 'mdi-printer-pos', '/cobranza_forma_cobro'],
        ['x-Registrar Nota de Remisión','mdi-printer-pos', '/nota_remision_venta'],
        ['x-Registrar Nota de Credito', 'mdi-printer-pos', '/nota_credito_venta'],
        ['x-Registrar Nota de Debito', 'mdi-printer-pos', '/nota_debito_venta'],
        ['x-Obtener Libro Ventas', 'mdi-printer-pos', '/obtener_libro_venta'],
      ],

      mantenimiento: [
        ['Ciudad', 'mdi-cog-outline', '/frmciudad'],
        ['Barrio', 'mdi-cog-outline', '/frmbarrio'],
        ['Categoria', 'mdi-cog-outline', '/frmcategoria'],
        ['Marca', 'mdi-cog-outline', '/frmmarca'],
        ['Sucursal', 'mdi-cog-outline', '/frmsucursal'],
        ['Tipo de Documento', 'mdi-cog-outline', '/frmtipo_documento'],
        ['Numero de Establecimiento', 'mdi-cog-outline', '/frmnumero_establecimiento'],
        ['Numero de Expedicion', 'mdi-cog-outline','/frmnumero_expedicion'],
        ['Iva', 'mdi-cog-outline', '/frmiva'],
        ['Usuario', 'mdi-cog-outline', '/frmusuario'],
        ['Caja', 'mdi-cog-outline', '/frmcaja'],
        ['Proveedor', 'mdi-cog-outline', '/proveedor'],
        ['Producto', 'mdi-cog-outline', '/producto'],
        ['Manzana', 'mdi-cog-outline', '/manzana'],
        ['Timbrado', 'mdi-cog-outline', '/timbrado'],
        ['Cliente', 'mdi-cog-outline', '/cliente'],
        ['Nivel', 'mdi-cog-outline', '/nivel'],
        ['Funcionario', 'mdi-cog-outline', '/funcionario'],
        ['Tipo de Venta', 'mdi-cog-outline', '/tipoventa'],
        ['Motivo de Rescision Contrato', 'mdi-cog-outline', '/motivo_rescision_contrato'],
        ['Motivo de Cesion Contrato', 'mdi-cog-outline', '/motivo_cesion_derecho_deuda'],
        ['Moneda', 'mdi-cog-outline', '/moneda'],
        ['Motivo Traslado de Remision', 'mdi-cog-outline', '/motivo_traslado_remision'],
        ['Forma de Cobro', 'mdi-cog-outline', '/forma_cobro'],
        ['Efectivo', 'mdi-cog-outline', '/efectivo'],
        ['Login1', 'mdi-cog-outline', '/logint'],
        ['Tipo Producto', 'mdi-cog-outline', '/tipo_producto'],
      
        
      ],
        
      informe: [
        ['Informe de Ciudades', 'mdi-plus-outline', '/informe_ciudad'],

      ],
    };
  },
  methods: {
    toggleSecondCard() {
      // Cambiar el estado para mostrar u ocultar el segundo v-card
      this.showSecondCard = !this.showSecondCard;
    },
    logout() {
      localStorage.clear()
      this.$router.push({name: 'LoginT'})
    }
  },
}
</script>
