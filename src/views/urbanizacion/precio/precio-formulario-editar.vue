

<template>
    <!-- INICIO OBTENER DATOS PARA EDITAR  -->
    <v-dialog max-width="1500" v-model="dialogoFormularioEditar" persistent>
        <v-card class="rounded-xl">
<v-container>
    <h1 class="mb-3 text-center">Editar Precio de Lotes </h1>
                <v-form>
          <v-row>
            <v-col cols="12" sm="2" md="2">
                     <v-text-field variant="outlined" label="Codigo" disabled
                       v-model="formulario.Codigo">
                    </v-text-field>
                </v-col>
                           
                                
                          
                <v-col cols="12" sm="8" md="8" class="mt-0">
                            <v-text-field variant="outlined" label="Nombre de Urbanizacion" v-model="formulario.nombre_urb"
                                disabled required></v-text-field>
                            </v-col>
                    
                        <v-col cols="12" sm="2" md="2" class="mt-0">
                                <v-text-field variant="outlined" label="fecha" item-title="Fecha"
                                disabled  item-value="id" :model-value="formatearFecha(formulario.fechaD)" required></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="6" class="mt-0">
                                <v-text-field variant="outlined" label="Barrio" item-title="descripcionB"
                                disabled  item-value="id" v-model="formulario.nombrebarrio" required></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="6"  class="mt-0">
                                <v-autocomplete variant="outlined" label="Ciudad" :items="listaCiudad" item-title="descripcionC"
                                disabled  item-value="id" v-model="formulario.nombreciudad" required></v-autocomplete>
                            </v-col>

                            <v-col cols="12" sm="6" md="6"  class="mt-0">
                                <v-text-field variant="outlined" label="Ubicacion" v-model="formulario.ubicacion"
                                disabled   required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="mt-0">
                                <v-text-field variant="outlined" label="Costo Total Lote" v-model="formulario.costo"
                                disabled   required></v-text-field>
                        </v-col>

          </v-row>
             
        <v-data-table class="mt-5" max-width="1500" items-per-page-text="Articulos" :headers="headersEditar"
        
            :items="datosUrbanizacion.itemsDetalle" :group-by="groupBy">
           
            <template v-slot:item.action="{ item }">
            <v-icon size="small" class="me-2" @click="editarDetalleGuardado(item.raw)">
            mdi-pencil
            </v-icon> 
           </template>
           
    </v-data-table>

        <v-row>
            <v-col cols="12" class="d-flex justify-end">
                <v-btn color="#E0E0E0" class="mx-2"
                    @click="cerrarDialogoVista">Cancelar</v-btn>
                <v-btn color="primary" @click="guardarFormularioEditarDetalleGuardado">Guardar</v-btn>
            </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</v-dialog>
 <!-- FIN OBTENER DATOS PARA EDITAR  -->


 <v-dialog max-width="600" v-model="dialogoFormularioEditarGuardado" persistent>

