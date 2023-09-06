<template>
  <v-dialog max-width="700" v-model="dialogoFormulario" persistent>
    <v-card class="rounded-xl">
      <v-container>
        <h1 class="mb-3">Crear Pedido</h1>
        <v-form>
          <v-row>
            <v-col cols="12" sm="2" md="2">
              <v-text-field variant="outlined" label="Codigo" v-model="formulario.codigo" disabled></v-text-field>
            </v-col>
            <v-col cols="12" sm="5" md="5">
              <v-text-field variant="outlined" label="Descripcion de Pedido" v-model="formulario.descripcion"
                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
            </v-col>

            <v-col cols="12" sm="5" md="5">
              <input class="custom-input" v-model="formulario.fecha" type="date" placeholder="Fecha de Pedido"
                @input="formatDate" />
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
        <v-text-field :loading="loading" density="compact" v-model="buscador" variant="solo" label="Buscar" append-inner-icon="mdi-magnify"
          single-line hide-details rounded click:prependInner></v-text-field>
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
              <p class="font-weight-bold">Registro de Pedidos</p>
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
        fecha: ''


      },
      contador: 1,
      limit: 45,
      defaultFormulario: {
        codigo: '',
        descripcion: '',
        fecha: ''
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
        { title: 'Fecha de Pedido', key: 'fecha', align: 'star' },
        { title: 'Accion', key: 'action', sortable: false, align: 'end' },
      ],
      items: [
        {
          id: '1',
          descripcion: 'Central',
          fecha: '',
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
    formatDate() {
  if (this.formulario.fecha) {
    const dateObject = new Date(this.formulario.fecha + "T00:00:00Z");
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    this.formulario.fechaFormatted = dateObject.toLocaleDateString('es-ES', options);
  } else {
    this.formulario.fechaFormatted = '';
  }
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

// Recuperar datos del localStorage
let datosGuardadoPedido = JSON.parse(localStorage.getItem('datosGuardadoPedido')) || [];

// Encontrar el último valor guardado
let ultimoValor = datosGuardadoPedido.length > 0 ? datosGuardadoPedido[datosGuardadoPedido.length - 1] : 0;

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

  const dateObject = new Date(this.formulario.fecha);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const fechaFormatted = dateObject.toLocaleDateString('es-ES', options);

  this.items.push({
    id: this.formulario.codigo,
    descripcion: this.formulario.descripcion,
    fecha: fechaFormatted, // Usa la fecha formateada aquí
    action: '',
  });

  localStorage.setItem('db-itemsPedido', JSON.stringify(this.items));

  this.formulario.descripcion = '';
  this.formulario.fecha = '';
  this.dialogoFormulario = false;
},
    guardarFormularioEditar() {
      if (!this.formulario.descripcion) {
        
        this.emptyFieldError = true;
        return;
      }

      this.items.forEach(item => {
        if (item.id === this.formulario.codigo) {
          item.descripcion = this.formulario.descripcion
          item.fecha = this.formulario.fecha
        }
      })
      localStorage.setItem('db-itemsPedido', JSON.stringify(this.items))
      this.dialogoFormularioEditar = false
    },
    editarCiudad(parametro) {
      this.dialogoFormularioEditar = true
      this.formulario.codigo = parametro.id
      this.formulario.descripcion = parametro.descripcion
      this.formulario.fecha = parametro.fecha
    },
    eliminarCiudad(parametro) {
      this.items = this.items.filter(item => {
        return item.id != parametro.id
      })
      localStorage.setItem('db-itemsPedido', JSON.stringify(this.items))
    }

  },


  created() {
    // Generar automáticamente el código al cargar el componente
    this.formulario.codigo = this.generarCodigo();
    this.items = JSON.parse(localStorage.getItem('db-itemsPedido')) || []

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