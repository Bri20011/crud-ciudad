<template>
  <v-dialog max-width="700" v-model="dialogoFormulario" persistent>
    <v-card class="rounded-xl">
      <v-container>
        <h1 class="mb-3">Crear Numero de Expedicion</h1>
        <v-form>
          <v-row>
            
            <v-col cols="12" sm="6" md="6">
              <v-text-field variant="outlined" label="Descripcion de Expedicion" v-model="formulario.descripcion"
                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field variant="outlined" label="Numero de Expedicion" v-model="formulario.numero"
              :error="excededLimitExp" :error-messages="errorMessageE" required ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormulario = false">Cancelar</v-btn>
              <v-btn color="primary" @click="guardarFormulario"
              :disabled="excededLimit || !formulario.descripcion || excededLimitExp || !formulario.numero">Guardar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>

  <v-dialog max-width="700" v-model="dialogoFormularioEditar" persistent>
    <v-card class="rounded-xl">
      <v-container>
        <h1 class="mb-3">Editar Numero de Expedicion</h1>
        <v-form>
          <v-row>
            <v-col cols="12" sm="2" md="2">
              <v-text-field variant="outlined" label="Codigo" disabled v-model="formulario.codigo"></v-text-field>
            </v-col>
            <v-col cols="12" sm="5" md="5">
              <v-text-field variant="outlined" label="Descripcion de Expedicion" v-model="formulario.descripcion"
                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="5" md="5">
              <v-text-field variant="outlined" label="Numero de Expedicion" v-model="formulario.numero"
              :error="excededLimitExp" :error-messages="errorMessageE" required ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormularioEditar = false">Cancelar</v-btn>
              <v-btn color="primary" @click="guardarFormularioEditar"
              :disabled="excededLimit || !formulario.descripcion || excededLimitExp || !formulario.numero">Guardar</v-btn>
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
        Cantidad Numero de Expedicion: {{ items.length }}
      </v-col>
      
    </v-row>

    <v-card class="mt-5 rounded-xl">
      <v-data-table :headers="headers" :items="itemsComputed">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              <p class="font-weight-bold">Numero de Expedicion</p>
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
          <v-icon color="#C62828" size="small" @click="confirmarEliminarCiudad(item.raw)">
            mdi-trash-can-outline
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
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
import { PuntoExpAPI } from '@/services/punto_exp.api'

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
        { title: 'Numero de Expedicion', key: 'numero' ,sortable: false, align: 'star'},
        { title: 'Accion', key: 'action', sortable: false, align: 'end' },
      ],
      items: [
        {
          id: '1',
          descripcion: 'Central',
          numero:'001',
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
    excededLimitExp() {
      return isNaN(this.formulario.numero) || this.formulario.numero.length !== this.limiteE;
    },
    errorMessage() {
      if (this.excededLimit) {
        return 'Superaste el límite de 45 letras';
      }
      return '';
    },
    errorMessageE() {
      if (this.excededLimitExp) {
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
    this.formulario = JSON.parse(JSON.stringify(this.defaultFormulario))
  },
    generarCodigo() {
      const nuevoCodigo = this.contador++;
      return nuevoCodigo;
    },
    guardarFormulario() {
      if (!this.formulario.descripcion || !this.formulario.numero || this.excededLimit || this.excededLimitExp) {
      this.emptyFieldError = true;
      return;
    }
    PuntoExpAPI.create(
        {
          idPunto_exp: this.formulario.codigo,
          Descripcion: this.formulario.descripcion,
          Numer_punto_exp: this.formulario.numero
        }
      ).then(()=> {
        this.ObtenerPuntoExp()
      })

      this.formulario.descripcion = '';
      this.formulario.numero = '';
      this.dialogoFormulario = false
    },
    guardarFormularioEditar() {

      if (!this.formulario.descripcion || !this.formulario.numero || this.excededLimit || this.excededLimitExp) {
      this.emptyFieldError = true;
      return;
    }

    PuntoExpAPI.update(
        this.formulario.codigo,
        {
          idPunto_exp: this.formulario.codigo,
          Descripcion: this.formulario.descripcion,
          Numer_punto_exp: this.formulario.numero
        }
      ).then(()=> {
        this.ObtenerPuntoExp()
      })
      this.dialogoFormularioEditar = false
    },
    editarCiudad(parametro) {
      this.dialogoFormularioEditar = true
      this.formulario.codigo = parametro.id
      this.formulario.descripcion = parametro.descripcion
      this.formulario.numero = parametro.numero
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
        PuntoExpAPI.delete(this.elementoAEliminar.id).then(() => {
          this.ObtenerPuntoExp();
        });
        // Cierra el diálogo de confirmación
        this.dialogoEliminar = false;
        this.elementoAEliminar = null;
      }
    },


    ObtenerPuntoExp() {
      PuntoExpAPI.getAll().then(({data}) => {
        this.items = data.map(item=> {
          return {
            id: item.idPunto_exp,
            descripcion: item.Descripcion,
            numero: item.Numer_punto_exp
          }
        })
      })
    },

  },

  

  created() {
    // Generar automáticamente el código al cargar el componente
    this.formulario.codigo = this.generarCodigo();
    this.ObtenerPuntoExp()
  },

}
</script>
<style></style>