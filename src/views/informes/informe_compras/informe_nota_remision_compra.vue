<template>
    <v-container>
        <toolbar flat>
            <v-row>
                <v-col cols="4">
                    <v-text-field variant="outlined" v-model="filtros.numerodoc" density="compact"
                        label="Fitro por Nº Factura" required></v-text-field>
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
import { NRCompraApi } from '@/services/nota_remision_compra.api'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import dayjs from 'dayjs'
export default {
    data() {
        return {
            items: [],
            filtros: {
                fecha: '',
                numerodoc: ''
            }
        }
    },
    methods: {
        generarReporte(itemsFiltrados) {
            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text('Reporte de Notas de Remisiones', 105, 10, { align: 'center' });
            doc.setFontSize(12);

            itemsFiltrados.forEach(item => {
        autoTable(doc, {
            head: [['Codigo', 'Numero de Remision', 'Fecha NR', ' Proveedor']],
            body: [[item.id, item.numerodoc, dayjs(item.fechaD).format('DD/MM/YYYY'), item.proveedor]],
            theme: 'grid', // Agrega bordes a la tabla
            styles: { textColor: [0, 0, 0], fillColor: [255, 255, 255] }, // Color de letra negro y fondo de celda blanco
            columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 'auto' }, 2: { cellWidth: 40 } }
        });
        autoTable(doc, {
            head: [['Producto', 'Cantidad']],
            body: item.detalleItems.map(det => [det.nomnbreProducto, det.Cantidad]),
            theme: 'grid', // Agrega bordes a la tabla
            styles: { textColor: [0, 0, 0], fillColor: [255, 255, 255] }, // Color de letra negro y fondo de celda blanco
            columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 'auto' }, 2: { cellWidth: 40 } }
        });
    });
          
            doc.output('dataurlnewwindow');
        },
        async ObtenerNotaRemision() {
        await NRCompraApi.getAll().then(({ data }) => {

        this.items = data.map(item => {
          return {
            id: item.idNota_Remision,
                        fechaD: item.Fecha_doc,
                        timbrado: item.Timbrado,
                        numerodoc: item.Numero_doc,
                        proveedor: item.idProveedor,
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
            if (this.filtros.numerodoc) {
                const filtroRuc = parseFloat(this.filtros.numerodoc); // Convertir el valor del filtro a tipo double
                items = items.filter(item => parseFloat(item.numerodoc) === filtroRuc);
            }
            return items
        },
        async descargarReporte() {
            await this.ObtenerNotaRemision()
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