<template>
    <v-container>
        <toolbar flat>
            <v-row>
             
                <v-col cols="4">
                    <v-text-field variant="outlined" v-model="filtros.nombres" density="compact"
                        label="Fitro por Razon Social" required></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field variant="outlined" v-model="filtros.apellidos" density="compact"
                        label="Fitro por Apellidos" required></v-text-field>
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
  import { FuncionarioAPI } from '@/services/funcionario.api'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
export default {
    data() {
        return {
            items: [],
            filtros: {
                nombres: '',
                apellidos: '',
               
            }
        }
    },
    methods: {
        generarReporte(itemsFiltrados) {
            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text('Reporte de Funcionarios', 105, 10, { align: 'center' });
            doc.setFontSize(12);

            

            autoTable(doc, {
                head: [['Codigo','Nombres', 'Apellidos']],
                body: itemsFiltrados.map(item => [item.id, item.nombres, item.apellidos]),
                theme: 'grid', // Agrega bordes a la tabla
                styles: { fillColor: [0, 170, 171] }, // Color de fondo de las celdas
                columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 'auto' }, 2: { cellWidth: 40 } }


                
            });
            doc.output('dataurlnewwindow');
        },
        async  ObtenerFuncionario() {
        FuncionarioAPI.getAll().then(({data}) => {
          this.items = data.map(item=> {
            return {
              id: item.idFuncionario,
              nombres: item.nombres,
              apellidos: item.apellidos,
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
            if (this.filtros.nombres) {
                items = items.filter(item => item.nombres === this.filtros.nombres)
            }
            if (this.filtros.apellidos) {
                items = items.filter(item => item.apellidos === this.filtros.apellidos)
            }
            return items
        },
        async descargarReporte() {
            await this.ObtenerFuncionario()
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