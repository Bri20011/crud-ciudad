

<template>
    <!-- INICIO VISTA DE URBANIZACION REGISTRADOS  -->
    <v-dialog max-width="1500" v-model="dialogoFormularioVista" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Registros de UrbanizacionRRR</h1>
                <v-form>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field variant="outlined" label="Nombre de Urbanizacion" v-model="datosSelec.nombre_urb"
                                required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="3" md="3">
                            <input class="custom-input" v-model="datosSelec.fechaD" type="date"
                                placeholder="Fecha de Operacion" />
                        </v-col>

                        <v-col cols="12" sm="6" md="6" class="mt-0">
                            <v-autocomplete variant="outlined" label="Barrio" :items="listaBarrio" item-title="descripcionB"
                                item-value="id" v-model="datosSelec.idBarrio" required></v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="6" md="6" class="mt-0">
                            <v-autocomplete variant="outlined" label="Ciudad" :items="listaCiudad" item-title="descripcionC"
                                item-value="id" v-model="datosSelec.idCiudad" required></v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="6" md="6" class="mt-0">
                            <v-text-field variant="outlined" label="Ubicacion" v-model="datosSelec.ubicacion"
                                required></v-text-field>
                        </v-col>
                      
                        <v-col cols="12" sm="3" md="3" class="mt-0">
                            <v-text-field variant="outlined" label="Costo Total Lote" v-model="datosSelec.costo"
                                required></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>


            <!-- INICIO VISTA DE URBANIZACION REGISTRADOS  -->

            <v-container>

                <v-data-table class="mt-5" max-width="1500" items-per-page-text="Articulos" :headers="headers"
                    :items="datosSelec.detalleItems" :group-by="groupBy">
                    <template v-slot:item.action="{ item }">

                    </template>
                </v-data-table>
                <v-row>
                    <v-col cols="12" class="d-flex justify-end mt-2">
                        <v-btn color="#E0E0E0" class="mx-2" @click="cerrarDialogoVista">Cerrar</v-btn>

                    </v-col>
                </v-row>

            </v-container>

        </v-card>
    </v-dialog>
