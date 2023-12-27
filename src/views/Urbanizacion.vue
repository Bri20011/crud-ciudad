<template>
    <v-dialog max-width="1200" v-model="dialogoFormulario" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Registrar Urbanizacion</h1>
                <v-form>
                    <v-row>
                        <v-col cols="12" sm="5" md="5">
                            <v-text-field variant="outlined" label="Nombre de Urbanizacion" v-model="formulario.nombre_urb"
                                required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="3" md="3">
                            <input class="custom-input" v-model="formulario.fechaD" type="date"
                                placeholder="Fecha de Operacion" @input="formatDate" />
                        </v-col>

                        <!-- <v-col cols="12" sm="2" md="2">
                            <v-text-field variant="outlined" label="Nº  de Compras" v-model="formulario.numero_orden"
                                required></v-text-field>
                        </v-col>

                        <v-col cols="12" class="mt-4" sm="2" md="2">
                            <v-btn @click="ObtenerCodigoOrden">Calcular</v-btn>
                        </v-col> -->


                        <v-col cols="12" sm="4" md="4">
                            <v-autocomplete variant="outlined" label="Ciudad" :items="listaCiudad" item-title="descripcionC"
                                item-value="id" v-model="formulario.ciudad" required></v-autocomplete>
                        </v-col>


                        <v-col cols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Area" v-model="formulario.area" required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Lado A" v-model="formulario.ladoA"
                                required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Lado B" v-model="formulario.ladoB"
                                required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Ubicacion" v-model="formulario.ubicacion"
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Cantidad" v-model="formulario.cantidad"
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Precio Totall" v-model="formulario.precio"
                                required></v-text-field>
                        </v-col>


                        <!-- INICIO DETALLE -->
                        <v-divider class="mt-0"></v-divider>

                        <v-row>
                            <v-col cols="12" sm="5" md="5" class="mt-5">
                                <v-autocomplete variant="outlined" label="Descripcion" :items="listaProducto"
                                    item-title="descripcionPr" item-value="id" v-model="detalle.producto"
                                    :error="excededLimit" :error-messages="errorMessage" required></v-autocomplete>
                            </v-col>


                            <v-col cols="12" class="d-flex justify-end">
                                <v-btn color="primary" size="small" prepend-icon="mdi mdi-plus-thick"
                                    @click="AgregarDetalle">Calcular</v-btn>
                            </v-col>
                        </v-row>
                        <!-- FIN DETALLE -->



                        <v-data-table items-per-page-text="Articulos" :headers="headersCompra" :items="itemsDetalle">



                            <!-- <template v-slot:tfoot>
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
                            </template> -->




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
                            <v-btn color="primary" @click="guardarFormulario">Guardarr</v-btn>

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
                <h1 class="mb-3">Ingresar Detalle</h1>
                <v-form>
                    <v-row class="justify-center">

                        <v-col cols="12" sm="5" md="5">
                            <v-autocomplete variant="outlined" label="Descripcion" :items="listaProducto"
                                item-title="descripcionPr" item-value="id" v-model="detalle.producto"
                                :error="excededLimit" :error-messages="errorMessage" required></v-autocomplete>
                        </v-col>

                        <v-col ols="12" sm="2" md="2">
                            <v-text-field variant="outlined" label="Ubicacion"
                                v-model="detalle.ubicacion"></v-text-field>
                        </v-col>
                        <v-col ols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Numero Manzana"
                                v-model="detalle.numero_manz"></v-text-field>
                        </v-col>
                        <v-col ols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Numero Lote"
                                v-model="detalle.numero_lot"></v-text-field>
                        </v-col>
                        <v-col ols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Area" v-model="detalle.area"></v-text-field>
                        </v-col>
                        <v-col ols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Precio del Lote"
                                v-model="detalle.precio_ind"></v-text-field>
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
                Cantidad de Urbanizacion: {{ items.length }}
            </v-col>

        </v-row>

        <v-card class="mt-5 rounded-xl">
            <v-data-table items-per-page-text="Item por pagina" :headers="headers" :items="itemsComputed">
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>
                            <p class="font-weight-bold">Registro de Urbanizacion</p>
                        </v-toolbar-title>

                        <v-btn class="custom-font" color="primary" prepend-icon="mdi-content-save-plus" variant="text"
                            @click="abrirDialogo">Registrar
                        </v-btn>

                    </v-toolbar>
                </template>
                <template v-slot:item.fechaD="{ item }">
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
    </v-container>
