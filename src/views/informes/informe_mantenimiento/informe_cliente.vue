<template>
    <v-container>
        <toolbar flat>
            <v-row>

                <v-col cols="4">
                    <v-text-field variant="outlined" v-model="filtros.razonsocial" density="compact"
                        label="Fitro por Razon Social" required></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field variant="outlined" v-model="filtros.ruc" density="compact" label="Fitro por Ruc"
                        required></v-text-field>
                </v-col>

                <v-col cols="4">
                    <v-btn size="large" @click="descargarReporte" color="primary">Exportar informe <v-icon class="ml-2"
                            icon="mdi-download"></v-icon></v-btn>
                </v-col>
            </v-row>
        </toolbar>
    </v-container>
</template>
<script>
import { ClienteAPI } from '@/services/cliente.api'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
export default {
    data() {
        return {
            items: [],
            filtros: {
                ruc: '',
                razonsocial: '',

            }
        }
    },
    methods: {
        generarReporte(itemsFiltrados) {
            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text('Reporte de Clientes', 105, 10, { align: 'center' });
            doc.setFontSize(12);



            autoTable(doc, {
                head: [['Codigo', 'Razon Social', 'Ruc']],
                body: itemsFiltrados.map(item => [item.id, item.razonsocial, item.ruc]),
                theme: 'grid', // Agrega bordes a la tabla
                styles: { fillColor: [0, 170, 171] }, // Color de fondo de las celdas
                columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 'auto' }, 2: { cellWidth: 40 } }



            });
            doc.output('dataurlnewwindow');
        },
        async ObtenerCliente() {
            ClienteAPI.getAll().then(({ data }) => {
                this.items = data.map(item => {
                    return {
                        id: item.idCliente,
                        ruc: item.Ruc,
                        razonsocial: item.Razon_social,
                        direccion: item.Direccion,
                        telefono: item.Telefono,
                        idBarrio: item.idBarrio,
                        nombrebarrio: item.nombrebarrio,
                        idCiudad: item.idCiudad,
                        nombreciudad: item.nombreciudad,

                    }
                })
            })
        },

        filtrarItems() {
            let items = this.items
            if (this.filtros.razonsocial) {
                items = items.filter(item => item.razonsocial === this.filtros.razonsocial)
            }
            if (this.filtros.ruc) {
                const filtroRuc = parseFloat(this.filtros.ruc); // Convertir el valor del filtro a tipo double
                items = items.filter(item => parseFloat(item.ruc) === filtroRuc);
            }
            return items
        },
        async descargarReporte() {
            await this.ObtenerCliente()
            const itemsFiltrados = this.filtrarItems()
            this.generarReporte(itemsFiltrados)
        },
    }
}
</script>
<style scoped>
.input-date {
    width: 100%;
    /* Ancho completo */
    height: 44px;
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