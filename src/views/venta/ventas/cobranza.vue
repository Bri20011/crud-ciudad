<template>
    <v-dialog max-width="1200" v-model="dialogoFormulario" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Registrar Cobranza </h1>
                <v-form>
                    <v-row>
                        <v-col cols="12" sm="5" md="5">
                            <v-autocomplete variant="outlined" label="Cliente" :items="listaCliente" item-title="ruc"
                            @input="verificarFormulario"   item-value="id" v-model="formulario.numero_orden" required>
                            </v-autocomplete>
                        </v-col>

                        <v-col cols="12" class="mt-4" sm="2" md="2">
                            <v-btn @click="ObtenerCodigoVentas">Calcular</v-btn>
                        </v-col>

                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Numero de Recibo" v-model="formulario.numero_recibo"
                            @input="verificarFormulario"  required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-text-field type="date" variant="outlined" label="Fecha de Recibo"
                            @input="verificarFormulario"  v-model="formulario.fechaContrato" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-autocomplete variant="outlined" label="Forma de Cobro" :items="listaFormaCobro"
                            @input="verificarFormulario" item-title="descripcionF" item-value="id" v-model="formulario.formacobro" required>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-autocomplete variant="outlined" label="Caja" :items="listaCaja" item-title="caja"
                            @input="verificarFormulario"   disabled item-value="id" v-model="formulario.caja" required>
                            </v-autocomplete>
                        </v-col>

                        <v-data-table items-per-page-text="Articulos" :headers="headersCompra"
                            :items="formulario.itemsDetalle">
                            <template v-slot:tfoot>

                            </template>
                            <template v-slot:item.fecha_vto="{ item }">
                                {{ formatearFechaVTO(item.raw.fecha_vto) }}
                            </template>

                            <template v-slot:item.action="{ item }">
                                <v-checkbox  @input="verificarFormulario" v-model="item.raw.check"></v-checkbox>
                            </template>
                        </v-data-table>

                    </v-row>

                    <v-row>
                        <v-col cols="12" class="d-flex justify-end">
                            <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormulario = false">Cancelar</v-btn>
                            <v-btn color="primary" @click="guardarFormulario" :disabled="!formularioValido">Guardar</v-btn>

                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>


    <v-container>
        <v-row>
            <v-col cols="12" sm="5" md="5">
                <v-text-field :loading="loading" density="compact" v-model="buscador" variant="solo" label="Buscar"
                    append-inner-icon="mdi-magnify" single-line hide-details rounded click:prependInner></v-text-field>
            </v-col>

            <v-col cols="12" sm="7" md="7" class="d-flex justify-end align-center">
                Cantidad de Cobranzas: {{ items.length }}
            </v-col>

        </v-row>

        <v-card class="mt-5 rounded-xl">
            <v-data-table items-per-page-text="Item por pagina" :headers="headers" :items="itemsComputed">
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>
                            <p class="font-weight-bold">Registro de Cobranzas </p>
                        </v-toolbar-title>

                        <v-btn class="custom-font" color="primary" prepend-icon="mdi-content-save-plus" variant="text"
                            @click="abrirDialogo">Registrar
                        </v-btn>

                    </v-toolbar>
                </template>

                <template v-slot:item.fecha="{ item }">
                    {{ formatearFecha(item.raw.fechaD) }}
                </template>
                <template v-slot:item.action="{ item }">
                    <!-- <v-icon size="small" class="me-2" @click="editarCiudad(item.raw)">
                        mdi-pencil
                    </v-icon> -->

                    <v-btn class="mx-4" append-icon="mdi-trash-can-outline" color="primary"
                        @click="confirmarCambiarEstado(item.raw)">
                        Anular
                    </v-btn>
                    <v-btn @click="descargarReporte" color="primary">Recibo <v-icon class="ml-2"
                            icon="mdi-download"></v-icon></v-btn>
                </template>
            </v-data-table>
        </v-card>

       
        <!-- Diálogo de confirmación -->
        <v-dialog v-model="dialogoCambiarEstado" max-width="400">
            <v-card>
                <v-container>
                    <v-card-title class="headline">Confirmar Eliminación</v-card-title>
                    <v-card-text>
                        ¿Está seguro de que desea Anular este elemento?
                    </v-card-text>


                    <v-row>
                        <v-col cols="12" class="d-flex justify-end">
                            <v-btn color="#E0E0E0" class="mx-2" text @click="cambiarEstadoCompra">Anular</v-btn>
                            <v-btn color="primary" text @click="cancelarCambiarEstado">Cancelar</v-btn>
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
import { ContratoApi } from '@/services/contrato.api'
import { CobranzaApi } from '@/services/cobranza.api'
import { FormaCobroAPI } from '@/services/forma_cobro.api'
import { ClienteAPI } from '@/services/cliente.api'
import { CajaAPI } from '@/services/caja.api'
import dayjs from 'dayjs'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default {
    components: {
        VDataTable
    },
    data() {
        return {
            idVentaG: '',
            dialogoFormulario: false,
            dialogoCambiarEstado: false,
            ordenCompraSeleccionada: null,
            formularioValido: false,


            formulario: {
                numero_orden: '',
                numero_recibo: '',
                fechaContrato: '',
                formacobro: '',
                caja: '',
                // itemsDetalle: [],

            },

            contador: 1,
            limit: 45,
            defaultFormulario: {
                numero_orden: '',
                numero_recibo: '',
                fechaContrato: '',
                formacobro: '',
                caja: '',
                itemsDetalle: [],

            },
            buscador: '',
            headers: [
                { title: 'Codigo', align: 'start', sortable: false, key: 'id', },
                { title: 'Numero de Recibo', key: 'numero_recibo' },
                { title: 'Fecha de Factura', key: 'fecha', align: 'star' },
                { title: 'Cliente', key: 'cliente', align: 'star' },
                { title: 'Caja', key: 'caja', align: 'star' },
                { title: 'Acciones', key: 'action', sortable: false, align: 'center' },
            ],
            headersCompra: [
                { title: 'N° Cuota', key: 'numero_cuota', align: 'center' },
                { title: 'Fecha de Vto', key: 'fecha_vto', align: 'center' },
                { title: 'Importe Cuota', key: 'importe_cuota', align: 'center' },

                { title: 'Acion', key: 'action', sortable: false, align: 'end' },
            ],
            items: [
                {
                    id: 1,
                    numero_recibo: '001-001-000001',
                    fecha: '2021-10-10',
                    timbrado: '001-001-000001',
                    numero_nc: '001-001-000001',
                    cliente: 'Juan Perez',
                    caja: 'Caja 1',
                }
            ],
            itemsDetalle: [],
            dialogoEliminar: false,
            elementoAEliminar: null,

            listaCliente: [],
            listaDocumento: [],
            listaFormaCobro: [],

        }
    },

    computed: {
        itemsComputed() {
            if (!this.buscador) return this.items
            return this.items.filter((element) => element.descripcion.toLocaleLowerCase().includes(this.buscador.toLocaleLowerCase()))
        },
    },
    methods:
    {
        verificarFormulario() {
        // Verificar si todos los campos obligatorios están llenos y tambien si fue tildado el check
        this.formularioValido = this.formulario.numero_orden && this.formulario.numero_recibo && this.formulario.fechaContrato && this.formulario.formacobro && this.formulario.caja && this.formulario.itemsDetalle.some(item => item.check);
      
    },

      
  
        ObtenerCliente() {
            ClienteAPI.getAll().then(({ data }) => {
                this.listaCliente = data.map(item => {
                    return {
                        id: item.idCliente,
                        //aqui traigo concatenado el ruc y el nombre del cliente
                        ruc: item.Ruc + ' - ' + item.Razon_social,

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
        //Aqui traigo la caja solo con el id NUMERO 101
        ObtenerCaja() {
            CajaAPI.getAllCaja().then(({ data }) => {
                this.listaCaja = data.map(item => {
                    return {
                        caja: item.idCaja,
                        descripcionC: item.nombrecaja,
                        numerCaja: item.Cajahabilitada,
                        idSucursal: item.idSucursal,
                        nombreSucursal: item.nombreSucursal
                    }
                });
               
            });
        },

        ObtenerFormaCobro() {
            FormaCobroAPI.getAll().then(({ data }) => {
                this.listaFormaCobro = data.map(item => {
                    return {
                        id: item.idforma_cobro,
                        descripcionF: item.Descripcion,

                    }
                })
            })
        },


        ObtenerCodigoVentas() {
            // Verifica que se haya ingresado un número de orden
            if (!this.formulario.numero_orden) {
                // Puedes mostrar un mensaje de error o realizar la lógica que prefieras
                return;
            }

            // Realiza una solicitud a tu API para obtener el detalle de la orden de compra
            ContratoApi.IdContrCliente(this.formulario.numero_orden).then(({ data }) => {
                this.idContrato = data.idContrato
                this.formulario = {
                    ...this.formulario,
                    itemsDetalle: data.map(item => {
                        return {
                            check: false,
                            idContrato: item.idContrato,
                            id_detalle: item.id_detalle,
                            numero_cuota: item.numero_cuota,
                            fecha_vto: dayjs(item.fecha_vto).format('YYYY/MM/DD'),
                            importe_cuota: item.importe_cuota,
                            importe_pago: item.importe_pago,
                        };
                    }),


                };
            });

            this.dialogoFormulario = true;
        },



        formatearFecha(fecha) {
            return dayjs(fecha).format('DD/MM/YYYY')
        },
        formatearFechaVTO(fecha_vto) {
            return dayjs(fecha_vto).format('DD/MM/YYYY')
        },
        showDatePicker() {
            this.showDatepicker = true;
        },
        hideDatePicker() {
            this.showDatepicker = false;
        },

        abrirDialogo() {
            // Abrir el modal y cargar el código aquí
            this.dialogoFormulario = true;
            //aqui traigo en el campo de caja el numero 101
        
            this.formulario = JSON.parse(JSON.stringify(this.defaultFormulario))
            this.detalle = JSON.parse(JSON.stringify(this.defaultFormulario))
            this.formulario.caja = 101;

        },
        generarCodigo() {
            const nuevoCodigo = this.contador++;
            return nuevoCodigo;
        },

        guardarFormulario() {
            const cuotasMarcadas = this.formulario.itemsDetalle.filter(item => item.check);

            CobranzaApi.create({
                idcobranza: '',
                idCliente: this.formulario.numero_orden,
                idCaja: this.formulario.caja,
                numero_recibo: this.formulario.numero_recibo,
                fecha_recibo: this.formulario.fechaContrato,
                idforma_cobro: this.formulario.formacobro,
                detalle: cuotasMarcadas.map(item => {
                    return {
                        idcobranza: item.id,
                        id_detalle: item.id_detalle,
                        idContrato: item.idContrato,
                        numero_cuota: item.numero_cuota,
                        //aqui envio al backend la fecha de vencimiento en formato año mes dia
                        fecha_vto: dayjs(item.fecha_vto).format('YYYY-MM-DD'),
                        importe_cuota: item.importe_cuota,

                    };
                }),
            }).then(() => {
            });
        
            this.formulario.numero_orden = '';
            this.formulario.numero_recibo = '';
            this.formulario.fechaContrato = '';
            this.formulario.formacobro = '';
            this.formulario.caja = '';
           
            this.dialogoFormulario = false;
          


        },



        confirmarCambiarEstado(elemento) {
            // Abre el diálogo de confirmación y guarda el elemento a cambiar de estado
            this.elementoACambiarEstado = elemento;
            this.dialogoCambiarEstado = true;
        },
        cancelarCambiarEstado() {
            // Cierra el diálogo de confirmación y restablece la variable
            this.dialogoCambiarEstado = false;
            this.elementoACambiarEstado = null;
        },
        cambiarEstadoCompra() {
            if (this.elementoACambiarEstado) {
                // Realiza la actualización aquí para cambiar el estado
                CobranzaApi.update(this.elementoACambiarEstado.id, { estado_cobranza: true }
                ).then(() => {
                    // Actualiza la tabla después de que la actualización se haya completado
                    this.items = [];
                    this.ObtenerCobranza();

                })
            }
            // Cierra el diálogo de confirmación y restablece la variable
            this.dialogoCambiarEstado = false;
            this.elementoACambiarEstado = null;
        },




        async ObtenerCobranza() {
            CobranzaApi.getAll().then(({ data }) => {
                this.items = data.map(item => {
                    return {
                        id: item.idcobranza,
                        numero_recibo: item.numero_recibo,
                        fecha: item.fecha_recibo,
                        timbrado: item.idTimbrado,
                        numero_nc: item.numero_nc,
                        cliente: item.nombreCliente,
                        caja: item.idCaja,


                    }
                })
            })
        },
        generarReciboPDF(item) {
            const doc = new jsPDF();
            doc.text('Recibo de Cobranza', 105, 10, null, null, 'center');
            doc.text('N° Recibo: ' + item.numero_recibo, 10, 20);
            doc.text('Fecha: ' + item.fecha, 10, 30);
            doc.text('Cliente: ' + item.cliente, 10, 40);
            doc.text('Caja: ' + item.caja, 10, 50);
            doc.text('Timbrado: ' + item.timbrado, 10, 60);
            doc.text('N° Nota de Credito: ' + item.numero_nc, 10, 70);
            doc.autoTable({
                head: [['N° Cuota', 'Fecha de Vto', 'Importe Cuota']],
                body: data.map(det => [det.numero_cuota, det.fecha_vto, det.importe_cuota]),
                theme: 'grid', // Agrega bordes a la tabla
                styles: { textColor: [0, 0, 0], fillColor: [255, 255, 255] },
            });
            doc.save('recibo_cobranza.pdf'); // Guarda el PDF con un nombre específico
        },
        descargarReporte(item) {
            CobranzaApi.getReporte(item.id).then(({ data }) => {
                this.generarReciboPDF(item);
            });
        },

    },


    async created() {
        // Generar automáticamente el código al cargar el componente
        this.formulario.codigo = this.generarCodigo();
        this.ObtenerCliente()
        this.ObtenerCaja()
        this.ObtenerFormaCobro()
        await this.ObtenerCobranza()
        this.ObtenerCaja()



    },
    // watch: {
    //     'formulario.tipo_venta': function () {
    //         this.formulario.numerCaja = 101
    //     },
    // },

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