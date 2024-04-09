<template>
    <v-row>
        <v-col cols="12" sm="5" md="5">
            <v-text-field density="compact" v-model="buscador" variant="solo" label="Buscar" append-inner-icon="mdi-magnify"
                single-line hide-details rounded click:prependInner></v-text-field>
        </v-col>

        <v-col cols="12" sm="7" md="7" class="d-flex justify-end align-center">
            Cantidad de Urbanizacion: {{ prop_listado_urbanizacion.length }}
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
                <v-icon color="primary" size="small" @click="MostrarUrbanizacion(item.raw)">
                    mdi-file-eye-outline
                </v-icon>
                <v-icon color="red" size="small" @click="confirmarCambiarEstado(item.raw)">
                    mdi-trash-can-outline
                </v-icon>
            </template>
        </v-data-table>
    </v-card>
    <UrbanizacionFormulario v-if="dialogoFormulario" @cerrar-dialogo="dialogoFormulario = false" />
    <UrbanizacionFormularioVista v-if="dialogoFormularioVista" @cerrar-dialogo-v="dialogoFormularioVista = false" :datosSelec="datosSelecionado"/>
        <!-- Diálogo de confirmación -->
        <v-dialog v-model="dialogoCambiarEstado" max-width="400">
            <v-card>
                <v-container>
                    <v-card-title class="headline">Confirmar la Anulacion</v-card-title>
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
</template>
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import UrbanizacionFormulario from './urbanizacion-formulario.vue'
import { UrbanizacionApi } from '@/services/urbanizacion.api'
import UrbanizacionFormularioVista from './urbanizacion-formulario-vista.vue'

import dayjs from 'dayjs'
export default {
    components: {
        VDataTable,
        UrbanizacionFormulario,
        UrbanizacionFormularioVista
    },
    props: {
        prop_listado_urbanizacion: {
            type: Array
        }
    },
    data() {
        return {
            dialogoCambiarEstado: false,

            headers: [
                { title: 'Codigo', align: 'start', sortable: false, key: 'id', },
                { title: 'Fecha de Urbanizacion', key: 'fechaD', align: 'star' },
                { title: 'Nombre de Urbanizacion', key: 'nombre_urb' },
                { title: 'Ciudad', key: 'nombreciudad', align: 'center' },
                { title: 'Barrio', key: 'nombrebarrio', align: 'center' },
                { title: 'Ubicacion', key: 'ubicacion', align: 'center' },
                { title: 'Costo', key: 'costo', align: 'center' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' },
            ],
            buscador: '',
            dialogoFormulario: false,
            dialogoFormularioVista:false,
            datosSelecionado: null,
        }
    },
    computed: {
        itemsComputed() {
            if (!this.buscador) return this.prop_listado_urbanizacion
            return this.prop_listado_urbanizacion.filter((element) => element.id.toString().toLocaleLowerCase().includes(this.buscador.toLocaleLowerCase()))
        },
    },
    methods: {
        abrirDialogo() {
            this.dialogoFormulario = true;
        },
        MostrarUrbanizacion(item){
            this.datosSelecionado = item
            this.dialogoFormularioVista = true;
        },
        formatearFecha(fechaD) {
            return dayjs(fechaD).format('DD/MM/YYYY')
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
                UrbanizacionApi.update(this.elementoACambiarEstado.id, { estado: true }
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

    },
}
</script>