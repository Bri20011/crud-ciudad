<template>
  <v-dialog max-width="700" v-model="dialogoFormulario" persistent>
    <v-card class="rounded-xl">
      <v-container>
        <h1 class="mb-3">Crear Funcionario</h1>
        <v-form>
          <v-row>
            <!-- <v-col cols="12" sm="2" md="2">
              <v-text-field variant="outlined" label="Codigo" v-model="formulario.codigo" disabled></v-text-field>
            </v-col> -->
            <v-col cols="12" sm="6" md="6">
              <v-text-field variant="outlined" label="Nombre Funcionario" v-model="formulario.descripcion"
                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field variant="outlined" label="Apellido Funcionario" v-model="formulario.descripcion"
                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field variant="outlined" label="Numero de CI Funcionario" v-model="formulario.descripcion"
                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-autocomplete variant="outlined" label="Nombre Barrio" v-model="formulario.descripcion"
                :error="excededLimit" :error-messages="errorMessage" required></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-autocomplete variant="outlined" label="Nombre Ciudad" v-model="formulario.descripcion"
                :error="excededLimit" :error-messages="errorMessage" required></v-autocomplete>
            </v-col>
           
           
           
           
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormulario = false">Cancelar</v-btn>
              <v-btn color="primary" @click="guardarFormulario"
                :disabled="excededLimit || !formulario.descripcion">Guardar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>

  <v-dialog max-width="700" v-model="dialogoFormularioEditar" persistent>
    <v-card class="rounded-xl">
      <v-container>
        <h1 class="mb-3">Editar Funcionario</h1>
        <v-form>
          <v-row>
            <v-col cols="12" sm="2" md="2">
              <v-text-field variant="outlined" label="Codigo" disabled v-model="formulario.codigo"></v-text-field>
            </v-col>
            <v-col cols="12" sm="10" md="10">
              <v-text-field variant="outlined" label="Descripcion de ciudad" v-model="formulario.descripcion"
                :error="excededLimit" :error-messages="errorMessage" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormularioEditar = false">Cancelar</v-btn>
              <v-btn color="primary" @click="guardarFormularioEditar"
              :disabled="excededLimit || !formulario.descripcion">Guardar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
  <v-container>
    <v-row>

      <v-col cols="12" sm="5" md="5">
        <v-text-field :loading="loading" v-model="buscador" density="compact" variant="solo" label="Buscar" append-inner-icon="mdi-magnify"
          single-line hide-details rounded click:prependInner></v-text-field>
      </v-col>

      <v-col cols="12" sm="7" md="7" class="d-flex justify-end align-center">
        Cantidad de Funcionario: 
        <!-- {{ items.length }} -->
      </v-col>

    </v-row>
    
    <v-card class="mt-5 rounded-xl">
      <v-data-table :headers="headers" :items="itemsComputed">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              <p class="font-weight-bold">Funcionario</p>
            </v-toolbar-title>

            <v-btn class="custom-font" color="primary" prepend-icon="mdi-content-save-plus" variant="text"
              @click="abrirDialogo">Registrar
            </v-btn>

          </v-toolbar>
        </template>

        <template
        v-slot:item.action="{ item }">
          <v-icon size="small" class="me-2" @click="editarCiudad(item.raw)">
            mdi-pencil
          </v-icon>
          <v-icon color="#C62828" size="small" @click="confirmarEliminarCiudad(item.raw)">
            mdi-trash-can-outline
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-row>
      <v-col cols="12" md="12" class="d-flex justify-end align-center mt-5">
        <v-btn>Cancelar </v-btn>
      </v-col>
    </v-row>

    <!-- Diálogo de confirmación -->
    <v-dialog v-model="dialogoEliminar" max-width="400">
      <v-card>
        <v-container>
        <v-card-title class="headline">Confirmar Eliminación</v-card-title>
        <v-card-text>
          ¿Está seguro de que desea eliminar este elemento?
        </v-card-text>

      
          <v-row>
         <v-col cols="12" class="d-flex justify-end">
          <v-btn color="#E0E0E0" class="mx-2" text @click="eliminarCiudad">Eliminar</v-btn>
          <v-btn color="primary" text @click="cancelarEliminarCiudad">Cancelar</v-btn>
         </v-col>
        </v-row>
        
        
      </v-container>
      </v-card>
      
    </v-dialog>
 

  </v-container>
  
</template>

<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { BarrioAPI } from '@/services/barrio.api'

