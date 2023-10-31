<template>
  <v-dialog max-width="800" v-model="dialogoFormulario" persistent>
      <v-card class="rounded-xl">
          <v-container>
              <h1 class="mb-3">Crear Pedido</h1>
              <v-form>
                  <v-row>
                      <v-col cols="12" sm="6" md="6">
                          <v-text-field variant="outlined" label="Descripcion" v-model="formulario.descripcion"
                              :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                          <input class="custom-input" v-model="formulario.fechaD" type="date"
                              placeholder="Fecha de Pedido" @input="formatDate" />
                      </v-col>

                      
                    


                      <!-- INICIO DETALLE -->
                      <v-col cols="12" sm="6" md="6">
                          <v-autocomplete variant="outlined" label="Producto" :items="listaProducto"
                              item-title="descripcionPr" item-value="id" v-model="detalle.producto" :error="excededLimit"
                              :error-messages="errorMessage" required></v-autocomplete>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                          <v-text-field variant="outlined" label="Cantidad" v-model="detalle.cantidad"
                              :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
                      </v-col>
                      
                      <v-col cols="12">
                          <v-btn @click="AgregarDetalle">Agregar detalle</v-btn>
                      </v-col>

                      <!-- Fin DETALLE -->
                      
                    

                      <v-data-table :headers="headersPedido" :items="itemsDetalle">
                          <template v-slot:item.action="{ item }">
                              <v-icon size="small" class="me-2" @click="editarCiudad(item.raw)">
                                  mdi-pencil
                              </v-icon>
                              <v-icon color="#C62828" size="small" @click="confirmarEliminarCiudad(item.raw)">
                                  mdi-trash-can-outline
                              </v-icon>
                          </template>
                      </v-data-table>
                  </v-row>
                  <v-row>
                      <v-col cols="12" class="d-flex justify-end">
                          <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormulario = false">Cancelar</v-btn>
                          <v-btn color="primary" @click="guardarFormulario">Guardar</v-btn>

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
                          <v-text-field variant="outlined" label="Codigo" disabled
                              v-model="formulario.codigo"></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="5" md="5">
                          <v-text-field variant="outlined" label="Descripcion de Pedido" v-model="formulario.descripcion"
                              :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
                      </v-col>


                      <v-col ols="12" sm="5" md="5">
                          <v-text-field variant="outlined" label="Fecha de Pedido"
                              v-model="formulario.fechaD"></v-text-field>
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

<!-- FIN DETALLE -->



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
          <v-data-table items-per-page-text="Item por pagina" :headers="headers" :items="itemsComputed">
              <template v-slot:top>
                  <v-toolbar flat color="white">
                      <v-toolbar-title>
                          <p class="font-weight-bold">Registro de Pedido</p>
                      </v-toolbar-title>

                      <v-btn class="custom-font" color="primary" prepend-icon="mdi-content-save-plus" variant="text"
                          @click="abrirDialogo">Registrar
                      </v-btn>

                  </v-toolbar>
              </template>
              <template v-slot:item.fechaD="{ item }">
                  {{ formatearFecha(item.raw.fechaD) }}
              </template>
              <template v-slot:item.action="{ item }">
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
      <!-- FIN DIALOGO -->
  </v-container>
</template>

<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { PedidoAPI } from '@/services/pedido.api'
import { ProductoAPI } from '@/services/producto.api' 


import dayjs from 'dayjs'



export default {
  components: {
      VDataTable
  },
  data() {
      return {
          dialogoFormulario: false,
          dialogoFormularioEditar: false,

          detalle: {
              producto: '',
              descripcion: '',
          },

          formulario: {
              descripcion: '',
              fechaD: null,
            


          },

          contador: 1,
          limit: 45,
          defaultFormulario: {
              codigo: '',
              descripcion: '',
              fechaD: ''
          },
          buscador: '',
          headers: [
              { title: 'Codigo', align: 'start', sortable: false, key: 'id',},
              { title: 'Descripcion', key: 'descripcion', align: 'star' },
              { title: 'Fecha de Pedido', key: 'fechaD', align: 'star' },
              { title: 'Accion', key: 'action', sortable: false, align: 'end' },
          ],
          headersPedido: [

              { title: 'Producto', key: 'producto' },
              { title: 'Cantidad', key: 'cantidad', align: 'star' },
              { title: 'Accion', key: 'action', sortable: false, align: 'end' },
          ],
          items: [
              {
                  id: '1',
                  descripcion: 'Central',
                  fechaD: '',
                  action: ''
              }
          ],
          itemsDetalle: [

          ],
          dialogoEliminar: false,
          elementoAEliminar: null,

          listaProducto: [],

      }
  },

  computed: {
      itemsComputed() {
          if (!this.buscador) return this.items
          return this.items.filter((element) => element.descripcion.toLocaleLowerCase().includes(this.buscador.toLocaleLowerCase()))
      },
  },
  methods:
  {
      ObtenerProducto(){
          ProductoAPI.getAll().then(({ data }) => {
        this.listaProducto = data.map(item => {
          return {
            id: item.idProducto,
            descripcionPr: item.Descripcion
          }
        })
      })
      },






      AgregarDetalle() {
          this.itemsDetalle.push({
              producto: this.detalle.producto,
              cantidad: this.detalle.cantidad,
              action: '',

          }),
          this.detalle.producto = ''
          this.detalle.cantidad = ''
         
      },


      formatearFecha(fechaD) {
          return dayjs(fechaD).format('DD/MM/YYYY')
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
      generarCodigo() {
          const nuevoCodigo = this.contador++;
          return nuevoCodigo;
      },

      guardarFormulario() {
          // if (!this.formulario.descripcion) {

          //     this.emptyFieldError = true;
          //     return;
          // }


          PedidoAPI.create(
              {
                  idPedido: this.formulario.codigo,
                  Descripcion: this.formulario.descripcion,
                  Fecha_pedi: this.formulario.fechaD,
                  Detalle: this.itemsDetalle


              },
          ).then(() => {
              this.ObtenerPedido()
          })

          this.formulario.codigo = '';
          this.formulario.descripcion = '';
          this.formulario.fechaD = '';
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
                  Fecha_pedi: this.formulario.fechaD
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
          this.formulario.fechaD = parametro.fechaD
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
                      fechaD: item.Fecha_pedi,
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