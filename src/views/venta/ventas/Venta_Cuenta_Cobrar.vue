<template>
    <v-dialog max-width="1200" v-model="dialogoFormulario" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Registrar Ventas</h1>
                <v-form>
                    <v-row>
                        <v-col cols="12" sm="2" md="2">
                            <v-text-field variant="outlined" label="Nº Contrato" v-model="formulario.numero_contrato"
                                required></v-text-field>
                        </v-col>

                        <v-col cols="12" class="mt-4" sm="2" md="2">
                            <v-btn @click="ObtenerCodigoContrato">Obtener</v-btn>
                        </v-col>

                        <v-col cols="12" sm="3" md="3">
                            <v-autocomplete variant="outlined" label="Timbrado" :items="listaTimbrado"
                                item-title="descripcionT" item-value="id" v-model="formulario.timbrado" return-object
                                required></v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="numeros" item-title="numeros" item-value="id"
                                v-model="numerosVenta" required></v-text-field>
                        </v-col>


                        <v-col cols="12" sm="2" md="2">
                            <v-text-field variant="outlined" label="Fecha" v-model="fechaO" disabled
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-autocomplete variant="outlined" label="Cliente" :items="listaCliente"
                                item-title="razonsocial" item-value="id" v-model="formulario.cliente"
                                required></v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="4" md="4">
                            <v-autocomplete variant="outlined" label="Tipo de Documento" :items="listaDocumento"
                                disabled item-title="tipo_venta" item-value="id" v-model="formulario.tipo_venta"
                                required></v-autocomplete>
                        </v-col>

                        <v-col v-if="formulario.tipo_venta == 'Contado'" cols="12" sm="4" md="4">
                            <v-autocomplete variant="outlined" label="Caja" :items="listaCaja" item-title="descripcion"
                                item-value="id" disabled v-model="formulario.caja" required></v-autocomplete>
                        </v-col>


                        <v-data-table items-per-page-text="Articulos" :headers="headersCompra"
                            :items="formulario.itemsDetalle">

                            <template v-slot:tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td align="center"><v-divider class="mb-2"></v-divider> {{ sumarIva('iva5') }}</td>
                                    <td align="center"> <v-divider class="mb-2"></v-divider>{{ sumarIva('iva10') }}</td>
                                    <td align="center"><v-divider class="mb-2"></v-divider>{{ sumarTotal('total') }}
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </template>

                            <template v-slot:item.action="{ item }">
                                <v-icon size="small" class="me-2" @click="editarDetalle(item.raw)">
                                    mdi-pencil
                                </v-icon>
                            </template>

                        </v-data-table>

                    </v-row>

                    <v-row>
                        <v-col cols="12" class="d-flex justify-end">
                            <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormulario = false">Cancelar</v-btn>
                            <v-btn color="primary" @click="guardarFormulario"
                                :disabled="!formulario.numero_contrato || !formulario.timbrado || !formulario.cliente
                                    || !formulario.tipo_venta || !formulario.caja || formulario.itemsDetalle.length == 0">Guardar</v-btn>

                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>

    <!-- INICIO EDITAR DETALLE -->
    <v-dialog max-width="1200" v-model="dialogoFormularioEditarDetalle" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Ingresar Precio</h1>
                <v-form>
                    <v-row class="justify-center">
                        <v-col ols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Numero de Cuota" v-model="detalle.numero_cuota"
                                readonly></v-text-field>
                        </v-col>
                        <v-col ols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Total" v-model="detalle.monto_total"
                                readonly></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-autocomplete variant="outlined" label="Iva" :items="listaIva" item-title="descripcionI"
                                item-value="id" v-model="formulario.iva" :error="excededLimit"
                                :error-messages="errorMessage" required>
                            </v-autocomplete>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="d-flex justify-end">
                            <v-btn color="#E0E0E0" class="mx-2"
                                @click="dialogoFormularioEditarDetalle = false">Cancelar</v-btn>
                            <v-btn color="primary" @click="guardarFormularioEditarDetalle">Guardar</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>

    <!-- FIN EDITAR DETALLE -->

    <v-container>
        <v-row>
            <v-col cols="12" sm="5" md="5">
                <v-text-field :loading="loading" density="compact" v-model="buscador" variant="solo" label="Buscar"
                    append-inner-icon="mdi-magnify" single-line hide-details rounded click:prependInner></v-text-field>
            </v-col>

            <v-col cols="12" sm="7" md="7" class="d-flex justify-end align-center">
                Cantidad de Ventas: {{ items.length }}
            </v-col>

        </v-row>

        <v-card class="mt-5 rounded-xl">
            <v-data-table items-per-page-text="Item por pagina" :headers="headers" :items="itemsComputed">
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>
                            <p class="font-weight-bold">Registro de Ventas</p>
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

                    <v-icon color="red" size="small" class="me-2" @click="confirmarCambiarEstado(item.raw)">
                        mdi-trash-can-outline
                    </v-icon>

                    <v-icon color="primary" size="small" class="me-2" @click="descargarFactura(item.raw.id)">
                        mdi mdi-download-circle-outline
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>



        <!-- Diálogo de confirmación -->
        <v-dialog v-model="dialogoCambiarEstado" max-width="400">
            <v-card>
                <v-container>
                    <v-card-title class="headline">Confirmar Anulacion</v-card-title>
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





        <!-- FIN DIALOGO REGISTRAR CUENTAS A PAGAR -->
    </v-container>
