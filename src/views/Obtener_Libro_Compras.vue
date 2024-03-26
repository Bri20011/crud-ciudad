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
                        <v-text-field type="date" variant="outlined" label="Filtrar por Fecha"
                            v-model="formulario.fechaD" required></v-text-field>
                    </v-col>

                    <v-col cols="12" class="d-flex justify-end">
                        <v-btn color="primary" @click="filtrarItems">Obtener</v-btn>
                    </v-col>

                    <v-data-table items-per-page-text="Articulos" :headers="headersCompra"
                        :items="listaComprasFiltradas">
                        <template v-slot:item.fechaD="{ item }">
                            {{ formatearFecha(item.raw.fechaD) }}
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
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
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
                { title: 'Exenta', key: 'exenta', align: 'center' },
                { title: 'Total Iva 5%', key: 'iva5', align: 'center' },
                { title: 'Total Iva 10%', key: 'iva10', align: 'center' },
                { title: 'Total', key: 'total', align: 'center' },




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
            ComprasAPI.librocompra().then(({ data }) => {
                this.listaCompras = data.map(item => {
                    return {
                        id: item.idCompras,
                        idProveedor: item.idProveedor,
                        proveedor: item.Nombre_Proveedor,
                        numero_factura: item.Numero_fact,
                        idTipo_Documento: item.idTipo_Documento,
                        documento: item.Tipo_Documento,
                        caja: item.idCaja,
                        timbrado: item.Timbrado,
                        fechaD: item.Fecha_doc,
                        exenta: item.exenta,
                        iva5: item.iva5,
                        iva10: item.iva10,
                        total: item.monto_total,

                    }
                })
            })
        },




        async ObtenerCodigoCompra() {
        },

        filtrarItems() {
            let items = this.listaCompras

            if (this.formulario.compras) {
                items = items.filter(item => item.id === this.formulario.compras)
            }
            if (this.formulario.proveedor) {
                items = items.filter(item => item.idProveedor === this.formulario.proveedor)
            }
            if (this.formulario.documento) {
                items = items.filter(item => item.idTipo_Documento === this.formulario.documento)
            }

            if (this.formulario.fechaD) {
                items = items.filter(item => dayjs(item.fechaD).format('YYYY-MM-DD') === dayjs(this.formulario.fechaD).format('YYYY-MM-DD'))
            }
            this.listaComprasFiltradas = items
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
        descargarReporte() {
            const doc = new jsPDF()
            autoTable(doc, {
                head: [
                    ['Codigo', 'Nº Factura', 'Tipo Documento', 'Fecha ', 'Timbrado', 'Proveedor', 'Exenta', ' Iva 5%', ' Iva 10%', 'Total']
                ],
                body: this.listaComprasFiltradas.map(item => [
                    item.id,
                    item.numero_factura,
                    item.documento,
                    this.formatearFecha(item.fechaD),
                    item.timbrado,
                    item.proveedor,
                    item.exenta,
                    item.iva5,
                    item.iva10,
                    item.total
                ]),
                startY: 20,
                styles: {
                    halign: 'center',
                    valign: 'middle',
                    fontSize: 10,
                    cellPadding: 1,
                    overflow: 'linebreak',
                    columnWidth: 'wrap'
                },
                columnStyles: {
                    0: { columnWidth: 10 },
                    1: { columnWidth: 20 },
                    2: { columnWidth: 20 },
                    3: { columnWidth: 20 },
                    4: { columnWidth: 20 },
                    5: { columnWidth: 20 },
                    6: { columnWidth: 20 },
                    7: { columnWidth: 20 },
                    8: { columnWidth: 20 },
                    9: { columnWidth: 20 },
                }
            })
            doc.save('libro_compras.pdf')
        }
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