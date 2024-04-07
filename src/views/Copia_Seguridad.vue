<template>
  <v-dialog max-width="500" v-model="dialogoFormulario" persistent>
    <v-card class="rounded-xl">
      <v-container>
        <div class="d-flex justify-center align-items-center">
          <!-- <v-icon class="mdi mdi-database-arrow-up-outline mx-5"></v-icon> -->
          <h1 class="mb-3 mdi mdi-database-arrow-up-outline">Copia de Base de Datos</h1>
        </div>
        <v-form>
          <v-row>
            <v-divider class="ma-2"></v-divider>

            <v-col cols="12" class="d-flex justify-center mt-5">
              <v-btn color="primary" @click="guardarFormulario" :loading="cargando">Copiar BD</v-btn>
              <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormulario = false">Cancelar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>


  <v-container>
    <v-card class="mt-5 rounded-xl">
      <v-toolbar flat color="white">
        <v-toolbar-title>
          <p class="font-weight-bold">BD Copiados</p>
        </v-toolbar-title>

        <v-btn class="custom-font" color="primary" prepend-icon="mdi-content-save-plus" variant="text"
          @click="abrirDialogo">Registrar
        </v-btn>

      </v-toolbar>
    </v-card>
  </v-container>

</template>

<script>

import { CopiaSeguridadAPI } from '@/services/copia_seguridad.api'

export default {
  data() {
    return {
      dialogoFormulario: false,
      cargando: false,
    }
  },

  methods: {
    abrirDialogo() {
      this.dialogoFormulario = true;
    },
    guardarFormulario() {
      this.cargando = true;
      CopiaSeguridadAPI.create().then(() => {
        this.dialogoFormulario = false;
        alert('Copia de seguridad realizada con éxito');
      }).catch(() => {
        alert('Error al realizar la copia de seguridad');
      }).finally(() => {
        this.cargando = false;
      });
    }
  }
}
</script>
<style></style>