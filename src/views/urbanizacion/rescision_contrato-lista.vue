<template>
    <v-row>
        <v-col cols="12" sm="5" md="5">
            <v-text-field  density="compact" v-model="buscador" variant="solo" label="Buscar"
                append-inner-icon="mdi-magnify" single-line hide-details rounded click:prependInner></v-text-field>
        </v-col>

        <v-col cols="12" sm="7" md="7" class="d-flex justify-end align-center">
            Cantidad de Rescisión de Contratos: {{ prop_listado_rescision_contrato.length }}
        </v-col>

    </v-row>
    <v-card class="mt-5 rounded-xl">
        <v-data-table items-per-page-text="Item por pagina" :headers="headers" :items="itemsComputed">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>
                        <p class="font-weight-bold">Registro de Rescisión de Contratos</p>
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
    <ContratoFormulario v-if="dialogoFormulario" @cerrar-dialogo="dialogoFormulario = false" />
</template>
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import ContratoFormulario from './Rescision_contrato-formulario.vue'
import dayjs from 'dayjs'
export default {
    components: {
        VDataTable,
        ContratoFormulario
    },
    props: {
        prop_listado_rescision_contrato: {
            type: Array
        }
    },
    data() {
        return {
            headers: [
                { title: 'Codigo', align: 'start', sortable: false, key: 'id', },
                { title: 'Numero de Contrato', key: 'fechaD', align: 'star' },
                { title: 'Nombre de Urbanizacion', key: 'nombre_urb' },
                // { title: 'Area', key: 'area', align: 'star' },
                // { title: 'Lado A', key: 'ladoA', align: 'star' },
                // { title: 'Lado B', key: 'ladoB', align: 'center' },
                { title: 'Cliente', key: 'Cantidad_manzana', align: 'center' },
                { title: 'Fecha', key: 'Cantidad_lote', align: 'center' },
                { title: 'Motivo de Rescision', key: 'motivo', align: 'center' },
                // { title: 'Ubicacion', key: 'ubicacion', align: 'center' },
                // { title: 'Precio', key: 'precio', align: 'center' },
                // { title: 'Ciudad', key: 'idCiudad', align: 'center' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' },
            ],
            buscador: '',
            dialogoFormulario: false
        }
    },
    computed: {
        itemsComputed() {
            if (!this.buscador) return this.prop_listado_contrato
            return this.prop_listado_contrato.filter((element) => element.id.toString().toLocaleLowerCase().includes(this.buscador.toLocaleLowerCase()))
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