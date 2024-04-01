<template>
    <v-dialog max-width="800" v-model="dialogoFormulario" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Rescision de Contrato</h1>
                <v-form>
                    <v-row>
                        <v-col cols="12" sm="2" md="2">
                            <v-text-field variant="outlined" label="Nº OC" v-model="formulario.numero_orden"
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12" class="mt-4" sm="2" md="2">
                            <v-btn @click="ObtenerCodigoOrden">Obtener</v-btn>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <v-autocomplete variant="outlined" label="Manzana" :items="ListadoManzana"
                                item-title="nombremanzana" item-value="idManzana" v-model="formulario.manzana"
                                required></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-autocomplete variant="outlined" label="Numero de Lote" :items="ListadoLote"
                                item-title="Numero_lote" item-value="Numero_lote" v-model="formulario.numero_lote"
                                required></v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="4" md="4">
                            <v-autocomplete variant="outlined" label="Tipo Venta" :items="listaTipoVenta"
                                item-title="descripcionTV" item-value="id" v-model="formulario.tipoventa"
                                required></v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="3" md="3" class="mx-0">
                            <v-text-field variant="outlined" label="Ancho Frente" v-model="formulario.ancho_frente"
                                disabled required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="3" md="3" class="mx-0">
                            <v-text-field variant="outlined" label="Ancho Atras" v-model="formulario.ancho_atras"
                                disabled required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="3" md="3" class="mx-0">
                            <v-text-field variant="outlined" label="Longitud Lado Derecho" disabled
                                v-model="formulario.long_derecho" required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="3" md="3" class="mx-0">
                            <v-text-field variant="outlined" label="Longitud Lado Izquierdo" disabled
                                v-model="formulario.long_izquierdo" required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="6">
                            <v-autocomplete variant="outlined" label="Cliente" :items="listaCliente" item-title="ruc"
                                item-value="id" v-model="formulario.cliente" required>
                            </v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="3" md="3">
                            <v-text-field type="date" variant="outlined" label="Fecha de Contrato"
                                v-model="formulario.fechaD" required></v-text-field>

                        </v-col>
                        <v-col cols="12" sm="3" md="3" class="mx-0">
                            <v-text-field variant="outlined" label="Monto Total Credito" disabled
                                v-model="formulario.montoCredito" required></v-text-field>
                        </v-col>



                        <v-data-table items-per-page-text="Articulos" :headers="headersDetalleVto"
                            :items="listadoDeLaTabla">

                            <template v-slot:item.fechaVto="{ item }">

                                {{ formatearFecha(item.raw.fechaVto) }}
                            </template>
                            <template v-slot:item.action="{ item }">
                                <v-icon size="small" class="me-2" @click="editarDetallePagos(item.raw)">
                                    mdi-pencil
                                </v-icon>
                            </template>

                        </v-data-table>
                        <v-col cols="12" class="d-flex justify-end">
                            <v-btn color="#E0E0E0" class="mx-2" @click="cerrarDialogo">Cancelar</v-btn>
                            <v-btn color="primary" class="mx-2" @click="guardarFormulario">Guardar</v-btn>

                        </v-col>

                    </v-row>
                    <v-row>

                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>

</template>
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { ClienteAPI } from '@/services/cliente.api'
import { ContratoApi } from '@/services/contrato.api'
import { MotivoRescisionAPI } from '@/services/motivo_rescision_contrato.api'
import { RescisionAPI } from '@/services/rescision.api'


import dayjs from 'dayjs'


export default {
    components: {
        VDataTable
    },
    props: {
        prop_dialogo_formulario: {
            type: Boolean
        }
    },
    data() {
        return {
            dialogoFormulario: true,
            listaCliente: [],
            listado_cesion: [],
            listadoDeLaTabla: [],
            indiceGlobal: 0,

            formulario: {
                numero_orden: '',
                cliente: '',
                fechaD: '',
                motivoRescision: '',
                detalles: [

                ],



            },
            detalleGuar: [


            ],
            ListadoLote: [],
            ListadoManzana: [],

            headersDetalleVto: [
                { title: 'N° Cuota', key: 'numero_cuota', align: 'center' },
                { title: 'Fecha de Vto', key: 'fechaVto', align: 'center' },
                { title: 'Importe Cuota', key: 'importeCuota', align: 'center' },
            ],



        }
    },
    created() {


        this.ObtenerCliente();
        this.ObtenerMotivoRescision();

    },

    methods: {
    


        ObtenerCliente() {
            ClienteAPI.getAll().then(({ data }) => {
                this.listaCliente = data.map(item => {
                    return {
                        id: item.idCliente,
                        ruc: `${item.Razon_social} - ${item.Ruc}`,
                        razonsocial: item.Razon_social,
                        direccion: item.Direccion,
                        telefono: item.Telefono,
                        idBarrio: item.idBarrio,
                        nombrebarrio: item.nombrebarrio,
                        idCiudad: item.idCiudad,
                        nombreciudad: item.nombreciudad,

                    }
                })
            })
        },
        ObtenerMotivoRescision() {
            MotivoRescisionAPI.getAll().then(({ data }) => {
                this.listado_cesion = data.map(item => {
                    return {
                        id: item.idmotivo_rescision_contrato,
                        descripcionR: item.Descripcion
                    }
                })
            })
        },



        cerrarDialogo() {
            this.$emit('cerrar-dialogo')

        },
        formatearFecha(fecha) {
            return dayjs(fecha).format('DD/MM/YYYY')
        },

        ObtenerCodigoOrden() {
            if (!this.formulario.numero_orden) {
                return;
            }
            ContratoApi.getById(this.formulario.numero_orden).then(({ data }) => {
                console.log('data:', data)

             
                this.formulario.cliente = data.idCliente,
                    this.formulario.fechaD = data.fecha_contrato,
                    this.formulario.manzana = data.numero_manzana,
                    this.formulario.numero_lote = data.numero_lote,
                    this.formulario.tipoventa = data.nombreTipoVenta,
                    this.formulario.ancho_frente = data.ancho_frente,
                    this.formulario.ancho_atras = data.ancho_atras,
                    this.formulario.long_derecho = data.long_derecho,
                    this.formulario.long_izquierdo = data.long_izquierdo,
                    this.formulario.montoCredito = data.monto_credito,
                    this.listadoDeLaTabla = data.detalle.map(item => {
                        return {
                            fechaVto: item.fecha_vto,
                            importeCuota: item.importe_cuota,
                            numero_cuota: item.numero_cuota
                        }
                    })
              
            });

            this.dialogoFormulario = true;
        },



        guardarFormulario() {
            RescisionAPI.create({
                idRescision_contrato: '',
                idContrato: this.formulario.numero_orden,
                idCliente: this.formulario.cliente,
                fecha_rescision: this.formulario.fechaD,
                idmotivo_rescision_contrato: this.formulario.motivoRescision,
                detalle: this.formulario.detalle
                //aqui  envio detalle: this.formulario.detalle, y tambien en detalle envio al backend el id de idRescision_contrato





            }).then(() => {

                this.cerrarDialogo()
            });
        },


    },
}
</script>
