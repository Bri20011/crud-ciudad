<template>
    
    <!-- TABLA VISUALIZAR ORDENES DE COMPRA-->
    <v-container>
        <v-row>
            <v-col cols="12" sm="5" md="5">
                <v-text-field :loading="loading" density="compact" v-model="buscador" variant="solo" label="Buscar"
                    append-inner-icon="mdi-magnify" single-line hide-details click:prependInner></v-text-field>
            </v-col>

            <v-col cols="12" sm="7" md="7" class="d-flex justify-end align-center">
                Cantidad de Ordenes de Compra: {{ items.length }}
            </v-col>

        </v-row>

        <v-card class="mt-5 rounded-x2">
            <v-data-table items-per-page-text="Articulo por pagina" :headers="headersOrdenes" :items="itemsComputed">
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>
                            <p class="font-weight-bold">Ordenes de Compras</p>
                        </v-toolbar-title>
                    </v-toolbar>

                </template>

                <template v-slot:item.fechaD="{ item }">
                    {{ formatearFecha(item.raw.fechaD) }}
                </template>
                <template v-slot:item.action="{ item }">

                    <v-icon color="#424242" size="small" @click="MostrarOrdenesCompra(item.raw)">
                        mdi-file-eye-outline
                    </v-icon>
                    <v-icon color="#C62828" size="small" @click="confirmarEliminarCiudad(item.raw)">
                        mdi-trash-can-outline
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>


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
                            <v-btn color="#E0E0E0" uetext @click="cancelarEliminarCiudad">Cancelar</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>

        </v-dialog>

    </v-container>

    <!-- INICIO VISTA -->
    <v-dialog max-width="700" v-model="dialogoFormularioVistaVista" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Presupuesto</h1>
                <v-form>

                    <v-row class="d-flex justify-center">
                        <v-col cols="12" sm="2" md="2" class="">
                            <v-text-field variant="outlined" label="Codigo" v-model="formulario.codigo" disabled
                                required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="10" md="10" class="">
                            <v-text-field variant="outlined" label="Descripcion" v-model="formulario.descripcion" disabled
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="">
                            <v-text-field variant="outlined" label="Precio" v-model="formulario.precio" disabled
                                required></v-text-field>
                        </v-col>
                        

                        <v-col cols="12" sm="5" md="5" class="">
                            <v-text-field variant="outlined" label="Fecha" @input="formatDate" v-model="formulario.fechaD"
                                disabled required></v-text-field>
                        </v-col>
                        
                        <v-col cols="12" sm="6" md="6">
                            <v-autocomplete variant="outlined" label="Proveedor" :items="listaProveedor" item-title="descripcionP"
                                item-value="id" v-model="formulario.proveedor"></v-autocomplete>
                        </v-col>


                    </v-row>
                    <v-divider></v-divider>

                    <v-card class="mt-5 rounded-x2">
                        <v-data-table items-per-page-text="" :headers="headersPedido" :items="formulario.itemsDetalle">

                        </v-data-table>
                    </v-card>

                    <v-row class="d-flex justify-end mt-2">
                        <v-row class="d-flex justify-end">
                            <v-col cols="6" class="d-flex justify-end mt-2">
                                <v-btn color="#E0E0E0" class="mx-2"
                                    @click="dialogoFormularioVistaVista = false">Cerrar</v-btn>
                                <v-btn color="primary" class="mx-2">Imprimir</v-btn>
                            </v-col>
                        </v-row>

                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>

    <!-- FIN VISTA -->
</template>

<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { ProductoAPI } from '@/services/producto.api'
import { PresupuestoApi } from '@/services/presupuesto.api'
import { OrdenCompraApi } from '@/services/orden_compra.api'
import {ProveedorAPI} from '@/services/proveedor.api'


import dayjs from 'dayjs'




