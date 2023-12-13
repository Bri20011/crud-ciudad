<template>
    <v-row>
        <v-col cols="12" sm="5" md="5">
            <v-text-field  density="compact" v-model="buscador" variant="solo" label="Buscar"
                append-inner-icon="mdi-magnify" single-line hide-details rounded click:prependInner></v-text-field>
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
                <v-btn append-icon="mdi-trash-can-outline" color="primary" @click="confirmarCambiarEstado(item.raw)">
                    Anular
                </v-btn>
            </template>
        </v-data-table>
    </v-card>
    <UrbanizacionFormulario v-if="dialogoFormulario" @cerrar-dialogo="dialogoFormulario = false" />
</template>
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import UrbanizacionFormulario from './urbanizacion-formulario.vue'
import dayjs from 'dayjs'
export default {
    components: {
        VDataTable,
        UrbanizacionFormulario
    },
    props: {
        prop_listado_urbanizacion: {
            type: Array
        }
    },
    data() {
        return {
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
            buscador: '',
            dialogoFormulario: false
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
        formatearFecha(fechaD) {
            return dayjs(fechaD).format('DD/MM/YYYY')
        }
    },
    confirmarCambiarEstado(elemento) {
    },
}
</script>