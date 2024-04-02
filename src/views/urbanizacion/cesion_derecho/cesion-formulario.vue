<template>
    <v-dialog max-width="800" v-model="dialogoFormulario" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Cesion de Derechos y deudas</h1>
                <v-form>
                    <v-row>
                        <v-col cols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Nº Contrato" v-model="formulario.numero_orden"
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12" class="mt-4" sm="2" md="2">
                            <v-btn @click="ObtenerCodigoOrden">Obtener</v-btn>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-autocomplete variant="outlined" label="Cliente" :items="listaCliente" item-title="ruc"
                                item-value="id" v-model="formulario.cliente" required>
                            </v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="3" md="3">
                            <v-text-field type="date" variant="outlined" label="Fecha de Cesion"
                                v-model="formulario.fechaD" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-autocomplete variant="outlined" label="Motivo de Cesion" :items="listaMotivoCesion"
                                item-title="descripcionM" item-value="id" v-model="formulario.motivocesion" required>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-autocomplete variant="outlined" label="Tipo de Venta" :items="listaTipoVenta"
                                item-title="descripcionTV" item-value="id" v-model="formulario.tipoventa" disabled
                                required></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <v-autocomplete variant="outlined" label="N° Manzana" :items="ListadoManzana"
                                item-title="nombremanzana" item-value="idManzana" v-model="formulario.manzana" disabled
                                required></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-autocomplete variant="outlined" label="Numero de Lote" :items="ListadoLote"
                                item-title="Numero_lote" item-value="Numero_lote" v-model="formulario.numero_lote"
                                disabled required></v-autocomplete>
                        </v-col>


                        <v-col cols="12" sm="3" md="3" class="mx-0">
                            <v-text-field variant="outlined" label="Monto Total Credito" disabled
                                v-model="formulario.montoCredito" required></v-text-field>
                        </v-col>
                        <!-- 
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
                        </v-col> -->





                        <v-data-table items-per-page-text="Articulos" :headers="headersDetalleVto"
                            :items="listadoDeLaTabla">
                            <template v-slot:tfoot>

                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td align="center"><v-divider class="mb-2"></v-divider>{{
        sumarTotalPagos('importeCuota') }}
                                    </td>
                                </tr>
                            </template>
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
import { MotivoCesionAPI } from '@/services/motivo_cesion_derecho_deuda.api'
import { CesionAPI } from '@/services/cesion.api'


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
            listaMotivoCesion: [],
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
        this.ObtenerMotivoCesion();

    },

    methods: {

        sumarTotalPagos(columna) {
            // Verifica que this.formulario.itemsDetalle tenga un valor y sea un array
            if (this.listadoDeLaTabla && Array.isArray(this.listadoDeLaTabla)) {
                // Suma el valor de la columna 'importeCuota' de cada item
                return this.listadoDeLaTabla.reduce((importeCuota, item) => importeCuota + item[columna], 0)
            }




        },



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
        ObtenerMotivoCesion() {
            MotivoCesionAPI.getAll().then(({ data }) => {
                this.listaMotivoCesion = data.map(item => {
                    return {
                        id: item.idmotivo_cesion_derecho_deuda,
                        descripcionM: item.Descripcion
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
                    this.formulario.montoCredito = data.monto_totalNuevo,
                    this.listadoDeLaTabla = data.detalle.map(item => {
                        return {
                            fechaVto: item.fecha_vto,
                            importeCuota: item.importe_cuota,
                            numero_cuota: item.numero_cuota,
                            id_detalle: item.id_detalle

                        }
                    })

            });

            this.dialogoFormulario = true;
        },



        guardarFormulario() {

            //             SELECT `cesion_derecho_deuda`.`idCesion_derecho_deuda`,
            //     `cesion_derecho_deuda`.`idContrato`,
            //     `cesion_derecho_deuda`.`idmotivo_cesion_derecho_deuda`,
            //     `cesion_derecho_deuda`.`fecha_cesion`,
            //     `cesion_derecho_deuda`.`idCliente`,
            //     `cesion_derecho_deuda`.`numero_lote`,
            //     `cesion_derecho_deuda`.`numero_manzana`
            // FROM `mydb`.`cesion_derecho_deuda`;


            // SELECT `detalle_cesion_derecho_deuda`.`idCesion_derecho_deuda`,
            //     `detalle_cesion_derecho_deuda`.`fecha_vto`,
            //     `detalle_cesion_derecho_deuda`.`importe_cuota`,
            //     `detalle_cesion_derecho_deuda`.`numero_cuota`
            // FROM `mydb`.`detalle_cesion_derecho_deuda`;
            CesionAPI.create({
                idCesion_derecho_deuda: '',
                idContrato: this.formulario.numero_orden,
                idmotivo_cesion_derecho_deuda: this.formulario.motivocesion,
                fecha_cesion: this.formulario.fechaD,
                idCliente: this.formulario.cliente,
                numero_lote: this.formulario.numero_lote,
                numero_manzana: this.formulario.manzana,
                detalle: this.listadoDeLaTabla.map(item => {
                    return {
                        idCesion_derecho_deuda: '',
                        fecha_vto: item.fechaVto,
                        importe_cuota: item.importeCuota,
                        numero_cuota: item.numero_cuota,
                        id_detalle: item.id_detalle
                    }
                })
            }).then(() => {
                this.$emit('cerrar-dialogo')
            });
        }
    }
}

</script>