</template>
  
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'

import { ProveedorAPI } from '@/services/proveedor.api'
import { TipoDocumentoAPI } from '@/services/tipo_documento.api'
import { ProductoAPI } from '@/services/producto.api'
import { IvaAPI } from '@/services/iva.api'
import { UrbanizacionApi } from '@/services/urbanizacion.api'
import { CiudadAPI } from '@/services/ciudad.api'



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
            ordenCompraSeleccionada: null,
            detalle: {
                producto: '',
                descripcion: '',
                ubicacion:'',
                numero_manz:'',
                id: '',
            },


            formulario: {
                proveedor: '',
                documento: '',
                fechaD: '',
                timbrado: '',
                numero_factura: '',
                urbanizacion: '',


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
                id: '',
                nomnbreProducto: '',
                descripcionI: ''

            },
            buscador: '',
            headers: [
                { title: 'Codigo', align: 'start', sortable: false, key: 'id', },
                { title: 'Fecha de Urbamizacion', key: 'fechaD', align: 'star' },
                { title: 'Nombre de Urbanizacion', key: 'nombre_urb' },
                { title: 'Area', key: 'area', align: 'star' },
                { title: 'Lado A', key: 'ladoA', align: 'star' },
                { title: 'Lado B', key: 'ladoB', align: 'center' },
                { title: 'Cantidad de Manzanas', key: 'Cantidad_manzana', align: 'center' },
                { title: 'Ubicacion', key: 'ubicacion', align: 'center' },
                { title: 'Precio', key: 'precio', align: 'center' },
                { title: 'Ciudad', key: 'idCiudad', align: 'center' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' },
            ],
            headersCompra: [
                { title: 'Producto', key: 'producto', align: 'center' },
                { title: 'Descripcion', key: 'descripcionPr', align: 'center' },
                { title: 'Codigo', key: 'id', align: 'center' },
                { title: 'Precio por Lote', key: 'precio_ind', align: 'center' },
                { title: 'Ubicacion', key: 'ubicacion', align: 'center' },
                { title: 'Numero Manzana', key: 'numero_manz', align: 'center' },
                { title: 'Numero Lote', key: 'numero_lot', align: 'center' },
                { title: 'Area', key: 'area', align: 'center' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' }
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
                    numero_manz:'',
                    ubicacion:'',
                }
            ],
            itemsDetalle: [

            ],
            dialogoEliminar: false,
            elementoAEliminar: null,


            listaCiudad: [],
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
        obtenerCiudades() {
            CiudadAPI.getAll().then(({ data }) => {
                this.listaCiudad = data.map(item => {
                    return {
                        id: item.idCiudad,
                        descripcionC: item.Descripcion
                    }
                })
            })
        },


        ObtenerProducto() {
            ProductoAPI.findByTipo(2).then(({ data }) => {
                this.listaProducto = data.map(item => {
                    return {
                        id: item.idProducto,
                        descripcionPr: item.Descripcion,

                    }
                })
            })
        },



        // INICIO NUEVO 

        

       




        formatearFecha(fechaD) {
            return dayjs(fechaD).format('DD/MM/YYYY')
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
            UrbanizacionApi.create({

                idUrbanizacion: this.formulario.codigo,
                fecha_urb: this.formulario.fechaD,
                Nombre_Urbanizacion: this.formulario.nombre_urb,
                Area: this.formulario.area,
                LadoA: this.formulario.ladoA,
                LadoB: this.formulario.ladoB,
                Cantidad_manzana: this.formulario.cantidad,
                Ubicacion: this.formulario.ubicacion,
                Precio: this.formulario.precio,
                idCiudad: this.formulario.ciudad,
                idStock: this.formulario.urbanizacion,
                Detalle: this.itemsDetalle
 }).then(() => {
               
     // Limpia los campos del formulario después de guardar

            this.formulario.codigo = '';
            this.formulario.fechaD = '';
            this.formulario.timbrado = '';
            this.formulario.numero_factura = '';
            this.formulario.documento = '';
            this.formulario.proveedor = '';
            this.dialogoFormulario = false;

            this.itemsDetalle = [];
            this.dialogoFormulario = false;
            this.ObtenerUrbanizacion();
        });
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
                UrbanizacionApi.update(this.elementoACambiarEstado.id, { estado_compras: true }
                ).then(() => {
                    // Actualiza la tabla después de que la actualización se haya completado
                    this.items = [];
                    this.ObtenerUrbanizacion();

                })


                // Cierra el diálogo de confirmación
                this.dialogoCambiarEstado = false;
                this.elementoACambiarEstado = null;




            }

        },

        ObtenerUrbanizacion() {
            UrbanizacionApi.getAll().then(({ data }) => {
                this.items = data.map(item => {
                    return {
                        id: item.idUrbanizacion,
                        fechaD: item.fecha_urb,
                        nombre_urb: item.Nombre_Urbanizacion,
                        area: item.Area,
                        ladoA: item.LadoA,
                        ladoB: item.LadoB,
                        cantidad: item.Cantidad_manzana,
                        ubicacion: item.Ubicacion,
                        precio: item.Precio,
                        ciudad: item.idCiudad,
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
            this.detalle.id = parametro.id,
            this.detalle.producto = parametro.producto
            this.detalle.ubicacion = parametro.ubicacion;
            this.detalle.numero_manz = parametro.numero_manz;
            this.detalle.numero_lot = parametro.numero_lot;
            this.detalle.area = parametro.area;
            this.detalle.precio_ind = parametro.precio_ind;


        },
        guardarFormularioEditarDetalle() {
            if (!this.detalle.producto || !this.detalle.ubicacion || !this.detalle.precio_ind || !this.detalle.ubicacion || !this.detalle.numero_manz || !this.detalle.numero_lot || !this.detalle.ubicacion) {
                this.emptyFieldError = true;
                return;
            }

            // Busca el índice del elemento que se va a editar
            const index = this.itemsDetalle.findIndex(item => item.id == this.detalle.id);
            console.log('Antes de guardar:', this.itemsDetalle);

            if (index !== -1) {
                // Si se encontró el elemento, actualiza sus datos
                this.itemsDetalle[index].ubicacion = this.detalle.ubicacion;
                this.itemsDetalle[index].numero_manz = this.detalle.numero_manz;
                this.itemsDetalle[index].numero_lot = this.detalle.numero_lot;
                this.itemsDetalle[index].area = this.detalle.area;
                this.itemsDetalle[index].precio_ind = this.detalle.precio_ind;

            
        } 
            console.log('Después de guardar:', this.itemsDetalle);

            this.dialogoFormularioEditarDetalle = false;
        },
       


 
    AgregarDetalle() {
      const productoSeleccionado = this.listaProducto.find(item => item.id === this.detalle.producto);
      if (productoSeleccionado) {
        const cantidad = this.formulario.cantidad;

        // Agregar  detalle segun la cantidad ingresada
        for (let i = 0; i < cantidad; i++) {
          this.itemsDetalle.push({
            producto: productoSeleccionado.id,
            descripcionPr: productoSeleccionado.descripcionPr,
            precio_ind: this.formulario.precio / cantidad,
            action: '',
            id: i,
          });
        } 
        

                // this.detalle.producto = '';
                // this.detalle.cantidad = '';
            }
        },
    },

  


    created() {
        // Generar automáticamente el código al cargar el componente
        this.formulario.codigo = this.generarCodigo();
        this.ObtenerProducto()
        this.ObtenerUrbanizacion()
        this.obtenerCiudades()


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