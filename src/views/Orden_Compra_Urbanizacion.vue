<template>
    <v-dialog max-width="800" v-model="dialogoFormulario" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h2 class="mb-3">Registrar Pedido de Urbanizacion</h2>
                <v-form>
                    <v-row>
                        <v-col cols="12" sm="6" md="6" class="">
                            <v-text-field variant="outlined" label="Descripcion" v-model="formulario.descripcion"
                            @input="verificarFormulario" required></v-text-field>
                        </v-col>

                        <!-- <v-col cols="12" sm="6" md="6">
                            <input class="custom-input" v-model="formulario.fechaD" type="date"
                            @input="verificarFormulario"required placeholder="Fecha de Pedido"/>
                        </v-col> -->
                        <v-col cols="12" sm="6" md="6" class="">
                            <v-text-field type="date" variant="outlined" label="Fecha de Orden Compra" v-model="formulario.fechaD"
                            @input="verificarFormulario" required></v-text-field>
                        </v-col>
                    </v-row>



                    <v-divider class="mt-0"></v-divider>
                    <!-- INICIO DETALLE -->
                    <v-row>
                        <v-col cols="12" sm="6" md="6" class="mt-5">
                            <v-autocomplete variant="outlined" label="Producto" :items="listaProducto"
                                item-title="descripcionPr" item-value="id" v-model="detalle.producto"
                                required></v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="6" md="6" class="mt-5">
                            <v-text-field variant="outlined" label="Cantidad" v-model="detalle.cantidad"
                                required></v-text-field>
                        </v-col>



                    </v-row>
                    <v-row class="mt-0">
                        <v-col cols="12" class="d-flex justify-end">
                            <v-btn color="primary" size="small" prepend-icon="mdi mdi-plus-thick"
                                @click="AgregarDetalle">Añadir</v-btn>
                        </v-col>
                    </v-row>
                    <!-- Fin DETALLE -->


                    <v-card class="mt-5 rounded-x2">
                        <v-data-table  @input="verificarFormulario" items-per-page-text="" :headers="headersCrear" :items="itemsDetalle">
                            <template v-slot:item.action="{ item }">
                                <v-icon size="small" class="me-2" @click="editarCiudad(item.raw)">
                                    mdi-pencil
                                </v-icon>
                                <v-icon color="#C62828" size="small" @click="eliminarDetalle(item.raw.producto)">
                                    mdi-trash-can-outline
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-card>

                    <v-col cols="12" class="d-flex justify-end">
                        <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormulario = false">Cancelar</v-btn>
                        <v-btn color="primary" @click="guardarFormulario"
                            :disabled="excededLimit || !formulario.descripcion">Guardar</v-btn>
                    </v-col>

                </v-form>
            </v-container>
        </v-card>
    </v-dialog>


    <v-dialog v-model="showModal" persistent max-width="400">
        <v-card>
            <v-card-title>Producto Duplicado</v-card-title>
            <v-card-text>
                Añadiste mas de 1 vez un producto
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="showModal = false">Aceptar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>


    <v-dialog v-model="showModalVacio" persistent max-width="350">

        <v-card>
            <v-container>
                <v-card-title>Campo Vacio</v-card-title>
                <v-card-text class="mt-0">
                    Descripcion y fecha no pueden quedar vacio
                </v-card-text>

                <v-cols cols="12" class="mt-0 d-flex justify-end">
                    <v-btn color="primary" @click="showModalVacio = false">Aceptar</v-btn>
                </v-cols>
            </v-container>
        </v-card>

    </v-dialog>



    <v-dialog v-model="showModalDuplicado" persistent max-width="350">
        <v-card>
            <v-container>
                <v-card-title>Campo Vacio</v-card-title>
                <v-card-text class="mt-0">
                    Seleccionaste el mismo producto
                </v-card-text>
                <v-cols cols="12" class="mt-0 d-flex justify-end">
                    <v-btn color="primary" @click="showModalDuplicado = false">Aceptar</v-btn>
                </v-cols>

            </v-container>
        </v-card>
    </v-dialog>



    <v-dialog max-width="700" v-model="dialogoFormularioEditar" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Editar Pedido de Urbanizacion</h1>
                <v-form>
                    <v-row class="justify-center">


                        <v-col cols="12" sm="5" md="5">
                            <v-autocomplete variant="outlined" label="Producto" :items="listaProducto"
                                item-title="descripcionPr" item-value="id" v-model="formulario.producto"
                                :error="excededLimit" :error-messages="errorMessage" required></v-autocomplete>
                        </v-col>

                        <v-col ols="12" sm="5" md="5">
                            <v-text-field variant="outlined" label="Cantidad" v-model="formulario.cantidad"></v-text-field>
                        </v-col>


                    </v-row>
                    <v-row>
                        <v-col cols="12" class="d-flex justify-end">
                            <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormularioEditar = false">Cancelar</v-btn>
                            <v-btn color="primary" @click="guardarFormularioEditar">Guardar</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>

    <!-- FIN DETALLE -->

    <!-- INICIO VISTA -->
    <v-dialog max-width="700" v-model="dialogoFormularioVistaVista" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Pedido Registrado</h1>
                <v-form>

                    <v-row>
                        <v-col cols="12" sm="2" md="2" class="">
                            <v-text-field variant="outlined" label="Codigo" v-model="formulario.codigo" disabled
                                required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="5" md="5" class="">
                            <v-text-field variant="outlined" label="Descripcion" v-model="formulario.descripcion" disabled
                                required></v-text-field>
                        </v-col>


                        <v-col cols="12" sm="5" md="5" class="">
                            <v-text-field variant="outlined" label="Fecha" v-model="formulario.fechaD" disabled
                                required></v-text-field>
                        </v-col>


                    </v-row>
                    <v-divider></v-divider>

                    <v-card class="mt-5 rounded-x2">
                        <v-data-table items-per-page-text="" :headers="headersPedido" :items="formulario.itemsDetalle">

                        </v-data-table>
                    </v-card>

                    <v-row>
                        <v-col cols="12" class="d-flex justify-end mt-2">
                            <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormularioVistaVista = false">Cerrar</v-btn>

                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>

    <!-- FIN VISTA -->


    <!-- INICIO VISTA APROBAR -->
    <v-dialog max-width="700" v-model="dialogoFormularioVistaAprobar" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Aprobar Presupuesto</h1>
                <v-form>

                    <v-row>
                        <v-col cols="12" sm="2" md="2" class="">
                            <v-text-field variant="outlined" label="Codigo" v-model="formulario.codigo" disabled
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3" class="">
                            <v-text-field variant="outlined" label="Fecha" v-model="formulario.fechaD" disabled
                                required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="6" class="">
                            <v-text-field variant="outlined" label="Descripcion" v-model="formulario.descripcion"
                                required></v-text-field>
                        </v-col>
                        
                        <v-col cols="12" sm="6" md="6" class="">
                            <v-text-field variant="outlined" label="Ingrese Precio Total" v-model="formulario.preciototal"
                                required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="6">
                            <v-autocomplete variant="outlined" label="Seleccione un Proveedor" :items="listaProveedor"
                                item-title="descripcionP" item-value="id" v-model="formulario.proveedor"></v-autocomplete>
                        </v-col>



                    </v-row>
                    <v-divider></v-divider>

                    <v-card class="mt-5 rounded-x2">
                        <v-data-table items-per-page-text="" :headers="headersPedidoApr" :items="formulario.itemsDetalle">
                            <template v-slot:item.action="{ item }">
                                <v-icon size="small" class="me-2" @click="editarDetalle(item.raw)">
                                    mdi-pencil
                                </v-icon>
                                <v-icon color="#C62828" size="small" @click="eliminarDetalle(item.raw.producto)">
                                    mdi-trash-can-outline
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-card>

                    <v-row>
                        <v-col cols="12" class="d-flex justify-end mt-2">
                            <v-btn color="#E0E0E0" class="mx-2"
                                @click="dialogoFormularioVistaAprobar = false">Cerrar</v-btn>
                            <v-btn color="primary" class="mx-2" @click="guardarFormularioOrdenC">Guardar</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>


    <!-- FIN APROBAR -->





    <v-container>
        <v-row>
            <v-col cols="12" sm="5" md="5">
                <v-text-field :loading="loading" density="compact" v-model="buscador" variant="solo" label="Buscar"
                    append-inner-icon="mdi-magnify" single-line hide-details rounded click:prependInner></v-text-field>
            </v-col>

            <v-col cols="12" sm="7" md="7" class="d-flex justify-end align-center">
                Cantidad de Pedido: {{ items.length }}
            </v-col>

        </v-row>

        <v-card class="mt-5 rounded-x2">
            <v-data-table items-per-page-text="Articulo por pagina" :headers="headers" :items="itemsComputed">
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>
                            <p class="font-weight-bold">Pedidos de Urbanizacion Registrados</p>
                        </v-toolbar-title>

                        <v-btn class="custom-font" color="primary" prepend-icon="mdi-content-save-plus" variant="text"
                            @click="validarYRegistrar">Registrar
                        </v-btn>

                    </v-toolbar>
                </template>

                <template v-slot:item.fechaD="{ item }">
                    {{ formatearFecha(item.raw.fechaD) }}
                </template>
                <template v-slot:item.action="{ item }">

                    <v-icon color="primary" size="small" @click="MostrarPedido(item.raw)">
                        mdi-file-eye-outline
                    </v-icon>

                    <v-icon color="black" size="small" @click="editarPedidog(item.raw)">
                        mdi-pencil
                    </v-icon>
                    <v-icon color="#C62828" size="small" @click="confirmarEliminarCiudad(item.raw)">
                        mdi-trash-can-outline
                    </v-icon>
                    <v-icon color="primary" size="small" @click="MostrarPresupuestoAprobar(item.raw)">
                        mdi-file-document-check
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
                            <v-btn color="#E0E0E0" text @click="cancelarEliminarCiudad">Cancelar</v-btn>
                        </v-col>
                    </v-row>


                </v-container>
            </v-card>

        </v-dialog>
        <!-- FIN DIALOGO -->


        <!-- iNICIO EDITAR GUARDADO  -->
        <v-dialog max-width="700" v-model="dialogoFormularioEditarGuardado" persistent>
            <v-card class="rounded-xl">
                <v-container>
                    <h1 class="mb-3">Editar Pedido de Urbanizacion</h1>
                    <v-form>
                        <v-row>
                            <v-col cols="12" sm="2" md="2">
                                <v-text-field variant="outlined" label="Codigo" disabled
                                    v-model="formulario.codigo"></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="5" md="5">
                                <v-text-field variant="outlined" label="Producto" v-model="formulario.descripcion"
                                    :error="excededLimit" :error-messages="errorMessage" required>
                                </v-text-field>

                            </v-col>
                            <v-col cols="12" sm="5" md="5">
                                <v-text-field variant="outlined" label="Fecha" v-model="formulario.fechaD">
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-divider></v-divider>

                        <v-card class="mt-5 rounded-x2">
                            <v-data-table items-per-page-text="" :headers="headersPedidoG" :items="formulario.itemsDetalle">
                                <template v-slot:item.action="{ item }">
                                    <v-icon size="small" class="me-2" @click="editarPedidoDetalle(item.raw)">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon color="#C62828" size="small" @click="confirmarEliminarCiudad(item.raw)">
                                        mdi-trash-can-outline
                                    </v-icon>
                                </template>
                            </v-data-table>
                        </v-card>
                        <v-row>
                            <v-col cols="12" class="d-flex justify-end">
                                <v-btn color="#E0E0E0" class="mx-4 mt-2"
                                    @click="dialogoFormularioEditarGuardado = false">Cancelar</v-btn>
                                <v-btn color="primary" class="mt-2" @click="guardarFormularioEditarG">Guardar</v-btn>
                            </v-col>
                        </v-row>

                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>

        <!-- Fin Editar Guarddo  -->

        <v-dialog max-width="700" v-model="dialogoFormularioEditarDe" persistent>
            <v-card class="rounded-xl">
                <v-container>
                    <h1 class="mb-3">Editar Detalle </h1>
                    <v-form>
                        <v-row class="justify-center">


                            <v-col cols="12" sm="5" md="5">
                                <v-autocomplete variant="outlined" label="Producto" :items="listaProducto"
                                    item-title="descripcionPr" item-value="id" v-model="formulario.producto"
                                    :error="excededLimit" :error-messages="errorMessage" required></v-autocomplete>
                            </v-col>

                            <v-col ols="12" sm="5" md="5">
                                <v-text-field variant="outlined" label="Cantidad"
                                    v-model="formulario.cantidad"></v-text-field>
                            </v-col>


                        </v-row>
                        <v-row>
                            <v-col cols="12" class="d-flex justify-end">
                                <v-btn color="#E0E0E0" class="mx-2"
                                    @click="dialogoFormularioEditarDe = false">Cancelar</v-btn>
                                <v-btn color="primary" @click="guardarFormularioEditarC">Guardar</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>

         <!-- INICIO EDITAR DETALLE -->
     <v-dialog max-width="700" v-model="dialogoFormularioEditarDetalle" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Ingresar Precio</h1>
                <v-form>
                    <v-row class="justify-center">


                        <v-col cols="12" sm="5" md="5">
                            <v-autocomplete variant="outlined" label="Producto" :items="listaProducto"
                                item-title="descripcionPr" item-value="id" v-model="formulario.producto"
                                :error="excededLimit" :error-messages="errorMessage" required></v-autocomplete>
                        </v-col>

                        <v-col ols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Cantidad" v-model="formulario.cantidad"></v-text-field>
                        </v-col>
                        <v-col ols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Inserte Precio"
                                v-model="formulario.precio"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="d-flex justify-end">
                            <v-btn color="#E0E0E0" class="mx-2"
                                @click="dialogoFormularioEditarDetalle = false">Cancelar</v-btn>
                            <v-btn color="primary" @click="guardarFormularioEditarDetalle" :disabled="!formularioValido">Guardar</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>

      <!-- FIN EDITAR DETALLE -->
    </v-container>
    <orden-compra-urb></orden-compra-urb>

