<template>
    <v-dialog max-width="1600" v-model="dialogoFormulario" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Registrar Compras de Lote</h1>
                <v-form>
                    <v-row>
                        <v-col cols="12" sm="2" md="2">
                            <v-text-field variant="outlined" label="Nº OC" v-model="formulario.numero_orden"
                                required></v-text-field>
                        </v-col>

                        <v-col cols="12" class="mt-4" sm="2" md="2">
                            <v-btn @click="ObtenerCodigoOrden">Calcular</v-btn>
                        </v-col>

                        <v-col cols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Numero de Factura" v-model="formulario.numero_factura"
                                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-autocomplete variant="outlined" label="Tipo de Documento" :items="listaDocumento"
                                item-title="descripcionD" item-value="id" v-model="formulario.documento"
                                :error="excededLimit" :error-messages="errorMessage" required
                                @change="tipoDocumentoChanged">
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <v-autocomplete ref="numeroCajaInput" variant="outlined" label="Caja" :items="listaCaja"
                                item-title="descripcionCa" item-value="id" v-model="formulario.caja"
                                :disabled="formulario.documento !== 1" required></v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="4" md="4">
                            <input class="custom-input" v-model="formulario.fechaO" type="date"
                                placeholder="Fecha de Operacion" @input="formatDate" />
                        </v-col>


                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Timbrado" v-model="formulario.timbrado"
                                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4" md="4">
                            <v-autocomplete variant="outlined" :items="listaProveedor" label="Proveedor"
                                item-title="descripcionP" item-value="id" v-model="formulario.proveedor"
                                :error="excededLimit" :error-messages="errorMessage" required></v-autocomplete>
                        </v-col>



                        <v-data-table max-width="1600" items-per-page-text="Articulos" :headers="headersCompra"
                            :items="formulario.itemsDetalle">


                            <template v-slot:tfoot>

                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td align="center"><v-divider class="mb-2"></v-divider> {{ sumarIva('iva5') }}</td>
                                    <td align="center"> <v-divider class="mb-2"></v-divider>{{ sumarIva('iva10') }}</td>
                                    <td align="center"><v-divider class="mb-2"></v-divider>{{ sumarTotal('total') }}</td>
                                    <td></td>
                                </tr>
                            </template>




                            <template v-slot:item.action="{ item }">
                                <v-icon size="small" class="me-2" @click="editarDetalle(item.raw)">
                                    mdi-pencil
                                </v-icon>
                                <!-- <v-icon color="#C62828" size="small" @click="confirmarEliminarCiudad(item.raw)">
                                    mdi-trash-can-outline
                                </v-icon> -->
                            </template>

                        </v-data-table>

                    </v-row>

                    <v-row>
                        <v-col cols="12" class="d-flex justify-end">
                            <v-btn v-if="formulario.documento === 2" prepend-icon="mdi mdi-plus-thick" color="#90A4AE"
                                class="mx-2" @click="abrirformulariogenerarcuentas">Generar Cuotas</v-btn>
                            <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormulario = false">Cancelar</v-btn>

                            <v-btn color="primary" @click="guardarFormulario"
                                :disabled="formulario.documento === 2 && !seRealizoAgregarPagos">GuardarPricn</v-btn>
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


                        <v-col cols="12" sm="4" md="4">
                            <v-autocomplete variant="outlined" label="Descripcion" :items="listaProducto"
                                item-title="descripcionPr" item-value="id" v-model="formulario.producto"
                                required></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-autocomplete variant="outlined" label="Barrio" :items="listaBarrio" item-title="descripcionB"
                                item-value="id" v-model="formulario.ciudad" required></v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="3" md="3">
                            <v-autocomplete variant="outlined" label="Ciudad" :items="listaCiudad"
                                item-title="descripcionCi" item-value="id" v-model="formulario.barrio"
                                required></v-autocomplete>
                        </v-col>
                        <v-col ols="12" sm="2" md="2">
                            <v-text-field variant="outlined" label="Cantidad" @input="recalcularTotal"
                                v-model="formulario.cantidad"></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Ubicacion" v-model="formulario.ubicacion"
                                required></v-text-field>
                        </v-col>

                        <v-col ols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Nombre del Lote" @input="recalcularTotal"
                                v-model="formulario.nombreLoteado"></v-text-field>
                        </v-col>
                        <v-col ols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Precio Unitario" @input="recalcularTotal"
                                v-model="formulario.costo"></v-text-field>
                        </v-col>
                        <v-col ols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Total" v-model="formulario.total"
                                readonly></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-autocomplete variant="outlined" label="Iva" :items="listaIva" item-title="descripcionI"
                                item-value="id" v-model="formulario.iva" :error="excededLimit"
                                :error-messages="errorMessage" required>
                            </v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Dimension Total" v-model="formulario.dimensionTotal"
                                required></v-text-field>
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
                Cantidad de Compras: {{ items.length }}
            </v-col>

        </v-row>

        <v-card class="mt-5 rounded-xl">
            <v-data-table items-per-page-text="Item por pagina" :headers="headers" :items="itemsComputed">
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>
                            <p class="font-weight-bold">Registro de Compras de Lotes</p>
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

                    <v-btn append-icon="mdi-trash-can-outline" color="primary" @click="confirmarCambiarEstado(item.raw)">
                        Anular
                    </v-btn>

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

        <!-- INICIO DIALOGO REGISTRAR CUENTAS A PAGAR -->

        <v-dialog max-width="700" v-model="dialogoFormularioGenerarCuota" persistent>
            <v-card class="rounded-xl">
                <v-container>
                    <h1 class="mb-3">Registrar Cuentas a Pagar</h1>
                    <v-form>
                        <v-row class="d-flex justify-center">

                            <v-col cols="12" sm="6" md="6">
                                <v-text-field variant="outlined" label="Observacion" v-model="CuentaPagar.observacion"
                                    required></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                                <v-autocomplete variant="outlined" :items="listaProveedor" label="Proveedor"
                                    item-title="descripcionP" item-value="id" v-model="CuentaPagar.proveedor" disabled
                                    required></v-autocomplete>
                            </v-col>
                            <v-divider></v-divider>

                            <v-col cols="12" sm="4" md="4">
                                <input class="custom-input" v-model="CuentaPagar.fechaD" type="date"
                                    placeholder="Fecha de Operacion" @input="formatDate" />
                            </v-col>

                            <v-col cols="12" sm="5" md="5">
                                <v-text-field variant="outlined" label="Monto" v-model="CuentaPagar.monto"
                                    required></v-text-field>
                            </v-col>


                            <v-col cols="12" class="d-flex justify-end">
                                <v-btn color="primary" size="small" prepend-icon="mdi mdi-plus-thick"
                                    @click="AgregarDetallePago">Agregar Pagos</v-btn>
                            </v-col>


                            <!-- INICIO DETALLE -->
                            <v-divider class="mt-0"></v-divider>

                            <!-- FIN DETALLE -->



                            <v-data-table items-per-page-text="Articulos" :headers="headersCuentasPagar"
                                :items="itemsDetallePagos">

                                <template v-slot:item.fechaD="{ item }">

                                    {{ formatearFecha(item.raw.fechaD) }}
                                </template>


                                <template v-slot:tfoot>

                                    <tr>
                                        <td></td>
                                        <td align="center"><v-divider class="mb-2"></v-divider>{{ sumarTotalPagos('total') }}
                                        </td>
                                        <td></td>
                                    </tr>
                                </template>


                                <template v-slot:item.action="{ item }">
                                    <v-icon size="small" class="me-2" @click="editarDetallePagos(item.raw)">
                                        mdi-pencil
                                    </v-icon>
                                    <!-- <v-icon color="#C62828" size="small" @click="confirmarEliminarCiudad(item.raw)">
                                    mdi-trash-can-outline
                                </v-icon> -->
                                </template>

                            </v-data-table>

                        </v-row>

                        <v-row>
                            <v-col cols="12" class="d-flex justify-end">
                                <v-btn color="#E0E0E0" class="mx-2"
                                    @click="dialogoFormularioGenerarCuota = false">Cancelar</v-btn>
                                <v-btn color="primary" @click="guardarFormularioPagos">GuardarPa</v-btn>

                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card>
            <!-- INICIO EDITAR DETALLE PAGOS -->
            <v-dialog max-width="600" v-model="dialogoFormularioEditarDetallePagos" persistent>
                <v-card class="rounded-xl">
                    <v-container>
                        <h1 class="mb-3">Editar Detalle Pagos</h1>
                        <v-form>
                            <v-row class="justify-center">

                                <v-col cols="12" sm="4" md="4">
                                    <input class="custom-input" v-model="formulario.fechaD" type="date"
                                        placeholder="Fecha de Operacion" @input="formatDate" />
                                </v-col>

                                <v-col ols="12" sm="4" md="4">
                                    <v-text-field variant="outlined" label="Monto" v-model="formulario.monto"
                                        required></v-text-field>
                                </v-col>

                            </v-row>
                            <v-row>
                                <v-col cols="12" class="d-flex justify-end">
                                    <v-btn color="#E0E0E0" class="mx-2"
                                        @click="dialogoFormularioEditarDetallePagos = false">Cancelar</v-btn>
                                    <v-btn color="primary" @click="guardarFormularioEditarDetallePago">Guardar</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card>
            </v-dialog>
            <!-- INICIO EDITAR DETALLE PAGOS -->
        </v-dialog>


        <!-- FIN DIALOGO REGISTRAR CUENTAS A PAGAR -->
    </v-container>
