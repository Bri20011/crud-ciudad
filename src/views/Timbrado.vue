<template>
  <v-dialog max-width="700" v-model="dialogoFormulario" persistent>
    <v-card class="rounded-xl">
      <v-container>
        <h1 class="mb-3">Crear Timbrado</h1>
        <v-form>
          <v-row>
            <v-col cols="12" sm="4" md="4">
              <v-text-field variant="outlined" label="Descripcion" v-model="formulario.descripcion" :error="excededLimit"
                :error-messages="errorMessage" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-text-field variant="outlined" label="Numero de Timbrado" v-model="formulario.numeroTimbrado"
                required></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" md="4">
              <input class="custom-input" v-model="formulario.fechaD" type="date" placeholder="Fecha Inicio"
                @input="formatDate" />
            </v-col>

            <v-col cols="12" sm="4" md="4">
              <input class="custom-input" v-model="formulario.fechaF" type="date" placeholder="Fecha de Vto"
                @input="formatDate" />
            </v-col>

            <v-col cols="12" sm="4" md="4">
              <v-autocomplete variant="outlined" label="Punto Establecimiento" :items="listaEstablecimiento"
                item-title="descripcionEs" item-value="id" v-model="formulario.establecimiento"></v-autocomplete>
            </v-col>

            <v-col cols="12" sm="4" md="4">
              <v-autocomplete variant="outlined" label="Punto  Expedicion" :items="listaExpedicion"
                item-title="descripcionEx" item-value="id" v-model="formulario.expedicion"></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-autocomplete variant="outlined" label="Tipo Documento" :items="listaTipoDoc" item-title="descripcionD"
                item-value="id" v-model="formulario.tipoDoc"></v-autocomplete>
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
        <h1 class="mb-3">Editar Timbrado</h1>
        <v-form>
          <v-row>
            <v-col cols="12" sm="4" md="4">
              <v-text-field variant="outlined" label="Codigo" disabled v-model="formulario.codigo"></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field variant="outlined" label="Descripcion" v-model="formulario.descripcion" :error="excededLimit"
                :error-messages="errorMessage" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-text-field variant="outlined" label="Numero de Timbrado"
                v-model="formulario.numeroTimbrado"></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <input class="custom-input" v-model="formulario.fechaD" type="date" placeholder="Fecha Inicio"
                @input="formatDate" />
            </v-col>

            <v-col cols="12" sm="4" md="4">
              <input class="custom-input" v-model="formulario.fechaF" type="date" placeholder="Fecha de Vto"
                @input="formatDate" />
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-autocomplete variant="outlined" label="Punto Establecimiento" :items="listaEstablecimiento"
                item-title="descripcionEs" item-value="id" v-model="formulario.establecimiento"></v-autocomplete>
            </v-col>

            <v-col cols="12" sm="4" md="4">
              <v-autocomplete variant="outlined" label="Punto  Expedicion" :items="listaExpedicion"
                item-title="descripcionEx" item-value="id" v-model="formulario.expedicion"></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-autocomplete variant="outlined" label="Tipo Documento" :items="listaTipoDoc" item-title="descripcionD"
                item-value="id" v-model="formulario.tipoDoc"></v-autocomplete>
            </v-col>



          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormularioEditar = false">Cancelar</v-btn>
              <v-btn color="primary" @click="guardarFormularioEditar"
                :disabled="excededLimit || !formulario.descripcion ">Guardar</v-btn>

            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="6">

        <v-text-field :loading="loading" density="compact" v-model="buscador" variant="solo" label="Buscar"
          append-inner-icon="mdi-magnify" single-line hide-details rounded click:prependInner></v-text-field>

      </v-col>
      <v-col cols="12" sm="6" md="6" class="d-flex justify-end align-center">
        Cantidad de Timbrado: {{ items.length }}
      </v-col>
    </v-row>

    <v-card max-width="1800" class="mt-5 rounded-xl">
      <v-data-table max-width="1000" :headers="headers" :items="itemsComputed">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              <p class="font-weight-bold">Timbrado</p>
            </v-toolbar-title>

            <v-btn class="custom-font" color="primary" prepend-icon="mdi-content-save-plus" variant="text"
              @click="abrirDialogo">Registrar
            </v-btn>
          </v-toolbar>

        </template>
        <template v-slot:item.fechaD="{ item }">
          {{ formatearFecha(item.raw.fechaD) }}
        </template>
        <template v-slot:item.fechaF="{ item }">
          {{ formatearFecha(item.raw.fechaD) }}
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
import { TimbradoAPI } from '@/services/timbrado.api'
import { EstablecimientoAPI } from '@/services/establecimiento.api'
import { PuntoExpAPI } from '@/services/punto_exp.api'
import { TipoDocumentoAPI } from '@/services/tipo_documento.api'
import dayjs from 'dayjs'



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
        numeroTimbrado: '',
        sucursal: ''
      },
      limit: 45,
      limiteNumerCajMax: 4,
      contador: 1,
      defaultFormulario: {
        codigo: '',
        descripcion: '',
        numeroTimbrado: '',
        fechaD: '',
        fechaF: '',
        establecimiento: '',
        expedicion: '',
        tipoDoc: '',

      },
      listaEstablecimiento: [],
      listaExpedicion: [],
      listaTipoDoc: [],
      buscador: '',
      headers: [
        {
          title: 'Codigo',
          align: 'start',
          sortable: false,
          key: 'id',
        },
        { title: 'Descripcion', key: 'descripcion' },
        { title: 'Numero', key: 'numeroTimbrado' },
        { title: 'Fecha Inicio', key: 'fechaD' },
        { title: 'Fecha Fin', key: 'fechaF' },
        { title: 'Punto Establecimiento', key: 'establecimiento' },
        { title: 'Punto Expedicion', key: 'expedicion' },
        { title: 'Tipo Documento', key: 'tipoDoc' },
        { title: 'Accion', key: 'action', sortable: false, align: 'end' },
      ],
      items: [
        {
          id: '1',
          descripcion: 'Campo',
          numeroTimbrado: '123',
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
    // excededLimitPas() {
    //   return this.formulario.numeroTimbrado.length > this.limiteNumerCajMax;

    // },
    errorMessage() {
      if (this.excededLimit) {
        return 'Superaste el límite de 45 letras';
      }
      return '';
    },
    // errorMessageE() {
    //   if (this.excededLimitPas) {
    //     return 'Superaste el límite de 4 letras';
    //   }
    //   return '';
    // }
  },


  methods:
  {
    abrirDialogo() {
      // Abrir el modal y cargar el código aquí
      this.dialogoFormulario = true;
      this.formulario = JSON.parse(JSON.stringify(this.defaultFormulario))
    },

    ObtenerEstablecimiento() {
      EstablecimientoAPI.getAll().then(({ data }) => {
        this.listaEstablecimiento = data.map(item => {
          return {
            id: item.idEstablecimiento,
            descripcionEs: item.Descripcion
          }
        })
      })
    },
    ObtenerExpedicion() {
      PuntoExpAPI.getAll().then(({ data }) => {
        this.listaExpedicion = data.map(item => {
          return {
            id: item.idPunto_exp,
            descripcionEx: item.Descripcion
          }
        })
      })
    },
    ObtenerTipoDocumento() {
      TipoDocumentoAPI.getAll().then(({ data }) => {
        this.listaTipoDoc = data.map(item => {
          return {
            id: item.idTipo_Documento,
            descripcionD: item.Descripcion
          }
        })
      })
    },
    formatearFecha(fechaD) {
      return dayjs(fechaD).format('DD/MM/YYYY')
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
      TimbradoAPI.create(
        {
          idTimbrado: this.formulario.codigo,
          Descripcion: this.formulario.descripcion,
          NumerTimbrado: this.formulario.numeroTimbrado,
          fecha_inicio: this.formulario.fechaD,
          fecha_fin: this.formulario.fechaF,
          idPunto_exp: this.formulario.expedicion,
          idEstablecimiento: this.formulario.establecimiento,
          idTipo_Documento: this.formulario.tipoDoc

        }
      ).then(() => {
        this.ObtenerTimbrado()
      })

      this.formulario.descripcion = '';
      this.formulario.numeroTimbrado = '';
      this.formulario.fechaD = '';
      this.formulario.fechaF = '';
      this.formulario.expedicion = '';
      this.formulario.establecimiento = '';
      this.formulario.tipoDoc = '';

      this.dialogoFormulario = false
    },


    guardarFormularioEditar() {
      if (!this.formulario.descripcion || !this.formulario.numeroTimbrado || this.excededLimit || this.excededLimitPas) {
        this.emptyFieldError = true;
        return;
      }


      TimbradoAPI.update(
        this.formulario.codigo,
        {
          idTimbrado: this.formulario.codigo,
          Descripcion: this.formulario.descripcion,
          NumerTimbrado: this.formulario.numeroTimbrado,
          fecha_inicio: this.formulario.fechaD,
          fecha_fin: this.formulario.fechaF,
          idPunto_exp: this.formulario.expedicion,
          idEstablecimiento: this.formulario.establecimiento,
          idTipo_Documento: this.formulario.tipoDoc
        }
      ).then(() => {
        this.ObtenerTimbrado()
      })
      this.dialogoFormularioEditar = false
    },
    editarCiudad(parametro) {
      this.dialogoFormularioEditar = true
      this.formulario.codigo = parametro.id
      this.formulario.descripcion = parametro.descripcion
      this.formulario.numeroTimbrado = parametro.numeroTimbrado
      this.formulario.fechaD = parametro.fechaD
      this.formulario.fechaF = parametro.fechaF
      this.formulario.establecimiento = parametro.establecimiento
      this.formulario.expedicion = parametro.expedicion
      this.formulario.tipoDoc = parametro.tipoDoc
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
        TimbradoAPI.delete(this.elementoAEliminar.id).then(() => {
          this.ObtenerTimbrado();
        });
        // Cierra el diálogo de confirmación
        this.dialogoEliminar = false;
        this.elementoAEliminar = null;
      }
    },
    ObtenerTimbrado() {
      TimbradoAPI.getAll().then(({ data }) => {
        this.items = data.map(item => {
          return {
            id: item.idTimbrado,
            descripcion: item.Descripcion,
            numeroTimbrado: item.NumerTimbrado,
            fechaD: item.fecha_inicio,
            fechaF: item.fecha_fin,
            expedicion: item.idPunto_exp,
            establecimiento: item.idEstablecimiento,
            tipoDoc: item.idTipo_Documento,
            // idSucursal: item.idSucursal,
            // nombreSucursal: item.nombreSucursal,

          }
        })
      })
    },

  },



  created() {
    // Generar automáticamente el código al cargar el componente
    this.formulario.codigo = this.generarCodigo();
    this.ObtenerTimbrado()
    this.ObtenerExpedicion()
    this.ObtenerEstablecimiento()
    this.ObtenerTipoDocumento()
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