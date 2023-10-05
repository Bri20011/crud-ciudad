<template>
    <v-dialog max-width="700" v-model="dialogoFormulario" persistent>
      <v-card class="rounded-xl">
        <v-container>
          <h1 class="mb-3">Crear Sucursal</h1>
          <v-form>
            <v-row>
              <v-col cols="12" sm="2" md="2">
                <v-text-field variant="outlined" label="Codigo" v-model="formulario.codigo" disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="10" md="10">
                <v-text-field variant="outlined" label="Descripcion de ciudad" v-model="formulario.descripcion"
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
          <h1 class="mb-3">Editar Sucursal</h1>
          <v-form>
            <v-row>
              <v-col cols="12" sm="2" md="2">
                <v-text-field variant="outlined" label="Codigo" disabled v-model="formulario.codigo"></v-text-field>
              </v-col>
              <v-col cols="12" sm="10" md="10">
                <v-text-field variant="outlined" label="Descripcion de ciudad" v-model="formulario.descripcion"
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
          <v-text-field :loading="loading" density="compact" variant="solo"  v-model="buscador" label="Buscar" append-inner-icon="mdi-magnify"
            single-line hide-details rounded click:prependInner></v-text-field>
        </v-col>
  
        <v-col cols="12" sm="7" md="7" class="d-flex justify-end align-center">
          Cantidad Sucursal: {{ items.length }}
        </v-col>
        
      </v-row>
  
      <v-card class="mt-5 rounded-xl">
        <v-data-table :headers="headers" :items="itemsComputed">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <p class="font-weight-bold">Sucursal</p>
              </v-toolbar-title>
  
              <v-btn class="custom-font" color="primary" prepend-icon="mdi-content-save-plus" variant="text"
                @click="abrirDialogo">Registrar
              </v-btn>
  
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon size="small" class="me-2" @click="editarCiudad(item.raw)">
              mdi-pencil
            </v-icon>
            <v-icon color="#C62828" size="small" @click="eliminarCiudad(item.raw)">
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
    </v-container>
  </template>
  
  <script>
  import { VDataTable } from 'vuetify/labs/VDataTable'
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
          descripcion: ''
        },
        limit: 45,
        contador: 1,
        defaultFormulario: {
          codigo: '',
          descripcion: ''
        },
        buscador: '',
        headers: [
          {
            title: 'Codigo',
            align: 'start',
            sortable: false,
            key: 'id',
          },
          { title: 'Descripcion', key: 'descripcion' },
          { title: 'Accion', key: 'action', sortable: false, align: 'end' },
        ],
        items: [
          {
            id: '1',
            descripcion: 'Campo',
            action: ''
          }
        ]
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
      // Abrir el modal y cargar el código aquí
      this.dialogoFormulario = true;
  
      // Recuperar datos del localStorage
      let datosGuardadosSucursal = JSON.parse(localStorage.getItem('datosGuardadosSucursal')) || [];
      
      // Encontrar el último valor guardado
      let ultimoValor = datosGuardadosSucursal.length > 0 ? datosGuardadosSucursal[datosGuardadosSucursal.length - 1] : 0;
      
      // Incrementar el último valor para generar un nuevo código
      let nuevoValor = ultimoValor + 1;
      
      // Verificar si el nuevo valor ya está en uso
      while (this.items.some(item => item.id === nuevoValor)) {
        nuevoValor++; // Incrementar hasta encontrar un código no utilizado
      }
      
      // Asignar el nuevo valor al formulario
      this.formulario.codigo = nuevoValor;
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
  
  
        this.items.push({
          id: this.formulario.codigo,
          descripcion: this.formulario.descripcion,
          action: ''
        })
        localStorage.setItem('db-itemsSuc', JSON.stringify(this.items));
  
        this.formulario.descripcion = '';
        this.dialogoFormulario = false
      },
      guardarFormularioEditar() {
        if (!this.formulario.descripcion) {
          
          this.emptyFieldError = true;
          return;
        }
  
        this.items.forEach(item => {
          if (item.id === this.formulario.codigo) {
            item.descripcion = this.formulario.descripcion
          }
        })
        localStorage.setItem('db-itemsSuc', JSON.stringify(this.items))
        this.dialogoFormularioEditar = false
      },
      editarCiudad(parametro) {
        this.dialogoFormularioEditar = true
        this.formulario.codigo = parametro.id
        this.formulario.descripcion = parametro.descripcion
      },
      eliminarCiudad(parametro) {
        this.items = this.items.filter(item => {
          return item.id != parametro.id
        })
        localStorage.setItem('db-itemsSuc', JSON.stringify(this.items))
      }
  
    },
  
  
    created() {
      // Generar automáticamente el código al cargar el componente
      this.formulario.codigo = this.generarCodigo();
      this.items = JSON.parse(localStorage.getItem('db-itemsTipoDoc')) || []
  
    },
  
  }
  </script>
  <style></style>







  <template>
    <v-dialog max-width="700" v-model="dialogoFormulario" persistent>
      <v-card class="rounded-xl">
        <v-container>
          <h1 class="mb-3">Crear Caja</h1>
          <v-form>
            <v-row>
             
              <v-col cols="12" sm="4" md="4">
                <v-autocomplete variant="outlined" label="Sucursal" :items="listaSucursal" item-title="descripcion" item-value="id" v-model="formulario.sucursal"></v-autocomplete>
              </v-col>
  
  
              <v-col cols="12" sm="4" md="4">
                <v-text-field variant="outlined" label="Descripcion de Caja" v-model="formulario.descripcion"
                  :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
              </v-col>
  
              <v-col cols="12" sm="4" md="4">
                <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'numerCaja'"
                  density="default" label="Introduza el numero de caja" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                  @click:append-inner="visible = !visible" v-model="formulario.numerCaja" :error="excededLimitPas"
                  :error-messages="errorMessageE" required></v-text-field>
  
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormulario = false">Cancelar</v-btn>
                <v-btn color="primary" @click="guardarFormulario"
                  :disabled="excededLimit || !formulario.descripcion || excededLimitPas || !formulario.numerCaja">Guardar</v-btn>
  
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  
    <v-dialog max-width="700" v-model="dialogoFormularioEditar" persistent>
      <v-card class="rounded-xl">
        <v-container>
          <h1 class="mb-3">Editar Caja</h1>
          <v-form>
            <v-row>
              <v-col cols="12" sm="4" md="4">
                <v-text-field variant="outlined" label="Codigo" disabled v-model="formulario.codigo"></v-text-field>
              </v-col>
  
              <v-col cols="12" sm="8" md="8">
                <v-autocomplete variant="outlined" label="Sucursal" :items="listaSucursal" item-title="descripcion" item-value="id" v-model="formulario.sucursal"></v-autocomplete>
              </v-col>
  
              <v-col cols="12" sm="6" md="6">
                <v-text-field variant="outlined" label="Descripcion de Caja" v-model="formulario.descripcion"
                  :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
              </v-col>
  
              <v-col cols="12" sm="6" md="6">
                <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'numerCaja'"
                  density="default" label="Introduza el numero de caja" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                  @click:append-inner="visible = !visible" v-model="formulario.numerCaja" :error="excededLimitPas"
                  :error-messages="errorMessageE" required></v-text-field>
  
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormularioEditar = false">Cancelar</v-btn>
                <v-btn color="primary" @click="guardarFormularioEditar"
                  :disabled="excededLimit || !formulario.descripcion || excededLimitPas || !formulario.numerCaja">Guardar</v-btn>
  
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
          Cantidad de Caja: {{ items.length }}
        </v-col>
      </v-row>
  
      <v-card class="mt-5 rounded-xl">
        <v-data-table :headers="headers" :items="itemsComputed">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <p class="font-weight-bold">Caja</p>
              </v-toolbar-title>
  
              <v-btn class="custom-font" color="primary" prepend-icon="mdi-content-save-plus" variant="text"
                @click="abrirDialogo">Registrar
              </v-btn>
            </v-toolbar>
  
          </template>
  
          <template v-slot:item.numerCaja="{ item }">
            <span v-if="!dialogoFormularioEditar">********</span>
            <span v-else>{{ item.numerCaja }}</span>
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
  import { CajaAPI } from '@/services/caja.api'
  import { SucursalAPI } from '@/services/sucursal.api'
  
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
          numerCaja: '',
          sucursal: ''
        },
        limit: 45,
        limiteNumerCajMin: 6,
        limiteNumerCajMax: 10,
        contador: 1,
        defaultFormulario: {
          codigo: '',
          descripcion: '',
          numerCaja: '',
          sucursal: ''
        },
        listaSucursal: [],
        buscador: '',
        headers: [
          {
            title: 'Codigo',
            align: 'start',
            sortable: false,
            key: 'id',
          },
          { title: 'Descripcion', key: 'descripcion' },
          { title: 'Sucursal', key: 'nombreSucursal'},
          { title: 'Contraseña', key: 'numerCaja' },
          { title: 'Accion', key: 'action', sortable: false, align: 'end' },
        ],
        items: [
          {
            id: '1',
            descripcion: 'Campo',
            numerCaja: '123',
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
      excededLimitPas() {
        const numerCaja = this.formulario.numerCaja;
        return isNaN(numerCaja) || numerCaja.length < this.limiteNumerCajMin || numerCaja.length > this.limiteNumerCajMax;
      },
      errorMessage() {
        if (this.excededLimit) {
          return 'Superaste el límite de 45 letras';
        }
        return '';
      },
      errorMessageE() {
        if (this.excededLimitPas) {
          return `Debe ser entre ${this.limiteNumerCajMin} y ${this.limiteNumerCajMax} caracteres alfanuméricos`;
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
  
      ObtenerSucursal() {
        SucursalAPI.getAll().then(({ data }) => {
          this.listaSucursal = data.map(item => {
            return {
              id: item.idSucursal,
              descripcion: item.Descripcion
            }
          })
        })
      },
      generarCodigo() {
        const nuevoCodigo = this.contador++;
        return nuevoCodigo;
      },
      guardarFormulario() {
  
        if (!this.formulario.descripcion || !this.formulario.numerCaja || this.excededLimit || this.excededLimitPas) {
          this.emptyFieldError = true;
          return;
        }
        CajaAPI.create(
          {
            idCaja: this.formulario.codigo,
            nombrecaja: this.formulario.descripcion,
            Cajahabilitada: this.formulario.numerCaja,
            idSucursal: this.formulario.sucursal
          }
        ).then(()=> {
          this.ObtenerCaja()
        })
  
        this.formulario.descripcion = '';
        this.formulario.numerCaja = '';
        this.dialogoFormulario = false
      },
  
  
      guardarFormularioEditar() {
        if (!this.formulario.descripcion || !this.formulario.numerCaja || this.excededLimit || this.excededLimitPas) {
          this.emptyFieldError = true;
          return;
        }
  
  
        CajaAPI.update(
          this.formulario.codigo,
          {
            idCaja: this.formulario.codigo,
            nombrecaja: this.formulario.descripcion,
            Cajahabilitada: this.formulario.numerCaja,
            idSucursal: this.formulario.sucursal
          }
        ).then(()=> {
          this.ObtenerCaja()
        })
        this.dialogoFormularioEditar = false
      },
      editarCiudad(parametro) {
        this.dialogoFormularioEditar = true
        this.formulario.codigo = parametro.id
        this.formulario.descripcion = parametro.descripcion
        this.formulario.numerCaja = parametro.numerCaja
        this.formulario.sucursal = parametro.idSucursal
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
          CajaAPI.delete(this.elementoAEliminar.id).then(() => {
            this.ObtenerCaja();
          });
          // Cierra el diálogo de confirmación
          this.dialogoEliminar = false;
          this.elementoAEliminar = null;
        }
      },
      ObtenerCaja() {
        CajaAPI.getAll().then(({data}) => {
          this.items = data.map(item=> {
            return {
              id: item.idCaja,
              descripcion: item.nombrecaja,
              numerCaja: item.Cajahabilitada,
              idSucursal: item.idSucursal,
              nombreSucursal: item.nombreSucursal
            }
          })
        })
      },
  
    },
  
  
  
    created() {
      // Generar automáticamente el código al cargar el componente
      this.formulario.codigo = this.generarCodigo();
      this.ObtenerCaja()
      this.ObtenerSucursal()
    },
  
  }
  </script>
  <style></style>