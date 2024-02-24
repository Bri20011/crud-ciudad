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
import { PedidoAPI } from '@/services/pedido.api'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
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
        generarReporte() {
            const doc = new jsPDF();
            doc.text('Reporte de Pedidos:', 60, 10);

            autoTable(doc, {
                head: [['Codigo', 'Descripcion', 'Fecha de Pedido']],
                body: this.items.map(item => [item.id, item.descripcion, item.fechaD])
            });
            doc.output('dataurlnewwindow');
        },
        async obtenerPedido() {
            await PedidoAPI.getAll().then(({ data }) => {
                this.items = data.map(item => {
                    return {
                        id: item.idPedido,
                        descripcion: item.Descripcion,
                        fechaD: item.Fecha_pedi,
                        detalleItems: item.detalle
                    }
                })
            })
        },
        async descargarReporte() {
            await this.obtenerPedido()
            this.generarReporte()
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