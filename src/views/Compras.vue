<template>
    <v-dialog max-width="1200" v-model="dialogoFormulario" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Registrar Compras</h1>
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



                        <v-data-table items-per-page-text="Articulos" :headers="headersCompra"
                            :items="formulario.itemsDetalle">


                            <template v-slot:tfoot>

                                <tr>
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
                            <v-btn color="primary" @click="guardarFormulario">GuardarPricn</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>
    <!-- 
    <v-dialog max-width="700" v-model="dialogoFormularioEditar" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Editar Compras</h1>
                <v-form>
                    <v-row>
                        <v-col cols="12" sm="2" md="2">
                            <v-text-field variant="outlined" label="Codigo" disabled
                                v-model="formulario.codigo"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="5" md="5">
                            <v-text-field variant="outlined" label="Descripcion de Compras" v-model="formulario.descripcion"
                                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
                        </v-col>


                        <v-col ols="12" sm="5" md="5">
                            <v-text-field variant="outlined" label="Fecha de Compras"
                                v-model="formulario.fecha"></v-text-field>
                        </v-col>


                    </v-row>
                    <v-row>
                        <v-col cols="12" class="d-flex justify-end">
                            <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormularioEditar = false">Cancelar</v-btn>
                            <v-btn color="primary" @click="guardarFormularioEditar"
                                :disabled="excededLimit || !formulario.descripcion">Guardar</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog> -->

    <!-- FIN DETALLE -->

    <!-- INICIO EDITAR DETALLE -->
    <v-dialog max-width="1200" v-model="dialogoFormularioEditarDetalle" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Ingresar Precio</h1>
                <v-form>
                    <v-row class="justify-center">


                        <v-col cols="12" sm="5" md="5">
                            <v-autocomplete variant="outlined" label="Descripcion" :items="listaProducto"
                                item-title="descripcionPr" item-value="id" v-model="formulario.producto"
                                :error="excededLimit" :error-messages="errorMessage" required></v-autocomplete>
                        </v-col>

                        <v-col ols="12" sm="2" md="2">
                            <v-text-field variant="outlined" label="Cantidad" @input="recalcularTotal"
                                v-model="formulario.cantidad"></v-text-field>
                        </v-col>
                        <v-col ols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Precio Unitario" @input="recalcularTotal"
                                v-model="formulario.precio"></v-text-field>
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
                        <!-- <v-col cols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Exenta" v-model="formulario.exenta"
                                readonly></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Iva 5%" v-model="formulario.iva5"
                                readonly></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Iva 10%" v-model="formulario.iva10"
                                readonly></v-text-field>
                        </v-col> -->

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
                            <p class="font-weight-bold">Registro de Compras</p>
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

        <v-row>
            <v-col cols="12" md="12" class="d-flex justify-end align-center mt-5">
                <v-btn>Cancelar </v-btn>
            </v-col>
        </v-row>
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
                                    item-title="descripcionP" item-value="id" v-model="CuentaPagar.proveedor" 
                                   disabled required></v-autocomplete>
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
import { ComprasAPI } from '@/services/compras.api'
import { ProveedorAPI } from '@/services/proveedor.api'
import { TipoDocumentoAPI } from '@/services/tipo_documento.api'
import { ProductoAPI } from '@/services/producto.api'
import { IvaAPI } from '@/services/iva.api'
import { OrdenCompraApi } from '@/services/orden_compra.api'
import { CajaAPI } from '@/services/caja.api'
import { CuentaPagarApi } from '@/services/cuenta_pagar_compra.api'



