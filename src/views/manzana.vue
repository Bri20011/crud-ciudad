<template>
    <v-dialog max-width="700" v-model="dialogoFormulario" persistent>
      <v-card class="rounded-xl">
        <v-container>
          <h1 class="mb-3">Crear Manzana</h1>
          <v-form>
            <v-row>
                <v-col cols="12" sm="12" md="12">
                <v-text-field variant="outlined" label="Numero de Manzana" v-model="formulario.numero_manzana"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field variant="outlined" label="Descripcion de manzana" v-model="formulario.descripcion"
                  :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
              </v-col>

  
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
          <h1 class="mb-3">Editar Manzana</h1>
          <v-form>
            <v-row>
              <v-col cols="12" sm="2" md="2">
                <v-text-field variant="outlined" label="Codigo" disabled v-model="formulario.codigo"></v-text-field>
              </v-col>
              <v-col cols="12" sm="10" md="10">
                <v-text-field variant="outlined" label="Numero de Manzana" v-model="formulario.numero_manzana"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" sm="10" md="10">
                <v-text-field variant="outlined" label="Descripcion de Manzana" v-model="formulario.descripcion"
                  :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
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
          <v-text-field :loading="loading" v-model="buscador" density="compact" variant="solo" label="Buscar" append-inner-icon="mdi-magnify"
            single-line hide-details rounded click:prependInner></v-text-field>
        </v-col>
  
        <v-col cols="12" sm="7" md="7" class="d-flex justify-end align-center">
          Cantidad de Manzana: {{ items.length }}
        </v-col>
  
      </v-row>
  
      <v-card class="mt-5 rounded-xl">
        <v-data-table :headers="headers" :items="itemsComputed">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <p class="font-weight-bold">Manzanas</p>
              </v-toolbar-title>
  
              <v-btn class="custom-font" color="primary" prepend-icon="mdi-content-save-plus" variant="text"
                @click="abrirDialogo">Registrar
              </v-btn>
  
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon size="small" class="me-2" @click="editarManzana(item.raw)">
              mdi-pencil
            </v-icon>
            <v-icon color="#C62828" size="small" @click="confirmarEliminarManzana(item.raw)">
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
            <v-btn color="#E0E0E0" class="mx-2" text @click="eliminarManzana">Eliminar</v-btn>
            <v-btn color="primary" text @click="cancelarEliminarManzana">Cancelar</v-btn>
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
  import { ManzanaAPI } from '@/services/manzana.api'
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
          numero_manzana:''
        },
        limit: 45,
        contador: 1,
        defaultFormulario: {
          codigo: '',
          descripcion: '',
          numero_manzana:''

        },
        listamanzana: [],
        buscador: '',
        headers: [
          {
            title: 'Codigo',
            align: 'start',
            sortable: false,
            key: 'id',
          },
          { title: 'Numero de Manzana', key: 'numero_manzana' },
          { title: 'Descripcion', key: 'descripcion' },
          { title: 'Accion', key: 'action', sortable: false, align: 'end' },
        ],
        items: [
          {
            id: '1',
            descripcion: 'Campo',
            numero_manzana: '1',
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
      abrirDialogo() {
      this.dialogoFormulario = true;
      this.formulario = JSON.parse(JSON.stringify(this.defaultFormulario))
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
  
        ManzanaAPI.create(
          {
            idManzana: this.formulario.manzana,
            numero_manzana: this.formulario.numero_manzana,
            Descripcion: this.formulario.descripcion

          }
        ).then(()=> {
          this.ObtenerManzana()
        })
  
        this.formulario.descripcion = '';
        this.formulario.numero_manzana = '';
        this.dialogoFormulario = false
        this.dialogoFormulario = false
      },
     
  
      guardarFormularioEditar() {
  
        if (!this.formulario.descripcion) {
          
          this.emptyFieldError = true;
          return;
        }
  
        ManzanaAPI.update(
          this.formulario.codigo,
          {
            idManzana: this.formulario.codigo,
            numero_manzana: this.formulario.numero_manzana,
            Descripcion: this.formulario.descripcion

          }
        ).then(()=> {
          this.ObtenerManzana()
        })
        this.formulario.descripcion = '';
        this.formulario.numero_manzana = '';
        this.dialogoFormularioEditar = false
      },
      editarManzana(parametro) {
        this.dialogoFormularioEditar = true
        this.formulario.codigo = parametro.id
        this.formulario.descripcion = parametro.descripcion
        this.formulario.numero_manzana = parametro.numero_manzana
      },
      
      confirmarEliminarManzana(elemento) {
        // Abre el diálogo de confirmación y guarda el elemento a eliminar
        this.elementoAEliminar = elemento;
        this.dialogoEliminar = true;
      },
      cancelarEliminarManzana() {
        // Cierra el diálogo de confirmación y restablece la variable
        this.dialogoEliminar = false;
        this.elementoAEliminar = null;
      },
      eliminarManzana() {
        if (this.elementoAEliminar) {
          // Realiza la eliminación aquí
          ManzanaAPI.delete(this.elementoAEliminar.id).then(() => {
            this.ObtenerManzana();
          });
          // Cierra el diálogo de confirmación
          this.dialogoEliminar = false;
          this.elementoAEliminar = null;
        }
      },
  
  
      ObtenerManzana() {
        ManzanaAPI.getAll().then(({data}) => {
          this.items = data.map(item=> {
            return {
              id: item.idManzana,
              numero_manzana: item.numero_manzana,
              descripcion: item.Descripcion
            }
          })
        })
      },
  
    },
  
    
  
    created() {
      // Generar automáticamente el código al cargar el componente  dd
      this.formulario.codigo = this.generarCodigo();
      this.ObtenerManzana()
    },
  
  }
  </script>
  <style></style>