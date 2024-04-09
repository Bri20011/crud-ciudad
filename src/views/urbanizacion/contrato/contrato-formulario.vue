<template>
    <v-dialog max-width="1500" v-model="dialogoFormulario" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Registrar Contrato</h1>
                <v-form>
                    <v-row>
                        <v-col cols="12" sm="4" md="4">

                            <v-autocomplete variant="outlined" label="Nombre de Urbanizacion" :items="listado_precio"
                                item-title="descripcionLP" item-value="id" return-object v-model="formulario.precio"
                                required></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <v-autocomplete variant="outlined" label="Manzana" :disabled="!formulario.precio"
                                :items="ListadoManzana" item-title="nombremanzana" item-value="idManzana"
                                v-model="formulario.idManzana" required></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-autocomplete variant="outlined" label="Numero de Lote" :disabled="!formulario.idManzana"
                                :items="ListadoLote" item-title="Numero_lote" item-value="Numero_lote"
                                v-model="formulario.detallePrecio" required></v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="2" md="2">
                            <v-autocomplete variant="outlined" label="Tipo Venta" :disabled="!formulario.detallePrecio"
                                :items="listaTipoVenta" item-title="descripcionTV" item-value="id"
                                v-model="formulario.tipoventa" required></v-autocomplete>
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
                        <v-col v-if="formulario.tipoventa === 2" cols="12" sm="3" md="3" class="mx-0">
                            <v-text-field variant="outlined" label="Monto Total Credito" disabled
                                v-model="formulario.montoCredito" required></v-text-field>
                        </v-col>
                        <v-divider class="mt-5 mb-3"></v-divider>

                        <v-col v-if="formulario.tipoventa === 1" cols="12" sm="3" md="3" class="mx-0">
                            <!-- Este codigo hace, se muestra este campo solo si tipo venta es exactamente igual a 1 -->
                            <v-text-field variant="outlined" label="Monto Contado" v-model="formulario.montoContado"
                                disabled required></v-text-field>
                        </v-col>
                        <v-col v-if="formulario.tipoventa === 1" cols="12" sm="3" md="3">
                            <v-text-field type="date" variant="outlined" label="Fecha Pago" v-model="formulario.fechaP"
                                required></v-text-field>

                        </v-col>

                        <v-col v-if="formulario.tipoventa === 2" cols="12" sm="3" md="3" class="mx-0">
                            <v-text-field variant="outlined" label="Cantidad Cuotas" v-model="formulario.cantidadCuota"
                                disabled required></v-text-field>
                        </v-col>

                        <v-col v-if="formulario.tipoventa === 2" cols="12" sm="3" md="3">
                            <v-text-field type="date" variant="outlined" label="Fecha de Primer Vto"
                                v-model="formulario.fechaVto" required></v-text-field>
                        </v-col>
                        <v-col v-if="formulario.tipoventa === 2" cols="12" sm="3" md="3" class="mx-0">
                            <v-text-field variant="outlined" label="Importe de Cuota" v-model="formulario.importeCuota"
                                disabled required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="2" md="2" class="mt-5">
                            <v-btn color="primary" size="small" prepend-icon="mdi mdi-plus-thick"
                                @click="agregarDetalleAntesGuardar">Agregar Venta</v-btn>
                        </v-col>

                        <v-divider class="mt-0"></v-divider>



                        <v-data-table v-if="formulario.tipoventa === 2" class="mt-5" max-width="1500" items-per-page-text="Articulos"
                            :headers="headersDetalleVto" :items="listadoDeLaTabla" :group-by="groupBy">
                            <template v-slot:item.fechaVto="{ item }">
                                {{ formatearFecha(item.raw.fechaVto) }}
                            </template>
                            <template v-slot:item.action="{ item }">
                                <v-icon size="small" class="me-2" @click="editarDetalleAntesGuardar(item.raw)">
                                    mdi-pencil
                                </v-icon>
                            </template>
                        </v-data-table>
                        <v-data-table v-if="formulario.tipoventa === 1" class="mt-5" max-width="1500" items-per-page-text="Articulos"
                            :headers="headersDetalleContado" :items="listadoDeLaTabla" :group-by="groupBy">
                            <template v-slot:item.fechaVto="{ item }">
                                {{ formatearFecha(item.raw.fechaVto) }}
                            </template>
                            <template v-slot:item.action="{ item }">
                                <v-icon size="small" class="me-2" @click="editarDetalleAntesGuardar(item.raw)">
                                    mdi-pencil
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="d-flex justify-end">
                            <v-btn color="#E0E0E0" class="mx-2" @click="cerrarDialogo">Cancelar</v-btn>
                            <v-btn color="primary" class="mx-2" @click="guardarFormulario" :disabled="!formulario.precio || !formulario.idManzana || !formulario.detallePrecio || !formulario.tipoventa || !formulario.ancho_frente || !formulario.ancho_atras || !formulario.long_derecho || !formulario.long_izquierdo">Guardar</v-btn>

                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>

