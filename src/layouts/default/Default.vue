<template>
  <v-app>
    <v-toolbar color="blue-grey">
      <v-app-bar-nav-icon @click="toggleSecondCard"></v-app-bar-nav-icon>

      <v-toolbar-title>Inmobiliaria Nuevo Horizonte</v-toolbar-title>

      <v-spacer></v-spacer>
     
    </v-toolbar>
 
    <v-navigation-drawer v-model="showSecondCard" color="blue-grey" width="700px" theme="dark" temporary >
     
         
          <v-container >
            
            <v-img class="bg-white" width="310" height="79" src="../default/logomenu2.JPG" cover></v-img>
            
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
              <v-list-item v-bind="props" title="Compras"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, link], i) in compras" :key="i" :value="title" :title="title"
              :prepend-icon="icon" :to="link"></v-list-item>
          </v-list-group>

          <v-list-group value="Ventas">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Ventas"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, link], i) in ventas" :key="i" :value="title" :title="title"
              :prepend-icon="icon" :to="link"></v-list-item>
          </v-list-group>



          <v-list-group value="Produccion">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Produccion"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, link], i) in Produccion" :key="i" :value="title" :title="title"
              :prepend-icon="icon" :to="link"></v-list-item>
          </v-list-group>


          <v-list-group value="Mantemiento">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Mantenimiento"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon, link], i) in mantenimiento" :key="i" :title="title" :prepend-icon="icon"
              :value="title" :to="link"></v-list-item>
          </v-list-group>


        </v-list-group>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block>
            Logout
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
       
        ['Pedido', 'mdi-cog-outline', '/frmpedido'],
        ['Presupuesto', 'mdi-cog-outline', '/presupuesto'],
        ['Orden de Compras', 'mdi-cog-outline', '/orden_compra'],
        ['Compras', 'mdi-cog-outline', '/compras'],
        ['Nota de Credito', 'mdi-cog-outline', '/nota_credito_compras'],
        ['Nota de Debito', 'mdi-cog-outline','/nota_debito_compra'],
        ['x-Nota de Remision', 'mdi-cog-outline','/nota_remision_compras'],
        ['x-Obtener Libro de Compras', 'mdi-cog-outline', '/obtener_libro_compras'],
        ['x-Informes Web', 'mdi-cog-outline', '/informes_web_compras'],
   
        

      ],
      ventas: [
        ['Venta', 'mdi-file-outline', '/'],
        ['Pedido', 'mdi-file-outline', '/'],

      ],
      Produccion: [
        ['Pedido Urbanizacion', 'mdi-plus-outline', '/pedido_urbanizacion'],
        ['Orden de Compra Urbanizacion', 'mdi-plus-outline', 'orden_compra_urbanizacion'],
        ['Registro Urbanizacion', 'mdi-plus-outline', '/urbanizacion'],

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


      ],
    };
  },
  methods: {
    toggleSecondCard() {
      // Cambiar el estado para mostrar u ocultar el segundo v-card
      this.showSecondCard = !this.showSecondCard;
    },
  },
}
</script>
