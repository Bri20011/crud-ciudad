<template>
  <v-dialog max-width="700" v-model="dialogoFormulario" persistent>
    <v-card class="rounded-xl">
      <v-container>
        <h1 class="mb-3">Crear Numero de Establecimiento</h1>
        <v-form>
          <v-row>
            <v-col cols="12" sm="2" md="2">
              <v-text-field variant="outlined" label="Codigo" v-model="formulario.codigo" disabled></v-text-field>
            </v-col>
            <v-col cols="12" sm="5" md="5">
              <v-text-field variant="outlined" label="Descripcion de Establecimiento" v-model="formulario.descripcion"
                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
            </v-col>

            <v-col cols="12" sm="5" md="5">
              <v-text-field variant="outlined" label="Numero de Estableciemto" v-model="formulario.numero"
              :error="excededLimitEstab" :error-messages="errorMessageE" required ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormulario = false">Cancelar</v-btn>
              <v-btn color="primary" @click="guardarFormulario"
              :disabled="excededLimit || !formulario.descripcion || excededLimitEstab || !formulario.numero">Guardar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>

  <v-dialog max-width="700" v-model="dialogoFormularioEditar" persistent>
    <v-card class="rounded-xl">
      <v-container>
        <h1 class="mb-3">Editar Numero de Establecimiento</h1>
        <v-form>
          <v-row>
            <v-col cols="12" sm="2" md="2">
              <v-text-field variant="outlined" label="Codigo" disabled v-model="formulario.codigo"></v-text-field>
            </v-col>
            <v-col cols="12" sm="5" md="5">
              <v-text-field variant="outlined" label="Descripcion de Establecimiento" v-model="formulario.descripcion"
                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="5" md="5">
              <v-text-field variant="outlined" label="Numero de Estableciemto" v-model="formulario.numero"
              :error="excededLimitEstab" :error-messages="errorMessageE" required ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormularioEditar = false">Cancelar</v-btn>
              <v-btn color="primary" @click="guardarFormularioEditar"
              :disabled="excededLimit || !formulario.descripcion || excededLimitEstab || !formulario.numero">Guardar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
  <v-container>
    <v-row>

      <v-col cols="12" sm="5" md="5">
        <v-text-field :loading="loading" density="compact"  v-model="buscador" variant="solo" label="Buscar" append-inner-icon="mdi-magnify"
          single-line hide-details rounded click:prependInner></v-text-field>
      </v-col>

      <v-col cols="12" sm="7" md="7" class="d-flex justify-end align-center">
        Cantidad Numero de Establecimiento: {{ items.length }}
      </v-col>
      
    </v-row>

    <v-card class="mt-5 rounded-xl">
      <v-data-table :headers="headers" :items="itemsComputed">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              <p class="font-weight-bold">Numero de Establecimiento</p>
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
        descripcion: '',
        numero:''
      },
      limit: 45,
      limiteE:3,
      contador: 1,
      defaultFormulario: {
        codigo: '',
        descripcion: '',
        numero:''
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
        { title: 'Numero de Establecimiento', key: 'numero' ,sortable: false, align: 'star'},
        { title: 'Accion', key: 'action', sortable: false, align: 'end' },
      ],
      items: [
        {
          id: '1',
          descripcion: 'Central',
          numero:'001',
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
    excededLimitEstab() {
      return isNaN(this.formulario.numero) || this.formulario.numero.length !== this.limiteE;
    },
    errorMessage() {
      if (this.excededLimit) {
        return 'Superaste el límite de 45 letras';
      }
      return '';
    },
    errorMessageE() {
      if (this.excededLimitEstab) {
        return 'Debe ser exactamente 3 "Numeros"';
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
    let datosGuardadosNumerEs = JSON.parse(localStorage.getItem('datosGuardadosNumerEs')) || [];
    
    // Encontrar el último valor guardado
    let ultimoValor = datosGuardadosNumerEs.length > 0 ? datosGuardadosNumerEs[datosGuardados.length - 1] : 0;
    
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
      if (!this.formulario.descripcion || !this.formulario.numero || this.excededLimit || this.excededLimitEstab) {
      this.emptyFieldError = true;
      return;
    }
      this.items.push({
        id: this.formulario.codigo,
        descripcion: this.formulario.descripcion,
        numero: this.formulario.numero,
        action: ''
      })
      localStorage.setItem('db-itemsEstab', JSON.stringify(this.items));

      this.formulario.descripcion = '';
      this.formulario.numero = '';
      this.dialogoFormulario = false
    },
    guardarFormularioEditar() {

      if (!this.formulario.descripcion || !this.formulario.numero || this.excededLimit || this.excededLimitEstab) {
      this.emptyFieldError = true;
      return;
    }

      this.items.forEach(item => {
        if (item.id === this.formulario.codigo) {
          item.descripcion = this.formulario.descripcion
          item.numero = this.formulario.numero
        }
      })
      localStorage.setItem('db-itemsEstab', JSON.stringify(this.items))
      this.dialogoFormularioEditar = false
    },
    editarCiudad(parametro) {
      this.dialogoFormularioEditar = true
      this.formulario.codigo = parametro.id
      this.formulario.descripcion = parametro.descripcion
      this.formulario.numero = parametro.numero
    },
    eliminarCiudad(parametro) {
      this.items = this.items.filter(item => {
        return item.id != parametro.id
      })
      localStorage.setItem('db-itemsEstab', JSON.stringify(this.items))
    }

  },


  created() {
    // Generar automáticamente el código al cargar el componente
    this.formulario.codigo = this.generarCodigo();
    this.items = JSON.parse(localStorage.getItem('db-itemsEstab')) || []

  },

}
</script>
<style></style>