import dayjs from 'dayjs'



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
                proveedor: '',
                documento: '',
                caja: '',
                fechaO: null,
                fechaD: null,
                timbrado: '',
                numero_factura: '',
                monto: '',
                total: ''
            },
            detalle: {
                fechaD: null,
                monto: '',
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
            CuentaPagar:{
                observacion: '',
                proveedor: '',
                fechaD: null,
                monto: ''
            },
            buscador: '',
            headers: [
                { title: 'Codigo', align: 'start', sortable: false, key: 'id', },
                { title: 'Numero de Factura', key: 'numero_factura' },
                { title: 'Tipo Documento', key: 'documento' },
                { title: 'Fecha de Factura', key: 'fecha', align: 'star' },
                { title: 'Timbrado', key: 'timbrado', align: 'star' },
                { title: 'Proveedor', key: 'proveedor', align: 'star' },
                { title: 'Caja', key: 'caja', align: 'star' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' },
            ],
            headersCompra: [
                { title: 'Producto', key: 'idProducto', align: 'center' },
                { title: 'Descripcion', key: 'nomnbreProducto', align: 'center' },
                { title: 'Cantidad', key: 'Cantidad', align: 'center' },
                { title: 'Precio Unitario', key: 'Precio', align: 'center' },
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
                    proveedor: '',
                    caja: ''
                }
            ],
            itemsDetalle: [],
            itemsDetallePagos: [],
           
            dialogoEliminar: false,
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
                        descripcionCa: item.nombrecaja,
                        numero_caja: item.Cajahabilitada,
                        idSucursal: item.idSucursal,
                        nombreSucursal: item.nombreSucursal
                    }
                })
            })
        },
        // INICIO NUEVO 
        Obtenerorden_compra() {
            OrdenCompraApi.getAll().then(({ data }) => {

                // this.items = data.map(item => {
                //     return {
                //         id: item.idorden_compra,
                //         descripcionPr: item.Descripcion,
                //         fechaD: item.Fecha_pedi,
                //       
                //         itemsDetalle: item.Detalle
                //     }
                // }
                // )
            })
        },

        ObtenerCodigoOrden() {
            // Verifica que se haya ingresado un número de orden
            if (!this.formulario.numero_orden) {
                // Puedes mostrar un mensaje de error o realizar la lógica que prefieras
                return;
            }

            // Realiza una solicitud a tu API para obtener el detalle de la orden de compra
            OrdenCompraApi.getById(this.formulario.numero_orden).then(({ data }) => {
                this.formulario = {
                    ...this.formulario,
                    proveedor: data.idProveedor,
                    fechaD: data.Fecha_pedi,
                    itemsDetalle: data.detalle,

                };

            });

            this.dialogoFormulario = true;
        },







        // FIN NUEVO 

        // AgregarDetalle() {
        //     this.itemsDetalle.push({
        //         producto: this.detalle.producto,
        //         cantidad: this.detalle.cantidad,
        //         precio: this.detalle.precio,
        //         action: '',

        //     }),
        //         this.detalle.producto = ''
        //     this.detalle.cantidad = ''
        //     this.detalle.precio = ''
        // },


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
            if (this.formulario.documento === 1 && !this.formulario.caja) {
                // Si se seleccionó contado y el campo de número de caja está vacío, muestra un mensaje de error o toma la acción apropiada
                // Por ejemplo, mostrar un mensaje de error
                this.$toast.error('Por favor completa el campo de número de caja.');
                return; // Detener el proceso de guardado
            }

            // Aquí puedes agregar la lógica para guardar los datos, por ejemplo:
            // Comprobación adicional si es necesario antes de guardar

            // Luego, cierra el diálogo o realiza otras acciones necesarias después de guardar
            this.dialogoFormulario = false;




            ComprasAPI.create({

                idCompras: this.formulario.codigo,
                Fecha_doc: this.formulario.fechaD,
                Timbrado: this.formulario.timbrado,
                Numero_fact: this.formulario.numero_factura,
                idTipo_Documento: this.formulario.documento,
                idProveedor: this.formulario.proveedor,
                idCaja: this.formulario.caja,
                idorden_compra: this.formulario.numero_orden, //nuevo 
                Detalle: this.formulario.itemsDetalle,
                CuentaPagar: {
                    cabecera: this.CuentaPagar,
                    detalle: this.itemsDetallePagos
                }



            },
            ).then(() => {
                this.ObtenerCompras()
            })

            this.formulario.codigo = '';
            this.formulario.fechaD = '';
            this.formulario.timbrado = '';
            this.formulario.numero_factura = '';
            this.formulario.documento = '';
            this.formulario.proveedor = '';
            this.dialogoFormulario = false;
        },





        // guardarFormularioEditar() {
        //     if (!this.formulario.descripcion) {

        //         this.emptyFieldError = true;
        //         return;
        //     }
        //     ComprasAPI.update(
        //         this.formulario.codigo,
        //         {
        //             idCompras: this.formulario.codigo,
        //             Descripcion: this.formulario.descripcion,
        //             Fecha_pedi: this.formulario.fecha,
        //             Timbrado:this.formulario.timbrado,
        //             idProveedor:this.formulario.proveedor
        //         }
        //     ).then(() => {
        //         this.ObtenerCompras()
        //     })

        //     this.dialogoFormularioEditar = false
        // },
        // editarCiudad(parametro) {
        //     this.dialogoFormularioEditar = true
        //     this.formulario.codigo = parametro.id
        //     this.formulario.descripcion = parametro.descripcion
        //     this.formulario.fecha = parametro.fecha
        // },
        // confirmarEliminarCiudad(elemento) {
        //     // Abre el diálogo de confirmación y guarda el elemento a eliminar
        //     this.elementoAEliminar = elemento;
        //     this.dialogoEliminar = true;
        // },
        // cancelarEliminarCiudad() {
        //     // Cierra el diálogo de confirmación y restablece la variable
        //     this.dialogoEliminar = false;
        //     this.elementoAEliminar = null;
        // },
        // eliminarCiudad() {
        //     if (this.elementoAEliminar) {
        //         // Realiza la eliminación aquí
        //         ComprasAPI.delete(this.elementoAEliminar.id).then(() => {
        //             this.ObtenerCompras();
        //         });
        //         // Cierra el diálogo de confirmación
        //         this.dialogoEliminar = false;
        //         this.elementoAEliminar = null;
        //     }
        // },


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
                ComprasAPI.update(this.elementoACambiarEstado.id, { estado_compras: true }
                ).then(() => {
                    // Actualiza la tabla después de que la actualización se haya completado
                    this.items = [];
                    this.ObtenerCompras();

                })


                // Cierra el diálogo de confirmación
                this.dialogoCambiarEstado = false;
                this.elementoACambiarEstado = null;




            }

        },

        ObtenerCompras() {
            ComprasAPI.getAll().then(({ data }) => {
                this.items = data.map(item => {
                    return {
                        id: item.idCompras,
                        proveedor: item.idProveedor,
                        numero_factura: item.Numero_fact,
                        documento: item.idTipo_Documento,
                        caja: item.idCaja,
                        timbrado: item.Timbrado,
                        fechaD: item.Fecha_doc,
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
        // actualizarCamposIVA() {
        //     // Lógica adicional para calcular Exenta, Iva 5% e Iva 10%
        //     const ivaSeleccionado = this.listaIva.find(iva => iva.id === this.formulario.iva);
        // if (ivaSeleccionado) {
        //     switch (ivaSeleccionado.descripcionI) {
        //         case 1:
        //             this.formulario.exenta = 0;
        //             this.formulario.iva5 = 0;
        //             this.formulario.iva10 = 0;
        //             break;
        //         case 2:
        //             this.formulario.exenta = 0;
        //             this.formulario.iva5 = this.formulario.total / 21; // Ajustar según necesidades
        //             this.formulario.iva10 = 0;
        //             break;
        //         case 3:
        //             this.formulario.exenta = 0;
        //             this.formulario.iva5 = 0;
        //             this.formulario.iva10 = this.formulario.total / 11; // Ajustar según necesidades
        //             break;
        //         default:
        //             // Manejar otro caso si es necesario
        //             break;

        //     }
        // }
        // },

        editarDetalle(parametro) {
            this.dialogoFormularioEditarDetalle = true
            this.formulario.producto = parametro.idProducto
            this.formulario.cantidad = parametro.Cantidad
            this.formulario.precio = parametro.Precio
            // Calcula el total al abrir el diálogo
            this.formulario.total = this.formulario.cantidad * this.formulario.precio;
            this.formulario.iva = parametro.idIva



        },
        guardarFormularioEditarDetalle() {
            if (!this.formulario.producto || !this.formulario.cantidad || !this.formulario.precio) {
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
                this.formulario.itemsDetalle[index].Precio = this.formulario.precio;

                this.formulario.itemsDetalle[index].total = this.formulario.cantidad * this.formulario.precio;
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
                    producto: this.formulario.producto,
                    cantidad: this.formulario.cantidad,
                    precio: this.formulario.precio,
                    total: this.formulario.cantidad * this.formulario.precio, // Calcula el total
                    iva: this.formulario.iva,
                    exenta: 0,
                    iva5: 0,
                    iva10: 0,
                    action: '',
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
      

        abrirformulariogenerarcuentas() {

            // Abrir el modal y cargar el código aquí
            this.dialogoFormularioGenerarCuota = true;
            this.CuentaPagar.proveedor = this.formulario.proveedor
            this.CuentaPagar.fechaD = this.fecha
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
            this.CuentaPagar.monto = parametro.monto

            // Calcula el total al abrir el diálogo
            // this.formulario.total = this.formulario.cantidad * this.formulario.precio;
            // this.formulario.iva = parametro.idIva
        },
        guardarFormularioPagos() {
            if ( !this.CuentaPagar.observacion || !this.CuentaPagar.proveedor) {

                this.emptyFieldError = true;
                return;
            }
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
        // ObtenerCuentaPagar() {
        //     CuentaPagarApi.getAll().then(({ data }) => {
        //         this.items = data.map(item => {
        //             return {
        //                 id: item.idcuenta_pagar,
        //                 proveedor: item.proveedor,
        //                 observacion: item.observacion,  
        //                 detalleItems: item.detalle

        //             }
        //         })
        //     })
        // },
    
        
    },


    created() {
        // Generar automáticamente el código al cargar el componente
        this.formulario.codigo = this.generarCodigo();
        this.ObtenerCompras()
        this.ObtenerProveedor()
        this.ObtenerTipoD()
        this.ObtenerProducto()
        this.Obtenerorden_compra()
        this.ObtenerIva()
        this.ObtenerCaja()
        // this.ObtenerCuentaPagar()


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