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
                        <v-col cols="12" sm="6" md="6">
                            <v-autocomplete variant="outlined" label="Cliente" :items="listaCliente" item-title="ruc"
                                item-value="id" v-model="formulario.cliente" required>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-autocomplete variant="outlined" label="Motivo de Rescision" :items="listaRescision"
                                item-title="descripcionR" item-value="id" v-model="formulario.motivoRescision" required>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field type="date" variant="outlined" label="Fecha de Rescision"
                                v-model="formulario.fechaD" required></v-text-field>
                        </v-col>

                        <v-divider class="mt-0"></v-divider>

                    </v-row>
                    <v-row>
                        <v-col cols="12" class="d-flex justify-end">
                            <v-btn color="#E0E0E0" class="mx-2" @click="cerrarDialogo">Cancelar</v-btn>
                            <v-btn color="primary" class="mx-2" @click="guardarFormulario">Guardar</v-btn>

                        </v-col>
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
import {RescisionAPI} from '@/services/rescision.api'


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
            listaRescision: [],

            indiceGlobal: 0,

            formulario: {
                numero_orden: '',
                cliente: '',
                fechaD: '',
                motivoRescision: '',
                detalle: [

                ],



            },
            detalleGuar: [

           
            ],
            ListadoLote: [],
            ListadoManzana: [],

            headersDetalleVto: [
                { title: 'N° Cuota', key: 'id', align: 'center' },
                { title: 'Fecha de Vto', key: 'fechaVto', align: 'center' },
                { title: 'Importe Cuota', key: 'importeCuota', align: 'center' },
            ],
            headersDetalleContado: [
                { title: 'N° ', key: 'id', align: 'center' },
                { title: 'Fecha', key: 'fechaP', align: 'center' },
                { title: 'Importe', key: 'montoContado', align: 'center' },
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
                this.listaRescision = data.map(item => {
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
            // Verifica que se haya ingresado un número de orden
            if (!this.formulario.numero_orden) {
                // Puedes mostrar un mensaje de error o realizar la lógica que prefieras
                return;
            }
           ContratoApi.getById(this.formulario.numero_orden).then(({ data }) => {

                       this.formulario = {
                    ...this.formulario,
                      cliente: data.idCliente,
                      detalle: data.detalle
              


                };
                console.log('Formulario:', this.formulario);

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
