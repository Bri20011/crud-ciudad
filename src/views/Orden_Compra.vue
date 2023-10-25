<template>
  <v-dialog max-width="700" v-model="dialogoFormulario" persistent>
    <v-card class="rounded-xl">
      <v-container>
        <h1 class="mb-3">Crear Pedido</h1>
        <v-form>
          <v-row>
         
            <v-col cols="12" sm="6" md="6">
              <v-text-field variant="outlined" label="Descripcion de Pedido" v-model="formulario.descripcion"
                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <input class="custom-input" v-model="formulario.fecha" type="date" placeholder="Fecha de Pedido"
                @input="formatDate" />
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field variant="outlined" label="Cantidad" v-model="formulario.cantidad"
                required></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4">
                <v-autocomplete variant="outlined" label="Producto" :items="listaProducto" item-title="descripcionP" item-value="id" v-model="formulario.producto"></v-autocomplete>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-autocomplete variant="outlined" label="Marca" :items="listaMarca" item-title="descripcionM" item-value="id" v-model="formulario.marca"></v-autocomplete>
              </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormulario = false">Cancelar</v-btn>
              <v-btn color="primary" @click="guardarFormulario"
                :disabled="excededLimit || !formulario.descripcion">Guardar</v-btn>

            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>

  <v-dialog max-width="700" v-model="dialogoFormularioEditar" persistent>
    <v-card class="rounded-xl">
      <v-container>
        <h1 class="mb-3">Editar Pedido</h1>
        <v-form>
          <v-row>
            <v-col cols="12" sm="2" md="2">
              <v-text-field variant="outlined" label="Codigo" disabled v-model="formulario.codigo"></v-text-field>
            </v-col>
            <v-col cols="12" sm="5" md="5">
              <v-text-field variant="outlined" label="Descripcion de Pedido" v-model="formulario.descripcion"
                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
            </v-col>


            <v-col ols="12" sm="5" md="5">
              <v-text-field variant="outlined" label="Fecha de Pedido" v-model="formulario.fecha"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field variant="outlined" label="Cantidad" v-model="formulario.cantidad"
                required></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4">
                <v-autocomplete variant="outlined" label="Producto" :items="listaProducto" item-title="descripcionP" item-value="id" v-model="formulario.producto"></v-autocomplete>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-autocomplete variant="outlined" label="Marca" :items="listaMarca" item-title="descripcionM" item-value="id" v-model="formulario.marca"></v-autocomplete>
              </v-col>

          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormularioEditar = false">Cancelar</v-btn>
              <v-btn color="primary" @click="guardarFormularioEditar"
                :disabled="excededLimit || !formulario.descripcion">Guardar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
  <v-container>
    <v-row>

      <v-col cols="12" sm="5" md="5">
        <v-text-field :loading="loading" density="compact" v-model="buscador" variant="solo" label="Buscar"
          append-inner-icon="mdi-magnify" single-line hide-details rounded click:prependInner></v-text-field>
      </v-col>

      <v-col cols="12" sm="7" md="7" class="d-flex justify-end align-center">
        Cantidad de Pedido: {{ items.length }}
      </v-col>

    </v-row>

    <v-card class="mt-5 rounded-xl">
      <v-data-table :headers="headers" :items="itemsComputed">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              <p class="font-weight-bold">Pedidos para Generar Ordenes de Compra</p>
            </v-toolbar-title>

            <!-- <v-btn class="custom-font" color="primary" prepend-icon="mdi-content-save-plus" variant="text"
              @click="abrirDialogo">Registrar
            </v-btn> -->

          </v-toolbar>
        </template>
        <template v-slot:item.fecha="{ item }">
          {{ formatearFecha(item.raw.fecha) }}
        </template>
        <template v-slot:item.action="{ item }">
         <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-btn  color="primary"   @click="editarCiudad(item.raw)">
              <span class="text-h8">Aceptar</span>

            </v-btn>
          </v-col>

          <v-col cols="12" sm="6" md="6"> 
            <v-btn color="#E0E0E0"  @click="confirmarEliminarCiudad(item.raw)">
              Anular
            </v-btn>
          </v-col>
         </v-row>

        </template>
      </v-data-table>
    </v-card>

    <v-row>
      <v-col cols="12" md="12" class="d-flex justify-end align-center mt-5">
      
      </v-col>
    </v-row>
    <!-- Diálogo de confirmación -->
    <v-dialog v-model="dialogoEliminar" max-width="400">
      <v-card>
        <v-container>
        <v-card-title class="headline">Confirmar Eliminación</v-card-title>
        <v-card-text>
          ¿Está seguro de que desea eliminar este elemento?
        </v-card-text>

      
          <v-row>
         <v-col cols="12" class="d-flex justify-end">
          <v-btn color="#E0E0E0" class="mx-2" text @click="eliminarCiudad">Eliminar</v-btn>
          <v-btn color="primary" text @click="cancelarEliminarCiudad">Cancelar</v-btn>
         </v-col>
        </v-row>
        
        
      </v-container>
      </v-card>
      
    </v-dialog>
                        <!-- FIN DIALOGO -->

                        <v-card class="mt-5 rounded-xl">
        <v-data-table :headers="headers" :items="itemsComputed">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <p class="font-weight-bold">Ordenes de Compras</p>
              </v-toolbar-title>
  
              <v-btn class="custom-font" color="primary" prepend-icon="mdi-content-save-plus" variant="text"
                @click="abrirDialogo">Registrar
              </v-btn>
            </v-toolbar>
  
          </template>
  
          <template
           v-slot:item.action="{ item }">
            <v-icon size="small" class="me-2" @click="editarCiudad(item.raw)">
              mdi-pencil
            </v-icon>
            <v-icon color="#C62828" size="small" @click="confirmarEliminarCiudad(item.raw)">
              mdi-trash-can-outline
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
  
      <v-row>
        <v-col cols="12" md="12" class="d-flex justify-end align-center mt-5">
          <v-btn>Cancelar </v-btn>
        </v-col>
      </v-row>
      <!-- Diálogo de confirmación -->
      <v-dialog v-model="dialogoEliminar" max-width="400">
        <v-card>
          <v-container>
          <v-card-title class="headline">Confirmar Eliminación</v-card-title>
          <v-card-text>
            ¿Está seguro de que desea eliminar este elemento?
          </v-card-text>
  
        
            <v-row>
           <v-col cols="12" class="d-flex justify-end">
            <v-btn color="#E0E0E0" class="mx-2" text @click="eliminarCiudad">Eliminar</v-btn>
            <v-btn color="primary" text @click="cancelarEliminarCiudad">Cancelar</v-btn>
           </v-col>
          </v-row>
          
          
        </v-container>
        </v-card>
        
      </v-dialog>
  </v-container>

  