</template>

<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { TimbradoAPI } from '@/services/timbrado.api'
import { ClienteAPI } from '@/services/cliente.api'
import { TipoVentaAPI } from '@/services/tipoventa.api'
import { CajaAPI } from '@/services/caja.api'
import { VentaAPI } from '@/services/venta.api'
import { ContratoApi } from '@/services/contrato.api'


import { ProductoAPI } from '@/services/producto.api'
import { IvaAPI } from '@/services/iva.api'
import { OrdenCompraApi } from '@/services/orden_compra.api'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
import { AperturaAPI } from '@/services/apertura.api'




export default {
    components: {
        VDataTable
    },
    data() {
        return {

            dialogoFormulario: false,
            dialogoCambiarEstado: false,

            dialogoFormularioEditar: false,
            dialogoFormularioEditarDetalle: false,
            dialogoFormularioGenerarCuota: false,
            ordenCompraSeleccionada: null,
            dialogoFormularioEditarDetallePagos: false,



            formulario: {
                cliente: '',
                caja: '',
                timbrado: '',
                numeros: '',
                numero_contrato: '',
                fechaD: '',
                tipo_venta: '',
                idtipo_venta: '',

            },
            numerosVenta: '',
            fechaO: dayjs().format('DD/MM/YYYY'),
            detalle: {
                fechaD: null,
                monto: '',
            },

            contador: 1,
            limit: 45,
            defaultFormulario: {
                cliente: '',
                caja: '',
                timbrado: '',
                numeros: '',
                numero_contrato: '',
                fechaD: '',
                tipo_venta: '',
                idtipo_venta: '',

            },
            buscador: '',
            headers: [
                { title: 'Codigos', align: 'start', sortable: false, key: 'id', },
                { title: 'Numero de Factura', key: 'numero_factura' },
                { title: 'Tipo de Venta', key: 'documento' },
                { title: 'Fecha de Factura', key: 'fecha', align: 'star' },
                { title: 'Timbrado', key: 'timbrado', align: 'star' },
                { title: 'Cliente', key: 'cliente', align: 'star' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' },
            ],
            headersCompra: [
                { title: 'N° Cuota', key: 'idContrato', align: 'center' },
                { title: 'Importe Cuota', key: 'monto_totalNuevo', align: 'center' },
                { title: 'Iva', key: 'iva', align: 'center' },
                { title: 'Exenta', key: 'exenta', align: 'center' },
                { title: 'Iva 5%', key: 'iva5', align: 'center' },
                { title: 'Iva 10%', key: 'iva10', align: 'center' },
                { title: 'Total', key: 'total', align: 'center' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' },
            ],

            items: [
                {
                    id: '',
                    descripcion: '',
                    fecha: '',
                    action: '',
                    timbrado: '',
                    numero_factura: '',
                    proveedor: ''
                }
            ],

            detalle: {
                numero_cuota: '',
                monto_total: '',
                iva: '',
                exenta: '',
                iva5: '',
                iva10: '',
                total: '',

            },
            itemsDetalle: [],
            dialogoEliminar: false,
            elementoAEliminar: null,
            ConteoFactura: '',

            listaDocumento: [],
            listaProducto: [],

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

        ObtenerProducto() {
            ProductoAPI.getAll().then(({ data }) => {
                this.listaProducto = data.map(item => {
                    return {
                        id: item.idProducto,
                        descripcionPr: item.Descripcion,

                    }
                })
            })
        },

        ObtenerIva() {
            IvaAPI.getAll().then(({ data }) => {
                this.listaIva = data.map(item => {
                    return {
                        id: item.idIva,
                        descripcion: item.Descripcion,
                        descripcionI: item.Porcentaje
                    }
                })
            })
        },



        ObtenerVentas() {
            VentaAPI.getAll().then(({ data }) => {


            })
        },

        resetearCampos() {
            this.formulario = {
                ...JSON.parse(JSON.stringify(this.defaultFormulario)),
                numero_contrato: this.formulario.numero_contrato,
            }
            this.itemsDetalle = []
        },

        ObtenerCodigoContrato() {
            this.resetearCampos()
            // Verifica que se haya ingresado un número de orden
            if (!this.formulario.numero_contrato) {
                // Puedes mostrar un mensaje de error o realizar la lógica que prefieras
                return;
            }

            // Realiza una solicitud a tu API para obtener el detalle de la orden de compra
            ContratoApi.getById(this.formulario.numero_contrato).then(async ({ data }) => {
                // Aquí tengo un console.log de lo que me retorna la API
                console.log('data:', data);

                this.formulario.caja = data.idtipo_venta == 1 ? 101 : 100;

                if (data.idtipo_venta == 1) {

                    const noHayApertura = await AperturaAPI.validaapertura(this.formulario.caja).then(async ({ data }) => {

                        if (data.length == 0) {
                            alert('No se ha realizado la apertura de caja')
                            return true
                        }
                    }).catch((error) => {
                        alert('No se ha realizado la apertura de caja')
                        return true
                    })

                    if (noHayApertura) {
                        return
                    }

                }

                // Calcula el monto del IVA al 5% y redondea a dos decimales
                const iva5 = (data.monto_totalNuevo * 0.05).toFixed(0);

                // Asigna el resultado al formulario
                this.formulario.idtipo_venta = data.idtipo_venta;
                this.formulario.tipo_venta = data.nombreTipoVenta;
                //aca se completa caja (this.formulario.caja = 101;) solo si tipo_venta es contado, caso contrario se envia 100


                this.formulario.itemsDetalle = [{
                    monto_totalNuevo: data.monto_totalNuevo,
                    idContrato: data.idContrato,
                    //aca declaro que idIva es 1 por defecto

                    iva: 2,
                    exenta: 0,
                    iva10: 0,
                    iva5: iva5,
                    total: data.monto_totalNuevo
                }];

                // Muestra el diálogo del formulario
                this.dialogoFormulario = true;
            });

        },

        formatearFecha(fecha) {
            return dayjs(fecha).format('DD/MM/YYYY')
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
            this.formulario = JSON.parse(JSON.stringify(this.defaultFormulario))
            this.detalle = JSON.parse(JSON.stringify(this.defaultFormulario))


        },
        generarCodigo() {
            const nuevoCodigo = this.contador++;
            return nuevoCodigo;
        },

        guardarFormulario() {
            if (!this.formulario.numero_contrato) {

                this.emptyFieldError = true;
                return;
            }
            console.log(this.fechaO)
            const Fecha = dayjs(this.fechaO, 'DD/MM/YYYY').format('YYYY-MM-DD')
            console.log('Fecha: ', Fecha)
            VentaAPI.create({
                //aqui envio al backend cabecera y detall
                idventa: this.formulario.codigo,
                Fecha: Fecha,
                Numero_fact: this.numerosVenta,
                numero_factura: this.ConteoFactura,
                idtipo_venta: this.formulario.idtipo_venta,
                idCliente: this.formulario.cliente,
                idTimbrado: this.formulario.timbrado,
                idAperturacaja: this.formulario.apertura,
                idCaja: this.formulario.caja,
                detalle: this.formulario.itemsDetalle.map(item => {
                    return {
                        idventa: this.formulario.codigo,
                        idContrato: item.idContrato,
                        monto_total: item.monto_totalNuevo,
                        cantidad: 1,
                        iva5: item.iva5,
                        iva10: item.iva10,
                        exenta: item.exenta,
                    }
                })


            },
            ).then((response) => {
                console.log('response: ', response);
                this.descargarFactura(response.data.idventa)
                this.ObtenerVentas()
                this.formulario = JSON.parse(JSON.stringify(this.defaultFormulario))
                this.ConteoFactura = '';
                this.numerosVenta = '';
                this.dialogoFormulario = false;
            })


        },





        confirmarCambiarEstado(elemento) {
            // Abre el diálogo de confirmación y guarda el elemento a cambiar de estado
            this.elementoACambiarEstado = elemento;
            this.dialogoCambiarEstado = true;
        },
        descargarFactura(id) {
            console.log('elemento: ', id)
            VentaAPI.descargarFactura(id).then(({ data }) => {
                const linkSource = data
                const downloadLink = document.createElement('a')
                const fileName = `FACTURA.pdf`
                downloadLink.href = linkSource
                downloadLink.download = fileName
                downloadLink.click()
            })
        },
        cancelarCambiarEstado() {
            // Cierra el diálogo de confirmación y restablece la variable
            this.dialogoCambiarEstado = false;
            this.elementoACambiarEstado = null;
        },
        cambiarEstadoCompra() {
            if (this.elementoACambiarEstado) {
                // Realiza la actualización aquí para cambiar el estado
                VentaAPI.update(this.elementoACambiarEstado.id, { estado_venta: true }
                ).then(() => {
                    // Actualiza la tabla después de que la actualización se haya completado
                    this.items = [];
                    this.ObtenerVentas();

                })


                // Cierra el diálogo de confirmación
                this.dialogoCambiarEstado = false;
                this.elementoACambiarEstado = null;




            }

        },

        ObtenerVentas() {
            VentaAPI.getAll().then(({ data }) => {
                this.items = data.map(item => {
                    return {
                        id: item.idventa,
                        descripcion: item.numero_contrato,
                        fecha: item.fecha,
                        idTimbrado: item.idTimbrado,
                        timbrado: item.NumeroTimbrado,
                        numero_factura: item.Numero_fact,
                        idtipo_venta: item.idtipo_venta,
                        documento: item.descripcionVenta,
                        idCliente: item.idCliente,
                        cliente: item.Razon_social_Cliente,
                        detalleItems: item.detalle

                    }
                })
            })
        },
        recalcularTotal() {
            // Verifica que haya valores en cantidad y precio
            if (this.formulario.cantidad && this.formulario.precio) {
                // Calcula el total dinámicamente
                this.formulario.total = this.formulario.cantidad * this.formulario.precio;

            }

        },

        editarDetalle(parametro) {
            this.dialogoFormularioEditarDetalle = true
            this.detalle.numero_cuota = parametro.idContrato
            this.detalle.monto_total = parametro.monto_totalNuevo
            // this.detalle.total = this.detalle.monto_total



        },
        guardarFormularioEditarDetalle() {
            if (!this.detalle.numero_cuota || !this.detalle.monto_total) {
                this.emptyFieldError = true;
                return;
            }

            // Busca el índice del elemento que se va a editar
            const index = this.formulario.itemsDetalle.findIndex(item => item.idContrato === this.detalle.numero_cuota);

            if (index !== -1) {
                // Si se encontró el elemento, actualiza sus datos
                // this.formulario.itemsDetalle[index].Cantidad = this.formulario.cantidad;
                // this.formulario.itemsDetalle[index].Precio = this.formulario.precio;

                // this.formulario.itemsDetalle[index].total = this.formulario.cantidad * this.formulario.precio;
                this.formulario.itemsDetalle[index].iva = this.formulario.iva;
                this.formulario.itemsDetalle[index].total = this.detalle.monto_total;
                //Aqui hago el calculo de los iva  switch case
                switch (this.formulario.iva) {
                    case 1:
                        this.formulario.itemsDetalle[index].exenta = this.formulario.itemsDetalle[index].monto_totalNuevo
                        this.formulario.itemsDetalle[index].iva5 = 0
                        this.formulario.itemsDetalle[index].iva10 = 0
                        break;
                    case 2:
                        this.formulario.itemsDetalle[index].exenta = 0
                        this.formulario.itemsDetalle[index].iva5 = this.formulario.itemsDetalle[index].monto_totalNuevo * 0.05
                        this.formulario.itemsDetalle[index].iva10 = 0
                        break;
                    case 3:
                        this.formulario.itemsDetalle[index].exenta = 0
                        this.formulario.itemsDetalle[index].iva5 = 0
                        this.formulario.itemsDetalle[index].iva10 = this.formulario.itemsDetalle[index].monto_totalNuevo * 0.1
                        break;
                }
            }



            this.dialogoFormularioEditarDetalle = false;
        },

        //     sumarColumna(columna) {
        //   return this.formulario.itemsDetalle.reduce((total, item) => total + item[columna], 0);
        // },

        sumarIva(columna) {
            // Verifica que this.formulario.itemsDetalle tenga un valor
            if (this.formulario.itemsDetalle) {
                // Redondea cada valor de IVA antes de sumarlos
                return Math.round(this.formulario.itemsDetalle.reduce((total, item) => total + item[columna], 0));
            } else {
                return 0; // O cualquier valor predeterminado que desees en caso de que no haya itemsDetalle
            }
        },

        sumarTotal(columna) {
            // Verifica que this.formulario.itemsDetalle tenga un valor y sea un array
            if (this.formulario.itemsDetalle && Array.isArray(this.formulario.itemsDetalle)) {
                // Redondea cada valor de la columna antes de sumarlos
                return Math.round(this.formulario.itemsDetalle.reduce((total, item) => total + item[columna], 0));
            } else {
                return 0; // O cualquier valor predeterminado que desees en caso de que no haya itemsDetalle
            }
        },



        AgregarDetallePago() {
            this.itemsDetalle.push({
                fecha: this.formulario.fechaD,
                monto: this.formulario.monto,
                action: '',

            }),
                this.formulario.fechaD = ''
            this.formulario.monto = ''
        },

        editarDetallePagos(parametro) {
            this.dialogoFormularioEditarDetallePagos = true
            this.formulario.fechaD = parametro.fechaD
            this.formulario.monto = parametro.monto

            // Calcula el total al abrir el diálogo
            this.formulario.total = this.formulario.cantidad * this.formulario.precio;
            this.formulario.iva = parametro.idIva
        },

        guardarFormularioEditarDetallePago() {
            if (!this.detalle.fechaD || !this.formulario.monto) {
                this.emptyFieldError = true;
                return;
            }

            // Busca el índice del elemento que se va a editar
            const index = this.itemsDetalle.findIndex(item => item.monto === this.formulario.monto);

            if (index !== -1) {
                // Si se encontró el elemento, actualiza sus datos
                this.itemsDetalle[index].fechaD = this.formulario.fechaD;
                this.itemsDetalle[index].monto = this.formulario.monto;
            }
            this.dialogoFormularioEditarDetallePagos = false;
        },
        ObtenerCaja() {
            CajaAPI.getAll().then(({ data }) => {
                this.listaCaja = data.map(item => {
                    return {
                        id: item.idCaja,
                        descripcion: item.nombrecaja,
                        cajanum: item.Cajahabilitada,
                        idSucursal: item.idSucursal,
                        nombreSucursal: item.nombreSucursal
                    }
                })
            })
        },
        ObtenerTipoD() {
            TipoVentaAPI.getAll().then(({ data }) => {
                this.listaDocumento = data.map(item => {
                    return {
                        id: item.idtipo_venta,
                        tipo_venta: item.nombreTipoVenta
                    }
                })
            })
        },
        ObtenerCliente() {
            ClienteAPI.getAll().then(({ data }) => {
                this.listaCliente = data.map(item => {
                    return {
                        id: item.idCliente,
                        ruc: item.Ruc,
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
        async ObtenerNumeroFactura(id) {

            await VentaAPI.ObtenerNumeroFactura(id).then(({ data }) => {
                console.log('data: ', data)
                // console.log('data nU: ', data[0].Siguiente_numero_factura)
                this.ConteoFactura = data[0].Siguiente_numero_factura


            })
        },


        actualizarNumeros() {
            const timbradoSeleccionado = this.listaTimbrado.find(item => item.id === this.formulario.timbrado);
            if (timbradoSeleccionado) {
                this.formulario.numeros = timbradoSeleccionado.numeros;
            }
        },

        ObtenerTimbrado() {
            TimbradoAPI.getAll().then(({ data }) => {
                this.listaTimbrado = data.map(item => {
                    return {
                        id: item.idTimbrado,
                        descripcion: item.Descripcion,
                        descripcionT: item.NumerTimbrado,
                        fechaD: item.fecha_inicio,
                        fechaF: item.fecha_fin,
                        expedicion: item.idPunto_exp,
                        numeroExpedicion: item.numeroExpedicion,
                        numeroEstablecimiento: item.idEstablecimiento,
                        establecimiento: item.idEstablecimiento,
                        nombreTipoVenta: item.idtipo_venta,
                        numeros: `${String(item.numeroEstablecimiento).padStart(3, '0')}-${String(item.numeroExpedicion).padStart(3, '0')}`
                    }
                });
                // Si hay elementos en listaTimbrado, actualizar numeros con el primero
                if (this.listaTimbrado.length > 0) {
                    this.formulario.numeros = this.listaTimbrado[0].numeros;
                }
            });
        }
    },

    watch: {
        async 'formulario.timbrado'(value) {
            console.log('value: ', value)
            if (!value) return

            await this.ObtenerNumeroFactura(value.id)
            this.numerosVenta = `${value.numeros}-${String(this.ConteoFactura).padStart(7, '0')}`

        }

    },
    created() {
        // Generar automáticamente el código al cargar el componente
        this.formulario.codigo = this.generarCodigo();
        this.ObtenerTimbrado()
        this.ObtenerTipoD()
        this.ObtenerCaja()
        this.ObtenerVentas()
        this.ObtenerCodigoContrato()



        this.ObtenerProducto()
        this.ObtenerIva()
        this.ObtenerCliente()

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