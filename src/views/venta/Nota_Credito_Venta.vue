<template>
    <v-dialog max-width="1200" v-model="dialogoFormulario" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Registrar Nota de Credito </h1>
                <v-form>
                    <v-row>

                        <v-col cols="12" sm="3" md="3">
                            <v-autocomplete variant="outlined" :items="listaVentas" label="Nº de factura Asociado"
                                item-title="numeroFac" item-value="numeroFac" v-model="formulario.numero_orden"
                                required></v-autocomplete>
                        </v-col> 

                        <v-col cols="12" class="mt-4" sm="2" md="2">
                            <v-btn @click="ObtenerCodigoVentas">Calcular</v-btn>
                        </v-col>
                        <v-col cols="12" sm="2" md="2">
                            <v-autocomplete variant="outlined" label="Timbrado" :items="listaTimbrado"
                                item-title="descripcionT" item-value="id" v-model="formulario.timbrado" 
                                required></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Numero de Nota de Credito"
                                v-model="formulario.numero_nc" :error="excededLimit" :error-messages="errorMessage"
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-text-field type="date" variant="outlined" label="Fecha de Contrato" v-model="formulario.fechaContrato"
                            required></v-text-field>
                        </v-col>
                      

                        <v-col cols="12" sm="3" md="3">
                            <v-autocomplete variant="outlined" label="Cliente" :items="listaCliente"
                                item-title="razonsocial" item-value="id" v-model="formulario.cliente"
                                required></v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="3" md="3">

                            <v-autocomplete variant="outlined" label="Tipo de Documento" :items="listaDocumento"
                                 item-title="tipo_venta" item-value="id" v-model="formulario.tipo_venta"
                                @change="tipoDocumentoChanged" required></v-autocomplete>
                        </v-col>

                        <v-col  v-if="formulario.tipo_venta === 1" cols="12" sm="2" md="2">
                            <v-autocomplete variant="outlined"  item-value="id" label="Caja" :items="listaCaja"
                           v-model="formulario.numerCaja" item-title="descripcionCa" required></v-autocomplete>
                        </v-col>

                        <v-col v-if="formulario.tipo_venta === 2" cols="12" sm="2" md="2">
                            <v-text-field type="date" variant="outlined" label="Fecha de Vto" v-model="formulario.fechaVto"
                            required></v-text-field>

                        </v-col>
                        

                        <v-data-table items-per-page-text="Articulos" :headers="headersCompra"
                            :items="formulario.itemsDetalle">
                            <template v-slot:tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td align="center"><v-divider class="mb-2"></v-divider> {{ sumarIva('iva5') }}</td>
                                    <td align="center"> <v-divider class="mb-2"></v-divider>{{ sumarIva('iva10') }}</td>
                                    <td align="center"><v-divider class="mb-2"></v-divider>{{ sumarTotal('Total') }}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </template>
                            <template v-slot:item.action="{ item }">
                                <!-- <v-icon size="small" class="me-2" @click="editarDetalle(item.raw)">
                                    mdi-pencil
                                </v-icon> -->
                                <!-- <v-icon color="#C62828" size="small" @click="confirmarEliminarCiudad(item.raw)">
                                    mdi-trash-can-outline
                                </v-icon> -->
                            </template>
                        </v-data-table>

                    </v-row>

                    <v-row>
                        <v-col cols="12" class="d-flex justify-end">
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
                Cantidad de NC: {{ items.length }}
            </v-col>

        </v-row>

        <v-card class="mt-5 rounded-xl">
            <v-data-table items-per-page-text="Item por pagina" :headers="headers" :items="itemsComputed">
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>
                            <p class="font-weight-bold">Registro de Notas de Credito </p>
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
    </v-container>
