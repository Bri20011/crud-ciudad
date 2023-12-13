

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
                                placeholder="Fecha de Operacion" />
                        </v-col>

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
                            <v-text-field variant="outlined" label="Precio Total" v-model="formulario.precio"
                                required></v-text-field>
                        </v-col>


                        <!-- INICIO DETALLE -->
                        <v-divider class="mt-0"></v-divider>

                        <v-row>
                            <v-col cols="12" sm="5" md="5" class="mt-5">
                                <v-autocomplete variant="outlined" label="Descripcion" :items="listaProducto"
                                    item-title="descripcionPr" item-value="id" v-model="detalle_cabecera.producto" required>
                                </v-autocomplete>
                            </v-col>


                            <v-col cols="12" class="d-flex justify-end">
                                <v-btn color="primary" size="small" prepend-icon="mdi mdi-plus-thick"
                                    @click="agregarDetalleAntesGuardar">Calcular</v-btn>
                            </v-col>
                        </v-row>
                        <!-- FIN DETALLE -->

                        <v-data-table items-per-page-text="Articulos" :headers="headers" :items="listadoDeLaTabla">
                            <template v-slot:item.action="{ item }">
                                <v-icon size="small" class="me-2" @click="editarDetalleAntesGuardar(item.raw)">
                                    mdi-pencil
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="d-flex justify-end">
                            <v-btn color="#E0E0E0" class="mx-2" @click="cerrarDialogo">Cancelar</v-btn>
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
                                item-title="descripcionPr" item-value="id" v-model="detalle_editar.producto"
                                required></v-autocomplete>
                        </v-col>

                        <v-col ols="12" sm="2" md="2">
                            <v-text-field variant="outlined" label="Ubicacion"
                                v-model="detalle_editar.ubicacion"></v-text-field>
                        </v-col>
                        <v-col ols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Numero Manzana"
                                v-model="detalle_editar.numero_manz"></v-text-field>
                        </v-col>
                        <v-col ols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Numero Lote"
                                v-model="detalle_editar.numero_lot"></v-text-field>
                        </v-col>
                        <v-col ols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Area" v-model="detalle_editar.area"></v-text-field>
                        </v-col>
                        <v-col ols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Precio del Lote"
                                v-model="detalle_editar.precio_ind"></v-text-field>
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
</template>
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { ProductoAPI } from '@/services/producto.api'
import { CiudadAPI } from '@/services/ciudad.api'
import { UrbanizacionApi } from '@/services/urbanizacion.api'
export default {
    components: {
        VDataTable
    },
    props: {
        prop_dialogo_formulario: {
            type: Boolean
        }
    },
    data() {
        return {
            dialogoFormulario: true,
            dialogoFormularioEditarDetalle: false,
            listaCiudad: [],
            listaProducto: [],
            formulario: {
                nombre_urb: '',
                fechaD: '',
                ciudad: '',
                area: '',
                ladoA: '',
                ladoB: '',
                ubicacion: '',
                cantidad: '',
                precio: ''
            },
            detalle_cabecera: {
                producto: ''
            },
            detalle_editar: {
                id: '',
                producto: '',
                ubicacion: '',
                numero_manz: '',
                numero_lot: '',
                area: '',
                precio_ind: ''
            },
            headers: [
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
            listadoDeLaTabla: []
        }
    },
    created() {
        this.ObtenerProducto();
        this.ObtenerCiudades();
    },
    methods: {
        ObtenerProducto() {
            ProductoAPI.findByTipo(1).then(({ data }) => {
                this.listaProducto = data.map(item => {
                    return {
                        id: item.idProducto,
                        descripcionPr: item.Descripcion,

                    }
                })
            })
        },
        ObtenerCiudades() {
            CiudadAPI.getAll().then(({ data }) => {
                this.listaCiudad = data.map(item => {
                    return {
                        id: item.idCiudad,
                        descripcionC: item.Descripcion
                    }
                })
            })
        },
        agregarDetalleAntesGuardar() {
            const productoSeleccionado = this.listaProducto.find(item => item.id === this.detalle_cabecera.producto);

            const cantidad = this.formulario.cantidad;

            // Agregar  detalle segun la cantidad ingresada
            for (let indice = 0; indice < cantidad; indice++) {
                this.listadoDeLaTabla.push({
                    producto: productoSeleccionado.id,
                    descripcionPr: productoSeleccionado.descripcionPr,
                    id: indice,
                    precio_ind: this.formulario.precio / cantidad,
                    ubicacion: '',
                    numero_manz: '',
                    numero_lot: '',
                    area: '',
                    action: '',
                });
            }

        },
        editarDetalleAntesGuardar(parametro) {
            this.dialogoFormularioEditarDetalle = true
            this.detalle_editar = {...parametro}
        },
        cerrarDialogo() {
            this.$emit('cerrar-dialogo')
        },
       
               
        guardarFormulario() {
            UrbanizacionApi.create({
                idUrbanizacion: '',
                fecha_urb: this.formulario.fechaD,
                Nombre_Urbanizacion: this.formulario.nombre_urb,
                Area: this.formulario.area,
                LadoA: this.formulario.ladoA,
                LadoB: this.formulario.ladoB,
                Cantidad_manzana: this.formulario.cantidad,
                Ubicacion: this.formulario.ubicacion,
                Precio: this.formulario.precio,
                idCiudad: this.formulario.ciudad,
                Detalle: this.listadoDeLaTabla.map(elemento => ({
                    idProducto: elemento.producto,
                    id_detalle: elemento.id,
                    Ubicacion: elemento.ubicacion,
                    Numero_manzana: elemento.numero_manz,
                    Numero_lote: elemento.numero_lot,
                    Area: elemento.area,
                    Precio_Lote: elemento.precio_ind
                }))
            }).then(() => {
                this.cerrarDialogo()
            });
        },
        guardarFormularioEditarDetalle() {
            if (!this.detalle_editar.producto || !this.detalle_editar.ubicacion || !this.detalle_editar.precio_ind || !this.detalle_editar.numero_manz || !this.detalle_editar.numero_lot) {
                return;
            }
            // Busca el índice del elemento que se va a editar
            const indice = this.listadoDeLaTabla.findIndex(item => item.id == this.detalle_editar.id);

            // Si se encontró el elemento, actualiza sus datos
            this.listadoDeLaTabla[indice].ubicacion = this.detalle_editar.ubicacion;
            this.listadoDeLaTabla[indice].numero_manz = this.detalle_editar.numero_manz;
            this.listadoDeLaTabla[indice].numero_lot = this.detalle_editar.numero_lot;
            this.listadoDeLaTabla[indice].area = this.detalle_editar.area;
            this.listadoDeLaTabla[indice].precio_ind = this.detalle_editar.precio_ind;


            this.dialogoFormularioEditarDetalle = false;
        },
    }
}
</script>
<style scoped>
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