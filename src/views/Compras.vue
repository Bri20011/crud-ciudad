<template>
    <v-dialog max-width="800" v-model="dialogoFormulario" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Registrar Compras</h1>
                <v-form>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">

                            <v-text-field variant="outlined" label="Nº Orden de Compra" v-model="formulario.numero_orden"
                                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
                        </v-col>
                        <v-col class="mt-4">
                            <v-btn @click="ObtenerCodigoOrden">Calcular</v-btn>
                        </v-col>

                        <v-col cols="12" sm="6" md="6">
                            <v-autocomplete variant="outlined" label="Tipo de Documento" :items="listaDocumento"
                                item-title="descripcionD" item-value="id" v-model="formulario.documento"
                                :error="excededLimit" :error-messages="errorMessage" required></v-autocomplete>
                        </v-col>


                        <v-col cols="12" sm="6" md="6">
                            <input class="custom-input" v-model="formulario.fechaO" type="date"
                                placeholder="Fecha de Operacion" @input="formatDate" />
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <input class="custom-input" v-model="formulario.fechaD" type="date" placeholder="Fecha de Documento" @input="formatDate" />

                        </v-col>

                        <v-col cols="12" sm="6" md="6">
                            <v-text-field variant="outlined" label="Timbrado" v-model="formulario.timbrado"
                                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field variant="outlined" label="Numero de Factura" v-model="formulario.numero_factura"
                                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                        <v-autocomplete variant="outlined" :items="listaProveedor" label="Proveedor"
                            item-title="descripcionP" item-value="id" v-model="formulario.proveedor" :error="excededLimit"
                            :error-messages="errorMessage" required></v-autocomplete>
                        </v-col>



                            <v-data-table :headers="headersCompra" :items="formulario.itemsDetalle">

                            <template v-slot:item.action="{ item }">

                                
                                <v-icon size="small" class="me-2" @click="editarCiudad(item.raw)">
                                    mdi-pencil
                                </v-icon>
                                <v-icon color="#C62828" size="small" @click="confirmarEliminarCiudad(item.raw)">
                                    mdi-trash-can-outline
                                </v-icon>
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
    </v-dialog>

    <!-- FIN DETALLE -->



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
                    <v-icon size="small" class="me-2" @click="editarCiudad(item.raw)">
                        mdi-pencil
                    </v-icon>
                    <v-icon color="#C62828" size="small" @click="confirmarEliminarCiudad(item.raw)">
                        mdi-trash-can-outline
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>

        <v-row>
            <v-col cols="12" md="12" class="d-flex justify-end align-center mt-5">
                <v-btn>Cancelar </v-btn>
            </v-col>
        </v-row>
        <!-- Diálogo de confirmación -->
        <v-dialog v-model="dialogoEliminar" max-width="400">
            <v-card>
                <v-container>
                    <v-card-title class="headline">Confirmar Eliminación</v-card-title>
                    <v-card-text>
                        ¿Está seguro de que desea eliminar este elemento?
                    </v-card-text>


                    <v-row>
                        <v-col cols="12" class="d-flex justify-end">
                            <v-btn color="#E0E0E0" class="mx-2" text @click="eliminarCiudad">Eliminar</v-btn>
                            <v-btn color="primary" text @click="cancelarEliminarCiudad">Cancelar</v-btn>
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
import { ComprasAPI } from '@/services/compras.api'
import { ProveedorAPI } from '@/services/proveedor.api'
import { TipoDocumentoAPI } from '@/services/tipo_documento.api'
import { ProductoAPI } from '@/services/producto.api'
import { OrdenCompraApi } from '@/services/orden_compra.api'  //Import a orden de compra


import dayjs from 'dayjs'



