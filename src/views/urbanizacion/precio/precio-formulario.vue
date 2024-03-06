

<template>
    <!-- INICIO CABECERA -->
    <v-dialog max-width="1500" v-model="dialogoFormulario" persistent>
        <v-card class="rounded-xl">
            <v-container>
                <h1 class="mb-3">Registrar Precios de Lotes</h1>
                <v-form>
                    <v-row>

                        <v-col cols="12" sm="5" md="5" class="mt-0">
                            <v-autocomplete variant="outlined" label="Selecione Urbanizacion" :items="listaUrbanizar"
                                item-title="descripcionU" item-value="id" v-model="formulario.urbanizacion"
                                required></v-autocomplete>
                        </v-col> 

                        <v-col cols="12" class="mt-4" sm="2" md="2">
                            <v-btn @click="ObtenerCodigoOrden">Obtener</v-btn>
                        </v-col>

                        <v-col cols="12" sm="3" md="3">
                            <input class="custom-input" v-model="formulario.fechaD" type="date"
                                placeholder="Fecha de Operacion" />
                        </v-col>

                        <v-col cols="12" sm="3" md="3" class="mt-0">
                            <v-autocomplete variant="outlined" label="Barrio" :items="listaBarrio" item-title="descripcionB"
                            disabled  item-value="id" v-model="formulario.barrio" required></v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="3" md="3" class="mt-0">
                            <v-autocomplete variant="outlined" label="Ciudad" :items="listaCiudad" item-title="descripcionC"
                            disabled  item-value="id" v-model="formulario.ciudad" required></v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="3" md="3" class="mt-0">
                            <v-text-field variant="outlined" label="Ubicacion" v-model="formulario.ubicacion"
                            disabled   required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="3" md="3" class="mt-0">
                            <v-text-field variant="outlined" label="Costo Total Lote" v-model="formulario.costo"
                            disabled   required></v-text-field>
                        </v-col>

                        <!-- FIN CABECERA -->

                        <!-- INICIO DETALLE -->
                        <v-divider class="mt-0 mb-1"></v-divider>

                     
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Precio Contado" v-model="detalle_cabecera.precioContado"
                                 required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Monto Total Credito" v-model="detalle_cabecera.precioCredito"
                                 required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Monto Cuota Credito" v-model="detalle_cabecera.montoCredito"
                                 required></v-text-field>
                        </v-col>      

                        <v-row class="d-flex align-end  mt-5">
                            <v-col cols="12" sm="8" md="8">
                                <v-btn color="primary" size="small" prepend-icon="mdi mdi-plus-thick"
                                    @click="agregarDetalleAntesGuardar">Agregar</v-btn>
                            </v-col>
                        </v-row>
                        <!-- FIN DETALLE -->

                        <v-data-table class="mt-5" max-width="1500" items-per-page-text="Articulos" :headers="headers"
                            :items="datosUrbanizacion.itemsDetalle" :group-by="groupBy">
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


    <!-- INICIO EDITAR DETALLE SIN GUARDAR-->
    <v-dialog max-width="600" v-model="dialogoFormularioEditarDetalle" persistent>

        <v-card class="rounded-xl">

            <v-container>
                <h1 class="mb-3 text-center">Ingresar Detalle</h1>
                <v-form>

                    <v-row class="justify-center">
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Nombre de Urbanizacion" v-model="detalle_editar.nombre_urb"
                                disabled required></v-text-field>
                        </v-col>  
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Numero de manzana" :items="listaManzana"
                                item-title="descripcionM" item-value="id" v-model="detalle_editar.manzana" disabled required>
                            </v-text-field>
                        </v-col>        
                    </v-row>

                    <v-row class="justify-center">
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Numero Lote:" v-model="detalle_editar.Numero_lote"
                            disabled  required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Costo por Lote:" v-model="detalle_editar.costo_urbanizacion"
                                disabled required></v-text-field>
                        </v-col>
                       
                    </v-row>

                    <v-row class="justify-center">
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Ancho del Frente:" v-model="detalle_editar.ancho_frente"
                            disabled  required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Ancho de Atrás:" v-model="detalle_editar.ancho_atras"
                            disabled  required></v-text-field>
                        </v-col>

                    </v-row>

                    <v-row class="justify-center">
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Longitud del Lado Izquierdo:"
                            disabled v-model="detalle_editar.long_izquierdo" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Longitud del Lado Derecho:"
                            disabled  v-model="detalle_editar.long_izquierdo" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Codigo:"
                            disabled  v-model="detalle_editar.id_detalle" required></v-text-field>
                        </v-col>
                    </v-row>
                   <v-row class="justify-center">
                    <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Precio Contado" v-model="detalle_editar.precioContado"
                                 required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Monto Total Credito" v-model="detalle_editar.precioCredito"
                                 required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-text-field variant="outlined" label="Monto Cuota Credito" v-model="detalle_editar.montoCredito"
                                 required></v-text-field>
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
    <!-- FIN EDITAR DETALLE SIN GUARDAR -->




