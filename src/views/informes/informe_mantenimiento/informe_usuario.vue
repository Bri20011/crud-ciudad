<template>
    <v-container>
        <toolbar flat>
            <v-row>
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
import { UsuarioAPI } from '@/services/usuario.api'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
export default {
    data() {
        return {
            items: [],
            filtros: {
                descripcion: ''
            }
        }
    },
    methods: {
        generarReporte(itemsFiltrados) {
            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text('Reporte de Tipo Usuario', 105, 10, { align: 'center' });
            doc.setFontSize(12);



            autoTable(doc, {
                head: [['Codigo', 'Descripcion']],
                body: itemsFiltrados.map(item => [item.id, item.descripcion]),
                theme: 'grid', // Agrega bordes a la tabla
                styles: { fillColor: [0, 170, 171] }, // Color de fondo de las celdas
                columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 'auto' }, 2: { cellWidth: 40 } }



            });
            doc.output('dataurlnewwindow');
        },
        async ObtenerUsuario() {
            UsuarioAPI.getAll().then(({ data }) => {
                this.items = data.map(item => {
                    return {
                        id: item.idUsuario,
                        descripcion: item.Nombre,
                        password: item.Contrasehna,
                        idSucursal: item.idSucursal,
                        nombreSucursal: item.nombreSucursal,
                        idFuncionario: item.idFuncionario,
                        nombrefuncionario: item.nombrefuncionario,
                        idNivel: item.idNivel,
                        nombrenivel: item.nombrenivel
                    }
                })
            })
        },

        filtrarItems() {
            let items = this.items

            if (this.filtros.descripcion) {
                items = items.filter(item => item.descripcion === this.filtros.descripcion)
            }
            return items
        },
        async descargarReporte() {
            await this.ObtenerUsuario()
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