<template>
    <!-- INICIO CABECERA -->
    <v-dialog max-width="1500" v-model="dialogoFormulario" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Registrar Urbanizacion</h1>
                <v-form>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field variant="outlined" label="Nombre de Urbanizacion"
                                v-model="formulario.nombre_urb" required></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="3" md="3">
                            <input class="custom-input" v-model="formulario.fechaD" type="date"
                                placeholder="Fecha de Operacion" />
                        </v-col>

                        <v-col cols="12" sm="6" md="6" class="mt-0">
                            <v-autocomplete variant="outlined" label="Barrio" :items="listaBarrio"
                                item-title="descripcionB" item-value="id" v-model="formulario.barrio"
                                required></v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="6" md="6" class="mt-0">
                            <v-autocomplete variant="outlined" label="Ciudad" :items="listaCiudad"
                                item-title="descripcionC" item-value="id" v-model="formulario.ciudad"
                                required></v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="6" md="6" class="mt-0">
                            <v-text-field variant="outlined" label="Ubicacion" v-model="formulario.ubicacion"
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3" class="mt-0">
                            <v-text-field type="number" variant="outlined" label="Total Lotes a Generar"
                                v-model="formulario.total_lote_generar" :disabled="detalleAgregado"
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3" class="mt-0">
                            <v-text-field type="number" variant="outlined" label="Costo Total Lote"
                                v-model="formulario.costo" :disabled="detalleAgregado" required></v-text-field>
                        </v-col>
                        <!-- FIN CABECERA -->




                        <!-- INICIO DETALLE -->
                        <v-divider class="mt-0"></v-divider>

                        <v-col cols="12" sm="2" md="2" class="mt-5">
                            <v-autocomplete variant="outlined" label="Lote a Urbanizar" :items="listaUrbanizar"
                                item-title="descripcionU" item-value="id" v-model="formulario.urbanizacion"
                                :disabled="detalleAgregado" required></v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="3" md="3" class="mt-5">
                            <v-autocomplete variant="outlined" label="Manzana" :items="listaManzana"
                                item-title="descripcionM" item-value="id" v-model="formulario.manzana" required>
                            </v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="3" md="3" class="mt-5">
                            <v-text-field type="number" variant="outlined" label="Cantidad de lotes"
                                v-model="formulario.cantidad" required></v-text-field>
                        </v-col>
                        <v-row class="d-flex align-end mt-5">
                            <v-col cols="12" sm="8" md="8">
                                <v-btn color="primary" size="small" prepend-icon="mdi mdi-plus-thick"
                                    @click="agregarDetalleAntesGuardar"
                                    :disabled="!formulario.urbanizacion || !formulario.manzana || !formulario.cantidad">Agregar</v-btn>
                            </v-col>
                        </v-row>
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
                            <v-btn color="primary" @click="guardarFormulario"
                                :disabled="!formulario.nombre_urb || !formulario.fechaD || !formulario.barrio || !formulario.ciudad || !formulario.ubicacion || !formulario.total_lote_generar || !formulario.costo || !detalle_editar.l_derecho">Guardarr</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>


    <!-- INICIO EDITAR DETALLE -->
    <v-dialog max-width="600" v-model="dialogoFormularioEditarDetalle" persistent>

        <v-card class="rounded-xl">

            <v-container>
                <h1 class="mb-3 text-center">Ingresar Detalle</h1>
                <v-form>

                    <v-row class="justify-center">
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Numero de manzana" :items="listaManzana"
                                item-title="descripcionM" item-value="id" v-model="formulario.manzana" disabled
                                required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Nombre de Urbanizacion"
                                v-model="formulario.nombre_urb" disabled required></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row class="justify-center">
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Costo por Lote:"
                                v-model="detalle_editar.costo_urbanizacion" disabled required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Numero Lote:" v-model="detalle_editar.numero_lote"
                                disabled required></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row class="justify-center">
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field type="number" variant="outlined" label="Ancho del Frente:"
                                v-model="detalle_editar.ancho_frente" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field type="number" variant="outlined" label="Ancho de Atrás:"
                                v-model="detalle_editar.ancho_atras" required></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row class="justify-center">
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field type="number" variant="outlined" label="Longitud del Lado Izquierdo:"
                                v-model="detalle_editar.l_izquiero" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field type="number" variant="outlined" label="Longitud del Lado Derecho:"
                                v-model="detalle_editar.l_derecho" required></v-text-field>
                        </v-col>
                    </v-row>


                    <v-row>
                        <v-col cols="12" class="d-flex justify-end">
                            <v-btn color="#E0E0E0" class="mx-2"
                                @click="dialogoFormularioEditarDetalle = false">Cancelar</v-btn>
                            <v-btn color="primary" @click="guardarFormularioEditarDetalle"
                                :disabled="!detalle_editar.ancho_frente || !detalle_editar.ancho_atras || !detalle_editar.l_izquiero || !detalle_editar.l_derecho">Guardar</v-btn>
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
import { BarrioAPI } from '@/services/barrio.api'
import { StockLoteAPI } from '@/services/stock_lote.api'
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
            detalleAgregado: false,
            dialogoFormulario: true,
            dialogoFormularioEditarDetalle: false,
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
                { title: 'Ancho del Frente:', key: 'ancho_frente', align: 'center' },
                { title: 'Ancho de Atrás:', key: 'ancho_atras', align: 'center' },
                { title: 'Longitud del Lado Izquierdo:', key: 'l_izquiero', align: 'center' },
                { title: 'Longitud del Lado Derecho:', key: 'l_derecho', align: 'center' },
                { title: 'Costo por Lote:', key: 'costo_urbanizacion', align: 'center' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' }
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
    },
    methods: {
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
            StockLoteAPI.findByTipo(2).then(({ data }) => {
                this.listaUrbanizar = data.map(item => {
                    return {
                        id: item.idStock_Lote,
                        idProducto: item.idProducto,
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
            const productoDeStock = this.listaUrbanizar.find(item => item.id === this.formulario.urbanizacion);



            if (parseInt(this.formulario.cantidad) > parseInt(this.formulario.total_lote_generar)) {
                // La cantidad ingresada es mayor que el total de lotes a generar
                alert("La cantidad de lotes no puede ser mayor que el total de lotes a generar1.");
                return;
            }

            const totalLotesAGenerar = parseInt(this.formulario.total_lote_generar);
            const cantidadDetallesAgregados = this.listadoDeLaTabla.length;

            // Validar si agregar un nuevo detalle excederá la cantidad máxima de lotes
            if (totalLotesAGenerar <= cantidadDetallesAgregados) {
                // Se ha alcanzado o superado la cantidad máxima de lotes a generar
                alert("La cantidad de lotes a generar ya se ha alcanzado o superado2.");
                return;
            }
            const manzanaExistente = this.listadoDeLaTabla.some(detalle => detalle.manzana === descripcionManzana);
            if (manzanaExistente) {
                // La manzana ya existe en la tabla
                alert("La manzana ya ha sido agregada. No se puede agregar más de una vez.");
                return;
            }


            // Validación: Total lotes a generar y costo total de lote no pueden ser valores negativos
            if (totalLotesAGenerar < 0 || this.formulario.costo < 0 || this.formulario.cantidad < 0) {
                // Se ha ingresado un valor negativo
                alert("No se pueden ingresar valores negativos.");
                return;
            }

            const cantidad = this.formulario.cantidad;


            // total_lote_generar
            // Agregar  detalle segun la cantidad ingresada
            for (let indice = 0; indice < cantidad; indice++) {
                this.indiceGlobal = this.indiceGlobal + 1
                const numero_lote = indice + 1;
                this.listadoDeLaTabla.push({
                    producto: productoDeStock.idProducto,
                    descripcionPr: productoDeStock.descripcionU,
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
                this.detalleAgregado = true;
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
        cerrarDialogo() {
            this.$emit('cerrar-dialogo')
        },


        guardarFormulario() {
            console.log('Listado de la tabla', this.listadoDeLaTabla);
            const productoDeStock = this.listaUrbanizar.find(item => item.id === this.formulario.urbanizacion);

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
                this.cerrarDialogo()
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