</template>
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { ProductoAPI } from '@/services/producto.api'
import { CiudadAPI } from '@/services/ciudad.api'
import { BarrioAPI } from '@/services/barrio.api'
import { StockLoteAPI } from '@/services/stock_lote.api'
import { UrbanizacionApi } from '@/services/urbanizacion.api'
import { PrecioApi } from '@/services/precio.api'
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
            datosUrbanizacion: {
                itemsDetalle: []
            },
            detalle_cabecera: {
                producto: '',
                // manzana: ''
            },
            formularioEditar: {
                manzana: '',
                nombre_urb: '',
               
            },
            detalle_editar: {
                id: '',
                ancho_frente: '',
                ancho_atras: '',
                long_derecho: '',
                long_izquierdo: '',
                costo_urbanizacion: '',
                Numero_lote: '',
                precioContado: '',
                precioCredito: '',
                montoCredito: '',

            },

            groupBy: [
                { title: 'Numero ', key: 'nombreManzana', order: 'asc' },

            ],
            headers: [
                { title: 'Manzanas', key: 'data-table-group', order: 'asc' },
                { title: 'Producto', key: 'idProducto', align: 'center' },
                { title: 'Descripcion', key: 'nomnbreProducto', align: 'center' },
                { title: 'Codigo', key: 'id_detalle', align: 'center' }, 

                // { title: 'Nombre de Urbanizacion', key: 'nombre_urb', align: 'center' },
                { title: 'Numero de Lote', key: 'Numero_lote', align: 'center' },
                { title: 'Numero Manzana', key: 'nombreManzana', align: 'center' },
                { title: 'Ancho del Frente:', key: 'ancho_frente', align: 'center' },
                { title: 'Ancho de Atrás:', key: 'ancho_atras', align: 'center' },
                { title: 'Longitud del Lado Izquierdo:', key: 'long_izquierdo', align: 'center' },
                { title: 'Longitud del Lado Derecho:', key: 'long_derecho', align: 'center' },
                { title: 'Costo por Lote:', key: 'costo_urbanizacion', align: 'center' },
                { title: 'Precio Contado:', key: 'precioContado', align: 'center' },
                { title: 'Precio Credito:', key: 'precioCredito', align: 'center' },
                { title: 'Monto Cuota Credito:', key: 'montoCredito', align: 'center' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' }
            ],
            listadoDeLaTabla: [],
            detalles: [],
        }
    },
    created() {
        this.ObtenerProducto();
        this.ObtenerCiudades();
        this.ObtenerBarrio();
        this.ObtenerStock_Lote();
        this.ObtenerManzana();
        this.ObtenerUrbanizacion();
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
        ObtenerUrbanizacion() {
            UrbanizacionApi.getAll().then(({ data }) => {
                this.listaUrbanizacion = data.map(item => {
                    return {
                        id: item.idUrbanizacion,
                        fechaD: item.fecha_urb,
                        nombre_urb: item.Nombre_Urbanizacion, 
                        area: item.Area,
                        ladoA: item.LadoA,
                        ladoB: item.LadoB,
                        cantidad: item.Cantidad_manzana,
                        manzana: item.idManzana,
                        ubicacion: item.Ubicacion,
                        costo: item.Costo_total,
                        precio: item.Precio,
                        idCiudad: item.idCiudad,
                        nombreciudad: item.nombreciudad,
                        idBarrio: item.idBarrio,
                        nombrebarrio: item.nombrebarrio,
                        detalleItems: item.detalle_urbanizacion
                    }
                })
            })
        },



        agregarDetalleAntesGuardar() {
    // Itera sobre los detalles existentes
    for (let detalle of this.datosUrbanizacion.itemsDetalle) {
        // Actualiza los precios en cada detalle existente
        detalle.precioContado = this.detalle_cabecera.precioContado;
        detalle.precioCredito = this.detalle_cabecera.precioCredito;
        detalle.montoCredito = this.detalle_cabecera.montoCredito; 
        // Otros campos de detalle que necesites actualizar
    }
    // Limpia los campos después de actualizar los detalles si es necesario
    this.detalle_cabecera.precioContado = '';
    this.detalle_cabecera.precioCredito = '';
    this.detalle_cabecera.montoCredito = '';
},

        editarDetalleAntesGuardar(parametro) {
            this.dialogoFormularioEditarDetalle = true
            this.detalle_editar.id = parametro.id
            this.detalle_editar.id_detalle = parametro.id_detalle
            this.detalle_editar.nombre_urb = parametro.nomnbreProducto
            this.detalle_editar.costo_urbanizacion = parametro.costo_urbanizacion
            this.detalle_editar.ancho_frente = parametro.ancho_frente
            this.detalle_editar.ancho_atras = parametro.ancho_atras
            this.detalle_editar.long_izquierdo = parametro.long_izquierdo
            this.detalle_editar.long_derecho = parametro.long_derecho
            this.detalle_editar.manzana = parametro.nombreManzana
            this.detalle_editar.precioContado = parametro.precioContado
            this.detalle_editar.precioCredito = parametro.precioCredito
            this.detalle_editar.montoCredito = parametro.montoCredito
            this.detalle_editar.Numero_lote = parametro.Numero_lote
         


        },
        cerrarDialogo() {
            this.$emit('cerrar-dialogo')
        },


        guardarFormulario() {
            console.log('Listado de la tabla', this.listadoDeLaTabla);
            PrecioApi.create({
                idListado_precio: '',
                Nombre_Urbanizacion: this.detalle_editar.nombre_urb,
                fecha: this.formulario.fechaD,
                Ubicacion: this.formulario.ubicacion,
                idCiudad: this.formulario.ciudad,
                idBarrio: this.formulario.barrio,
                Costo_total: this.formulario.costo,
                idUrbanizacion: this.formulario.urbanizacion,
                // OJO Cantidad_manzana: this.formulario.cantidad,    Agregar a cabecera 

                Detalle: this.datosUrbanizacion.itemsDetalle.map(elemento => ({
                    idProducto: elemento.idProducto,
                    id_detalle: elemento.id_detalle,
                    idManzana: elemento.idManzana,
                    Numero_lote: elemento.Numero_lote,
                    ancho_frente: elemento.ancho_frente,
                    ancho_atras: elemento.ancho_atras,
                    long_izquierdo: elemento.long_izquierdo,
                    long_derecho: elemento.long_derecho,
                    precioContado: elemento.precioContado,
                    precioCredito: elemento.precioCredito,
                    montoCredito: elemento.montoCredito,

                }))
            }).then(() => {
                this.cerrarDialogo()
            });
        },
        guardarFormularioEditarDetalle() {
            // console.log('item.id: ',item.id);
            // console.log('item.id: ',this.detalle_editar.id);
            if (!this.detalle_editar.precioContado) {
                return;
            }
            // Busca el índice del elemento que se va a editar
            const indice = this.datosUrbanizacion.itemsDetalle.findIndex(item => item.id_detalle === this.detalle_editar.id_detalle);
            // Si se encontró el elemento, actualiza sus datos
            this.datosUrbanizacion.itemsDetalle[indice].ancho_frente = this.detalle_editar.ancho_frente;
            this.datosUrbanizacion.itemsDetalle[indice].ancho_atras = this.detalle_editar.ancho_atras;
            this.datosUrbanizacion.itemsDetalle[indice].long_izquierdo = this.detalle_editar.long_izquierdo;
            this.datosUrbanizacion.itemsDetalle[indice].long_derecho = this.detalle_editar.long_derecho;
            this.datosUrbanizacion.itemsDetalle[indice].Numero_lote = this.detalle_editar.Numero_lote;
            this.datosUrbanizacion.itemsDetalle[indice].costo_urbanizacion = this.detalle_editar.costo_urbanizacion;
            this.datosUrbanizacion.itemsDetalle[indice].precioContado = this.detalle_editar.precioContado;
            this.datosUrbanizacion.itemsDetalle[indice].precioCredito = this.detalle_editar.precioCredito;
            this.datosUrbanizacion.itemsDetalle[indice].montoCredito = this.detalle_editar.montoCredito;


            this.dialogoFormularioEditarDetalle = false;
        },

        ObtenerCodigoOrden() {
            // Verifica que se haya ingresado un número de orden
            if (!this.formulario.urbanizacion) {
                // Puedes mostrar un mensaje de error o realizar la lógica que prefieras
                return;
            }

            // Realiza una solicitud a tu API para obtener el detalle de la orden de compra
            UrbanizacionApi.getById(this.formulario.urbanizacion).then(({ data }) => {
                this.datosUrbanizacion.itemsDetalle = data.detalle_urbanizacionetalle
     
                this.formulario.costo = data.Costo_total
                this.formulario.ubicacion = data.Ubicacion
                this.formulario.barrio = data.idBarrio
                this.formulario.ciudad = data.idCiudad

                // Calcula el precio al contado aplicando un porcentaje adicional
                const porcentajeContado = 5; // Puedes ajustar este porcentaje según tus necesidades
                this.detalle_cabecera.precioContado = this.formulario.costo * (1 + porcentajeContado / 100);

                // Calcula el precio a crédito a 120 meses
                const plazoCredito = 120;
                const porcentajeCredito = 10; // Puedes ajustar este porcentaje según tus necesidades
                const interesMensual = 0.5; // Tasa de interés mensual (ejemplo)
                const cuotaMensual = (this.formulario.costo * (1 + porcentajeCredito / 100)) / plazoCredito;
                const cuotaTotal = cuotaMensual * plazoCredito * (1 + interesMensual * plazoCredito / 2); // Fórmula de cuota total con interés compuesto
                this.detalle_cabecera.precioCredito = cuotaTotal;
                this.detalle_cabecera.montoCredito = (cuotaTotal/120).toFixed(0); // Redondeado a 0 decimales
                this.detalle_cabecera.montoCredito = Number(this.detalle_cabecera.montoCredito); // Convertir a número

            });

            this.dialogoFormulario = true;
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