</template>

<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { ProductoAPI } from '@/services/producto.api'
import { PedidoUrbanizacionAPI } from '@/services/pedido_urbanizacion.api'
import { OrdenUrbApi } from '@/services/orden_compra_urbanizacion.api'
import { ProveedorAPI } from '@/services/proveedor.api'
import ordenCompraUrb from '@/components/ordenCompraUrb.vue'  // Para importar aqui//
import dayjs from 'dayjs'



export default {
    components: {
        VDataTable,
        ordenCompraUrb
    },
    data() {
        return {
            dialogoFormulario: false,
            dialogoFormularioEditar: false,
            dialogoFormularioVistaVista: false,
            showModal: false,
            showModalVacio: false,
            showModalDuplicado: false,
            dialogoFormularioEditarGuardado: false,
            dialogoFormularioEditarDe: false,
            dialogoFormularioVistaAprobar: false,
            dialogoFormularioEditarDetalle:false,
            formularioValido: false,
            
            detalle: {
                producto: '',
                descripcion: '',
            },
            limit: 45,

            formulario: {
                descripcion: '',
                fechaD: null,

                // itemsDetalle debe ser un Array 
                itemsDetalle: [],



            },
            listaProveedor: [],

            contador: 1,
            limit: 45,
            defaultFormulario: {
                codigo: '',
                descripcion: '',
                preciototal:'',
                fechaD: '',
                producto: null,
                cantidad: null,
            },
            buscador: '',
            headers: [
                { title: 'Codigo', align: 'start', sortable: false, key: 'id', },
                { title: 'Descripcion', key: 'descripcion', align: 'star' },
                { title: 'Fecha de Pedido', key: 'fechaD', align: 'star' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' },
            ],
            headersPedido: [

                { title: 'Producto', key: 'idProducto' },
                { title: 'Cantidad', key: 'Cantidad', align: 'star' },

            ],

            headersPedidoG: [
                { title: 'Codigo', key: 'idProducto' },
                { title: 'Descripcion', key: 'nombre_producto' },
                { title: 'Cantidad', key: 'Cantidad', align: 'star' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' },


            ],
            headersPedidoApr: [

                { title: 'Producto', key: 'idProducto' },
                { title: 'Cantidad', key: 'Cantidad', align: 'star' },
                { title: 'Ingrese Precio', key: 'Precio', align: 'star' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' },

            ],

            headersCrear: [

                { title: 'Producto', key: 'producto' },
                { title: 'Producto', key: 'descripcionPr' },
                { title: 'Cantidad', key: 'cantidad', align: 'star' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' },
            ],
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
        verificarFormulario() {
        // Verificar si todos los campos obligatorios están llenos y tambien si fue tildado el check
        this.formularioValido = this.formulario.descripcion && this.formulario.fechaD && this.formulario.itemsDetalle.length > 0;
      
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


        AgregarDetalle() {
            const productoSeleccionado = this.listaProducto.find(item => item.id === this.detalle.producto);
            if (productoSeleccionado) {
                this.itemsDetalle.push({
                    producto: productoSeleccionado.id, // Agrega la descripción del producto
                    descripcionPr: productoSeleccionado.descripcionPr,
                    cantidad: this.detalle.cantidad,
                    action: '',
                });

                this.detalle.producto = '';
                this.detalle.cantidad = '';
            }
        },


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
            if (this.itemsComputed.length === 0) {
                alert("No se pueden registrar pedidos sin detalles. Agregue al menos un detalle.");
            } else {
                // Continúa con la lógica de registro
                this.abrirDialogo();
            }
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
            // Verificar que todos los campos requeridos estén completos
            if (!this.formulario.descripcion || !this.formulario.fechaD) {
                this.showModalVacio = true;
            } else {
                // Validar duplicados en los detalles
                const productosSeleccionados = this.itemsDetalle.map((detalle) => detalle.producto);

                if (new Set(productosSeleccionados).size !== productosSeleccionados.length) {
                    // Si hay elementos duplicados en la lista de productos seleccionados, muestra un mensaje de error
                    this.showModalDuplicado = true;

                } else {
                    // Todos los campos requeridos están completos y no hay duplicados, puedes proceder a guardar
                    PedidoUrbanizacionAPI.create({
                        idPedido_Urbanizacion: this.formulario.codigo,
                        Descripcion: this.formulario.descripcion,
                        Fecha_pedi: this.formulario.fechaD,
                        Detalle: this.itemsDetalle,
                    }).then(() => {
                        this.ObtenerPedidoUrbanizacion();
                    });

                    // Limpia los campos del formulario después de guardar
                    this.formulario.codigo = "";
                    this.formulario.producto = "";
                    this.formulario.descripcion = "";
                    this.formulario.fechaD = "";
                    this.detalle.producto = null;
                    this.detalle.cantidad = null;
                    this.itemsDetalle = []



                    // Cierra el diálogo del formulario
                    this.dialogoFormulario = false;
                }
            }
        },
        MostrarPedido(item) {
            console.log(item);

            this.dialogoFormularioVistaVista = true;
            this.formulario.codigo = item.id
            this.formulario.descripcion = item.descripcion
            this.formulario.fechaD = this.formatearFecha(item.fechaD)

            this.formulario.itemsDetalle = [];

            item.detalleItems.forEach((detalle) => {
                this.formulario.itemsDetalle.push({
                    idProducto: detalle.nombreProducto,
                    Cantidad: detalle.Cantidad,
                });
            })



        },

        MostrarPresupuestoAprobar(item) {


this.dialogoFormularioVistaAprobar = true;
this.formulario.codigo = item.id
this.formulario.descripcion = item.descripcion
this.formulario.fechaD = this.formatearFecha(item.fechaD);
this.formulario.fechaDOriginal = item.fechaD;  // Nueva propiedad para almacenar la fecha sin formato

this.formulario.itemsDetalle = [];

item.detalleItems.forEach((detalle) => {
    this.formulario.itemsDetalle.push({
        idProducto: detalle.idProducto,
        Cantidad: detalle.Cantidad,
   
    });
})



},
editarDetalle(parametro) {
            this.dialogoFormularioEditarDetalle = true
            this.formulario.producto = parametro.idProducto
            this.formulario.cantidad = parametro.Cantidad
            this.formulario.precio = parametro.Precio

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


            } else {
                // Si no se encontró el elemento, agrega uno nuevo
                this.itemsDetalle.push({
                    producto: this.formulario.producto,
                    cantidad: this.formulario.cantidad,
                    precio: this.formulario.precio,
                    action: '',
                });
            }

            this.dialogoFormularioEditarDetalle = false;
        },





        guardarFormularioEditar() {
            if (!this.formulario.producto || !this.formulario.cantidad) {
                this.emptyFieldError = true;
                return;
            }

            // Busca el índice del elemento que se va a editar
            const index = this.itemsDetalle.findIndex(item => item.producto === this.formulario.producto);

            if (index !== -1) {
                // Si se encontró el elemento, actualiza sus datos
                this.itemsDetalle[index].cantidad = this.formulario.cantidad;
            } else {
                // Si no se encontró el elemento, agrega uno nuevo
                this.itemsDetalle.push({
                    producto: this.formulario.producto,
                    cantidad: this.formulario.cantidad,
                    action: '',
                });
            }

            this.dialogoFormularioEditar = false;
        },
        eliminarDetalle(id) {
            this.itemsDetalle = this.itemsDetalle.filter(item => item.producto !== id);
        },



        editarCiudad(parametro) {
            this.dialogoFormularioEditar = true
            this.formulario.producto = parametro.producto
            this.formulario.cantidad = parametro.cantidad

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
                PedidoUrbanizacionAPI.delete(this.elementoAEliminar.id).then(() => {
                    this.ObtenerPedidoUrbanizacion();
                });
                // Cierra el diálogo de confirmación
                this.dialogoEliminar = false;
                this.elementoAEliminar = null;
            }
        },

        dialogoVista() {
            this.dialogoFormularioVistaVista = true
            this.formulario.codigo = parametro.id
            this.formulario.descripcion = parametro.descripcion
            this.formulario.fechaD = parametro.fechaD
            this.detalle.producto = parametro.producto
            this.detalle.cantidad = parametro.cantidad
        },


        //Inicio editar guardado //
        editarPedidog(item) {
            this.dialogoFormularioEditarGuardado = true
            this.formulario.codigo = item.id
            this.formulario.descripcion = item.descripcion
            this.formulario.fechaD = this.formatearFecha(item.fechaD)

            this.formulario.itemsDetalle = [];

            item.detalleItems.forEach((detalle) => {
                this.formulario.itemsDetalle.push({
                    idPedido_Urbanizacion: detalle.idPedido_Urbanizacion,
                    idProducto: detalle.idProducto,
                    nombre_producto: detalle.nomnbreProducto,
                    Cantidad: detalle.Cantidad,
                });
            })



        },

        guardarFormularioEditarG() {
            console.log('ItemsDetalle.::', this.formulario.itemsDetalle);

            PedidoUrbanizacionAPI.update(

                this.formulario.codigo,
                {
                    idPedido_Urbanizacion: this.formulario.codigo,
                    Descripcion: this.formulario.descripcion,
                    Fecha_pedi: this.formulario.fechaD,
                    Detalle: this.formulario.itemsDetalle,

                }
            ).then(() => {
                this.ObtenerPedidoUrbanizacion()
            })
            this.formulario.codigo = "";
            this.formulario.producto = "";
            this.formulario.descripcion = "";
            this.formulario.fechaD = "";
            this.detalle.producto = null;
            this.detalle.cantidad = null;
            this.itemsDetalle = []
            this.dialogoFormularioEditarGuardado = false
        },

        //Fin editar guardado //


        //EDITAR DETALLE Guardado //


        guardarFormularioEditarC() {
            console.log('Antes de guardar:', this.formulario.itemsDetalle);
            console.log('Ver producto', this.formulario.producto);

            if (!this.formulario.producto || !this.formulario.cantidad) {
                this.emptyFieldError = true;
                return;
            }

            // Busca el índice del elemento que se va a editar
            const index = this.formulario.itemsDetalle.findIndex(item => item.idProducto == this.formulario.producto);

            if (index !== -1) {
                // Si se encontró el elemento, actualiza sus datos
                this.formulario.itemsDetalle[index].Cantidad = this.formulario.cantidad;
            }
            console.log('Después de guardar:', this.formulario.itemsDetalle);

            this.dialogoFormularioEditarDe = false;
        },
        eliminarDetalle(id) {
            this.itemsDetalle = this.itemsDetalle.filter(item => item.producto !== id);
        },

        editarPedidoDetalle(item) {
            this.dialogoFormularioEditarDe = true;

            // this.formulario.codigo = item.producto
            this.formulario.producto = item.idProducto;
            this.formulario.cantidad = item.Cantidad;


        },

        ObtenerPedidoUrbanizacion() {

            PedidoUrbanizacionAPI.getAll().then(({ data }) => {
                console.log(data)
                this.items = data.map(item => {
                    return {
                        id: item.idPedido_Urbanizacion,
                        descripcion: item.Descripcion,
                        fechaD: item.Fecha_pedi,
                        detalleItems: item.detalle

                    }
                })
            })
        },
        guardarFormularioOrdenC() {
        console.log('Este console es al precionar boton de guardar: ', this.formulario)
        OrdenUrbApi.create({

            idOrden_Compra_Urb: this.formulario.codigo,
            Descripcion: this.formulario.descripcion,
            Fecha_pedi: this.formulario.fechaDOriginal,
            idProveedor: this.formulario.proveedor,
            PrecioT: this.formulario.preciototal,
            Detalle: this.formulario.itemsDetalle,
        }).then(() => {

            // Limpia los campos del formulario después de guardar
            this.formulario.codigo = "";
            this.formulario.producto = "";
            this.formulario.descripcion = "";
            this.formulario.fechaD = "";
            this.formulario.fechaDOriginal = "";
            this.formulario.proveedor = "";
            this.formulario.preciototal = "";
            // this.detalle.producto = null;

            this.itemsDetalle = [];
            // Cierra el diálogo del formulario
            this.dialogoFormularioVistaAprobar = false;
            this.Obtenerorden_compra_urb();
        });

    },

    },



    created() {
        // Generar automáticamente el código al cargar el componente
        this.formulario.codigo = this.generarCodigo();
        this.ObtenerProducto()
        this.ObtenerPedidoUrbanizacion()
        this.ObtenerProveedor()




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