</template>

<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { PedidoAPI } from '@/services/pedido.api'
import { ProductoAPI } from '@/services/producto.api'
import { MarcaApi } from '@/services/marca.api'
import dayjs from 'dayjs'



export default {
  components: {
    VDataTable
  },
  data() {
    return {
      dialogoFormulario: false,
      dialogoFormularioEditar: false,
      formulario: {
        codigo: '',
        descripcion: '',
        fecha: null,
        fechaFormatted: '',
        cantidad:'',
        producto:'',
        marca:''


      },
      contador: 1,
      limit: 45,
      defaultFormulario: {
        codigo: '',
        descripcion: '',
        fecha: '',
        cantidad:'',
        producto:'',
        marca:''
      },
      buscador: '',
      listaMarca:[],
      listaMarca:[],
      headers: [
        {
          title: 'Codigo',
          align: 'start',
          sortable: false,
          key: 'id',
        },
        { title: 'Descripcion', key: 'descripcion' },
        { title: 'Fecha de Pedido', key: 'fecha', align: 'star' },
        { title: 'Cantidad', key: 'cantidad', align: 'star' },
        { title: 'Producto', key: 'nombreproducto', align: 'star' },
        { title: 'Marca', key: 'nombremarca', align: 'star' },
        { title: 'Accion', key: 'action', sortable: false, align: 'end' },
      ],
      items: [
        {
          id: '1',
          descripcion: 'Central',
          fecha: '',
          cantidad:'2',
          producto:'Envase',
          marca:'Todo Plastico',
          action: ''
        }
      ],
      dialogoEliminar: false,
      elementoAEliminar: null,
    }
  },

  computed: {
    itemsComputed() {
      if (!this.buscador) return this.items
      return this.items.filter((element) => element.descripcion.toLocaleLowerCase().includes(this.buscador.toLocaleLowerCase()))
    },
    excededLimit() {
      return this.formulario.descripcion.length > this.limit;
    },
    errorMessage() {
      if (this.excededLimit) {
        return 'Superaste el límite de 45 letras';
      }
      return '';
    }
  },
  methods:
  {
    formatearFecha(fecha){
      return dayjs(fecha).format('DD/MM/YYYY')
    },
    showDatePicker() {
      this.showDatepicker = true;
    },
    hideDatePicker() {
      this.showDatepicker = false;
    },

    abrirDialogo() {
      // Abrir el modal y cargar el código aquí
      this.dialogoFormulario = true;
      this.formulario = JSON.parse(JSON.stringify(this.defaultFormulario))
    },
    ObtenerProducto() {
        ProductoAPI.getAll().then(({ data }) => {
          this.listaProducto = data.map(item => {
            return {
              id: item.idProducto,
              descripcionP: item.Descripcion
            }
          })
        })
      },
      obtenerMarca() {
        MarcaApi.getAll().then(({ data }) => {
          this.listaMarca = data.map(item => {
            return {
              id: item.idmarca,
              descripcionM: item.Descripcion
            }
          })
        })
      },

    generarCodigo() {
      const nuevoCodigo = this.contador++;
      return nuevoCodigo;
    },
    guardarFormulario() {
      if (!this.formulario.descripcion) {

        this.emptyFieldError = true;
        return;
      }
    
    
      PedidoAPI.create(
        {
          idPedido: this.formulario.codigo,
          Descripcion: this.formulario.descripcion,
          Fecha_pedi: this.formulario.fecha,
          Cantidad: this.formulario.cantidad,
          idProducto: this.formulario.producto,
          idmarca: this.formulario.marca
        }
      ).then(() => {
        this.ObtenerPedido()
      })

      this.formulario.descripcion = '';
      this.formulario.fecha = '';
      this.formulario.cantidad = '';
      this.formulario.producto = '';
      this.formulario.marca = '';
      this.dialogoFormulario = false;
    },

    guardarFormularioEditar() {
      if (!this.formulario.descripcion) {

        this.emptyFieldError = true;
        return;
      }
      PedidoAPI.update(
        this.formulario.codigo,
        {
          idPedido: this.formulario.codigo,
          Descripcion: this.formulario.descripcion,
          Fecha_pedi: this.formulario.fecha,
          Cantidad: this.formulario.cantidad,
          idProducto: this.formulario.producto,
          idmarca: this.formulario.marca
        }
      ).then(() => {
        this.ObtenerPedido()
      })

      this.dialogoFormularioEditar = false
    },
    editarCiudad(parametro) {
      this.dialogoFormularioEditar = true
      this.formulario.codigo = parametro.id
      this.formulario.descripcion = parametro.descripcion
      this.formulario.fecha = parametro.fecha
      this.formulario.cantidad = parametro.cantidad
      this.formulario.producto = parametro.idProducto
      this.formulario.marca = parametro.idmarca
    },
    confirmarEliminarCiudad(elemento) {
      // Abre el diálogo de confirmación y guarda el elemento a eliminar
      this.elementoAEliminar = elemento;
      this.dialogoEliminar = true;
    },
    cancelarEliminarCiudad() {
      // Cierra el diálogo de confirmación y restablece la variable
      this.dialogoEliminar = false;
      this.elementoAEliminar = null;
    },
    eliminarCiudad() {
      if (this.elementoAEliminar) {
        // Realiza la eliminación aquí
        PedidoAPI.delete(this.elementoAEliminar.id).then(() => {
          this.ObtenerPedido();
        });
        // Cierra el diálogo de confirmación
        this.dialogoEliminar = false;
        this.elementoAEliminar = null;
      }
    },

    ObtenerPedido() {
      PedidoAPI.getAll().then(({ data }) => {
        this.items = data.map(item => {
          return {
            id: item.idPedido,
            descripcion: item.Descripcion,
            fecha: item.Fecha_pedi,
            cantidad: item.Cantidad,
            idProducto: item.idProducto,
            nombreproducto: item.nombreproducto,
            idmarca: item.idmarca,
            nombremarca: item.nombremarca,
          }
        })
      })
    },

  },



  created() {
    // Generar automáticamente el código al cargar el componente
    this.formulario.codigo = this.generarCodigo();
    this.ObtenerPedido()
    this.ObtenerProducto()
    this.obtenerMarca()
  },


}
</script>
<style>
.custom-input {
  width: 100%;
  /* Ancho completo */
  height: 56px;
  /* Altura deseada */
  border: 1px solid #9E9E9E;
  /* Borde */
  padding: 8px;
  /* Espaciado interno */
  border-radius: 3px;
  /* Bordes redondeados */
  box-sizing: border-box;
  /* Incluir el borde en el tamaño total */
  outline: none;
  /* Quitar el contorno al hacer clic */
}
</style>