</template>
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { PrecioApi } from '@/services/precio.api'
import { ClienteAPI } from '@/services/cliente.api'
import { TipoVentaAPI } from '@/services/tipoventa.api'
import { ManzanaAPI } from '@/services/manzana.api'
import { ContratoApi } from '@/services/contrato.api'
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
            listaCiudad: [],
            listaTipoVenta: [],
            listado_precio: [],
            listaCliente: [],
            listaManzana: [],
            indiceGlobal: 0,

            formulario: {
                precio: '',
                tipoventa: '',
                manzana: '',
                numeroLote: '',
                fechaD: '',
                fechaP: '',
                fechaVto: '',
                plazoVenta: '',
                nombre_urb: '',
                cliente: '',
                ancho_frente: '',
                ancho_atras: '',
                long_derecho: '',
                long_izquierdo: '',
                montoContado: '',
                montoCredito: '',
                idManzana: '',
                Numero_lote: '',
                detallePrecio: '',



            },
            ListadoLote: [],
            ListadoManzana: [],

            headersDetalleVto: [
                { title: 'N° Cuota', key: 'numero_cuota', align: 'center' },
                { title: 'Fecha de Vto', key: 'fechaVto', align: 'center' },
                { title: 'Importe Cuota', key: 'importeCuota', align: 'center' },
            ],
            headersDetalleContado: [
                { title: 'N° ', key: 'numero_cuota', align: 'center' },
                { title: 'Fecha', key: 'fechaP', align: 'center' },
                { title: 'Importe', key: 'montoContado', align: 'center' },
            ],

            listadoDeLaTabla: []
        }
    },
    created() {


        this.ObtenerTipoVenta();
        this.ObtenerPrecio();
        this.ObtenerCliente();
        this.ObtenerManzana();

    },
    watch: {
        'formulario.precio': function () {
            this.SelecionarPrecio();
        },
        'formulario.idManzana': function () {
            this.seleccionarManzana();
        },
        'formulario.tipoventa': function () {
            this.completarCampos();
            this.listadoDeLaTabla = []
        },
    },
    methods: {


        ObtenerTipoVenta() {
            TipoVentaAPI.getAll().then(({ data }) => {
                this.listaTipoVenta = data.map(item => {
                    return {
                        id: item.idtipo_venta,
                        descripcionTV: item.Descripcion
                    }
                })
            })
        },
        ObtenerPrecio() {
            const idManzanaSeleccionada = this.formulario.idManzana;
            const numeroLoteSeleccionado = this.formulario.Numero_lote;
            if (this.formulario.Numero_lote) {
                return;

            }
            PrecioApi.getAll().then(({ data }) => {
                this.listado_precio = data.map(item => {
                    return {
                        id: item.idListado_precio,
                        descripcionLP: item.Nombre_Urbanizacion,
                        fechaD: item.fecha,
                        idBarrio: item.idBarrio,
                        nombrebarrio: item.nombrebarrio,
                        idCiudad: item.idCiudad,
                        nombreciudad: item.nombreciudad,
                        costo: item.Costo_total,
                        ubicacion: item.Ubicacion,
                        idUrbanizacion: item.idUrbanizacion,
                        detalleItems: item.detalle.map(detalle => ({
                            idProducto: detalle.idProducto,
                            id_detalle: detalle.id_detalle,
                            idManzana: detalle.idManzana,
                            Numero_lote: detalle.Numero_lote,
                            ancho_frente: detalle.ancho_frente,
                            ancho_atras: detalle.ancho_atras,
                            long_izquierdo: detalle.long_izquierdo,
                            long_derecho: detalle.long_derecho,
                            precioContado: detalle.precioContado,
                            precioCredito: detalle.precioCredito,
                            montoCredito: detalle.montoCredito,
                            nombremanzana: detalle.nombremanzana,
                            cantidadCuota: detalle.cantidadCuota
                        }))
                    }
                })
            })
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
        ObtenerManzana() {
            ManzanaAPI.getAll().then(({ data }) => {
                this.listaManzana = data.map(item => {
                    return {
                        id: item.idManzana,
                        numero_manzana: item.numero_manzana,
                        descripcionM: item.Descripcion
                    }
                })
            })


        },
        SelecionarPrecio() {
            console.log(this.formulario.precio)
            this.formulario.idManzana = '';
            this.ListadoManzana = [];
            this.formulario.precio.detalleItems.forEach(item => {
                if (!this.ListadoManzana.find(manzana => manzana.idManzana === item.idManzana)) {
                    this.ListadoManzana.push(item)
                }
            })
        },
        seleccionarManzana() {
            this.ListadoLote = [];
            this.formulario.precio.detalleItems.forEach(item => {
                if (item.idManzana === this.formulario.idManzana) {
                    this.ListadoLote.push(item)
                }
            })
        },

        completarCampos() {
            const LoteSeleccionado = this.ListadoLote.find(lote => lote.Numero_lote === this.formulario.detallePrecio);
            this.formulario.long_izquierdo = LoteSeleccionado.long_izquierdo
            this.formulario.long_derecho = LoteSeleccionado.long_derecho
            this.formulario.ancho_frente = LoteSeleccionado.ancho_frente
            this.formulario.ancho_atras = LoteSeleccionado.ancho_atras
            //Este  codigo hace que si el tipo de venta es contado, complete el monto contado y que no se complete el monto credito y viseversa (1-Contado, 2-Credito)
            if (this.formulario.tipoventa === 1) {
                this.formulario.montoContado = LoteSeleccionado.precioContado
                this.formulario.montoCredito = ''
            } else {
                this.formulario.montoCredito = LoteSeleccionado.precioCredito
                this.formulario.cantidadCuota = LoteSeleccionado.cantidadCuota
                this.formulario.importeCuota = LoteSeleccionado.montoCredito
                this.formulario.montoContado = ''
            }


            console.log('LoteSeleccionado', LoteSeleccionado)
        },
        agregarDetalleAntesGuardar() {
            //Esto hace cuando Tipo de Venta es Credito (2)
            this.listadoDeLaTabla = []
            if (this.formulario.tipoventa === 2) {
            for (let i = 1; i <= this.formulario.cantidadCuota; i++) {
                const fechaVto = i === 1 ? this.formulario.fechaVto : dayjs(this.formulario.fechaVto).add(i - 1, 'month').format('YYYY-MM-DD')

                this.listadoDeLaTabla.push({
                    numero_cuota: i,
                    cantidadCuota: this.formulario.cantidadCuota,
                    fechaVto: fechaVto,
                    importeCuota: this.formulario.importeCuota
                })
            }
            }
//Esto se hace cuando tipo de Venta es contado (1) y se vacia la tabla de headerDetalleVto
            if (this.formulario.tipoventa === 1) {
                this.listadoDeLaTabla.push({
                    numero_cuota: 1,
                    // cantidadCuota: 1,
                    fechaP: this.formulario.fechaP,
                    montoContado: this.formulario.montoContado
                })
            }

        
        },
      

        cerrarDialogo() {
            this.$emit('cerrar-dialogo')

        },
        formatearFecha(fecha) {
            return dayjs(fecha).format('DD/MM/YYYY')
        },
       
            
//           Codigo de Backend  SELECT `contrato`.`idContrato`,
//     `contrato`.`idListado_precio`,
//     `contrato`.`nombre_urbanizacion`,
//     `contrato`.`fecha_contrato`,
//     `contrato`.`idCliente`,
//     `contrato`.`idCiudad`,
//     `contrato`.`idtipo_venta`,
//     `contrato`.`ubicacion`,
//     `contrato`.`plazo_venta`,
//     `contrato`.`fecha_inicio`,
//     `contrato`.`numero_manzana`,
//     `contrato`.`numero_lote`
// FROM `mydb`.`contrato` ; 




        guardarFormulario(){ 
            ContratoApi.create({
                idContrato: '',
                idListado_precio: this.formulario.precio,
                nombre_urbanizacion: this.formulario.precio.descripcionLP,
                fecha_contrato: this.formulario.fechaD,
                idCliente: this.formulario.cliente,
                idCiudad: this.formulario.precio.idCiudad,
                idtipo_venta: this.formulario.tipoventa,
                ubicacion: this.formulario.precio.ubicacion,
                numero_manzana: this.formulario.idManzana,
                numero_lote: this.formulario.detallePrecio,
                detalle: this.listadoDeLaTabla.map(item => ({
                    idContrato: item.id,
                    fecha_vto: item.fechaVto,
                    importe_cuota: item.importeCuota,
                    cantidad_cuota: item.cantidadCuota,
                    monto_contado: item.montoContado,
                    numero_cuota: item.numero_cuota,
                    id_detalle: item.id_detalle,


                    
                }))
            }).then(() => {
                this.cerrarDialogo()
            });
        },

       
    },
}
</script>
