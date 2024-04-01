<template>
    <v-dialog max-width="700" v-model="dialogoFormulario" persistent>
      <v-card class="rounded-xl">
        <v-container>
          <h1 class="mb-3">Crear Efectivo</h1>
          <v-form>
            <v-row class="d-flex justify-center">
            

              <v-col cols="12" sm="4" md="4">
                <v-text-field variant="outlined" label="Descripcion" v-model="formulario.descripcion"
                   required></v-text-field>
              </v-col>
  
            
              <v-col cols="12" sm="4" md="4">
                <v-autocomplete variant="outlined" label="Moneda" :items="listaMoneda" item-title="descripcionM" item-value="id" v-model="formulario.moneda"></v-autocomplete>
              </v-col>

            </v-row>
            <v-row>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormulario = false">Cancelar</v-btn>
                <v-btn color="primary" @click="guardarFormulario"
                >Guardar</v-btn>    <!-- CORREGIR VALIDACIONES  -->
  
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  
    <v-dialog max-width="800" v-model="dialogoFormularioEditar" persistent>
      <v-card class="rounded-xl">
        <v-container>
          <h1 class="mb-3">Editar Efectivo</h1>
          <v-form>
            <v-row>

              <v-col cols="12" sm="4" md="4">
                <v-text-field variant="outlined" label="Codigo" disabled v-model="formulario.codigo"></v-text-field>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-text-field variant="outlined" label="Descripcion" v-model="formulario.descripcion"
                   required></v-text-field>
              </v-col>
              
              <v-col cols="12" sm="4" md="4">
                <v-autocomplete variant="outlined" label="Moneda" :items="listaMoneda" item-title="descripcionM" item-value="id" v-model="formulario.moneda"></v-autocomplete>
              </v-col>

            <v-row>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormularioEditar = false">Cancelar</v-btn>
                <v-btn color="primary" @click="guardarFormularioEditar"
                >Guardar</v-btn>  <!-- CORREGIR VALIDACIONES  -->
              </v-col>

            </v-row>
          </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>


    <v-container>
      <v-row>

        <v-col cols="12" sm="6" md="6">
          <v-text-field :loading="loading" density="compact"  v-model="buscador" variant="solo" label="Buscar" append-inner-icon="mdi-magnify"
            single-line hide-details rounded click:prependInner></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6" class="d-flex justify-end align-center">
          Cantidad de Efectivo: {{ items.length }}
        </v-col>

      </v-row>
  
      <v-card class="mt-5 rounded-xl">
        <v-data-table :headers="headers" :items="itemsComputed">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <p class="font-weight-bold">Efectivo</p>
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
                          <!-- FIN DIALOGO -->
    </v-container>
  </template>
  
  <script>
  import { VDataTable } from 'vuetify/labs/VDataTable'
  import { EfectivoAPI } from '@/services/efectivo.api'
  import { MonedaAPI } from '@/services/moneda.api'

  
  export default {
    components: {
      VDataTable
    },
    data() {
      return {
        visible: false,
        dialogoFormulario: false,
        dialogoFormularioEditar: false,
        formulario: {
          codigo: '',
          descripcion: '',
          moneda: '',
        
         
        },
        limit1: 45,
        // limite2: 15,
        // limit3:0,
        contador: 1,
        defaultFormulario: {
          // codigo: '',
          // descripcion: '',
          // moneda: ''
        },
  
        listaMoneda: [],
        buscador: '',
        headers: [
          { title: 'Codigo', align: 'start', sortable: false, key: 'id', },
          { title: 'Descripcion', key: 'descripcion' },
          { title: 'Moneda', key: 'moneda' },
          { title: 'Accion', key: 'action', sortable: false, align: 'end' },
        ],
        items: [
          {
            id: '1',
            descripcion: '7586748',
            moneda: '1',
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
        return this.items.filter((element) => element.razonsocial.toLocaleLowerCase().includes(this.buscador.toLocaleLowerCase()))
      },
      // excededLimit1() {
      //   return this.formulario.razonsocial.length > this.limit1;
      // },

      // errorMessage1() {
      //   if (this.excededLimit1) {
      //     return 'Superaste el límite de 45 letras';
      //   }
      //   return '';
      // },
      
    },
  
  
    methods:
    {
      abrirDialogo() {
        // Abrir el modal y cargar el código aquí
        this.dialogoFormulario = true;
        this.formulario = JSON.parse(JSON.stringify(this.defaultFormulario))
      },
  
      ObtenerMoneda() {
        MonedaAPI.getAll().then(({ data }) => {
          this.listaMoneda = data.map(item => {
            return {
              id: item.idmoneda,
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
        if (!this.formulario.descripcion || this.excededLimit) {
          this.emptyFieldError = true;
          return;
        }

        
        EfectivoAPI.create(
          {
            idefectivo: this.formulario.codigo,
            Descripcion: this.formulario.descripcion,
            idmoneda: this.formulario.moneda,
        
          }
        ).then(()=> {
          this.ObtenerEfectivo()
        })
  
        this.formulario.codigo = '';
        this.formulario.descripcion = '';
        this.formulario.moneda = '';
        this.dialogoFormulario = false
      },
  
  
      guardarFormularioEditar() {
        if (!this.formulario.descripcion || this.excededLimit) {
          this.emptyFieldError = true;
          return;
        }
  
  
        EfectivoAPI.update(
          this.formulario.codigo,
          {
            idefectivo: this.formulario.codigo,
            Descripcion: this.formulario.descripcion,
            idmoneda: this.formulario.moneda,
          }
        ).then(()=> {
          this.ObtenerEfectivo()
        })
        this.dialogoFormularioEditar = false
      },
      editarCiudad(parametro) {
        console.log("Parametro: ", parametro);
        this.dialogoFormularioEditar = true
        this.formulario.codigo = parametro.id
        this.formulario.descripcion = parametro.descripcion
        this.formulario.moneda = parametro.moneda

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
          EfectivoAPI.delete(this.elementoAEliminar.id).then(() => {
            this.ObtenerEfectivo();
          });
          // Cierra el diálogo de confirmación
          this.dialogoEliminar = false;
          this.elementoAEliminar = null;
        }
      },
      ObtenerEfectivo() {
        EfectivoAPI.getAll().then(({data}) => {
          this.items = data.map(item=> {
            return {
              id: item.idefectivo,
              descripcion: item.Descripcion,
              moneda: item.idmoneda
              // nombreciudad: item.nombreciudad,
             
            }
          })
        })
      },
  
    },
  
  
  
    created() {
      // Generar automáticamente el código al cargar el componente
      this.formulario.codigo = this.generarCodigo();
      this.ObtenerMoneda()
      this.ObtenerEfectivo()
    },
  
  }
  </script>
  <style></style>