<template>
  <v-dialog max-width="700" v-model="dialogoFormulario" persistent>
    <v-card class="rounded-xl">
      <v-container>
        <h1 class="mb-3">Crear Apertura</h1>
        <v-form>
          <v-row class="d-flex justify-center">
            <v-col cols="12" sm="5" md="5">
              <v-text-field type="date" variant="outlined" label="Fecha Apertura" v-model="formulario.fechaApertura"
                required></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-text-field variant="outlined" label="Monto Inicial" v-model="formulario.montoincial"
                required></v-text-field>
            </v-col>

            <v-col cols="12" sm="5" md="5">
              <v-autocomplete variant="outlined" label="Usuario" :items="listaUsuario" item-title="descripcionU"
                item-value="id" v-model="formulario.usuario"></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-autocomplete variant="outlined" label="Caja" :items="listaCaja" item-title="descripcionC"
                item-value="id" v-model="formulario.caja"></v-autocomplete>
            </v-col>


          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormulario = false">Cancelar</v-btn>
              <v-btn color="primary" @click="guardarFormulario">Guardar</v-btn> <!-- CORREGIR VALIDACIONES  -->

            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>

  <v-dialog max-width="700" v-model="dialogoFormularioEditar" persistent>
    <v-card class="rounded-xl">
      <v-container>
        <h1 class="mb-3">Editar Apertura de Caja</h1>
        <v-form>
          <v-row >

            <v-col cols="12" sm="4" md="4">
              <v-text-field variant="outlined" label="Codigo" disabled v-model="formulario.codigo"></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" md="4">
              <v-text-field variant="outlined" label="Fecha Apertura" v-model="formulario.fechaApertura"
              disabled  required></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" md="4">
              <v-text-field variant="outlined" label="Monto Inicial" v-model="formulario.montoincial"
                required></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-autocomplete variant="outlined" label="Usuario" :items="listaUsuario" item-title="descripcionU"
                item-value="id" v-model="formulario.usuario"></v-autocomplete>
            </v-col>

            <v-col cols="12" sm="4" md="4">
              <v-autocomplete variant="outlined" label="Caja" :items="listaCaja" item-title="descripcionC"
                item-value="id" v-model="formulario.caja"></v-autocomplete>
            </v-col>

          </v-row>

          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormularioEditar = false">Cancelar</v-btn>
              <v-btn color="primary" @click="guardarFormularioEditar" >Guardar</v-btn>
              <!-- CORREGIR VALIDACIONES  -->
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
        Cantidad de Aperturas: {{ items.length }}
      </v-col>

    </v-row>

    <v-card class="mt-5 rounded-xl">
      <v-data-table :headers="headers" :items="itemsComputed">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              <p class="font-weight-bold">Aperturas</p>
            </v-toolbar-title>

            <v-btn class="custom-font" color="primary" prepend-icon="mdi-content-save-plus" variant="text"
              @click="abrirDialogo">Registrar
            </v-btn>
          </v-toolbar>

        </template>
        <template v-slot:item.fechaApertura="{ item }">
                    {{ formatearFecha(item.raw.fechaApertura) }}
                </template>
        <template v-slot:item.action="{ item }">
          <v-icon size="small" class="me-2" @click="editarApertura(item.raw)">
            mdi-pencil
          </v-icon>
          <v-icon color="#C62828" size="small" @click="confirmarEliminarApertura(item.raw)">
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
              <v-btn color="#E0E0E0" class="mx-2" text @click="eliminarApertura">Eliminar</v-btn>
              <v-btn color="primary" text @click="cancelarEliminarApertura">Cancelar</v-btn>
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
import { AperturaAPI } from '@/services/apertura.api'
import { UsuarioAPI } from '@/services/usuario.api'
import { CajaAPI } from '@/services/caja.api'
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
        nombres: '',
        apellidos: '',
        direccion: '',
        telefono: '',
        barrio: '',
        ciudad: ''
      },
      limit1: 45,
      limite2: 15,
      limit3: 0,
      contador: 1,
      defaultFormulario: {
        codigo: '',
        nombres: '',
        apellidos: '',
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
        { title: 'Fecha Apertura', key: 'fechaApertura' },
        { title: 'Monto Apertura', key: 'montoincial' },
        { title: 'Usuario', key: 'usuario' },
        { title: 'Nº de Caja', key: 'caja' },
        { title: 'Accion', key: 'action', sortable: false, align: 'end' },
      ],
      items: [
        {
          id: '1',
          nombres: '7586748',
          apellidos: 'Juan Perez',
          nombreciudad: 'Campo 9',
          nombrebarrio: 'San Blas',
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
      return this.items.filter((element) => element.nombres.toLocaleLowerCase().includes(this.buscador.toLocaleLowerCase()))
    },
    excededLimit1() {
      return this.formulario.apellidos.length > this.limit1;
    },


    excededLimit2() {
      return this.formulario.telefono.length > this.limite2;

    },
    excededLimit3() {
      return this.formulario.direccion.length > this.limit1;
    },

    excededLimit4() {
      return this.formulario.nombres.length > this.limite2;
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
    formatearFecha(fecha) {
            return dayjs(fecha).format('DD/MM/YYYY')
        },

    ObtenerUsuario() {
      UsuarioAPI.getAll().then(({ data }) => {
        this.listaUsuario = data.map(item => {
          return {
            id: item.idUsuario,
            descripcionU: item.Nombre,
            password: item.Contrasehna,
            idSucursal: item.idSucursal,
            nombreSucursal: item.nombreSucursal,
            idFuncionario: item.idFuncionario,
            nombrefuncionario: item.nombrefuncionario,
            idNivel: item.idNivel,
            nombrenivel: item.nombrenivel
          }
        })
      })
    },

    ObtenerCaja() {
      CajaAPI.getAll().then(({ data }) => {
        this.listaCaja = data.map(item => {
          return {
            id: item.idCaja,
            descripcion: item.nombrecaja,
            descripcionC: item.Cajahabilitada,
            idSucursal: item.idSucursal,
            nombreSucursal: item.nombreSucursal
          }
        })
      })
    },
    generarCodigo() {
      const nuevoCodigo = this.contador++;
      return nuevoCodigo;
    },

    guardarFormulario() {
      if (!this.formulario.fechaApertura || !this.formulario.montoincial) {
        this.emptyFieldError = true;
        return;
      }


      AperturaAPI.create(
        {
          idAperturacaja: this.formulario.codigo,
          Fechahoraapertura: this.formulario.fechaApertura,
       
          Monto_Inicial: this.formulario.montoincial,
          idCaja: this.formulario.caja,
          idUsuario: this.formulario.usuario,

        }
      ).then(() => {
        this.ObtenerApertura()
      })

      this.formulario.fechaApertura = '';
      this.formulario.montoincial = '';
      this.formulario.caja = '';
      this.formulario.usuario = '';
      this.dialogoFormulario = false
    },


    guardarFormularioEditar() {
      if (!this.formulario.montoincial || !this.formulario.caja) {
        this.emptyFieldError = true;
        return;
      }


      AperturaAPI.update(
        this.formulario.codigo,
        {
          idAperturacaja: this.formulario.codigo,
          Fechahoraapertura: this.formulario.fechaApertura,
          Monto_Inicial: this.formulario.montoincial,
          idCaja: this.formulario.caja,
          idUsuario: this.formulario.usuario,
        }
      ).then(() => {
        this.ObtenerApertura()
      })
      this.dialogoFormularioEditar = false
    },
    editarApertura(parametro) {
   

      this.dialogoFormularioEditar = true
      console.log(parametro)
      this.formulario.codigo = parametro.id
      this.formulario.fechaApertura = dayjs(parametro.fechaApertura).format('DD-MM-YYYY')
      this.formulario.montoincial = parametro.montoincial
      this.formulario.caja = parametro.idCaja
      this.formulario.usuario = parametro.idUsuario

    },
    confirmarEliminarApertura(elemento) {
      // Abre el diálogo de confirmación y guarda el elemento a eliminar
      this.elementoAEliminar = elemento;
      this.dialogoEliminar = true;
    },
    cancelarEliminarApertura() {
      // Cierra el diálogo de confirmación y restablece la variable
      this.dialogoEliminar = false;
      this.elementoAEliminar = null;
    },
    eliminarApertura() {
      if (this.elementoAEliminar) {
        // Realiza la eliminación aquí
        AperturaAPI.delete(this.elementoAEliminar.id).then(() => {
          this.ObtenerApertura();
        });
        // Cierra el diálogo de confirmación
        this.dialogoEliminar = false;
        this.elementoAEliminar = null;
      }
    },
    ObtenerApertura() {
      AperturaAPI.getAll().then(({ data }) => {
        this.items = data.map(item => {
          return {
            id: item.idAperturacaja,
            fechaApertura: item.Fechahoraapertura,
            montoincial: item.Monto_Inicial,
            idCaja: item.idCaja,
            caja: item.numeroCaja,
            idUsuario: item.idUsuario,
            usuario: item.nombreusuario


          }
        })
      })
    },

  },



  created() {
    // Generar automáticamente el código al cargar el componente
    this.formulario.codigo = this.generarCodigo();
    this.ObtenerUsuario()
    this.ObtenerCaja()
    this.ObtenerApertura()
  },

}
</script>
<style></style>