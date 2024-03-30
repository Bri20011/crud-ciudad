<template>
    <v-container>
        <h2 class="mb-0 d-flex justify-center">Registrar Arqueo de Caja</h2>
        <v-row class="d-flex justify-center">
            <v-col cols="12" sm="4" md="4" class="mt-0">
                <v-autocomplete variant="outlined" label="Seleccione Caja" :items="listaProducto"
                    item-title="descripcionPr" item-value="id" v-model="detalle.producto" required></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="3" md="3" class="mt-0">
                <input class="custom-input" v-model="formulario.fechaD" type="date" placeholder="Fecha de Pedido"
                    @input="formatDate" />
            </v-col>
        </v-row>
        <v-row>
            <v-col v-for="denominacion in denominaciones" :key="denominacion.valor" cols="12" sm="4" md="3">
                <v-text-field variant="outlined" :label="denominacion.etiqueta" v-model="denominacion.cantidad"
                    disabled></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="4" md="3" class="mt-0">
                <v-text-field variant="outlined" label="Varios" v-model="formulario.descripcion"></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="3" class="mt-0">
                <v-text-field variant="outlined" label="Descripción" v-model="formulario.descripcion"></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="3" class="mt-0">
                <v-text-field variant="outlined" label="Total" v-model="formulario.total" disabled></v-text-field>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center">
            <v-col cols="12" sm="4" md="3">
                <v-text-field variant="outlined" label="Total Caja" v-model="totalCaja" disabled></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="3">
                <v-text-field variant="outlined" label="Total Sistema" v-model="totalSistema" disabled></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="3">
                <v-text-field variant="outlined" label="Diferencia" v-model="diferencia" disabled></v-text-field>
            </v-col>
        </v-row>
    </v-container>



    <v-dialog max-width="1500" v-model="dialogoFormulario" persistent>
        <v-card max-width="1500" class="rounded-xl d-flex justify-center">
            <v-container>

                <v-form>
                    <v-divider class="mt-0"></v-divider>
                    <!-- INICIO DETALLE -->
                    <v-row class="d-flex justify-center">

                        <v-col cols="12" sm="3" md="3" class="mt-5">
                            <v-text-field variant="outlined" label="Monto Apertura" v-model="formulario.descripcion"
                                disabled :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" class="mt-5">
                            <v-text-field variant="outlined" label="Monto Cierre" v-model="formulario.descripcion"
                                disabled :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
                        </v-col>

                    </v-row>



                    <v-card class="mt-5 rounded-x2">

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
                <h1 class="mb-3">Editar Pedido antes de guardar</h1>
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
                                @click="dialogoFormularioEditar = false">Cancelar</v-btn>
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
                            <v-text-field variant="outlined" label="Descripcion" v-model="formulario.descripcion"
                                disabled required></v-text-field>
                        </v-col>


                        <v-col cols="12" sm="5" md="5" class="">
                            <v-text-field variant="outlined" label="Fecha" v-model="formulario.fechaD" disabled
                                required></v-text-field>
                        </v-col>


                    </v-row>
                    <v-divider></v-divider>

                    <v-card class="mt-5 rounded-x2">

                    </v-card>

                    <v-row>
                        <v-col cols="12" class="d-flex justify-end mt-2">
                            <v-btn color="#E0E0E0" class="mx-2"
                                @click="dialogoFormularioVistaVista = false">Cerrar</v-btn>

                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>

    <!-- FIN VISTA -->




    <v-container>
        <v-row>

        </v-row>

        <v-card class="mt-5 rounded-x2">

        </v-card>

        <v-row>
            <v-col cols="12" md="12" class="d-flex justify-end align-center mt-5">
                <v-btn>Cancelar </v-btn>
                <v-btn color="primary">Guardar </v-btn>
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
                    <h1 class="mb-3">Editar Pedido</h1>
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
                    <h1 class="mb-3">Editar Detalle</h1>
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
    </v-container>
</template>

<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { PedidoAPI } from '@/services/pedido.api'
import { ProductoAPI } from '@/services/producto.api'
import dayjs from 'dayjs'



export default {
    components: {
        VDataTable
    },
    data() {
        return {
            listaProducto: [], // Aquí debes definir tus opciones de productos
            detalle: {
                producto: null
            },
            formulario: {
                fechaD: '',
                descripcion: '',
                total: 0
            },
            denominaciones: [
                { valor: 50000, etiqueta: '50.000', cantidad: 0 },
                { valor: 10000, etiqueta: '10.000', cantidad: 0 },
                { valor: 5000, etiqueta: '5.000', cantidad: 0 },
                { valor: 2000, etiqueta: '2.000', cantidad: 0 },
                { valor: 1000, etiqueta: '1.000', cantidad: 0 },
                { valor: 500, etiqueta: '500', cantidad: 0 },
                { valor: 200, etiqueta: '200', cantidad: 0 },
                { valor: 100, etiqueta: '100', cantidad: 0 },
                { valor: 50, etiqueta: '50', cantidad: 0 },

            ],
            totalCaja: 0,
            totalSistema: 0,
            diferencia: 0
        };
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

    methods: {
        // Método para calcular el total de la caja
        calcularTotalCaja() {
            this.totalCaja = this.denominaciones.reduce((acc, denom) => acc + (denom.valor * denom.cantidad), 0);
        },
        // Método para calcular el total del sistema
        calcularTotalSistema() {
            // Lógica para calcular el total del sistema
        },
        // Método para calcular la diferencia
        calcularDiferencia() {
            this.diferencia = this.totalCaja - this.totalSistema;
        },
        // Método para formatear la fecha
        formatDate() {
            // Lógica para formatear la fecha
        },


    },



    created() {
        // Generar automáticamente el código al cargar el componente





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