</template>
  
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { ComprasLoteAPI } from '@/services/compras_lote.api'
import { ProveedorAPI } from '@/services/proveedor.api'
import { TipoDocumentoAPI } from '@/services/tipo_documento.api'
import { ProductoAPI } from '@/services/producto.api'
import { IvaAPI } from '@/services/iva.api'
import { CajaAPI } from '@/services/caja.api'
import { BarrioAPI } from '@/services/barrio.api'
import { CiudadAPI } from '@/services/ciudad.api'
import { OrdenUrbApi } from '@/services/orde_compra_lote.api'
import { CuentaPagarApi } from '@/services/cuenta_pagar.api'



import dayjs from 'dayjs'



export default {
    components: {
        VDataTable
    },
    data() {
        return {
            dialogoFormulario: false,
            dialogoCambiarEstado: false,
            seRealizoAgregarPagos: false,
            dialogoFormularioEditar: false,
            dialogoFormularioEditarDetalle: false,
            dialogoFormularioGenerarCuota: false,
            ordenCompraSeleccionada: null,
            dialogoFormularioEditarDetallePagos: false,


            CuentaPagar: {
                observacion: '',
                proveedor: '',
                fechaD: null,
                monto: ''
            },
            detalle: {
                fechaD: null,
                monto: '',
            },
            formulario: {
                proveedor: '',
                documento: '',
                fechaO: null,
                fechaD: null,
                timbrado: '',
                numero_factura: '',
                costo: '',
                cantidad: '',
                dimensionTotal: '',
                nombreLoteado: '',
                caja: '',
            },
            detalle: {
                fechaD: null,
                cantidad_lote: '',
                costo_lote: '',
                ciudad: '',
                barrio: '',
            },

            contador: 1,
            limit: 45,
            defaultFormulario: {
                codigo: '',
                descripcion: '',
                fecha: '',
                timbrado: '',
                producto: null,
                cantidad: '',
                precio: '',
                nomnbreProducto: '',
                descripcionI: ''

            },
            buscador: '',
            headers: [
                { title: 'Codigo', align: 'start', sortable: false, key: 'id', },
                { title: 'Numero de Factura', key: 'numero_factura' },
                { title: 'Tipo Documento', key: 'documento' },
                { title: 'Caja', key: 'caja' },
                { title: 'Fecha de Factura', key: 'fecha', align: 'star' },
                { title: 'Timbrado', key: 'timbrado', align: 'star' },
                { title: 'Proveedor', key: 'proveedor', align: 'star' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' },
            ],
            headersCompra: [
                { title: 'Producto', key: 'idProducto', align: 'center' },
                { title: 'Descripcion', key: 'nombreProducto', align: 'center' },
                { title: 'Nombre Urbzanizacion', key: 'Descripcion_lote', align: 'center' },
                { title: 'Ubicacion', key: 'ubicacion', align: 'center' },
                { title: 'Barrio', key: 'barrio', align: 'center' },
                { title: 'Ciudad', key: 'ciudad', align: 'center' },
                { title: 'Dimension Total', key: 'dimension_total', align: 'center' },
                { title: 'Cantidad', key: 'cantidad_lote', align: 'center' },
                { title: 'Costo Unitario', key: 'costo_lote', align: 'center' },
                { title: 'Iva', key: 'iva', align: 'center' },
                { title: 'Exenta', key: 'exenta', align: 'center' },
                { title: 'Iva 5%', key: 'iva5', align: 'center' },
                { title: 'Iva 10%', key: 'iva10', align: 'center' },
                { title: 'Total', key: 'total', align: 'center' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' },
            ],
            headersCuentasPagar: [
                { title: 'Fecha de Pago', key: 'fechaD', align: 'star' },
                { title: 'Monto', key: 'monto', align: 'center' },

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
            itemsDetalle: [],
            dialogoEliminar: false,
            itemsDetallePagos: [],
            elementoAEliminar: null,

            listaProveedor: [],
            listaDocumento: [],
            listaProducto: [],

        }
    },

    computed: {
        itemsComputed() {
            if (!this.buscador) return this.items
            return this.items.filter((element) => element.descripcion.toLocaleLowerCase().includes(this.buscador.toLocaleLowerCase()))
        },
        // excededLimit() {
        //     return this.formulario.descripcion.length > this.limit;
        // },
        // errorMessage() {
        //     if (this.excededLimit) {
        //         return 'Superaste el límite de 45 letras';
        //     }
        //     return '';
        // }
    },
    methods:
    {
        ObtenerProveedor() {
            ProveedorAPI.getAll().then(({ data }) => {
                this.listaProveedor = data.map(item => {
                    return {
                        id: item.idProveedor,
                        descripcionP: item.Razon_social
                    }
                })
            })
        },

        ObtenerTipoD() {
            TipoDocumentoAPI.getAll().then(({ data }) => {
                this.listaDocumento = data.map(item => {
                    return {
                        id: item.idTipo_Documento,
                        descripcionD: item.Descripcion
                    }
                })
            })
        },

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
        ObtenerCaja() {
            CajaAPI.getAll().then(({ data }) => {
                this.listaCaja = data.map(item => {
                    return {
                        id: item.idCaja,
                        descripcionC: item.nombrecaja,
                        numerCaja: item.Cajahabilitada,
                        idSucursal: item.idSucursal,
                        nombreSucursal: item.nombreSucursal
                    }
                })
            })
        },
        ObtenerBarrio() {
            BarrioAPI.getAll().then(({ data }) => {
                this.listaBarrio = data.map(item => {
                    return {
                        id: item.idBarrio,
                        descripcionB: item.descripcion
                    }
                })
            })
        },
        ObtenerCiudades() {
            CiudadAPI.getAll().then(({ data }) => {
                this.listaCiudad = data.map(item => {
                    return {
                        id: item.idCiudad,
                        descripcionCi: item.Descripcion
                    }
                })
            })
        },
        ObtenerCaja() {
            CajaAPI.getAll().then(({ data }) => {
                this.listaCaja = data.map(item => {
                    return {
                        id: item.idCaja,
                        descripcionCa: item.nombrecaja,
                        numero_caja: item.Cajahabilitada,
                        idSucursal: item.idSucursal,
                        nombreSucursal: item.nombreSucursal
                    }
                })
            })
        },


        // INICIO NUEVO 
        ObtenerOrden_compraLote() {
            ComprasLoteAPI.getAll().then(({ data }) => {


            })
        },

        ObtenerCodigoOrden() {
            // Verifica que se haya ingresado un número de orden
            if (!this.formulario.numero_orden) {
                // Puedes mostrar un mensaje de error o realizar la lógica que prefieras
                return;
            }

            // Realiza una solicitud a tu API para obtener el detalle de la orden de compra
            OrdenUrbApi.getById(this.formulario.numero_orden).then(({ data }) => {

                this.formulario = {
                    ...this.formulario,
                    fechaD: data.fecha,
                    itemsDetalle: data.detalle,

                };
            });

            this.dialogoFormulario = true;
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
            if (!this.formulario.numero_factura || !this.formulario.documento || !this.formulario.caja || !this.formulario.proveedor || !this.formulario.fechaD || !this.formulario.timbrado || !this.formulario.numero_orden || !this.formulario.itemsDetalle.length) {

                this.emptyFieldError = true;
                return;
            }


            ComprasLoteAPI.create({

                idcompras_lote: this.formulario.codigo,
                fecha_doc: this.formulario.fechaD,
                timbrado: this.formulario.timbrado,
                numero_factura: this.formulario.numero_factura,
                idTipo_Documento: this.formulario.documento,
                idProveedor: this.formulario.proveedor,
                idCaja: this.formulario.caja,
                idorde_compra_lote: this.formulario.numero_orden, //nuevo 
                Detalle: this.formulario.itemsDetalle,
                CuentaPagar: {
                    cabecera: this.CuentaPagar,
                    detalle: this.itemsDetallePagos
                }


            },
            ).then(() => {
                this.ObtenerComprasLote()
            })

            this.formulario.codigo = '';
            this.formulario.fechaD = '';
            this.formulario.timbrado = '';
            this.formulario.numero_factura = '';
            this.formulario.documento = '';
            this.formulario.caja = '';
            this.formulario.proveedor = '';
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
                ComprasLoteAPI.update(this.elementoACambiarEstado.id, { estado_compra_lote: true }
                ).then(() => {
                    // Actualiza la tabla después de que la actualización se haya completado
                    this.items = [];
                    this.ObtenerComprasLote();

                })


                // Cierra el diálogo de confirmación
                this.dialogoCambiarEstado = false;
                this.elementoACambiarEstado = null;




            }

        },

        ObtenerComprasLote() {
            ComprasLoteAPI.getAll().then(({ data }) => {
                this.items = data.map(item => {
                    return {
                        id: item.idcompras_lote,
                        fechaD: item.fecha_doc,
                        timbrado: item.timbrado,
                        numero_factura: item.numero_factura,
                        documento: item.idTipo_Documento,
                        proveedor: item.idProveedor,
                        numero_orden: item.idorde_compra_lote,
                        caja: item.idCaja,
                        detalleItems: item.detalle

                    }
                })
            })
        },
        recalcularTotal() {
            // Verifica que haya valores en cantidad y precio
            if (this.formulario.cantidad && this.formulario.costo) {
                // Calcula el total dinámicamente
                this.formulario.total = this.formulario.cantidad * this.formulario.costo;

            }

        },


        editarDetalle(parametro) {
            this.dialogoFormularioEditarDetalle = true
            this.formulario.producto = parametro.idProducto
            this.formulario.cantidad = parametro.cantidad_lote
            this.formulario.costo = parametro.costo_lote
            this.formulario.idCiudad = parametro.idCiudad
            this.formulario.barrio = parametro.idBarrio



            // Calcula el total al abrir el diálogo
            this.formulario.total = this.formulario.cantidad * this.formulario.costo;
            this.formulario.iva = parametro.idIva
            o



        },
        guardarFormularioEditarDetalle() {
            if (!this.formulario.producto || !this.formulario.cantidad || !this.formulario.costo) {
                this.emptyFieldError = true;
                return;
            }

            // Busca el índice del elemento que se va a editar
            const index = this.formulario.itemsDetalle.findIndex(item => item.idProducto === this.formulario.producto);
            console.log(index)
            console.log(this.formulario.itemsDetalle)
            if (index !== -1) {
                // Si se encontró el elemento, actualiza sus datos
                this.formulario.itemsDetalle[index].Cantidad = this.formulario.cantidad;
                this.formulario.itemsDetalle[index].Costo = this.formulario.costo;
                //Quiero enviar el id de Ci
                this.formulario.itemsDetalle[index].ciudad = this.formulario.ciudad;
                this.formulario.itemsDetalle[index].barrio = this.formulario.barrio;
                this.formulario.itemsDetalle[index].ubicacion = this.formulario.ubicacion;
                this.formulario.itemsDetalle[index].dimension_total = this.formulario.dimensionTotal;
                this.formulario.itemsDetalle[index].Descripcion_lote = this.formulario.nombreLoteado;
                this.formulario.itemsDetalle[index].total = this.formulario.cantidad * this.formulario.costo;
                this.formulario.itemsDetalle[index].iva = this.formulario.iva;

                switch (this.formulario.iva) {
                    case 1:
                        this.formulario.itemsDetalle[index].exenta = 0;
                        this.formulario.itemsDetalle[index].iva5 = 0;
                        this.formulario.itemsDetalle[index].iva10 = 0;
                        break;
                    case 2:
                        this.formulario.itemsDetalle[index].exenta = 0;
                        this.formulario.itemsDetalle[index].iva5 = Math.round(this.formulario.itemsDetalle[index].total / 21);
                        this.formulario.itemsDetalle[index].iva10 = 0;
                        break;
                    case 3:
                        this.formulario.itemsDetalle[index].exenta = 0;
                        this.formulario.itemsDetalle[index].iva5 = 0;
                        this.formulario.itemsDetalle[index].iva10 = Math.round(this.formulario.itemsDetalle[index].total / 11);
                        break;
                    default:
                        // Manejar otro caso si es necesario
                        break;
                }
            } else {
                // Si no se encontró el elemento, agrega uno nuevo
                const nuevoItem = {

                };
                this.formulario.itemsDetalle.push(nuevoItem);
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

        sumarTotalPagos(columna) {
            // Verifica que this.formulario.itemsDetalle tenga un valor y sea un array
            if (this.CuentaPagar.itemsDetallePagos && Array.isArray(this.CuentaPagar.itemsDetallePagos)) {
                // Redondea cada valor de la columna antes de sumarlos
                return Math.round(this.CuentaPagar.itemsDetallePagos.reduce((monto, item) => monto + item[columna], 0));
            } else {
                return 0; // O cualquier valor predeterminado que desees en caso de que no haya itemsDetalle
            }
        },


        abrirformulariogenerarcuentas() {
            // Abrir el modal y cargar el código aquí
            this.dialogoFormularioGenerarCuota = true;
            this.CuentaPagar.proveedor = this.formulario.proveedor
            this.CuentaPagar.monto = this.formulario.total

            // this.formulario = JSON.parse(JSON.stringify(this.defaultFormulario))
            // this.detalle = JSON.parse(JSON.stringify(this.defaultFormulario))
        },

        AgregarDetallePago() {

            this.itemsDetallePagos.push({
                fecha: this.CuentaPagar.fechaD,
                monto: this.CuentaPagar.monto,
                action: '',

            }),
                this.CuentaPagar.fechaD = ''
            this.CuentaPagar.monto = ''
        },

        editarDetallePagos(parametro) {
            this.dialogoFormularioEditarDetallePagos = true
            this.CuentaPagar.fechaD = parametro.fechaD
            this.CuentaPagar.monto = formulario.total

            // Calcula el total al abrir el diálogo
            // this.formulario.total = this.formulario.cantidad * this.formulario.precio;
            // this.formulario.iva = parametro.idIva
        },
        guardarFormularioPagos() {
            if (!this.CuentaPagar.observacion || !this.CuentaPagar.proveedor) {

                this.emptyFieldError = true;
                return;
            }
            this.seRealizoAgregarPagos = true;
            this.dialogoFormularioGenerarCuota = false;

        },

        guardarFormularioEditarDetallePago() {
            if (!this.CuentaPagar.fechaD || !this.CuentaPagar.monto) {
                this.emptyFieldError = true;
                return;
            }

            // Busca el índice del elemento que se va a editar
            const index = this.itemsDetallePagos.findIndex(item => item.monto === this.CuentaPagar.monto);

            if (index !== -1) {
                // Si se encontró el elemento, actualiza sus datos
                this.itemsDetallePagos[index].fechaD = this.CuentaPagar.fechaD;
                this.itemsDetallePagos[index].monto = this.CuentaPagar.monto;
            }
            this.dialogoFormularioEditarDetallePagos = false;



        },

        tipoDocumentoChanged() {
            if (this.formulario.documento === 1) {
                // Habilitar el campo de número de caja si el tipo de documento es "Contado"
                this.$refs.numeroCajaInput.disabled = false;
            } else if (this.formulario.documento === 2) {
                // Habilitar el botón si el tipo de documento es "Crédito"
                this.$refs.generarCuotasButton.disabled = false;
            }
        },
    },


    created() {
        // Generar automáticamente el código al cargar el componente
        this.formulario.codigo = this.generarCodigo();
        this.ObtenerComprasLote()
        this.ObtenerProveedor()
        this.ObtenerTipoD()
        this.ObtenerProducto()
        this.ObtenerOrden_compraLote()
        this.ObtenerIva()
        this.ObtenerCaja()
        this.ObtenerBarrio()
        this.ObtenerCiudades()


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