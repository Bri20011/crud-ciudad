<template>
  <v-app>
    <v-toolbar color="#68869a">
      <v-app-bar-nav-icon @click="toggleSecondCard"></v-app-bar-nav-icon>

      <v-toolbar-title>Inmobiliaria Nuevo Horizonte</v-toolbar-title>

      <v-spacer></v-spacer>

    </v-toolbar>

    <v-navigation-drawer v-model="showSecondCard" color="#68869a" width="700px" theme="dark" temporary>
      <v-card class="color=black"></v-card>




      <v-container>

        <v-img class="bg-white" width="400" height="150" src="../default/LogiInicial1.png" cover></v-img>

      </v-container>
      <v-divider class="ma-0"></v-divider>

      <v-list v-model:opened="open">
        <v-list-item prepend-icon="mdi-home" title="Menu Pricipal"></v-list-item>

        <v-list-group value="Users">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" prepend-icon="mdi-account-circle" title="Sistema"></v-list-item>
          </template>



          <v-list-group value="Compras">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi-folder-plus" title="Compras"></v-list-item>
            </template>
            <div v-for="([title, icon, link], i) in compras" :key="i">
              <v-list-item  :value="title" :title="title" v-if="$tienePermiso(link)"
              :prepend-icon="icon" :to="link"></v-list-item>
            </div>
          </v-list-group>

          <v-list-group value="Produccion">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi-image-filter-hdr" title="Produccion"></v-list-item>
            </template>
            <div v-for="([title, icon, link], i) in Produccion" :key="i">
            <v-list-item  :value="title" :title="title"
              :prepend-icon="icon" :to="link" v-if="$tienePermiso(link)"></v-list-item>
            </div>
          </v-list-group>

          <v-list-group value="Ventas">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi-printer-pos" title="Ventas"></v-list-item>
            </template>
            <div v-for="([title, icon, link], i) in ventas" :key="i">
            <v-list-item :value="title" :title="title"
              :prepend-icon="icon" :to="link" v-if="$tienePermiso(link)"></v-list-item>
            </div>
          </v-list-group>

          <v-list-group value="Mantemiento">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi-wrench-cog-outline" title="Mantenimiento"></v-list-item>
            </template>
            <div v-for="([title, icon, link], i) in mantenimiento" :key="i">
            <v-list-item  :title="title" :prepend-icon="icon"
              :value="title" :to="link" v-if="$tienePermiso(link)"></v-list-item>
            </div>
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
        ['Nota de Credito', 'mdi-folder-plus', '/nota_credito_compras'],
        ['Nota de Debito', 'mdi-folder-plus', '/nota_debito_compra'],
        ['Nota de Remision', 'mdi-folder-plus', '/nota_remision_compra'],
        ['Obtener Libro de Compras', 'mdi-folder-plus', '/obtener_libro_compras'],

      ],

      Produccion: [
        ['Orden de Compra Urbanizacion', 'mdi-image-filter-hdr', 'orden_compra_lote'],
        ['Registro de Compras de Lotes', 'mdi-image-filter-hdr', '/compra_lote'],
        ['Registro Urbanizacion', 'mdi-image-filter-hdr', '/urbanizacion'],
        ['Registro Precio de Lotes', 'mdi-image-filter-hdr', '/precio'],
        ['Registro Contrato', 'mdi-image-filter-hdr', '/contrato'],
        ['Registro Rescision de Contrato', 'mdi-image-filter-hdr', '/resccontrato'],
        ['Registro Cesión de Derechos y Deudas', 'mdi-image-filter-hdr', '/cesion_derecho'],

      ],

      ventas: [
        ['Apertura de Caja', 'mdi-printer-pos', '/AperturaCaja'],
        ['Cierre de Caja', 'mdi-printer-pos', '/CierreCaja'],
        ['Ventas', 'mdi-printer-pos', '/venta_cuenta_cobrar'],
        ['Cobranzas por forma de cobro', 'mdi-printer-pos', '/cobranza'],
        ['Registrar Nota de Remisión', 'mdi-printer-pos', '/nota_remision_venta'],
        ['Registrar Nota de Credito', 'mdi-printer-pos', '/nota_credito_venta'],
        ['Registrar Nota de Debito', 'mdi-printer-pos', '/nota_debito_venta'],
         // ['x-Arqueo de Caja', 'mdi-printer-pos', '/arqueo_caja'],
        ['Obtener Libro Ventas', 'mdi-printer-pos', '/obtener_libro_venta'],
        // ['x-Recaudaciones a depositar', 'mdi-printer-pos', '/recaudacion_depositar'],
      ],

      mantenimiento: [
        ['Barrio', 'mdi-cog-outline', '/frmbarrio'],
        ['Caja', 'mdi-cog-outline', '/frmcaja'],
        ['Categoria', 'mdi-cog-outline', '/frmcategoria'],
        ['Ciudad', 'mdi-cog-outline', '/frmciudad'],
        ['Cliente', 'mdi-cog-outline', '/cliente'],
        ['Efectivo', 'mdi-cog-outline', '/efectivo'],
        ['Forma de Cobro', 'mdi-cog-outline', '/forma_cobro'],
        ['Funcionario', 'mdi-cog-outline', '/funcionario'],
        ['Iva', 'mdi-cog-outline', '/frmiva'],
        ['Manzana', 'mdi-cog-outline', '/manzana'],
        ['Marca', 'mdi-cog-outline', '/frmmarca'],
        ['Moneda', 'mdi-cog-outline', '/moneda'],
        ['Motivo de Cesion Contrato', 'mdi-cog-outline', '/motivo_cesion_derecho_deuda'],
        ['Motivo de Rescision Contrato', 'mdi-cog-outline', '/motivo_rescision_contrato'],
        ['Motivo Traslado de Remision', 'mdi-cog-outline', '/motivo_traslado_remision'],
        ['Nivel', 'mdi-cog-outline', '/nivel'],
        ['Numero de Establecimiento', 'mdi-cog-outline', '/frmnumero_establecimiento'],
        ['Numero de Expedicion', 'mdi-cog-outline', '/frmnumero_expedicion'],
        ['Producto', 'mdi-cog-outline', '/producto'],
        ['Proveedor', 'mdi-cog-outline', '/proveedor'],
        ['Sucursal', 'mdi-cog-outline', '/frmsucursal'],
        ['Tipo de Documento', 'mdi-cog-outline', '/frmtipo_documento'],
        ['Tipo de Venta', 'mdi-cog-outline', '/tipoventa'],
        ['Tipo Producto', 'mdi-cog-outline', '/tipo_producto'],
        ['Timbrado', 'mdi-cog-outline', '/timbrado'],
        ['Usuario', 'mdi-cog-outline', '/frmusuario'],
        ['Copia de seguridad', 'mdi-cog-outline', '/copia_seguridad'],
     


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
      this.$router.push({ name: 'LoginT' })
    }
  },
}
</script>
