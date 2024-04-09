<template>
    <v-dialog max-width="700" v-model="dialogoFormulario" persistent>
      <v-card class="rounded-xl">
        <v-container>
          <h1 class="mb-3">Crear Producto</h1>
          <v-form>
            <v-row>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  density="default" label="Descripcion" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                  @click:append-inner="visible = !visible" v-model="formulario.descripcion" :error="excededLimit4"
                  :error-messages="errorMessage4" required></v-text-field>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-text-field variant="outlined" label="Precio" v-model="formulario.precio"
                  :error="excededLimit1" :error-messages="errorMessage1" required></v-text-field>
              </v-col>
  
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  density="default" label="Precio Compra" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                  @click:append-inner="visible = !visible" v-model="formulario.PrecioCompra" :error="excededLimit3"
                  :error-messages="errorMessage3" required></v-text-field>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-autocomplete variant="outlined" label="Marca" :items="listaMarca" item-title="descripcionM" item-value="id" v-model="formulario.marca"></v-autocomplete>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-autocomplete variant="outlined" label="Categoria" :items="listaCategoria" item-title="descripcionC" item-value="id" v-model="formulario.categoria"></v-autocomplete>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-autocomplete variant="outlined" label="Iva" :items="listaIva" item-title="descripcionI" item-value="id" v-model="formulario.iva"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-autocomplete variant="outlined" label="Tipo Producto" :items="listaTipoProd" item-title="descripcionTip" item-value="id" v-model="formulario.tipoproducto"></v-autocomplete>
              </v-col>


            </v-row>
            <v-row>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormulario = false">Cancelar</v-btn>
                <v-btn color="primary" @click="guardarFormulario"
                  :disabled="excededLimit1 || !formulario.descripcion || excededLimit3 || !formulario.precio || excededLimit2 || !formulario.PrecioCompra || limit3 || !formulario.marca
                  || limit3 || !formulario.categoria || limit3 || !formulario.iva">Guardar</v-btn>    <!-- CORREGIR VALIDACIONES  -->
  
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  
    <v-dialog max-width="700" v-model="dialogoFormularioEditar" persistent>
      <v-card class="rounded-xl">
        <v-container>
          <h1 class="mb-3">Editar Producto</h1>
          <v-form>
            <v-row>

              <v-col cols="12" sm="4" md="4">
                <v-text-field variant="outlined" label="Codigo" disabled v-model="formulario.codigo"></v-text-field>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-text-field variant="outlined" label="Descripcion" v-model="formulario.descripcion"
                  :error="excededLimit4" :error-messages="errorMessage4" required></v-text-field>
              </v-col>
  
              <v-col cols="12" sm="4" md="4">
                <v-text-field 
                  density="default" label="Precio" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                  @click:append-inner="visible = !visible" v-model="formulario.precio" :error="excededLimit1"
                  :error-messages="errorMessage1" required></v-text-field>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-text-field variant="outlined" label="Precio Compra" v-model="formulario.PrecioCompra"
                  :error="excededLimit3" :error-messages="errorMessage3" required></v-text-field>
              </v-col>
  
              <v-col cols="12" sm="4" md="4">
                <v-autocomplete variant="outlined" label="Marca" :items="listaMarca" item-title="descripcionM" item-value="id" v-model="formulario.marca"></v-autocomplete>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-autocomplete variant="outlined" label="Categoria" :items="listaCategoria" item-title="descripcionC" item-value="id" v-model="formulario.categoria"></v-autocomplete>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-autocomplete variant="outlined" label="Iva" :items="listaIva" item-title="descripcionI" item-value="id" v-model="formulario.iva"></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-autocomplete variant="outlined" label="Tipo Producto" :items="listaTipoProd" item-title="descripcionTip" item-value="id" v-model="formulario.tipoproducto"></v-autocomplete>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" class="d-flex justify-end">
                <v-btn color="#E0E0E0" class="mx-2" @click="dialogoFormularioEditar = false">Cancelar</v-btn>
                <v-btn color="primary" @click="guardarFormularioEditar"
                :disabled="excededLimit1 || !formulario.descripcion || excededLimit3 || !formulario.precio || excededLimit1 || !formulario.PrecioCompra || limit3 || !formulario.marca
                  || limit3 || !formulario.categoria || limit3 || !formulario.iva">Guardar</v-btn>  <!-- CORREGIR VALIDACIONES  -->
              </v-col>

            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>


    <v-container>
      <v-row>

        <v-col cols="12" sm="6" md="6">
          <v-text-field :loading="loading" density="compact"  v-model="buscador" variant="solo" label="Buscar" append-inner-icon="mdi-magnify"
            single-line hide-details rounded click:prependInner></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6" class="d-flex justify-end align-center">
          Cantidad de Producto: {{ items.length }}
        </v-col>

      </v-row>
  
      <v-card class="mt-5 rounded-xl">
        <v-data-table :headers="headers" :items="itemsComputed">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <p class="font-weight-bold">Producto</p>
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
                          <!-- FIN DIALOGO -->
    </v-container>
  </template>
  
  <script>
  import { VDataTable } from 'vuetify/labs/VDataTable'
  import { ProductoAPI } from '@/services/producto.api'
  import { MarcaApi } from '@/services/marca.api'
  import { CategoriaApi } from '@/services/Categoria.api'
  import { IvaAPI } from '@/services/iva.api'
  import { TipoProductoAPI } from '@/services/tipo_producto.api'

  
  export default {
    components: {
      VDataTable
    },
    data() {
      return {
        visible: false,
        dialogoFormulario: false,
        dialogoFormularioEditar: false,
        formulario: {
          codigo: '',
          descripcion: '',
          precio: '',
          PrecioCompra: '',
          marca: '',
          categoria: '',
          iva: '',
          tipoproducto: ''
        },
        limit1: 45,
        limite2: 15,
        limit3:0,
        contador: 1,
        defaultFormulario: {
          codigo: '',
          descripcion: '',
          precio: '',
          PrecioCompra: '',
          marca: '',
          categoria: '',
          iva: ''
        },
        listaMarca: [],
        listaCategoria: [],
        listaIva: [],
        buscador: '',
        headers: [
          { title: 'Codigo', align: 'start', sortable: false, key: 'id', },
          { title: 'Descripcion', key: 'descripcion' },
          { title: 'Precio', key: 'precio' },
          { title: 'Precio Compra', key: 'PrecioCompra' },
          { title: 'Marca', key: 'nombremarca' },
          { title: 'Categoria', key: 'nombrecategoria'},
          { title: 'Iva', key: 'nombreiva'},
          { title: 'Tipo Producto', key: 'nombretipoProd'},
          { title: 'Accion', key: 'action', sortable: false, align: 'end' },
        ],
        items: [
          {
            id: '1',
            descripcion: '7586748',
            precio: 'Juan Perez',
            PrecioCompra: 'Esq Flores',
            nombremarca: 'Lactolanda',
            nombrecategoria: 'Insumos',
            nombreiva: '10',
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
     
    },
  
    methods:
    {
      abrirDialogo() {
        // Abrir el modal y cargar el código aquí
        this.dialogoFormulario = true;
        this.formulario = JSON.parse(JSON.stringify(this.defaultFormulario))
      },
  
      obtenerMarca() {
        MarcaApi.getAll().then(({ data }) => {
          this.listaMarca = data.map(item => {
            return {
              id: item.idmarca,
              descripcionM: item.Descripcion
            }
          })
        })
      },
      ObtenerCategoria() {
        CategoriaApi.getAll().then(({ data }) => {
          this.listaCategoria = data.map(item => {
            return {
              id: item.idcategoria,
              descripcionC: item.Descripcion
            }
          })
        })
      },
      ObtenerIva() {
        IvaAPI.getAll().then(({ data }) => {
          this.listaIva = data.map(item => {
            return {
              id: item.idIva,
              descripcionI: item.Descripcion,
              

            }
          })
        })
      },

      ObtenerTipoProducto() {
        TipoProductoAPI.getAll().then(({ data }) => {
          this.listaTipoProd = data.map(item => {
            return {
              id: item.idtipo_producto,
              descripcionTip: item.descripcion,
              

            }
          })
        })
      },
      generarCodigo() {
        const nuevoCodigo = this.contador++;
        return nuevoCodigo;
      },

      guardarFormulario() {
        if (!this.formulario.descripcion || !this.formulario.precio || this.excededLimit || this.excededLimitPas) {
          this.emptyFieldError = true;
          return;
        }
        ProductoAPI.create(
          {
            idProducto: this.formulario.codigo,
            Descripcion: this.formulario.descripcion,
            Precio: this.formulario.precio,
            PrecioCompra: this.formulario.PrecioCompra,
            idmarca: this.formulario.marca,
            idcategoria: this.formulario.categoria,
            idIva: this.formulario.iva,
            idtipo_producto: this.formulario.tipoproducto
          }
        ).then(()=> {
          this.ObtenerProducto()
        })
  
        this.formulario.descripcion = '';
        this.formulario.precio = '';
        this.formulario.PrecioCompra = '';
        this.formulario.marca = '';
        this.formulario.categoria = '';
        this.formulario.iva = '';
        this.dialogoFormulario = false
      },
  
  
      guardarFormularioEditar() {
        if (!this.formulario.descripcion || !this.formulario.precio || this.excededLimit || this.excededLimitPas) {
          this.emptyFieldError = true;
          return;
        }
  
  
        ProductoAPI.update(
          this.formulario.codigo,
          {
            idProducto: this.formulario.codigo,
            Descripcion: this.formulario.descripcion,
            Precio: this.formulario.precio,
            PrecioCompra: this.formulario.PrecioCompra,
            idmarca: this.formulario.marca,
            idcategoria: this.formulario.categoria,
            idIva: this.formulario.iva,
            idtipo_producto: this.formulario.tipoproducto

          }
        ).then(()=> {
          this.ObtenerProducto()
        })
        this.dialogoFormularioEditar = false
      },
      editarCiudad(parametro) {
        this.dialogoFormularioEditar = true
        this.formulario.codigo = parametro.id
        this.formulario.descripcion = parametro.descripcion
        this.formulario.precio = parametro.precio
        this.formulario.PrecioCompra = parametro.PrecioCompra
        this.formulario.marca = parametro.idmarca
        this.formulario.categoria = parametro.idcategoria
        this.formulario.iva = parametro.idIva
        this.formulario.tipoproducto = parametro.idtipo_producto
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
          ProductoAPI.delete(this.elementoAEliminar.id).then(() => {
            this.ObtenerProducto();
          });
          // Cierra el diálogo de confirmación
          this.dialogoEliminar = false;
          this.elementoAEliminar = null;
        }
      },
      ObtenerProducto() {
        ProductoAPI.getAll().then(({data}) => {
          this.items = data.map(item=> {
            return {
              id: item.idProducto,
              descripcion: item.Descripcion,
              precio: item.Precio,
              PrecioCompra: item.PrecioCompra,
              idmarca: item.idmarca,
              nombremarca: item.nombremarca,
              idcategoria: item.idcategoria,
              nombrecategoria: item.nombrecategoria,
              idIva: item.idIva,
              nombreiva: item.nombreiva,
              idtipo_producto: item.idtipo_producto,
              nombretipoProd: item.nombretipoProd,
            

             
            }
          })
        })
      },
  
    },
  
  
  
    created() {
      // Generar automáticamente el código al cargar el componente
      this.formulario.codigo = this.generarCodigo();
      this.ObtenerProducto()
      this.obtenerMarca()
      this.ObtenerCategoria()
      this.ObtenerIva()
      this.ObtenerTipoProducto()

      
    },
  
  }
  </script>
  <style></style>