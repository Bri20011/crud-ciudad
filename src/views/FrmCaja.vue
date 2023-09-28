<template>
  <v-dialog max-width="700" v-model="dialogoFormulario" persistent>
    <v-card class="rounded-xl">
      <v-container>
        <h1 class="mb-3">Crear Caja</h1>
        <v-form>
          <v-row>
           
            <v-col cols="12" sm="4" md="4">
              <v-autocomplete variant="outlined" label="Caja" :items="listaCaja" item-title="descripcion" item-value="id" v-model="formulario.sucursal"></v-autocomplete>
            </v-col>


            <v-col cols="12" sm="4" md="4">
              <v-text-field variant="outlined" label="Descripcion de Usuario" v-model="formulario.descripcion"
                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" md="4">
              <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                density="default" label="Introduza la Contraseña" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="visible = !visible" v-model="formulario.password" :error="excededLimitPas"
                :error-messages="errorMessageE" required></v-text-field>

            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormulario = false">Cancelar</v-btn>
              <v-btn color="primary" @click="guardarFormulario"
                :disabled="excededLimit || !formulario.descripcion || excededLimitPas || !formulario.password">Guardar</v-btn>

            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>

  <v-dialog max-width="700" v-model="dialogoFormularioEditar" persistent>
    <v-card class="rounded-xl">
      <v-container>
        <h1 class="mb-3">Editar Usuario</h1>
        <v-form>
          <v-row>
            <v-col cols="12" sm="4" md="4">
              <v-text-field variant="outlined" label="Codigo" disabled v-model="formulario.codigo"></v-text-field>
            </v-col>

            <v-col cols="12" sm="8" md="8">
              <v-autocomplete variant="outlined" label="Sucursal" :items="listaSucursal" item-title="descripcion" item-value="id" v-model="formulario.sucursal"></v-autocomplete>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field variant="outlined" label="Descripcion de Usuario" v-model="formulario.descripcion"
                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                density="default" label="Introduza la Contraseña" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="visible = !visible" v-model="formulario.password" :error="excededLimitPas"
                :error-messages="errorMessageE" required></v-text-field>

            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormularioEditar = false">Cancelar</v-btn>
              <v-btn color="primary" @click="guardarFormularioEditar"
                :disabled="excededLimit || !formulario.descripcion || excededLimitPas || !formulario.password">Guardar</v-btn>

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
        Cantidad de Usuario: {{ items.length }}
      </v-col>
    </v-row>

    <v-card class="mt-5 rounded-xl">
      <v-data-table :headers="headers" :items="itemsComputed">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              <p class="font-weight-bold">Usuarios</p>
            </v-toolbar-title>

            <v-btn class="custom-font" color="primary" prepend-icon="mdi-content-save-plus" variant="text"
              @click="abrirDialogo">Registrar
            </v-btn>
          </v-toolbar>

        </template>

        <template v-slot:item.password="{ item }">
          <span v-if="!dialogoFormularioEditar">********</span>
          <span v-else>{{ item.password }}</span>
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
import { UsuarioAPI } from '@/services/usuario.api'
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
        password: '',
        sucursal: ''
      },
      limit: 45,
      limitePasswordMin: 6,
      limitePasswordMax: 10,
      contador: 1,
      defaultFormulario: {
        codigo: '',
        descripcion: '',
        password: '',
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
        { title: 'Contraseña', key: 'password' },
        { title: 'Accion', key: 'action', sortable: false, align: 'end' },
      ],
      items: [
        {
          id: '1',
          descripcion: 'Campo',
          password: '123',
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
      const password = this.formulario.password;
      return isNaN(password) || password.length < this.limitePasswordMin || password.length > this.limitePasswordMax;
    },
    errorMessage() {
      if (this.excededLimit) {
        return 'Superaste el límite de 45 letras';
      }
      return '';
    },
    errorMessageE() {
      if (this.excededLimitPas) {
        return `Debe ser entre ${this.limitePasswordMin} y ${this.limitePasswordMax} caracteres alfanuméricos`;
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

      if (!this.formulario.descripcion || !this.formulario.password || this.excededLimit || this.excededLimitPas) {
        this.emptyFieldError = true;
        return;
      }
      UsuarioAPI.create(
        {
          idUsuario: this.formulario.codigo,
          Nombre: this.formulario.descripcion,
          Contrasehna: this.formulario.password,
          idSucursal: this.formulario.sucursal
        }
      ).then(()=> {
        this.ObtenerUsuario()
      })

      this.formulario.descripcion = '';
      this.formulario.password = '';
      this.dialogoFormulario = false
    },


    guardarFormularioEditar() {
      if (!this.formulario.descripcion || !this.formulario.password || this.excededLimit || this.excededLimitPas) {
        this.emptyFieldError = true;
        return;
      }


      UsuarioAPI.update(
        this.formulario.codigo,
        {
          idUsuario: this.formulario.codigo,
          Nombre: this.formulario.descripcion,
          Contrasehna: this.formulario.password,
          idSucursal: this.formulario.sucursal
        }
      ).then(()=> {
        this.ObtenerUsuario()
      })
      this.dialogoFormularioEditar = false
    },
    editarCiudad(parametro) {
      this.dialogoFormularioEditar = true
      this.formulario.codigo = parametro.id
      this.formulario.descripcion = parametro.descripcion
      this.formulario.password = parametro.password
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
        UsuarioAPI.delete(this.elementoAEliminar.id).then(() => {
          this.ObtenerUsuario();
        });
        // Cierra el diálogo de confirmación
        this.dialogoEliminar = false;
        this.elementoAEliminar = null;
      }
    },
    ObtenerUsuario() {
      UsuarioAPI.getAll().then(({data}) => {
        this.items = data.map(item=> {
          return {
            id: item.idUsuario,
            descripcion: item.Nombre,
            password: item.Contrasehna,
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
    this.ObtenerUsuario()
    this.ObtenerSucursal()
  },

}
</script>
<style></style>