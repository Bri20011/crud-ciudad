<template>
  <v-sheet class="bg-deep-purple pa-12" rounded width="100%" height="1000">
    <v-card class="mx-auto px-6 py-15" width="360" height="750">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-card-title class="text-h4 text-center">
          ¡Bienvenido!
        </v-card-title>

        <div class="ma-4 text-center">
          <div class="text-subtitle-2"></div>
          <v-img class="bg-white" width="250" height="180" :aspect-ratio="1" src="../assets/inicio1.JPG" cover></v-img>
        </div>


        <v-text-field label="Usuario" v-model="user" prepend-inner-icon="mdi-account"
          placeholder="Ingrese su usuario"></v-text-field>

        <v-text-field v-model="password" :readonly="loading" :rules="[required]" clearable label="Contraseña"
          placeholder="Ingrese su contraseña" prepend-inner-icon="mdi-lock"></v-text-field>


        <v-row>
          <v-switch v-model="showMessages" label="Recuerdame"></v-switch>
          <v-input hint="" persistent-hint :messages="messages">

          </v-input>
        </v-row>

        <br>
        <v-btn class="mt-0" v-model="showInicio" block rounded="x2" :disabled="!form" :loading="loading" color="#1877f2"
          size="large" type="submit" variant="elevated" :style="{ color: '#FFFFFF' }">
          <v-card-text :style="{ fontSize: '20px' }">Iniciar sesión</v-card-text>
        </v-btn>
        <div>
          <p v-if="showInicio" style="color: red;">Debe completar ambos campos.</p>
        </div>


        <div> <v-card-text @click="openModal" class="text-center custom-text" :style="{ color: 'rgb(24, 119, 242)' }">
            ¿Olvidaste tu contraseña? </v-card-text> </div>

        <v-divider class="mt-0"></v-divider>


        <div id="app">
          <v-app>
            <v-main class="mt-5">
              <v-container fluid>
                <v-row justify="center"> <!-- Alinea horizontalmente -->
                  <v-btn @click="dialogo1 = true" color="rgb(66, 183, 42)" height="45" width="180">
                    <div class="custom-text" style="color: white; display: flex; align-items: center; height: 100%;">
                      <v-card-text :style="{ fontSize: '16px', margin: 'auto' }">
                        Crear cuenta nueva
                      </v-card-text>
                    </div>
                  </v-btn>
                </v-row>
              </v-container>



              <!-- Inicio Dialogo -->
              <v-dialog v-model="dialogo1" width="450">
                <v-card>

                  <v-container>
                    <v-form @submit.prevent="registrarUsuario">
                      <div>
                        <div class="custom-text"
                          style="color: black; display: flex; align-items: center; margin: 0 0 5px 0;">
                          <v-card-text :style="{ fontSize: '25px', margin: '-30px -18px', fontWeight: 'bold' }">
                            Registrarte <v-icon
                              :style="{ fontSize: '20px', position: 'absolute', right: '0', top: '0', margin: '5px' }"
                              color="black" icon="mdi-close" @click="dialogo1 = false"></v-icon>
                          </v-card-text>
                        </div>
                        <div class="custom-text"
                          style="color: black; display: flex; align-items: center; margin: 0 0 5px 0;">
                          <v-card-text :style="{ fontSize: '12px', margin: '-5px -18px' }">
                            Es rápido y fácil.
                          </v-card-text>
                        </div>

                      </div>

                      <v-divider :style="{ fontSize: '13px', margin: '-5px -18px' }"></v-divider>
                      <div class="mt-0" style="margin-bottom: -26px;">
                        <v-row class="mt-2">
                          <v-col cols="12" sm="6">
                            <v-text-field label="Nombre" density="compact" bg-color="#f5f6f7" persistent-hint
                              variant="outlined" class="custom-text-field custom-long-width"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field label="Apellido" density="compact" bg-color="#f5f6f7" persistent-hint
                              variant="outlined" class="custom-text-field custom-long-width"></v-text-field>
                          </v-col>
                        </v-row>
                      </div>

                      <div>
                        <div class="mt-0" style="margin-bottom: -15px;">
                          <v-text-field label="Numero de celular o correo electronico" density="compact"
                            bg-color="#f5f6f7" persistent-hint variant="outlined"></v-text-field>
                        </div>
                        <div style="margin-top: -15px;">
                          <v-text-field label="Contraseña nueva" density="compact" bg-color="#f5f6f7" persistent-hint
                            variant="outlined"></v-text-field>
                        </div>
                      </div>

                      <div class="custom-text mt-0"
                        style="color: black; display: flex; align-items: center; margin: 0 0 5px 0;">
                        <v-card-text :style="{ fontSize: '12px', margin: '-45px -2px', padding: '0px' }">
                          Fecha de nacimiento <v-icon size="small" color="black" icon="mdi-help-circle"></v-icon>
                        </v-card-text>
                      </div>

                      <v-row class="mt-0" :style="{ margin: '' }">
                        <v-col cols="12" sm="4" md="4" lg="2" :style="{ fontSize: '12px' }">
                          <v-select density="compact" label="14"
                            :items="['1', '2', '3', '4', '5', '6', '7', '7', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']"
                            variant="outlined"></v-select>
                        </v-col>

                        <v-col cols="12" sm="4" md="4" lg="2">
                          <v-select density="compact" label="ago"
                            :items="['ener', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']"
                            variant="outlined"></v-select>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="2">
                          <v-select density="compact" label="2023"
                            :items="['2018', '2019', '2020', '2021', '2022', '2023']" variant="outlined"></v-select>
                        </v-col>
                      </v-row>

                      <div :style="{ margin: '3px 5px', padding: '0px' }"
                        style="color: black; display: flex; align-items: center; margin: 0 0 5px 0;">
                        <v-card-text :style="{ fontSize: '12px', margin: '-0px', padding: '0px' }">
                          Sexo <v-icon size="small" color="black" icon="mdi-help-circle"></v-icon>
                        </v-card-text>
                      </div>


                      <v-row>

                        <v-col cols="12" sm="4" md="4" lg="4">

                          <div style="border: 1px solid #BDBDBD; height: 29px; border-radius: 4px;"
                            class="d-flex flex-row align-center justify-space-around">
                            <span :style="{ fontSize: '14px' }">Mujer</span>
                            <input type="radio">
                          </div>

                        </v-col>

                        <v-col cols="12" sm="4" md="4" lg="4">
                          <div style="border: 1px solid #BDBDBD; height: 29px; border-radius: 4px;"
                            class="d-flex flex-row align-center justify-space-around">
                            <span :style="{ fontSize: '14px' }">Hombre</span>
                            <input type="radio">
                          </div>
                        </v-col>

                        <v-col cols="12" sm="4" md="4" lg="4">

                          <div style="border: 1px solid  #BDBDBD; height: 29px; border-radius: 4px;"
                            class="d-flex flex-row align-center justify-space-around">
                            <span :style="{ fontSize: '14px' }">Personalizado</span>
                            <input type="radio">
                          </div>
                        </v-col>

                      </v-row>



                      <v-card-text class="mt-0" style="padding: 12px 0px">
                        <span :style="{ fontSize: '12px' }"> Es posible que las personas que usan nuestro servicio hayan
                          subido tu información de
                          contacto a Facebook. <a href="#" class="text-decoration-none" :style="{ color: 'blue' }">Obtén
                            más información.</a>
                        </span>
                      </v-card-text>

                      <v-card-text class="mt-0" style="padding: 0px 0px">
                        <span :style="{ fontSize: '12px' }">Al hacer clic en "Registrarte", aceptas nuestras <a href="#"
                            class="text-decoration-none" :style="{ color: 'blue' }">Condiciones,</a> la <a href="#"
                            class="text-decoration-none" :style="{ color: 'blue' }">Política de privacidad</a> y la
                          <a href="#" class="text-decoration-none" :style="{ color: 'blue' }"> Política de cookies.</a> Es
                          posible que te enviemos
                          notificaciones por SMS, que puedes desactivar
                          cuando quieras.
                        </span>
                      </v-card-text>


                      <v-container fluid>
                        <v-row justify="center" class="mt-1"> <!-- Alinea horizontalmente -->
                          <v-btn color="rgb(0, 164, 0)" height="40" width="150">
                            <div class="custom-text"
                              style="color: white; display: flex; align-items: center; height: 100%;">
                              <v-card-text :style="{ fontSize: '16px', margin: 'auto' }">
                                Registrarte
                              </v-card-text>
                            </div>
                          </v-btn>
                        </v-row>
                      </v-container>



                    </v-form>
                  </v-container>

                </v-card>
              </v-dialog>

              <!-- Fin Dialogo1 -->

              <!-- Inicio Dialogo 2 -->



              
                <v-dialog v-model="dialogo2" max-width="600px" class="d-flex align-center justify-center">
                 
                <v-card color="grey-lighten-4" flat height="500px" rounded="0" max-width="600px">
                  <v-toolbar prominent extended :style="{ height: '56px', background: 'white' }">
                    <v-toolbar-title
                      :style="{ color: '#1877F2', fontWeight: 'bold', fontSize: '26px' }">facebook</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn class="me-2 text-none" color="#1877F2" variant="flat">
                      <span :style="{ color: 'white', fontWeight: 'bold' }">Iniciar sesión</span>
                    </v-btn>
                  </v-toolbar>


                  <div class="d-flex align-center justify-center" :style="{ height: '100%' }">

                    <v-card color="white" flat height="260px" rounded="30" width="420">
                      <h3 class="mt-4 d-flex align-center justify-start pl-3">Recupera tu cuenta</h3>
                      <v-divider class="mt-3"></v-divider>

                      <v-card-text class="mt-0 d-flex align-center justify-start pl-3">Ingresa tu correo electrónico o
                        número de celular para buscar tu cuenta.</v-card-text>

                      <div class="d-flex align-center justify-start pl-5 " :style="{ width: '400px' }">
                        <v-text-field label="Correo electrónico o número de celular" variant="outlined"
                          class="rounded-dense" density="compact">
                        </v-text-field>
                      </div>
                      <v-divider class="mt-0"></v-divider>

                      <v-row class="mt-0 d-flex justify-end pr-0">

                        <v-col cols="12" sm="4" md="3" lg="3">
                          <v-btn class="me-2 text-none" color="#CCCCCC" variant="flat">
                            <span @click="dialogo2 = false" :style="{ color: 'white', fontWeight: 'bold' }">Cancelar</span>
                          </v-btn>

                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="3">
                          <v-btn class="me-2 text-none" color="#1877F2" variant="flat">
                            <span :style="{ color: 'white', fontWeight: 'bold' }">Buscar</span>
                          </v-btn>

                        </v-col>
                      </v-row>
                    </v-card>

                  </div>
                </v-card>
              
              </v-dialog>
             

              <!-- Fin Dialogo2 -->
            </v-main>
          </v-app>
        </div>




      </v-form>
    </v-card>
  </v-sheet>
</template>


<script >

export default {
  data: () => ({
    showMessages: false,
    showInicio: false,
    form: false,
    user: '',
    password: '',
    loading: false,
    required: [(v) => !!v || 'Este campo es requerido'],
    dialogo1: false,
    dialogo2: false,
    selection: [],
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],

  }),

  computed: {
    messages() {
      return this.showInicio ? [''] : undefined;
    },
  },

  methods: {
    onSubmit() {
      // Validación de campos antes de enviar el formulario
      this.userError = !this.user;
      this.passwordError = !this.password;

      if (this.user && this.password) {

      } else {
        this.showInicio = true;
      }


    },

    openModal() {
      this.dialogo2 = true;
    }
  },
};

</script>
<style>
.custom-text-field {
  margin-right: 5px;
  /* Ajusta este valor según tu preferencia */
}

.custom-long-width {
  width: 100%;
  /* Ajusta este valor según tu preferencia */
}
</style>
