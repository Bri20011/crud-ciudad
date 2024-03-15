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
                            <v-text-field variant="outlined" label="numeros" 
                                item-title="numeros" item-value="id" v-model="numerosVenta"
                                required></v-text-field>
                        </v-col>


                        <v-col cols="12" sm="2" md="2">
                            <v-text-field variant="outlined" label="Fecha V" v-model="fechaO" disabled
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-autocomplete variant="outlined" label="Cliente" :items="listaCliente"
                                item-title="razonsocial" item-value="id" v-model="formulario.cliente"
                                required></v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="3" md="3">
                            <v-autocomplete variant="outlined" label="Tipo de Documento" 
                                item-title="descripcionD" item-value="id" v-model="formulario.documento"
                                required></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <v-autocomplete variant="outlined" label="N° Caja" :items="listaCaja" item-title="cajanum"
                                item-value="id" v-model="formulario.caja" required></v-autocomplete>
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
                                    <td align="center"><v-divider class="mb-2"></v-divider>{{ sumarTotal('total') }}
                                    </td>
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
                            <v-btn prepend-icon="mdi mdi-plus-thick" color="#90A4AE" class="mx-2"
                                @click="abrirformulariogenerarcuentas">Generar Cuotas</v-btn>
                            <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormulario = false">Cancelar</v-btn>
                            <v-btn color="primary" @click="guardarFormulario">Guardar</v-btn>

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

                    <v-btn append-icon="mdi-trash-can-outline" color="primary"
                        @click="confirmarCambiarEstado(item.raw)">
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
                            <v-col cols="12" sm="5" md="5">
                                <v-autocomplete variant="outlined" label="N° Contrato" :items="listaProducto"
                                    item-title="descripcionPr" item-value="id" v-model="formulario.producto"
                                    :error="excededLimit" :error-messages="errorMessage" required></v-autocomplete>
                            </v-col>

                            <v-col cols="12" sm="3" md="3">
                                <input class="custom-input" v-model="formulario.fechaD" type="date" disabled
                                    placeholder="Fecha de Operacion" @input="formatDate" />
                            </v-col>

                            <v-col cols="12" sm="4" md="4">
                                <v-text-field variant="outlined" label="Monto" v-model="formulario.monto" disabled
                                    required></v-text-field>
                            </v-col>
                            <v-divider class="mt-0"></v-divider>

                            <!-- FIN DETALLE -->
                            <v-data-table items-per-page-text="Articulos" :headers="headersCuentasPagar"
                                :items="itemsDetalle">

                                <template v-slot:item.fechaD="{ item }">
                                    {{ formatearFecha(item.raw.fechaD) }}
                                </template>
                                <template v-slot:item.action="{ item }">
                                    <v-icon size="small" class="me-2" @click="editarDetallePagos(item.raw)">
                                        mdi-pencil
                                    </v-icon>
                                </template>
                            </v-data-table>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="d-flex justify-end">
                                <v-btn color="#E0E0E0" class="mx-2"
                                    @click="dialogoFormularioGenerarCuota = false">Cancelar</v-btn>
                                <v-btn color="primary" @click="guardarFormulario">Guardar</v-btn>

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
import { TimbradoAPI } from '@/services/timbrado.api'
import { ClienteAPI } from '@/services/cliente.api'
import { TipoDocumentoAPI } from '@/services/tipo_documento.api'
import { CajaAPI } from '@/services/caja.api'
import { VentaAPI } from '@/services/venta.api'
import { ContratoApi } from '@/services/contrato.api'


import { ProductoAPI } from '@/services/producto.api'
import { IvaAPI } from '@/services/iva.api'
import { OrdenCompraApi } from '@/services/orden_compra.api'


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
                cliente: '',
                caja: '',
                timbrado: '',
                numeros: '',
                numero_contrato: '',
                fechaD: '',
                


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
            elementoAEliminar: null,
            ConteoFactura:'',  

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

        ObtenerCodigoContrato() {
            // Verifica que se haya ingresado un número de orden
            if (!this.formulario.numero_contrato) {
                // Puedes mostrar un mensaje de error o realizar la lógica que prefieras
                return;
            }

            // Realiza una solicitud a tu API para obtener el detalle de la orden de compra
            ContratoApi.getById(this.formulario.numero_contrato).then(({ data }) => {
                //aqui tengo un console.log de lo que me retorna la api
                console.log('data:', data)
               
                this.formulario = {
                    
                    
                    formulario: [{documento: data[0].idtipo_venta}],
                
                    itemsDetalle:[{monto_totalNuevo: data[0].monto_totalNuevo, idContrato: data[0].idContrato}  ],
                    
                    
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
            if (!this.formulario.numero_factura) {

                this.emptyFieldError = true;
                return;
            }


            VentaAPI.create({

                idCompras: this.formulario.codigo,
                Fecha_doc: this.formulario.fechaD,
                Timbrado: this.formulario.timbrado,
                Numero_fact: this.formulario.numero_factura,
                idTipo_Documento: this.formulario.documento,
                idProveedor: this.formulario.proveedor,
                idorden_compra: this.formulario.numero_contrato, //nuevo 
                Detalle: this.formulario.itemsDetalle


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
                VentaAPI.update(this.elementoACambiarEstado.id, { estado_compras: true }
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

        ObtenerVentas() {
            VentaAPI.getAll().then(({ data }) => {
                this.items = data.map(item => {
                    return {
                        id: item.idCompras,
                        proveedor: item.idProveedor,
                        numero_factura: item.Numero_fact,
                        // documento: item.idTipo_Documento,
                        proveedor: item.idProveedor,
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
            this.formulario = JSON.parse(JSON.stringify(this.defaultFormulario))
            this.detalle = JSON.parse(JSON.stringify(this.defaultFormulario))
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
            TipoDocumentoAPI.getAll().then(({ data }) => {
                this.listaDocumento = data.map(item => {
                    return {
                        id: item.idTipo_Documento,
                        descripcionD: item.Descripcion
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
      async  ObtenerNumeroFactura(id) {
           
          await VentaAPI.ObtenerNumeroFactura(id).then(({ data }) => {
                console.log('data: ', data[0].Siguiente_numero_factura)
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
                        tipoDoc: item.idtipo_venta,
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