export default {
    components: {
        VDataTable
    },
    data() {
        return {
            dialogoFormulario: false,
            dialogoFormularioEditar: false,
            ordenCompraSeleccionada: null,



            formulario: {
                proveedor: '',
                documento: '',
                fechaO: null,
                fechaD: null,
                timbrado: '',
                numero_factura: '',


            },

            contador: 1,
            limit: 45,
            defaultFormulario: {
                codigo: '',
                descripcion: '',
                fecha: '',
                producto: null,
                cantidad: '',
                precio: '',
                nomnbreProducto: ''

            },
            buscador: '',
            headers: [
                { title: 'Codigo', align: 'start', sortable: false, key: 'id', },
                { title: 'Proveedor', key: 'proveedor' },
                { title: 'Fecha de Factura', key: 'fecha', align: 'star' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' },
            ],
            headersCompra: [

                { title: 'Producto', key: 'idProducto' },
                { title: 'Producto', key: 'nomnbreProducto' },
                { title: 'Cantidad', key: 'Cantidad', align: 'star' },
                { title: 'Precio', key: 'Precio', align: 'star' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' },
            ],
            items: [
                {
                    id: '',
                    descripcion: '',
                    fecha: '',
                    action: ''
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
                        descripcionPr: item.Descripcion
                    }
                })
            })
        },

        // INICIO NUEVO 
        Obtenerorden_compra() {
            OrdenCompraApi.getAll().then(({ data }) => {

                this.items = data.map(item => {
                    return {
                        id: item.idorden_compra,
                        descripcionPr: item.Descripcion,
                        fechaD: item.Fecha_pedi,
                        proveedor: item.idProveedor,
                        itemsDetalle: item.Detalle
                    }
                })
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
        },
        generarCodigo() {
            const nuevoCodigo = this.contador++;
            return nuevoCodigo;
        },

        guardarFormulario() {
            // if (!this.formulario.descripcion) {

            //     this.emptyFieldError = true;
            //     return;
            // }


            ComprasAPI.create(
                {
                    idCompras: this.formulario.codigo,
                    Fecha_doc: this.formulario.fechaD,
                    Fecha_operacion: this.formulario.fechaO,
                    Timbrado: this.formulario.timbrado,
                    idTipo_Documento: this.formulario.documento,
                    idProveedor: this.formulario.proveedor,
                    Numero_fact: this.formulario.numero_factura,
                    idorden_compra: this.formulario.numero_orden, //nuevo 
                    Detalle: this.itemsDetalle


                },
            ).then(() => {
                this.ObtenerCompras()
            })

            this.formulario.codigo = '';
            this.formulario.fechaD = '';
            this.formulario.fechaO = '';
            this.formulario.timbrado = '';
            this.formulario.documento = '';
            this.formulario.proveedor = '';
            this.formulario.numero_factura = '';
            this.dialogoFormulario = false;
        },





        guardarFormularioEditar() {
            if (!this.formulario.descripcion) {

                this.emptyFieldError = true;
                return;
            }
            ComprasAPI.update(
                this.formulario.codigo,
                {
                    idPedido: this.formulario.codigo,
                    Descripcion: this.formulario.descripcion,
                    Fecha_pedi: this.formulario.fecha
                }
            ).then(() => {
                this.ObtenerCompras()
            })

            this.dialogoFormularioEditar = false
        },
        editarCiudad(parametro) {
            this.dialogoFormularioEditar = true
            this.formulario.codigo = parametro.id
            this.formulario.descripcion = parametro.descripcion
            this.formulario.fecha = parametro.fecha
        },
        confirmarEliminarCiudad(elemento) {
            // Abre el diálogo de confirmación y guarda el elemento a eliminar
            this.elementoAEliminar = elemento;
            this.dialogoEliminar = true;
        },
        cancelarEliminarCiudad() {
            // Cierra el diálogo de confirmación y restablece la variable
            this.dialogoEliminar = false;
            this.elementoAEliminar = null;
        },
        eliminarCiudad() {
            if (this.elementoAEliminar) {
                // Realiza la eliminación aquí
                ComprasAPI.delete(this.elementoAEliminar.id).then(() => {
                    this.ObtenerCompras();
                });
                // Cierra el diálogo de confirmación
                this.dialogoEliminar = false;
                this.elementoAEliminar = null;
            }
        },

        ObtenerCompras() {
            ComprasAPI.getAll().then(({ data }) => {
                this.items = data.map(item => {
                    return {
                        id: item.idCompras,
                        proveedor: item.idProveedor,
                        fechaD: item.Fecha_doc,
                    }
                })
            })
        },




    },




    created() {
        // Generar automáticamente el código al cargar el componente
        this.formulario.codigo = this.generarCodigo();
        this.ObtenerCompras()
        this.ObtenerProveedor()
        this.ObtenerTipoD()
        this.ObtenerProducto()
        this.Obtenerorden_compra()

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