<v-card class="rounded-xl">

    <!-- INICIO DE EDICION -->
    <v-container>
        <h1 class="mb-3 text-center">Detalle Precio</h1>
        <v-form>

            <v-row class="justify-center">
                <v-col cols="12" sm="4" md="4">
                    <v-text-field variant="outlined" label="Nombre de Urbanizacion" v-model="detalle_editarGuardado.nombre_urb"
                        disabled required></v-text-field>
                </v-col>  
                <v-col cols="12" sm="4" md="4">
                    <v-text-field variant="outlined" label="Numero de manzana" :items="listaManzana"
                        item-title="descripcionM" item-value="id" v-model="detalle_editarGuardado.manzana" disabled required>
                    </v-text-field>
                </v-col>        
            </v-row>

            <v-row class="justify-center">
                <v-col cols="12" sm="4" md="4">
                    <v-text-field variant="outlined" label="Numero Lote:" v-model="detalle_editarGuardado.Numero_lote"
                    disabled  required></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <v-text-field variant="outlined" label="Codigo:"
                    disabled  v-model="detalle_editarGuardado.id_detalle" required></v-text-field>
                </v-col>
               
            </v-row>

            <v-row class="justify-center">
                <v-col cols="12" sm="4" md="4">
                    <v-text-field variant="outlined" label="Ancho del Frente:" v-model="detalle_editarGuardado.ancho_frente"
                    disabled  required></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <v-text-field variant="outlined" label="Ancho de Atrás:" v-model="detalle_editarGuardado.ancho_atras"
                    disabled  required></v-text-field>
                </v-col>

            </v-row>

            <v-row class="justify-center">
                <v-col cols="12" sm="4" md="4">
                    <v-text-field variant="outlined" label="Longitud del Lado Izquierdo:"
                    disabled v-model="detalle_editarGuardado.long_izquierdo" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <v-text-field variant="outlined" label="Longitud del Lado Derecho:"
                    disabled  v-model="detalle_editarGuardado.long_izquierdo" required></v-text-field>
                </v-col>
               
            </v-row>
           <v-row class="justify-center">
            <v-col cols="12" sm="4" md="4">
                    <v-text-field variant="outlined" label="Precio Contado" v-model="detalle_editarGuardado.precioContado"
                         required></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <v-text-field variant="outlined" label="Monto Total Credito" v-model="detalle_editarGuardado.precioCredito"
                         required></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <v-text-field variant="outlined" label="Precio Contado" v-model="detalle_editarGuardado.cantidadCuota"
                         required></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <v-text-field variant="outlined" label="Monto Cuota Credito" v-model="detalle_editarGuardado.montoCredito"
                         required></v-text-field>
                </v-col>  
           </v-row> 


            <v-row>
                <v-col cols="12" class="d-flex justify-end">
                    <v-btn color="#E0E0E0" class="mx-2"
                        @click="dialogoFormularioEditarGuardado = false">Cancelar</v-btn>
                    <v-btn color="primary" @click="guardarFormularioEditarC">Guardare</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</v-card>
</v-dialog>
   <!-- FIN DE EDICION -->

