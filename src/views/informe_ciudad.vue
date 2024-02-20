<template>
  

    <v-row>
      <v-col cols="12" md="12" class="d-flex justify-end align-center mt-5">
    
          <v-btn color="#E0E0E0" class="mx-2" @click="GenerarReporte">Reporte</v-btn>
      </v-col>
    </v-row>

    
    <!-- FIN DIALOGO -->

</template>

<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { CiudadAPI } from '@/services/ciudad.api'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
export default {
  components: {
    VDataTable
  },
  data() {
    return {
    
      items: []
      
    }
  },
 

  methods:
  {
    obtenerCiudades() {
      CiudadAPI.getAll().then(({ data }) => {
        this.items = data.map(item => {
          return {
            id: item.idCiudad,
            descripcion: item.Descripcion
          }
        })
      })
    },


    GenerarReporte() {
      const doc = new jsPDF();
      doc.text('Reporte de Ciudades:', 60, 10);

      autoTable(doc, {
        head: [['Codigo', 'Descripcion']],
        body: this.items.map(item => [item.id, item.descripcion])
      });
      doc.output('dataurlnewwindow');
    },

 

  },



  created() {
    // Generar automáticamente el código al cargar el componente  dd
    this.obtenerCiudades()
  },

}
</script>
<style></style>