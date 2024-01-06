

<template>
    <v-dialog max-width="2000" v-model="dialogoFormulario" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Registrar Precios</h1>
                <v-form>
                    <v-row class="">
                        <v-col cols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Nº Urbanizacion" v-model="formulario.nombre_urb"
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="2" md="2" class="mt-5">
                                <v-btn color="primary" size="small" prepend-icon="mdi mdi-plus-thick"
                                    @click="agregarDetalleAntesGuardar">Obtener</v-btn>
                            </v-col>
                        <v-col cols="12" sm="3" md="3" class="mx-0">
                            <v-text-field variant="outlined" label="Nombre de Urbanizacion" v-model="formulario.nombre_urb"
                                required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="3" md="3">
                            <input class="custom-input" v-model="formulario.fechaD" type="date"
                                placeholder="Fecha de Operacion" />
                        </v-col>







                        <!-- INICIO DETALLE -->
                        <!-- <v-divider class="mt-0"></v-divider>

                        <v-col cols="12" sm="2" md="2" class="mt-5">
                            <v-autocomplete variant="outlined" label="Lote a Urbanizar" :items="listaUrbanizar"
                                item-title="descripcionU" item-value="id" v-model="formulario.urbanizacion"
                                required></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="2" md="2" class="mt-5">
                            <v-text-field variant="outlined" label="Costo Total Lote" v-model="formulario.cantidad"
                              disabled required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3" class="mt-5">
                            <v-autocomplete variant="outlined" label="Manzana" :items="listaManzana"
                                item-title="descripcionM" item-value="id" v-model="formulario.manzana" required>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="2" md="2" class="mt-5">
                            <v-text-field variant="outlined" label="Cantidad de lotes" v-model="formulario.cantidad"
                                required></v-text-field>
                        </v-col> -->
                        <!-- <v-col cols="12" sm="2" md="2" class="mt-5">
                            <v-text-field variant="outlined" label="Precio Total" v-model="formulario.precio"
                                required></v-text-field>
                        </v-col> -->


                        <!-- <v-col cols="12" sm="3" md="3" class="mt-5">
                            <v-autocomplete variant="outlined" label="Producto" :items="listaProducto"
                                item-title="descripcionPr" item-value="id" v-model="detalle_cabecera.producto" required>
                            </v-autocomplete>
                        </v-col> -->


                        <!-- FIN DETALLE -->

                        <v-data-table class="mt-5" max-width="1500" items-per-page-text="Articulos" :headers="headers"
                            :items="listadoDeLaTabla" :group-by="groupBy">
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
                            <v-btn color="primary" @click="guardarFormulario">Guardar</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>
   <!-- INICIO EDITAR DETALLE -->
   <v-dialog max-width="1000" v-model="dialogoFormularioEditarDetalle" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3 text-center">Ingresar Precio</h1>
                <v-form>

                    <v-row class="justify-center">
                        <v-col cols="12" sm="2" md="2">
                            <v-text-field variant="outlined" label="Nª manzana" :items="listaManzana"
                                item-title="descripcionM" item-value="id" v-model="formulario.manzana" disabled required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Nombre de Urbanizacion" v-model="formulario.nombre_urb"
                                disabled required></v-text-field>
                        </v-col>
                   
                    
                        <v-col cols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Ancho del Frente:" v-model="detalle_editar.ancho_frente"
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Ancho de Atrás:" v-model="detalle_editar.ancho_atras"
                                required></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row class="justify-center">
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Longitud del Lado Izquierdo:"
                                v-model="detalle_editar.l_izquiero" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Longitud del Lado Derecho:"
                                v-model="detalle_editar.l_derecho" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Numero Lote:"
                                v-model="detalle_editar.numero_lote" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Precio Contado"
                                v-model="detalle_editar.numero_lote" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="2" md="2" >
                            <v-autocomplete variant="outlined" label="Cantidad Cuotas" :items="listaUrbanizar"
                                item-title="descripcionU" item-value="id" v-model="formulario.urbanizacion"
                                required></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Monto total Financiado"
                            disabled    v-model="detalle_editar.numero_lote" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3">
                            <v-text-field variant="outlined" label="Monto Cuotas de Financiacion"
                              disabled  v-model="detalle_editar.numero_lote" required></v-text-field>
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
import { StockAPI } from '@/services/stock.api'
import { UrbanizacionApi } from '@/services/urbanizacion.api'
import { ManzanaAPI } from '@/services/manzana.api'
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
            listaUrbanizar: [],
            listaManzana: [],
            indiceGlobal: 0,

            formulario: {
                nombre_urb: '',
                fechaD: '',
                ciudad: '',
                urbanizacion: '',
                area: '',
                ladoA: '',
                ladoB: '',
                ubicacion: '',
                cantidad: '',
                precio: '',
                descripcionM: ''
            },
            detalle_cabecera: {
                producto: '',
                manzana: ''
            },
            detalle_editar: {
                id: '',
                ancho_frente: '',
                ancho_atras: '',
                l_izquiero: '',
                l_derecho: ''
            },

            groupBy: [
                { title: 'Numero ', key: 'manzana', order: 'asc' },

            ],
            headers: [
                { title: 'Manzanas', key: 'data-table-group', order: 'asc' },
                { title: 'Producto', key: 'producto', align: 'center' },
                { title: 'Descripcion', key: 'descripcionPr', align: 'center' },
                { title: 'Codigo', key: 'id', align: 'center' },
                { title: 'Nombre de Urbanizacion', key: 'nombre_urb', align: 'center' },
                { title: 'Numero de Lote', key: 'numero_lote', align: 'center' },
                { title: 'Numero Manzana', key: 'manzana', align: 'center' },
                { title: 'Costo', key: 'costo', align: 'center' },
                { title: 'Ancho del Frente:', key: 'ancho_frente', align: 'center' },
                { title: 'Ancho de Atrás:', key: 'ancho_atras', align: 'center' },
                { title: 'Longitud del Lado Izquierdo:', key: 'l_izquiero', align: 'center' },
                { title: 'Longitud del Lado Derecho:', key: 'l_derecho', align: 'center' },
                { title: 'Precio Contado:', key: 'P_contado', align: 'center' },
                { title: 'Precio Financiado:', key: 'P_financiado', align: 'center' },
                // { title: 'Precio por Lote', key: 'precio_ind', align: 'center' },
                // { title: 'Ubicacion', key: 'ubicacion', align: 'center' },
                // { title: 'Cantidad de lotes', key: 'cantidad', align: 'center' },
                // { title: 'Numero Lote', key: 'numero_lot', align: 'center' },
                // { title: 'Area', key: 'area', align: 'center' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' }
            ],
            listadoDeLaTabla: []
        }
    },
    created() {
        this.ObtenerProducto();
        this.ObtenerCiudades();
        this.ObtenerStock();
        this.ObtenerManzana();
    },
    methods: {
        ObtenerProducto() {
            ProductoAPI.findByTipo(3).then(({ data }) => {
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
        ObtenerStock() {
            StockAPI.findByTipo(4).then(({ data }) => {
                this.listaUrbanizar = data.map(item => {
                    return {
                        id: item.idStock,
                        descripcionU: item.nombreproducto
                    }
                })
            })
        },
        ObtenerManzana() {
            ManzanaAPI.getAll().then(({ data }) => {
                this.listaManzana = data.map(item => {
                    return {
                        id: item.idManzana,
                        numero_manzana: item.numero_manzana,
                        descripcionM: item.Descripcion
                    }
                })
            })
        },
        agregarDetalleAntesGuardar() {
            const productoSeleccionado = this.listaProducto.find(item => item.id === this.detalle_cabecera.producto);

            // Buscar la descripción de la manzana seleccionada
            const manzanaSeleccionada = this.listaManzana.find(item => item.id === this.formulario.manzana);
            const descripcionManzana = manzanaSeleccionada ? manzanaSeleccionada.descripcionM : '';

            const cantidad = this.formulario.cantidad;


            // Agregar  detalle segun la cantidad ingresada
            for (let indice = 0; indice < cantidad; indice++) {
                this.indiceGlobal = this.indiceGlobal + 1
                this.listadoDeLaTabla.push({
                    producto: productoSeleccionado.id,
                    descripcionPr: productoSeleccionado.descripcionPr,
                    id: this.indiceGlobal,
                    precio_ind: this.formulario.precio_ind,
                    nombre_urb: this.formulario.nombre_urb,
                    cantidad: this.formulario.cantidad,
                    ubicacion: '',
                    manzana: descripcionManzana,
                    // descripcionM: this.formulario.idManzana,
                    numero_lot: '',
                    area: '',
                    ancho_frente: '',
                    ancho_atras: '',
                    l_izquiero: '',
                    l_derecho: '',
                    action: '',
                });
            }
            this.formulario.cantidad = '';
            this.formulario.manzana = '';
            this.detalle_cabecera.producto = '';
            // this.$refs.formulario.nombre_urb.setAttribute('disabled', false);


        },
        editarDetalleAntesGuardar(parametro) {

            this.dialogoFormularioEditarDetalle = true
            this.detalle_editar.id = parametro.id
            this.detalle_editar.ancho_frente = parametro.ancho_frente
            this.detalle_editar.ancho_atras = parametro.ancho_atras
            this.detalle_editar.l_izquiero = parametro.l_izquiero
            this.detalle_editar.l_derecho = parametro.l_derecho


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
                idStock: this.formulario.urbanizacion,
                Detalle: this.listadoDeLaTabla.map(elemento => ({
                    idProducto: elemento.producto,
                    id_detalle: elemento.id,
                    Ubicacion: elemento.ubicacion,
                    Numero_manzana: elemento.manzana,
                    Numero_lote: elemento.numero_lot,
                    Area: elemento.area,
                    Precio_Lote: elemento.precio_ind
                }))
            }).then(() => {
                this.cerrarDialogo()
            });
        },
        guardarFormularioEditarDetalle() {
            if (!this.detalle_editar.ancho_frente || !this.detalle_editar.ancho_atras || !this.detalle_editar.l_izquiero || !this.detalle_editar.l_derecho || !this.detalle_editar.numero_lote)  {
                return;
            }
            // Busca el índice del elemento que se va a editar
            const indice = this.listadoDeLaTabla.findIndex(item => item.id == this.detalle_editar.id);
            // Si se encontró el elemento, actualiza sus datos
            this.listadoDeLaTabla[indice].ancho_frente = this.detalle_editar.ancho_frente;
            this.listadoDeLaTabla[indice].ancho_atras = this.detalle_editar.ancho_atras;
            this.listadoDeLaTabla[indice].l_izquiero = this.detalle_editar.l_izquiero;
            this.listadoDeLaTabla[indice].l_derecho = this.detalle_editar.l_derecho;
            this.listadoDeLaTabla[indice].numero_lote = this.detalle_editar.numero_lote;

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