</template>
  
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { NCVentaApi } from '@/services/nota_credito_venta.api'
import { ClienteAPI } from '@/services/cliente.api'
import { ProductoAPI } from '@/services/producto.api'
import { IvaAPI } from '@/services/iva.api'
import { CajaAPI } from '@/services/caja.api'
import { VentaAPI } from '@/services/venta.api'
import { TipoVentaAPI } from '@/services/tipoventa.api'
import { TimbradoAPI } from '@/services/timbrado.api'





import dayjs from 'dayjs'



export default {
    components: {
        VDataTable
    },
    data() {
        return {
            idVentaG: '',
            dialogoFormulario: false,
            dialogoCambiarEstado: false,



            dialogoFormularioEditarDetalle: false,
            ordenCompraSeleccionada: null,



            formulario: {
                proveedor: '',
                documento: '',
                fechaVto: null,
                fechaD: null,
                timbrado: '',
                numero_nc: '',
                numerCaja: '',
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
                { title: 'Numero de Nota de Credito', key: 'numero_nc' },
                { title: 'Fecha de Factura', key: 'fecha', align: 'star' },
                { title: 'Timbrado', key: 'timbrado', align: 'star' },
                { title: 'Cliente', key: 'cliente', align: 'star' },
                { title: 'Caja', key: 'idCaja', align: 'star' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' },
            ],
            headersCompra: [
                { title: 'N° Cuota', key: 'idContrato', align: 'center' },
                { title: 'Importe', key: 'monto_total', align: 'center' },
                { title: 'Exenta', key: 'exenta', align: 'center' },
                { title: 'Iva 5%', key: 'iva5', align: 'center' },
                { title: 'Iva 10%', key: 'iva10', align: 'center' },
                { title: 'Total', key: 'Total', align: 'center'},
                { title: '', key: 'action', sortable: false, align: 'end' },
            ],
            items: [
                {
                    id: '',
                    descripcion: '',
                    fecha: '',
                    action: '',
                    timbrado: '',
                    numero_nc: '',
                    proveedor: ''
                }
            ],
            itemsDetalle: [],
            dialogoEliminar: false,
            elementoAEliminar: null,

            listaCliente: [],
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
        if (data.length > 1) {
            const primerElemento = data[1];
            this.listaCaja = [{
                id: primerElemento.idCaja,
                descripcionCa: primerElemento.nombrecaja,
                numerCaja: primerElemento.Cajahabilitada
            }];
        } else {
            // Manejar el caso en el que no se encuentren datos
            console.warn("No se encontraron cajas.");
            this.listaCaja = [];
        }
    }).catch(error => {
        console.error("Error al obtener las cajas: ", error);
        // Manejar el error adecuadamente
    });
},
        ObtenerTipoD() {
            TipoVentaAPI.getAll().then(({ data }) => {
                this.listaDocumento = data.map(item => {
                    return {
                        id: item.idtipo_venta,
                        tipo_venta: item.Descripcion
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
            VentaAPI.getById(this.formulario.numero_orden).then(({ data }) => {
                this.idVentaG = data.idventa
                this.formulario = {
                    ...this.formulario,
                    id: data.idventa,
                    itemsDetalle: data.detalle
                    



                   
     
 




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
            if (!this.formulario.numero_nc) {

                this.emptyFieldError = true;
                return;
            }


            NCVentaApi.create({
                idNota_Credito_Venta: this.formulario.codigo,
                Numero_doc: this.formulario.numero_nc,  
                Fecha_doc: this.formulario.fechaContrato,
                idCliente: this.formulario.cliente,
                idTimbrado: this.formulario.timbrado,
                idVenta: this.idVentaG,
                idTipo_Documento: this.formulario.tipo_venta,
                idCaja: this.formulario.numerCaja,
                fecha_vto: this.formulario.fechaVto,
                idContrato: this.detalle.numero_cuota,
                Detalle: this.formulario.itemsDetalle.map(item => {
                    return {
                        idNota_Credito_Venta: this.formulario.codigo,
                        idContrato: item.idContrato,
                        Precio: item.monto_total,
                        Cantidad: 1
                    }
                }),


               
             
               


            },
            ).then(() => {
                this.ObtenerNota_Credito_V()
            })

            this.formulario.codigo = '';
            this.formulario.fechaD = '';
            this.formulario.timbrado = '';
            this.formulario.numero_nc = '';
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
                NCVentaApi.update(this.elementoACambiarEstado.id, { estado_nc: true }
                ).then(() => {
                    // Actualiza la tabla después de que la actualización se haya completado
                    this.items = [];
                    this.ObtenerNota_Credito_V();

                })


                // Cierra el diálogo de confirmación
                this.dialogoCambiarEstado = false;
                this.elementoACambiarEstado = null;




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
            this.detalle.monto_total = parametro.monto_total
        


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


        sumarIva(columna) {
            // Verifica que this.formulario.itemsDetalle tenga un valor
            if (this.formulario.itemsDetalle) {
                // Redondea cada valor de IVA antes de sumarlos
                return Math.round(this.formulario.itemsDetalle.reduce((total, item) => total + item[columna], 0));
            } else {
                return 0; // O cualquier valor predeterminado  en caso de que no haya itemsDetalle
            }
        },

        sumarTotal(columna) {
            // Verifica que this.formulario.itemsDetalle tenga un valor y sea un array
            if (this.formulario.itemsDetalle && Array.isArray(this.formulario.itemsDetalle)) {
                // Redondea cada valor de la columna antes de sumarlos
                return Math.round(this.formulario.itemsDetalle.reduce((total, item) => total + item[columna], 0));
            } else {
                return 0; // O cualquier valor predeterminado en caso de que no haya itemsDetalle
            }
        },

        tipoDocumentoChanged() {
        if (this.formulario.tipo_venta === 1) {
            // Si se seleccionó Contado, muestra el campo de número de caja y oculta el campo de fecha
            this.formulario.fechaVto = null; // Reiniciar el valor de fechaO
        } else if (this.formulario.tipo_venta === 2) {
            // Si se seleccionó Crédito, muestra el campo de fecha y oculta el campo de número de caja
            this.formulario.numerCaja = null; // Reiniciar el valor de numer_caja
        }
    },
     

    ObtenerVentas() {
            VentaAPI.getAll().then(({ data }) => {
                this.listaVentas = data.map(item => {
                    return {
                        id: item.idventa,
                        descripcion: item.numero_contrato,
                        fecha: item.fecha,
                        numeroFac: item.Numero_fact,
                        idtipo_venta: item.idtipo_venta,
                        documento: item.descripcionVenta,
                        idCliente: item.idCliente,
                        cliente: item.Razon_social_Cliente,
                        detalleItems: item.detalle

                    }
                })
            })
        },

        ObtenerNota_Credito_V() {
            NCVentaApi.getAll().then(({ data }) => {
                this.items = data.map(item => {
                    return {
                        id: item.idNota_Credito_Venta,
                        numero_nc: item.Numero_doc,
                        fecha: item.Fecha_doc,
                        idCliente: item.idCliente,
                        cliente: item.nombreCliente,
                        idTimbrado: item.idTimbrado,
                        timbrado: item.numeroTimbrado,
                        idVenta: item.idVenta,
                        idTipo_Documento: item.idTipo_Documento,
                        nombreTipoVenta: item.nombreTipoVenta,
                        idCaja: item.idCaja,
            
                    }
                })
            })
        },
    },


    async created() {
        // Generar automáticamente el código al cargar el componente
        this.formulario.codigo = this.generarCodigo();
        this.ObtenerCliente()
        this.ObtenerTimbrado()
        this.ObtenerIva()
        await this.ObtenerNota_Credito_V()
        this.ObtenerCaja()
        this.ObtenerTipoD()
        this.ObtenerVentas()

    },
watch:{
'formulario.tipo_venta': function (){
    this.formulario.numerCaja = 101
},
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