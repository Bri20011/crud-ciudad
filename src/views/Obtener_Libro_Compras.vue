<template>
  
        <v-card class="rounded-xl ">
            <v-container>
               
                <h1 class="mb-3">Obtener Libro de Compras</h1>
                <v-form>
                    <v-row>
                       
                        <v-col cols="12" sm="2" md="2">
                        <v-autocomplete variant="outlined" label="Nº Factura" :items="listaDocumento"
                                item-title="descripcionD" item-value="id" v-model="formulario.documento"
                                :error="excededLimit" :error-messages="errorMessage" required></v-autocomplete>
                        </v-col>
                        
                        <v-col cols="12" sm="1" md="1" class="mx-0"><H5>Fecha Desde:</H5></v-col>

                        <v-col cols="12" sm="2" md="2" >
                           
                            <input  class="custom-input" v-model="formulario.fechaO" type="date"
                              placeholder="Fecha de Desde" @input="formatDate" />
                        </v-col>

                        
                        <v-col cols="12" sm="1" md="1"><H5>Fecha Hasta:</H5></v-col>
                        <v-col cols="12" sm="2" md="2">
                            <input class="custom-input" v-model="formulario.fechaO" type="date"
                              placeholder="Fecha de Hasta" @input="formatDate" />
                        </v-col>

                        <v-col cols="12"  class="d-flex justify-end">
                            <v-btn color="primary" @click="ObtenerCodigoCompra">Obtener</v-btn>
                        </v-col>

                        <v-data-table  items-per-page-text="Articulos" :headers="headersCompra"
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
                            <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormulario = false">Cancelar</v-btn>
                            <v-btn color="primary" @click="guardarFormulario">Imprimir</v-btn>

                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
  
   
   

    
</template>
  
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { NCCompraApi } from '@/services/nota_credito_compra.api'
import { ProveedorAPI } from '@/services/proveedor.api'
import { ProductoAPI } from '@/services/producto.api'
import { IvaAPI } from '@/services/iva.api'
import { ComprasAPI } from '@/services/compras.api'


import dayjs from 'dayjs'



export default {
    components: {
        VDataTable
    },
    data() {
        return {
            VARIABLE_PARA_GUARDAR_ID_COMPRA: '',
            dialogoFormulario: false,
            dialogoCambiarEstado: false,

        
            
            dialogoFormularioEditarDetalle: false,
            ordenCompraSeleccionada: null,



            formulario: {
                proveedor: '',
                documento: '',
                fechaO: null,
                fechaD: null,
                timbrado: '',
                numero_nc: '',


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
                { title: 'Proveedor', key: 'proveedor', align: 'star' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' },
            ],
            headersCompra: [
                { title: 'Codigo', align: 'start', sortable: false, key: 'id', },
                { title: 'Numero de Factura', key: 'numero_factura' },
                { title: 'Tipo Documento', key: 'documento' },
                { title: 'Fecha de Factura', key: 'fecha', align: 'star' },
                { title: 'Timbrado', key: 'timbrado', align: 'star' },
                { title: 'Proveedor', key: 'proveedor', align: 'star' },
                { title: 'Caja', key: 'caja', align: 'star' },

                { title: 'Producto', key: 'idProducto', align: 'center' },
                { title: 'Descripcion', key: 'nomnbreProducto', align: 'center' },
                { title: 'Cantidad', key: 'Cantidad', align: 'center' },
                { title: 'Costo', key: 'Precio', align: 'center' },
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
                    numero_nc: '',
                    proveedor: ''
                }
            ],
            itemsDetalle: [],
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


     

        ObtenerCodigoCompra() {
            // Verifica que se haya ingresado un número de orden
            if (!this.formulario.numero_orden) {
                // Puedes mostrar un mensaje de error o realizar la lógica que prefieras
                return;
            }

            // Realiza una solicitud a tu API para obtener el detalle de la orden de compra
            ComprasAPI.getById(this.formulario.numero_orden).then(({ data }) => {
                this.VARIABLE_PARA_GUARDAR_ID_COMPRA = data.idCompras
                this.formulario = {
                    ...this.formulario,
                    proveedor: data.idProveedor,
                    fechaD: data.Fecha_doc,
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
            if (!this.formulario.numero_nc) {

                this.emptyFieldError = true;
                return;
            }


            NCCompraApi.create({

                idNota_CreditoCompra: this.formulario.codigo,
                Fecha_doc: this.formulario.fechaD,
                Timbrado: this.formulario.timbrado,
                Numero_doc: this.formulario.numero_nc,
                idProveedor: this.formulario.proveedor,
                idCompras: this.VARIABLE_PARA_GUARDAR_ID_COMPRA,
                Detalle: this.formulario.itemsDetalle


            },
            ).then(() => {
                this.ObtenerNota_Credito_C()
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
                NCCompraApi.update(this.elementoACambiarEstado.id, { estado_nc: true }
                ).then(()=> {
                        // Actualiza la tabla después de que la actualización se haya completado
                        this.items = [];
                        this.ObtenerNota_Credito_C();
                        
                    })
                   
                   
                        // Cierra el diálogo de confirmación
                        this.dialogoCambiarEstado = false;
                        this.elementoACambiarEstado = null;
                      
                    


            }

        },

        ObtenerNota_Credito_C() {
            NCCompraApi.getAll().then(({ data }) => {
                this.items = data.map(item => {
                    return {
                        id: item.idNota_CreditoCompra,
                        proveedor: item.idProveedor,
                        numero_nc: item.Numero_doc,
                        idProveedor: item.idProveedor,
                        razonsocial:item.razonsocial,
                        timbrado: item.Timbrado,
                        fechaD: item.Fecha_doc,
                        itemsDetalle: data.detalle,

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
    },


    created() {
        // Generar automáticamente el código al cargar el componente
        this.formulario.codigo = this.generarCodigo();
        this.ObtenerProveedor()
       // this.ObtenerProducto()
        this.ObtenerIva()
        this.ObtenerNota_Credito_C()

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