export default {
    components: {
        VDataTable
    },
    data() {
        return {
            dialogoFormularioVistaVista: false,

            formulario: {
                descripcion: '',
                fechaD: null,

                // itemsDetalle debe ser un Array 
                itemsDetalle: [],
            },



            contador: 1,
            limit: 45,
            defaultFormulario: {
                codigo: '',
                descripcion: '',
                fechaD: '',
                producto: null,
                Cantida: null,
            },
            buscador: '',

            items: [
                {
                    id: '1',
                    descripcion: 'Central',
                    fechaD: '',
                    action: ''
                }
            ],

            itemsDetalle: [

            ],
            dialogoEliminar: false,
            elementoAEliminar: null,

            listaProducto: [],

           

            headersOrdenes: [
                { title: 'Codigo', align: 'start', sortable: false, key: 'id', },
                { title: 'Descripcion', key: 'descripcion', align: 'star' },
                { title: 'Precio', key: 'precio', align: 'star' },
                { title: 'Fecha Presupuesto', key: 'fechaD', align: 'star' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' },

            ],

            headersPedido: [

                { title: 'Producto', key: 'idProducto' },
                { title: 'Cantidad', key: 'Cantida', align: 'star' },

            ],

        }
    },

    computed: {
        itemsComputed() {
            if (!this.buscador) return this.items
            return this.items.filter((element) => element.descripcion.toLocaleLowerCase().includes(this.buscador.toLocaleLowerCase()))
        },
        excededLimit() {
            return this.formulario.descripcion.length > this.limit;
        },


        errorMessage() {
            if (this.excededLimit) {
                return 'Superaste el límite de 45 letras';
            }
            return '';
        },
    },

    methods:
    {
        formatearFecha(fechaD) {
            return dayjs(fechaD).format('DD/MM/YYYY')
        },
        showDatePicker() {
            this.showDatepicker = true;
        },
        hideDatePicker() {
            this.showDatepicker = false;
        },
        validarYRegistrar() {
            if (this.itemsComputedOrdenC.length === 0) {
                alert("No se pueden registrar pedidos sin detalles. Agregue al menos un detalle.");
            } else {
                // Continúa con la lógica de registro
                this.abrirDialogo();
            }
        },
        abrirDialogo() {
            // Abrir el modal y cargar el código aquí

            this.formulario = JSON.parse(JSON.stringify(this.defaultFormulario))
            this.detalle = JSON.parse(JSON.stringify(this.defaultFormulario))
        },
        generarCodigo() {
            const nuevoCodigo = this.contador++;
            return nuevoCodigo;
        },

        eliminarDetalle(id) {
            this.itemsDetalle = this.itemsDetalle.filter(item => item.producto !== id);
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
                OrdenCompraApi.delete(this.elementoAEliminar.id).then(() => {
                    this.Obtenerorden_compra();
                });
                // Cierra el diálogo de confirmación
                this.dialogoEliminar = false;
                this.elementoAEliminar = null;
            }
        },


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

        MostrarOrdenesCompra(item) {
            this.dialogoFormularioVistaVista = true;
            this.formulario.codigo = item.id
            this.formulario.descripcion = item.descripcion
            this.formulario.precio = item.precio
            this.formulario.fechaD = this.formatearFecha(item.fechaD)
            this.formulario.proveedor = item.proveedor
            this.formulario.itemsDetalle = [];

            
            item.detalleItems.forEach((detalle) => {
                this.formulario.itemsDetalle.push({
                    idProducto: detalle.nomnbreProducto,
                    Cantida: detalle.Cantida,
                });
            })



        },

        Obtenerorden_compra() {
            OrdenCompraApi.getAll().then(({ data }) => {

                this.items = data.map(item => {
                    return {
                        id: item.idorden_compra,
                        descripcion: item.Descripcion,
                        fechaD: item.Fecha_pedi,
                        precio: item.Precio,
                        proveedor: item.idProveedor,
                        detalleItems: item.detalle

                    }
                })
            })


        },

     
  },





    


    //NUEVO PARA REGISTRO ORDEN DE Presupuesto




    created() {
        // Generar automáticamente el código al cargar el componente
        this.formulario.codigo = this.generarCodigo();
        this.Obtenerorden_compra()
        this.ObtenerProveedor()






    },


}
</script>
   
