<template>
  <v-dialog max-width="700" v-model="dialogoFormulario" persistent>
    <v-card class="rounded-xl">
      <v-container>
        <h1 class="mb-3">Crear Apertura</h1>
        <v-form>
          <v-row class="d-flex justify-center">
            <v-col cols="12" sm="2" md="2">
              <v-text-field variant="outlined" label="Nº Caja" v-model="formulario.numero_apertura"
                required></v-text-field>
            </v-col>
            <v-col cols="12" class="mt-4" sm="2" md="2">
              <v-btn @click="ObtenerCodigoOrden">Calcular</v-btn>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-text-field variant="outlined" label="Monto Apertura" v-model="formulario.montoincial"
                required></v-text-field>
            </v-col>

            <v-col cols="12" sm="5" md="5">
              <v-text-field type="date" variant="outlined" label="Fecha Apertura" v-model="formulario.fechaApertura"
                required></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4">
              <v-text-field variant="outlined" label="Monto Cierre" v-model="formulario.montofinall"
                required></v-text-field>
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
        <h1 class="mb-3">Editar Cierre de Caja</h1>
        <v-form>
          <v-row>

            <v-col cols="12" sm="4" md="4">
              <v-text-field variant="outlined" label="Codigo" disabled v-model="formulario.codigo"></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" md="4">
              <v-text-field variant="outlined" label="Nº Caja" v-model="formulario.numero_apertura"
              disabled required></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" md="4">
              <v-text-field variant="outlined" label="Monto Apertura" v-model="formulario.montoincial"
                required></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6">
              <v-text-field type="date" variant="outlined" label="Fecha Apertura" v-model="formulario.fechaApertura"
              disabled  required></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" md="4">
              <v-text-field variant="outlined" label="Monto Cierre" v-model="formulario.montofinall"
                required></v-text-field>
            </v-col>

          </v-row>

          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormularioEditar = false">Cancelar</v-btn>
              <v-btn color="primary" @click="guardarFormularioEditar">Guardar</v-btn>
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
        Cantidad de Cierres: {{ items.length }}
      </v-col>

    </v-row>

    <v-card class="mt-5 rounded-xl">
      <v-data-table :headers="headers" :items="itemsComputed">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              <p class="font-weight-bold">Cierres</p>
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
import { CierreAPI } from '@/services/cierre.api'
import { AperturaAPI } from '@/services/apertura.api'
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
        { title: 'Monto Final', key: 'montofinall' },
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




    generarCodigo() {
      const nuevoCodigo = this.contador++;
      return nuevoCodigo;
    },

    guardarFormulario() {
      if (!this.formulario.fechaApertura || !this.formulario.montoincial) {
        this.emptyFieldError = true;
        return;
      }


      CierreAPI.create(
        {
          idCierre_caja: this.formulario.codigo,
          monto_final: this.formulario.montofinall,
          idAperturacaja: this.formulario.numero_apertura,
          monto_apertura: this.formulario.montoincial,
          fecha_hora_apertura: this.formulario.fechaApertura

        }
      ).then(() => {
        this.ObtenerCierre()
      })

      this.formulario.montofinall = '';
      this.formulario.numero_apertura = '';
      this.formulario.montoincial = '';
      this.formulario.fechaApertura = '';
      this.dialogoFormulario = false
    },


    guardarFormularioEditar() {
      if (!this.formulario.montoincial || !this.formulario.montofinall) {
        this.emptyFieldError = true;
        return;
      }
   
      CierreAPI.update(
        this.formulario.codigo,
        {
          idCierre_caja: this.formulario.codigo,
          monto_final: this.formulario.montofinall,
          idAperturacaja: this.formulario.numero_apertura,
          monto_apertura: this.formulario.montoincial,
          fecha_hora_apertura: this.formulario.fechaApertura
        }
      ).then(() => {
        this.ObtenerCierre()
      })
      this.dialogoFormularioEditar = false
    },
    editarApertura(parametro) {


      this.dialogoFormularioEditar = true
      console.log(parametro)
      this.formulario.codigo = parametro.id
      this.formulario.montofinall = parametro.montofinall
      this.formulario.numero_apertura = parametro.numero_apertura
      this.formulario.montoincial = parametro.montoincial
      //Aqui trae la fecha de la base de datos pero formateado
      this.formulario.fechaApertura = dayjs(parametro.fechaApertura).format('DD-MM-YYYY')
    



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
        CierreAPI.delete(this.elementoAEliminar.id).then(() => {
          this.ObtenerCierre();
        });
        // Cierra el diálogo de confirmación
        this.dialogoEliminar = false;
        this.elementoAEliminar = null;
      }
    },
    ObtenerCierre() {
      CierreAPI.getAll().then(({ data }) => {
        this.items = data.map(item => {
          return {
            id: item.idCierre_caja,
            fechaApertura: item.fecha_hora_apertura,
            numero_apertura: item.idAperturacaja,
            montoincial: item.monto_apertura,
            montofinall: item.monto_final,
       
        


          }
        })
      })
    },


    ObtenerCodigoOrden() {
            // Verifica que se haya ingresado un número de orden
            if (!this.formulario.numero_apertura) {
                // Puedes mostrar un mensaje de error o realizar la lógica que prefieras
                return;
            }

            // Realiza una solicitud a tu API para obtener el detalle de la orden de compra
            AperturaAPI.getById(this.formulario.numero_apertura).then(({ data }) => {
                this.formulario = {
                    ...this.formulario,
                    montoincial: data.Monto_Inicial,
                    fechaApertura: dayjs(data.Fechahoraapertura).format('YYYY-MM-DD'),
                  
                  

                };

            });

            this.dialogoFormulario = true;
        },
    // ObtenerApertura() {
    //   AperturaAPI.getAll().then(({ data }) => {
    //     this.listaApertura = data.map(item => {
    //       return {
    //         id: item.idAperturacaja,
    //         fechaApertura: item.Fechahoraapertura,
    //         montoincial: item.Monto_Inicial,
    //         idCaja: item.idCaja,
    //         caja: item.numeroCaja,
    //         idUsuario: item.idUsuario,
    //         usuario: item.nombreusuario


    //       }
    //     })
    //   })
    // },
  },



  created() {
    // Generar automáticamente el código al cargar el componente
    this.formulario.codigo = this.generarCodigo();
  
    this.ObtenerCierre()
   
  },

}
</script>
<style></style>@/services/cierre.api