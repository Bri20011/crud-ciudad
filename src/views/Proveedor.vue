<template>
    <v-dialog max-width="700" v-model="dialogoFormulario" persistent>
      <v-card class="rounded-xl">
        <v-container>
          <h1 class="mb-3">Crear Proveedor</h1>
          <v-form>
            <v-row>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  density="default" label="Ruc o CI" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                  @click:append-inner="visible = !visible" v-model="formulario.ruc" :error="excededLimit4"
                  :error-messages="errorMessage4" required></v-text-field>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-text-field variant="outlined" label="Razon Social" v-model="formulario.razonsocial"
                  :error="excededLimit1" :error-messages="errorMessage1" required></v-text-field>
              </v-col>
  
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  density="default" label="Direccion" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                  @click:append-inner="visible = !visible" v-model="formulario.direccion" :error="excededLimit3"
                  :error-messages="errorMessage3" required></v-text-field>
              </v-col>

                <v-col cols="12" sm="4" md="4">
                <v-text-field variant="outlined" label="Telefono" v-model="formulario.telefono"
                  :error="excededLimit2" :error-messages="errorMessage2" required></v-text-field>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-autocomplete variant="outlined" label="Barrio" :items="listaBarrio" item-title="descripcionB" item-value="id" v-model="formulario.barrio"></v-autocomplete>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-autocomplete variant="outlined" label="Ciudad" :items="listaCiudad" item-title="descripcionC" item-value="id" v-model="formulario.ciudad"></v-autocomplete>
              </v-col>

            </v-row>
            <v-row>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormulario = false">Cancelar</v-btn>
                <v-btn color="primary" @click="guardarFormulario"
                  :disabled="excededLimit1 || !formulario.razonsocial || excededLimit3 || !formulario.direccion || excededLimit2 || !formulario.telefono || limit3 || !formulario.barrio
                  || limit3 || !formulario.ciudad || excededLimit4 || !formulario.ruc">Guardar</v-btn>    <!-- CORREGIR VALIDACIONES  -->
  
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  
    <v-dialog max-width="700" v-model="dialogoFormularioEditar" persistent>
      <v-card class="rounded-xl">
        <v-container>
          <h1 class="mb-3">Editar Proveedor</h1>
          <v-form>
            <v-row>

              <v-col cols="12" sm="4" md="4">
                <v-text-field variant="outlined" label="Codigo" disabled v-model="formulario.codigo"></v-text-field>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-text-field variant="outlined" label="Ruc o CI" v-model="formulario.ruc"
                  :error="excededLimit4" :error-messages="errorMessage4" required></v-text-field>
              </v-col>
  
              <v-col cols="12" sm="4" md="4">
                <v-text-field 
                  density="default" label="Razon Social" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                  @click:append-inner="visible = !visible" v-model="formulario.razonsocial" :error="excededLimit1"
                  :error-messages="errorMessage1" required></v-text-field>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-text-field variant="outlined" label="Direccion" v-model="formulario.direccion"
                  :error="excededLimit3" :error-messages="errorMessage3" required></v-text-field>
              </v-col>
  
              <v-col cols="12" sm="4" md="4">
                <v-text-field 
                  density="default" label="Telefono" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                  @click:append-inner="visible = !visible" v-model="formulario.telefono" :error="excededLimit2"
                  :error-messages="errorMessage2" required></v-text-field>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-autocomplete variant="outlined" label="Barrio" :items="listaBarrio" item-title="descripcionB" item-value="id" v-model="formulario.barrio"></v-autocomplete>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-autocomplete variant="outlined" label="Ciudad" :items="listaCiudad" item-title="descripcionC" item-value="id" v-model="formulario.ciudad"></v-autocomplete>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormularioEditar = false">Cancelar</v-btn>
                <v-btn color="primary" @click="guardarFormularioEditar"
                :disabled="excededLimit1 || !formulario.razonsocial || excededLimit3 || !formulario.direccion || excededLimit2 || !formulario.telefono || limit3 || !formulario.barrio
                  || limit3 || !formulario.ciudad || excededLimit4 || !formulario.ruc">Guardar</v-btn>  <!-- CORREGIR VALIDACIONES  -->
              </v-col>

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
          Cantidad de Proveedor: {{ items.length }}
        </v-col>

      </v-row>
  
      <v-card class="mt-5 rounded-xl">
        <v-data-table :headers="headers" :items="itemsComputed">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <p class="font-weight-bold">Proveedor</p>
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
  import { ProveedorAPI } from '@/services/proveedor.api'
  import { BarrioAPI } from '@/services/barrio.api'
  import { CiudadAPI } from '@/services/ciudad.api'
  
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
          ruc: '',
          razonsocial: '',
          direccion: '',
          telefono: '',
          barrio: '',
          ciudad: ''
        },
        limit1: 45,
        limite2: 15,
        limit3:0,
        contador: 1,
        defaultFormulario: {
          codigo: '',
          ruc: '',
          razonsocial: '',
          direccion: '',
          telefono: '',
          barrio: '',
          ciudad: ''
        },
        listaBarrio: [],
        listaCiudad: [],
        buscador: '',
        headers: [
          { title: 'Codigo', align: 'start', sortable: false, key: 'id', },
          { title: 'Ruc o CI', key: 'ruc' },
          { title: 'Razon Social', key: 'razonsocial' },
          { title: 'Direccion', key: 'direccion' },
          { title: 'Telefono', key: 'telefono' },
          { title: 'Barrio', key: 'nombrebarrio'},
          { title: 'Ciudad', key: 'nombreciudad'},
          { title: 'Accion', key: 'action', sortable: false, align: 'end' },
        ],
        items: [
          {
            id: '1',
            ruc: '7586748',
            razonsocial: 'Juan Perez',
            direccion: 'Esq Flores',
            telefono: '0975482412',

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
      excededLimit1() {
        return this.formulario.razonsocial.length > this.limit1;
      },


      excededLimit2() {
        return this.formulario.telefono.length > this.limite2;
       
      },
      excededLimit3() {
        return this.formulario.direccion.length > this.limit1;
      },

      excededLimit4() {
        return this.formulario.ruc.length > this.limite2;
      },


      errorMessage1() {
        if (this.excededLimit1) {
          return 'Superaste el límite de 45 letras';
        }
        return '';
      },
      errorMessage2() {
        if (this.excededLimit2) {
          return 'Superaste el límite de 15 letras';
        }
        return '';
      },
      errorMessage3() {
        if (this.excededLimit3) {
          return 'Superaste el límite de 45 letras';
        }
        return '';
      },
      errorMessage4() {
        if (this.excededLimit4) {
          return 'Superaste el límite de 15 letras';
        }
        return '';
      }
    },
  
  
    methods:
    {
      abrirDialogo() {
        // Abrir el modal y cargar el código aquí
        this.dialogoFormulario = true;
        this.formulario = JSON.parse(JSON.stringify(this.defaultFormulario))
      },
  
      ObtenerBarrio() {
        BarrioAPI.getAll().then(({ data }) => {
          this.listaBarrio = data.map(item => {
            return {
              id: item.idBarrio,
              descripcionB: item.descripcion
            }
          })
        })
      },
      obtenerCiudades() {
        CiudadAPI.getAll().then(({ data }) => {
          this.listaCiudad = data.map(item => {
            return {
              id: item.idCiudad,
              descripcionC: item.Descripcion
            }
          })
        })
      },
      generarCodigo() {
        const nuevoCodigo = this.contador++;
        return nuevoCodigo;
      },

      guardarFormulario() {
        if (!this.formulario.razonsocial || !this.formulario.telefono || this.excededLimit || this.excededLimitPas) {
          this.emptyFieldError = true;
          return;
        }

        
        ProveedorAPI.create(
          {
            idProveedor: this.formulario.codigo,
            Ruc: this.formulario.ruc,
            Razon_social: this.formulario.razonsocial,
            Direccion: this.formulario.direccion,
            Telefono: this.formulario.telefono,
            idBarrio: this.formulario.barrio,
            idCiudad: this.formulario.ciudad
          }
        ).then(()=> {
          this.ObtenerProveedor()
        })
  
        this.formulario.ruc = '';
        this.formulario.razonsocial = '';
        this.formulario.direccion = '';
        this.formulario.telefono = '';
        this.formulario.barrio = '';
        this.formulario.ciudad = '';
        this.dialogoFormulario = false
      },
  
  
      guardarFormularioEditar() {
        if (!this.formulario.razonsocial || !this.formulario.telefono || this.excededLimit || this.excededLimitPas) {
          this.emptyFieldError = true;
          return;
        }
  
  
        ProveedorAPI.update(
          this.formulario.codigo,
          {
            idProveedor: this.formulario.codigo,
            Ruc: this.formulario.ruc,
            Razon_social: this.formulario.razonsocial,
            Direccion: this.formulario.direccion,
            Telefono: this.formulario.telefono,
            idBarrio: this.formulario.barrio,
            idCiudad: this.formulario.ciudad
          }
        ).then(()=> {
          this.ObtenerProveedor()
        })
        this.dialogoFormularioEditar = false
      },
      editarCiudad(parametro) {
        this.dialogoFormularioEditar = true
        this.formulario.codigo = parametro.id
        this.formulario.ruc = parametro.ruc
        this.formulario.razonsocial = parametro.razonsocial
        this.formulario.direccion = parametro.direccion
        this.formulario.telefono = parametro.telefono
        this.formulario.barrio = parametro.idBarrio
        this.formulario.ciudad = parametro.idCiudad
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
          ProveedorAPI.delete(this.elementoAEliminar.id).then(() => {
            this.ObtenerProveedor();
          });
          // Cierra el diálogo de confirmación
          this.dialogoEliminar = false;
          this.elementoAEliminar = null;
        }
      },
      ObtenerProveedor() {
        ProveedorAPI.getAll().then(({data}) => {
          this.items = data.map(item=> {
            return {
              id: item.idProveedor,
              ruc: item.Ruc,
              razonsocial: item.Razon_social,
              direccion: item.Direccion,
              telefono: item.Telefono,
              idBarrio: item.idBarrio,
              nombrebarrio: item.nombrebarrio,
              idCiudad: item.idCiudad,
              nombreciudad: item.nombreciudad,
             
            }
          })
        })
      },
  
    },
  
  
  
    created() {
      // Generar automáticamente el código al cargar el componente
      this.formulario.codigo = this.generarCodigo();
      this.ObtenerBarrio()
      this.obtenerCiudades()
      this.ObtenerProveedor()
    },
  
  }
  </script>
  <style></style>