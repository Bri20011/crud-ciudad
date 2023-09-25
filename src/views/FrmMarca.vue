<template>
  <v-dialog max-width="700" v-model="dialogoFormulario" persistent>
    <v-card class="rounded-xl">
      <v-container>
        <h1 class="mb-3">Crear Marcas</h1>
        <v-form>
          <v-row>
            
            <v-col cols="12" sm="12" md="12">
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
        <h1 class="mb-3">Editar Marcas</h1>
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
        <v-text-field :loading="loading" density="compact"  v-model="buscador" variant="solo" label="Buscar" append-inner-icon="mdi-magnify"
          single-line hide-details rounded click:prependInner></v-text-field>
      </v-col>

      <v-col cols="12" sm="7" md="7" class="d-flex justify-end align-center">
        Cantidad de Marcas: {{ items.length }}
      </v-col>
      
    </v-row>

    <v-card class="mt-5 rounded-xl">
      <v-data-table :headers="headers" :items="itemsComputed">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              <p class="font-weight-bold">Marcas de Productos</p>
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
import { MarcaApi } from '@/services/marca.api'
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

      MarcaApi.create(
        {
          idmarca: this.formulario.codigo,
          Descripcion: this.formulario.descripcion
        }
      ).then(()=> {
        this.obtenerMarca()
      })

      this.formulario.descripcion = '';
      this.dialogoFormulario = false
    },
   
    guardarFormularioEditar() {

      if (!this.formulario.descripcion) {
        
        this.emptyFieldError = true;
        return;
      }

      MarcaApi.update(
        this.formulario.codigo,
        {
          idmarca: this.formulario.codigo,
          Descripcion: this.formulario.descripcion
        }
      ).then(()=> {
        this.obtenerMarca()
      })
      this.formulario.descripcion = '';
      this.dialogoFormularioEditar = false
    },
    editarCiudad(parametro) {
      this.dialogoFormularioEditar = true
      this.formulario.codigo = parametro.id
      this.formulario.descripcion = parametro.descripcion
    },
    eliminarCiudad(parametro) {
      MarcaApi.delete(parametro.id).then(() => this.obtenerMarca())

    },
    obtenerMarca() {
      MarcaApi.getAll().then(({data}) => {
        this.items = data.map(item=> {
          return {
            id: item.idmarca,
            descripcion: item.Descripcion
          }
        })
      })
    },
  },


  created() {
      // Generar automáticamente el código al cargar el componente
      this.formulario.codigo = this.generarCodigo();
    this.obtenerMarca()
  },


}
</script>
<style></style>