export default {
  components: {
    VDataTable
  },
  data() {
    return {
      dialogoFormulario: false,
      dialogoFormularioEditar: false,
      formulario: {
        codigo: '',
        descripcion: ''
      },
      limit: 45,
      contador: 1,
      defaultFormulario: {
        codigo: '',
        descripcion: ''
      },
      buscador: '',
      headers: [
        {
          title: 'Codigo', align: 'start', sortable: false,   key: 'ide', },
        { title: 'Descripcion', key: 'descripdcion' },
        { title: 'Nombre Funcionario', key: 'descripdcion' },
        { title: 'Accion', key: 'action', sortable: false, align: 'end' },
      ],
      items: [
        {
          id: '1',
          descripcion: 'Campo',
          action: ''
        }
      ],
      dialogoEliminar: false,
      elementoAEliminar: null,
    }
  },

  computed: {
    itemsComputed() {
      if (!this.buscador) return this.items
      return this.items.filter((element) => element.descripcion.toLocaleLowerCase().includes(this.buscador.toLocaleLowerCase()))
    },
    excededLimit() {
      return this.formulario.descripcion.length > this.limit;
    },
    errorMessage() {
      if (this.excededLimit) {
        return 'Superaste el límite de 45 letras';
      }
      return '';
    }
  },
  methods:
  {
    abrirDialogo() {
    // // Abrir el modal y cargar el código aquí
     this.dialogoFormulario = true;

    
    // // Encontrar el último valor guardado
    // let ultimoValor = datosGuardadosBarrio.length > 0 ? datosGuardadosBarrio[datosGuardadosBarrio.length - 1] : 0;
    
    // // Incrementar el último valor para generar un nuevo código
    // let nuevoValor = ultimoValor + 1;
    
    // // Verificar si el nuevo valor ya está en uso
    // while (this.items.some(item => item.id === nuevoValor)) {
    //   nuevoValor++; // Incrementar hasta encontrar un código no utilizado
    // }
    this.formulario = JSON.parse(JSON.stringify(this.defaultFormulario))

    // Asignar el nuevo valor al formulario
    // this.formulario.codigo = nuevoValor;
  },
    generarCodigo() {
      const nuevoCodigo = this.contador++;
      return nuevoCodigo;
    },
    guardarFormulario() {

      if (!this.formulario.descripcion) {
        
        this.emptyFieldError = true;
        return;
      }

    BarrioAPI.create(
      {
        idBarrio: this.formulario.codigo,
        descripcion: this.formulario.descripcion
      }
    ).then(()=> {
     this.ObtenerBarrio()
    })



      this.formulario.descripcion = '';
      this.dialogoFormulario = false
    },
    guardarFormularioEditar() {

      if (!this.formulario.descripcion) {
        
        this.emptyFieldError = true;
        return;
      }

      
    BarrioAPI.update(
      this.formulario.codigo,
      {
        idBarrio: this.formulario.codigo,
        descripcion: this.formulario.descripcion
      }
    ).then(()=> {
     this.ObtenerBarrio()
    }) 


      this.dialogoFormularioEditar = false
    },
    editarCiudad(parametro) {
      this.dialogoFormularioEditar = true
      this.formulario.codigo = parametro.id
      this.formulario.descripcion = parametro.descripcion
    },



   confirmarEliminarCiudad(elemento) {
      // Abre el diálogo de confirmación y guarda el elemento a eliminar
      this.elementoAEliminar = elemento;
      this.dialogoEliminar = true;
    },
    cancelarEliminarCiudad() {
      // Cierra el diálogo de confirmación y restablece la variable
      this.dialogoEliminar = false;
      this.elementoAEliminar = null;
    },
    eliminarCiudad() {
      if (this.elementoAEliminar) {
        // Realiza la eliminación aquí
        BarrioAPI.delete(this.elementoAEliminar.id).then(() => {
          this.ObtenerBarrio();
        });
        // Cierra el diálogo de confirmación
        this.dialogoEliminar = false;
        this.elementoAEliminar = null;
      }
    },




    //Para pintar la base de datos en el formulario 
    ObtenerBarrio(){
  BarrioAPI.getAll().then(({data}) => {
    this.items = data.map(item => {
      return{
        id: item.idBarrio,
        descripcion: item.descripcion
      }
    })

  })
},

  },




  created() {
    // Generar automáticamente el código al cargar el componente
    this.formulario.codigo = this.generarCodigo();
    this.ObtenerBarrio()

  },

}
</script>
<style></style>