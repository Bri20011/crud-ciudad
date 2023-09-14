<template>
  <v-dialog max-width="700" v-model="dialogoFormulario" persistent>
    <v-card class="rounded-xl">
      <v-container>
        <h1 class="mb-3">Crear Usuario</h1>
        <v-form>
          <v-row>
            <v-col cols="12" sm="2" md="2">
              <v-text-field variant="outlined" label="Codigo" v-model="formulario.codigo" disabled></v-text-field>
            </v-col>

            <v-col cols="12" sm="5" md="5">
              <v-text-field variant="outlined" label="Descripcion de Usuario" v-model="formulario.descripcion"
                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="5">
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
            <v-col cols="12" sm="2" md="2">
              <v-text-field variant="outlined" label="Codigo" disabled v-model="formulario.codigo"></v-text-field>
            </v-col>

            <v-col cols="12" sm="5" md="5">
              <v-text-field variant="outlined" label="Descripcion de Usuario" v-model="formulario.descripcion"
                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="5">
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
import { UsuarioAPI } from '@/services/usuario.api'

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
        password: ''
      },
      limit: 45,
      limitePasswordMin: 6,
      limitePasswordMax: 10,
      contador: 1,
      defaultFormulario: {
        codigo: '',
        descripcion: '',
        password: ''
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

      // Recuperar datos del localStorage
      let datosGuardadosUser = JSON.parse(localStorage.getItem('datosGuardadosUser')) || [];

      // Encontrar el último valor guardado
      let ultimoValor = datosGuardadosUser.length > 0 ? datosGuardadosUser[datosGuardadosUser.length - 1] : 0;

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

      if (!this.formulario.descripcion || !this.formulario.password || this.excededLimit || this.excededLimitPas) {
        this.emptyFieldError = true;
        return;
      }
      UsuarioAPI.create(
        {
          idUsuario: this.formulario.codigo,
          Nombre: this.formulario.descripcion,
          Contrasehna: this.formulario.password
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
          Contrasehna: this.formulario.password
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
    },
    eliminarCiudad(parametro) {
      UsuarioAPI.delete(parametro.id).then(() => this.ObtenerUsuario())
    },
    ObtenerUsuario() {
      UsuarioAPI.getAll().then(({data}) => {
        this.items = data.map(item=> {
          return {
            id: item.idUsuario,
            descripcion: item.Nombre,
            password: item.Contrasehna
          }
        })
      })
    },

  },

  

  created() {
    // Generar automáticamente el código al cargar el componente
    this.formulario.codigo = this.generarCodigo();
    this.ObtenerUsuario()
  },

}
</script>
<style></style>