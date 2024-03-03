<template>
    <v-card class="rounded-xl ">
        <v-container>

            <h1 class="mb-3">Obtener Libro de Compras</h1>
            <v-form>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-autocomplete variant="outlined" label="Obtener por Numero de Factura" :items="listaCompras"
                            item-title="numero_factura" item-value="id" v-model="formulario.compras"
                            required></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-autocomplete variant="outlined" label="Obtener por Proveedor" :items="listaProveedor"
                            item-title="descripcionP" item-value="id" v-model="formulario.proveedor"
                            required></v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                        <v-autocomplete variant="outlined" label="Obtener por Tipo de Documento" :items="listaDocumento"
                            item-title="descripcionD" item-value="id" v-model="formulario.documento"
                            required></v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                                <v-text-field type="date" variant="outlined" label="Filtrar por Fecha" v-model="formulario.fechaD"
                                required></v-text-field>
                            </v-col>

                    <v-col cols="12" class="d-flex justify-end">
                        <v-btn color="primary" @click="filtrarItems">Obtener</v-btn>
                    </v-col>

                    <v-data-table items-per-page-text="Articulos" :headers="headersCompra" :items="listaComprasFiltradas">
                        <template v-slot:item.fechaD="{ item }">
                                    {{ formatearFecha(item.raw.fechaD) }}
                                </template>
                        <template v-slot:item.total="{ item }">
                             {{ calcularTotal(item) }}
                         </template>
                         

                    </v-data-table>

                </v-row>
                   <v-col cols="12" class="d-flex justify-end">
                        <v-btn color="primary" @click="descargarReporte">Exportar informe</v-btn>
                    </v-col>
            </v-form>
        </v-container>
        
        
    </v-card>
    
</template>
  
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { ProveedorAPI } from '@/services/proveedor.api'
import { TipoDocumentoAPI } from '@/services/tipo_documento.api'
import { ProductoAPI } from '@/services/producto.api'
import { IvaAPI } from '@/services/iva.api'
import { ComprasAPI } from '@/services/compras.api'


import dayjs from 'dayjs'



export default {
    components: {
        VDataTable
    },
    data() {
        return {




            formulario: {
                proveedor: '',
                documento: '',
                fechaO: null,
                fechaD: null,
                compras: ''

            },
            

            listaCompras: [],
            listaComprasFiltradas: [],
            headersCompra: [
                { title: 'Codigo', align: 'start', sortable: false, key: 'id', },
                { title: 'Numero de Factura', key: 'numero_factura' },
                { title: 'Tipo Documento', key: 'documento' },
                { title: 'Fecha de Factura', key: 'fechaD', align: 'star' },
                { title: 'Timbrado', key: 'timbrado', align: 'star' },
                { title: 'Proveedor', key: 'proveedor', align: 'star' },
                // { title: 'Proveedor', key: 'Razon_social_proveedor', align: 'star' },
                // { title: 'Caja', key: 'caja', align: 'star' },

                // { title: 'Producto', key: 'idProducto', align: 'center' },
                // { title: 'Descripcion', key: 'nomnbreProducto', align: 'center' },
                // { title: 'Cantidad', key: 'Cantidad', align: 'center' },
                // { title: 'Total', key: 'Precio', align: 'center' },
                // { title: 'Iva', key: 'iva', align: 'center' },
                // { title: 'Exenta', key: 'exenta', align: 'center' },
                // { title: 'Total Iva 5%', key: 'iva5', align: 'center' },
                // { title: 'Total Iva 10%', key: 'iva10', align: 'center' },
                { title: 'Total', key: 'total', align: 'center' },
                // { title: 'Accion', key: 'action', sortable: false, align: 'end' },



            ],

    

            listaProveedor: [],
            listaDocumento: [],
            listaProducto: [],

        }
    },

    methods:
    {
        ObtenerProveedor() {
            ProveedorAPI.getAll().then(({ data }) => {
                this.listaProveedor = data.map(item => {
                    return {
                        id: item.idProveedor,
                        descripcionP: item.Razon_social
                    }
                })
            })
        },
        ObtenerTipoD() {
            TipoDocumentoAPI.getAll().then(({ data }) => {
                this.listaDocumento = data.map(item => {
                    return {
                        id: item.idTipo_Documento,
                        descripcionD: item.Descripcion
                    }
                })
            })
        },


        ObtenerProducto() {
            ProductoAPI.getAll().then(({ data }) => {
                this.listaProducto = data.map(item => {
                    return {
                        id: item.idProducto,
                        descripcionPr: item.Descripcion,

                    }
                })
            })
        },

        ObtenerIva() {
            IvaAPI.getAll().then(({ data }) => {
                this.listaIva = data.map(item => {
                    return {
                        id: item.idIva,
                        descripcion: item.Descripcion,
                        descripcionI: item.Porcentaje
                    }
                })
            })
        },

        ObtenerCompras() {
            ComprasAPI.getAll().then(({ data }) => {
                this.listaCompras = data.map(item => {
                    return {
                        id: item.idCompras,
                        proveedor: item.idProveedor,
                        numero_factura: item.Numero_fact,
                        documento: item.idTipo_Documento,
                        caja: item.idCaja,
                        timbrado: item.Timbrado,
                        fechaD: item.Fecha_doc,
                        detalleItems: item.detalle

                    }
                })
            })
        },




        async ObtenerCodigoCompra() {
        },

        filtrarItems() {
            let items = this.listaCompras

            if(this.formulario.compras){
                items = items.filter(item => item.id === this.formulario.compras)
            }
            if(this.formulario.proveedor){
                items = items.filter(item => item.proveedor === this.formulario.proveedor)
            }
            if(this.formulario.documento){
                items = items.filter(item => item.documento === this.formulario.documento)
            }
               
            if(this.formulario.fechaD){
                items = items.filter(item => dayjs(item.fechaD).format('YYYY-MM-DD') === dayjs(this.formulario.fechaD).format('YYYY-MM-DD'))
            }
            this.listaComprasFiltradas = items
        },
        async descargarReporte() {
            await this.ObtenerCodigoCompra()
            const itemsFiltrados = this.filtrarItems()
            this.generarReporte(itemsFiltrados)
        },

        calcularTotal(item) {
            return item.raw.detalleItems.reduce((total, detalle) => total + (detalle.Precio * detalle.Cantidad), 0)
        },

 
        formatearFecha(fecha) {
            return dayjs(fecha).format('DD/MM/YYYY')
        },


 

        sumarIva(columna) {
            // Verifica que this.formulario.itemsDetalle tenga un valor
            if (this.formulario.itemsDetalle) {
                // Redondea cada valor de IVA antes de sumarlos
                return Math.round(this.formulario.itemsDetalle.reduce((total, item) => total + item[columna], 0));
            } else {
                return 0; // O cualquier valor predeterminado que desees en caso de que no haya itemsDetalle
            }
        },

        sumarTotal(columna) {
            // Verifica que this.formulario.itemsDetalle tenga un valor y sea un array
            if (this.formulario.itemsDetalle && Array.isArray(this.formulario.itemsDetalle)) {
                // Redondea cada valor de la columna antes de sumarlos
                return Math.round(this.formulario.itemsDetalle.reduce((total, item) => total + item[columna], 0));
            } else {
                return 0; // O cualquier valor predeterminado que desees en caso de que no haya itemsDetalle
            }
        },
    },


    created() {
        this.ObtenerProveedor()
        this.ObtenerCompras()
        this.ObtenerIva()
        this.ObtenerTipoD()



    },


}
</script>
<style>
.custom-input {
    width: 100%;
    /* Ancho completo */
    height: 56px;
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