</template>
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { ProductoAPI } from '@/services/producto.api'
import { CiudadAPI } from '@/services/ciudad.api'
import { BarrioAPI } from '@/services/barrio.api'
import { StockLoteAPI } from '@/services/stock_lote.api'
import { UrbanizacionApi } from '@/services/urbanizacion.api'
import { ManzanaAPI } from '@/services/manzana.api'
export default {
    components: {
        VDataTable
    },

    props: {
        datosSelec: {
            type: Object
        }
    },

    data() {
        return {
            dialogoFormulario: true,
            dialogoFormularioEditarDetalle: false,
            dialogoFormularioVista: true,
            listaCiudad: [],
            listaBarrio: [],
            listaProducto: [],
            listaUrbanizar: [],
            listaManzana: [],
            indiceGlobal: 0,

            formulario: {
                nombre_urb: '',
                fechaD: '',
                ciudad: '',
                barrio: '',
                urbanizacion: '',
                ubicacion: '',
                cantidad: '',
                costo: '',
                descripcionM: '',
                manzana: ''
            },

            detalle_cabecera: {
                producto: '',
                // manzana: ''
            },
            detalle_editar: {
                id: '',
                ancho_frente: '',
                ancho_atras: '',
                l_izquiero: '',
                l_derecho: '',
                costo_urbanizacion: '',

            },

            // groupBy: [
            //     { title: 'Numero ', key: 'manzana', order: 'asc' },

            // ],
            headers: [
                { title: 'Manzanas', key: 'nombremanzana', order: 'asc' },
                { title: 'Producto', key: 'idProducto', align: 'center' },
                { title: 'Descripcion', key: 'descripcionPr', align: 'center' },
                { title: 'Codigo', key: 'id', align: 'center' },
                { title: 'Nombre de Urbanizacion', key: 'nombre_urb', align: 'center' },
                { title: 'Numero de Lote', key: 'numero_lote', align: 'center' },
                { title: 'Numero Manzana', key: 'manzana', align: 'center' },
                { title: 'Ancho del Frente:', key: 'ancho_frente', align: 'center' },
                { title: 'Ancho de Atrás:', key: 'ancho_atras', align: 'center' },
                { title: 'Longitud del Lado Izquierdo:', key: 'l_izquiero', align: 'center' },
                { title: 'Longitud del Lado Derecho:', key: 'l_derecho', align: 'center' },
                { title: 'Costo por Lote:', key: 'costo_urbanizacion', align: 'center' },

            ],
            listadoDeLaTabla: []
        }
    },
    created() {
        this.ObtenerProducto();
        this.ObtenerCiudades();
        this.ObtenerBarrio();
        this.ObtenerStock_Lote();
        this.ObtenerManzana();
        console.log('datosSelec', this.datosSelec);
        this.formulario.nombre_urb = this.datosSelec.nombre_urb;
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
        ObtenerBarrio() {
            BarrioAPI.getAll().then(({ data }) => {
                this.listaBarrio = data.map(item => {
                    return {
                        id: item.idBarrio,
                        descripcionB: item.descripcion
                    }
                })
            })
        },
        ObtenerStock_Lote() {
            StockLoteAPI.findByTipo(4).then(({ data }) => {
                this.listaUrbanizar = data.map(item => {
                    return {
                        id: item.idStock_Lote,
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
                const numero_lote = indice + 1;

                this.listadoDeLaTabla.push({
                    producto: productoSeleccionado.id,
                    descripcionPr: productoSeleccionado.descripcionPr,
                    id: this.indiceGlobal,
                    precio_ind: this.formulario.precio_ind,
                    nombre_urb: this.formulario.nombre_urb,
                    cantidad: this.formulario.cantidad,
                    ubicacion: '',
                    manzana: descripcionManzana,
                    idManzana: this.formulario.manzana,
                    numero_lote: numero_lote,
                    area: '',
                    ancho_frente: '',
                    ancho_atras: '',
                    l_izquiero: '',
                    l_derecho: '',
                    costo_urbanizacion: '',
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
            this.formulario.manzana = parametro.manzana
            this.detalle_editar.costo_urbanizacion = this.formulario.costo / this.formulario.total_lote_generar;
            this.detalle_editar.numero_lote = parametro.numero_lote


        },
        cerrarDialogoVista() {
            this.$emit('cerrar-dialogo-v')
        },


        guardarFormulario() {
            console.log('Listado de la tabla', this.listadoDeLaTabla);
            UrbanizacionApi.create({
                idUrbanizacion: '',
                Nombre_Urbanizacion: this.formulario.nombre_urb,
                fecha_urb: this.formulario.fechaD,
                idBarrio: this.formulario.barrio,
                idCiudad: this.formulario.ciudad,
                Ubicacion: this.formulario.ubicacion,
                Costo_total: this.formulario.costo,
                idStock_Lote: this.formulario.urbanizacion,
                // OJO Cantidad_manzana: this.formulario.cantidad,    Agregar a cabecera 

                Detalle: this.listadoDeLaTabla.map(elemento => ({
                    idProducto: elemento.producto,
                    id_detalle: elemento.id,
                    idManzana: elemento.idManzana,
                    Numero_lote: elemento.numero_lote,
                    ancho_frente: elemento.ancho_frente,
                    ancho_atras: elemento.ancho_atras,
                    long_izquierdo: elemento.l_izquiero,
                    long_derecho: elemento.l_derecho,
                    costo_urbanizacion: elemento.costo_urbanizacion,

                }))
            }).then(() => {
                this.cerrarDialogoVista()
            });
        },
        guardarFormularioEditarDetalle() {
            if (!this.detalle_editar.ancho_frente || !this.detalle_editar.ancho_atras || !this.detalle_editar.l_izquiero || !this.detalle_editar.l_derecho || !this.detalle_editar.numero_lote) {
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
            this.listadoDeLaTabla[indice].costo_urbanizacion = this.detalle_editar.costo_urbanizacion;


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