</template>
<script>
import dayjs from 'dayjs'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { PrecioApi } from '@/services/precio.api'
export default {
    components: {
        VDataTable
    },

    props: {
        datosSelec: {
            type: Object
        },
     
    },

    data() {
        return {
        
            dialogoFormularioEditarGuardado: false,
            dialogoFormularioEditar: true,
        
            indiceGlobal: 0,

            datosUrbanizacion: {
                itemsDetalle: []
            },

            formulario: {
              Codigo: '',
              urbanizacion: '',
              nombrebarrio: '',
                fechaD: '',
                nombreciudad: '',
                ubicacion: '',
                costo: '',
                idUrbanizacion: '',
                
            

            },

          
            detalle_editarGuardado: {
                id: '',
                ancho_frente: '',
                ancho_atras: '',
                long_izquierdo: '',
                long_derecho: '',
                costo_urbanizacion: '',
                manzana: '',
                Numero_lote: '',
                precioContado: '',
                cantidadCuota: '',
                precioCredito: '',
                montoCredito: '',
                nombre_urb: '',
                
            },

        
            groupBy: [
                { title: 'Numero ', key: 'idManzana', order: 'asc' },

            ],
            headersEditar: [
                { title: 'Manzanas', key: 'data-table-group', order: 'asc' },
                { title: 'Producto', key: 'idProducto', align: 'center' },
                { title: 'Descripcion', key: 'nombreProducto', align: 'center' }, 
                { title: 'Codigo', key: 'id_detalle', align: 'center' }, 
                { title: 'Numero de Lote', key: 'Numero_lote', align: 'center' },
                { title: 'Numero Manzana', key: 'idManzana', align: 'center' },
                { title: 'Ancho del Frente:', key: 'ancho_frente', align: 'center' },
                { title: 'Ancho de Atrás:', key: 'ancho_atras', align: 'center' },
                { title: 'Longitud del Lado Izquierdo:', key: 'long_izquierdo', align: 'center' },
                { title: 'Longitud del Lado Derecho:', key: 'long_derecho', align: 'center' },
                // { title: 'Costo por Lote:', key: 'costo_urbanizacion', align: 'center' },
                { title: 'Precio Contado:', key: 'precioContado', align: 'center' },
                { title: 'Precio Credito:', key: 'precioCredito', align: 'center' },
                { title: 'Precio Contado:', key: 'cantidadCuota', align: 'center' },
                { title: 'Monto Cuota Credito:', key: 'montoCredito', align: 'center' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' }
            ],
         
        }
    },
    created() {
        console.log('datosSelec: ', this.datosSelec);
        this.formulario.Codigo = this.datosSelec.id;
        this.formulario.urbanizacion = this.datosSelec.idUrbanizacion;
        this.formulario.nombre_urb = this.datosSelec.nombre_urb
        this.formulario.ubicacion = this.datosSelec.ubicacion
        this.formulario.fechaD = this.datosSelec.fechaD
        this.formulario.barrio = this.datosSelec.idBarrio
        this.formulario.nombrebarrio = this.datosSelec.nombrebarrio
        this.formulario.ciudad = this.datosSelec.idCiudad
        this.formulario.nombreciudad = this.datosSelec.nombreciudad
        this.formulario.costo = this.datosSelec.costo
;

        this.datosUrbanizacion.itemsDetalle = this.datosSelec.detalleItems;
    },

    
    methods: {

        editarDetalleGuardado(parametro) {
            this.dialogoFormularioEditarGuardado = true
            
            this.detalle_editarGuardado.id = parametro.id
            this.detalle_editarGuardado.nombre_urb = parametro.nombreProducto
            this.detalle_editarGuardado.manzana = parametro.idManzana
            this.detalle_editarGuardado.Numero_lote = parametro.Numero_lote
            this.detalle_editarGuardado.ancho_frente = parametro.ancho_frente
            this.detalle_editarGuardado.ancho_atras = parametro.ancho_atras
            this.detalle_editarGuardado.long_izquierdo = parametro.long_izquierdo
            this.detalle_editarGuardado.long_derecho = parametro.long_derecho
            this.detalle_editarGuardado.id_detalle = parametro.id_detalle
            this.detalle_editarGuardado.precioContado = parametro.precioContado
            this.detalle_editarGuardado.precioCredito = parametro.precioCredito
            this.detalle_editarGuardado.cantidadCuota = parametro.cantidadCuota
            this.detalle_editarGuardado.montoCredito = parametro.montoCredito
        },
        cerrarDialogoVista() {
            this.$emit('cerrar-dialogo-v')
        },

      
        guardarFormularioEditarC() {
            if (!this.detalle_editarGuardado.Numero_lote) {
                this.emptyFieldError = true;
                return;
            }

            // Busca el índice del elemento que se va a editar
            const index = this.datosUrbanizacion.itemsDetalle.findIndex(item => item.id_detalle == this.detalle_editarGuardado.id_detalle);

            if (index !== -1) {
                // Si se encontró el elemento, actualiza sus datos
                this.datosUrbanizacion.itemsDetalle[index].precioContado = this.detalle_editarGuardado.precioContado;
                this.datosUrbanizacion.itemsDetalle[index].cantidadCuota = this.detalle_editarGuardado.cantidadCuota;
                this.datosUrbanizacion.itemsDetalle[index].precioCredito = this.detalle_editarGuardado.precioCredito;
                this.datosUrbanizacion.itemsDetalle[index].montoCredito = this.detalle_editarGuardado.montoCredito;
            } 
            this.dialogoFormularioEditarGuardado  = false;
        },


        guardarFormularioEditarDetalleGuardado() {

            PrecioApi.update(
                this.formulario.Codigo, 
                {
                idListado_precio: this.formulario.Codigo,
                idUrbanizacion: this.formulario.urbanizacion,
                fecha: this.formulario.fechaD,
                Ubicacion: this.formulario.ubicacion,
                fecha: this.formulario.fechaD,
                idCiudad: this.formulario.ciudad,
                idBarrio: this.formulario.barrio,
                Costo_total: this.formulario.costo,
                idUrbanizacion: this.formulario.urbanizacion,
                Detalle: this.datosUrbanizacion.itemsDetalle
                 
                }
                ).then(() => {
                this.ObtenerPrecio()
              
            })
                this.detalle_editarGuardado.Codigo = "";
                this.detalle_editarGuardado.precioContado = "";
                this.detalle_editarGuardado.cantidadCuota = "";
                this.detalle_editarGuardado.precioCredito = "";
                this.detalle_editarGuardado.montoCredito = "";
                this.itemsDetalle = []
                this.dialogoFormularioEditarGuardado = false
           


        },
        formatearFecha(fechaD) {
            return dayjs(fechaD).format('DD/MM/YYYY')
        }
    }
}
</script>
