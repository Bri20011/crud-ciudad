<template>
    <v-container>
        <toolbar flat>
            <v-row>
                <v-col cols="4">
                    <v-text-field variant="outlined" v-model="filtros.descripcion" density="compact"
                        label="Fitro por descripcion" required></v-text-field>
                </v-col>
                <v-col cols="4">
                    <input class="input-date" type="date" v-model="filtros.fecha" placeholder="Filtro por Fecha"
                        @input="formatDate" />
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
import { OrdenUrbApi } from '@/services/orde_compra_lote.api'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import dayjs from 'dayjs'
export default {
    data() {
        return {
            items: [],
            filtros: {
                fecha: '',
                descripcion: ''
            }
        }
    },
    methods: {
        generarReporte(itemsFiltrados) {
            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text('Reporte de Orden de Compra Lote', 105, 10, { align: 'center' });
            doc.setFontSize(12);

            

            autoTable(doc, {
                head: [['Codigo', 'Descripcion', 'Fecha de  Orden de Compra Lote']],
                body: itemsFiltrados.map(item => [item.id, item.descripcion, dayjs(item.fechaD).format('DD/MM/YYYY')]),
                theme: 'grid', // Agrega bordes a la tabla
                styles: { fillColor: [0, 170, 171] }, // Color de fondo de las celdas
                columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 'auto' }, 2: { cellWidth: 40 } }


                
            });
            doc.output('dataurlnewwindow');
        },
        async ObtenerOrdenUrbanizacion() {
            await 
            OrdenUrbApi.getAll().then(({ data }) => {
                console.log(data)
                this.items = data.map(item => {
                    return {
                        id: item.idorde_compra_lote,
                        descripcion: item.descripcion,
                        fechaD: item.fecha,
                        detalleItems: item.detalle

                    }
                })
            })
        },
        filtrarItems() {
            let items = this.items
            if (this.filtros.fecha) {
                items = items.filter(item => dayjs(item.fechaD).format('YYYY-MM-DD') === dayjs(this.filtros.fecha).format('YYYY-MM-DD'))
            }
            if (this.filtros.descripcion) {
                items = items.filter(item => item.descripcion === this.filtros.descripcion)
            }
            return items
        },
        async descargarReporte() {
            await this.ObtenerOrdenUrbanizacion()
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