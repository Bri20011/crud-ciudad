<template>
    <v-container>
        <toolbar flat>
            <v-row>
                <v-col cols="4">
                    <v-text-field variant="outlined" v-model="filtros.numero" density="compact" label="Numero de Establecimiento"
                        required></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field variant="outlined" v-model="filtros.descripcion" density="compact"
                        label="Fitro por descripcion" required></v-text-field>
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
import { EstablecimientoAPI } from '@/services/establecimiento.api'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
export default {
    data() {
        return {
            items: [],
            filtros: {
                numero: '',
                descripcion: ''
            }
        }
    },
    methods: {
        generarReporte(itemsFiltrados) {
            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text('Reporte de Establecimientos', 105, 10, { align: 'center' });
            doc.setFontSize(12);



            autoTable(doc, {
                head: [['Codigo', 'Numero de Establecimientos', 'Descripcion']],
                body: itemsFiltrados.map(item => [item.id, item.numero, item.descripcion]),
                theme: 'grid', // Agrega bordes a la tabla
                styles: { fillColor: [0, 170, 171] }, // Color de fondo de las celdas
                columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 'auto' }, 2: { cellWidth: 40 } }



            });
            doc.output('dataurlnewwindow');
        },
        async ObtenerEstablecimiento() {
            EstablecimientoAPI.getAll().then(({ data }) => {
                this.items = data.map(item => {
                    return {
                        id: item.idEstablecimiento,
                        descripcion: item.Descripcion,
                        numero: item.Numero_establec
                    }
                })
            })
        },
        filtrarItems() {
            let items = this.items
            if (this.filtros.numero) {
                items = items.filter(item => item.numero === this.filtros.numero)
            }
            if (this.filtros.descripcion) {
                items = items.filter(item => item.descripcion === this.filtros.descripcion)
            }
            return items
        },
        async descargarReporte() {
            await this.ObtenerEstablecimiento()
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