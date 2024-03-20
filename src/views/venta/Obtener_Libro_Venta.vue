<template>
    <v-card class="rounded-xl ">
        <v-container>

            <h1 class="mb-3">Obtener Libro de Ventas</h1>
            <v-form>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-autocomplete variant="outlined" label="Obtener por Numero de Factura" :items="listaVentas"
                            item-title="numero_factura" item-value="id" v-model="formulario.ventas"
                            required></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-autocomplete variant="outlined" label="Obtener por Cliente" :items="listaCliente"
                            item-title="razonsocial" item-value="id" v-model="formulario.cliente"
                            required></v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                        <v-autocomplete variant="outlined" label="Obtener por Tipo de Documento" :items="listaDocumento"
                            item-title="tipo_venta" item-value="id" v-model="formulario.documento"
                            required></v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                        <v-text-field type="date" variant="outlined" label="Filtrar por Fecha"
                            v-model="formulario.fechaD" required></v-text-field>
                    </v-col>

                    <v-col cols="12" class="d-flex justify-end">
                        <v-btn color="primary" @click="filtrarItems">Obtener</v-btn>
                    </v-col>

                    <v-data-table items-per-page-text="Articulos" :headers="headersVenta" :items="listaVentasFiltradas">
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
import { ClienteAPI } from '@/services/cliente.api'
import { TipoVentaAPI } from '@/services/tipoventa.api'
import { ProductoAPI } from '@/services/producto.api'
import { IvaAPI } from '@/services/iva.api'
import { VentaAPI } from '@/services/venta.api'
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
                cliente: '',
                documento: '',
                fechaO: null,
                fechaD: null,
                ventas: ''

            },


            listaVentas: [],
            listaVentasFiltradas: [],
            headersVenta: [
                { title: 'Codigo', align: 'start', sortable: false, key: 'id', },
                { title: 'Numero de Factura', key: 'numero_factura' },
                { title: 'Tipo Documento', key: 'documento' },
                { title: 'Fecha de Factura', key: 'fechaD', align: 'star' },
                { title: 'Timbrado', key: 'timbrado', align: 'star' },
                { title: 'Cliente', key: 'cliente', align: 'star' },
                // { title: 'Iva', key: 'iva', align: 'center' },
                { title: 'Exenta', key: 'exenta', align: 'center' },
                { title: 'Total Iva 5%', key: 'iva5', align: 'center' },
                { title: 'Total Iva 10%', key: 'iva10', align: 'center' },
                { title: 'Total', key: 'monto_total', align: 'center' },
                // { title: 'Accion', key: 'action', sortable: false, align: 'end' },



            ],



            listaCliente: [],
            listaDocumento: [],
            listaProducto: [],

        }
    },

    methods:
    {
        ObtenerCliente() {
            ClienteAPI.getAll().then(({ data }) => {
                this.listaCliente = data.map(item => {
                    return {
                        id: item.idCliente,
                        ruc: item.Ruc,
                        razonsocial: item.Razon_social,
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
        ObtenerTipoD() {
            TipoVentaAPI.getAll().then(({ data }) => {
                this.listaDocumento = data.map(item => {
                    return {
                        id: item.idtipo_venta,
                        tipo_venta: item.Descripcion
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
        ObtenerVentas() {
            VentaAPI.libroventa().then(({ data }) => {
                this.listaVentas = data.map(item => {
                    return {
                        id: item.idventa,
                        descripcion: item.numero_contrato,
                        fecha: item.fecha,
                        idTimbrado: item.idTimbrado,
                        timbrado: item.numeroTimbrado,
                        numero_factura: item.Numero_fact,
                        idtipo_venta: item.idtipo_venta,
                        documento: item.nombretipoventa,
                        idCliente: item.idCliente,
                        cliente: item.nombreCliente,
                        exenta: item.exenta,
                        iva5: item.iva5,
                        iva10: item.iva10,
                        monto_total: item.monto_total,

                    }
                })
            })
        },





        async ObtenerCodigoVentas() {
        },

        filtrarItems() {
            let items = this.listaVentas

            if (this.formulario.ventas) {
                items = items.filter(item => item.id === this.formulario.ventas)
            }
            if (this.formulario.cliente) {
                items = items.filter(item => item.idCliente === this.formulario.cliente)
            }
            if (this.formulario.documento) {
                items = items.filter(item => item.idtipo_venta === this.formulario.documento)
            }

            if (this.formulario.fechaD) {
                items = items.filter(item => dayjs(item.fechaD).format('YYYY-MM-DD') === dayjs(this.formulario.fechaD).format('YYYY-MM-DD'))
            }
            this.listaVentasFiltradas = items
        },




        formatearFecha(fecha) {
            return dayjs(fecha).format('DD/MM/YYYY')
        },
        //Aqui descargo en pdf lo obtenido en la tabla usando filtarItems() 
        descargarReporte() {
            const doc = new jsPDF();

            doc.text('Reporte de Libro de Ventas', 105, 10, { align: 'center' });



            autoTable(doc, {
                head: [['Nº', 'Nº de Factura', 'Tipo Documento', 'Fecha', 'Timbrado', 'Cliente', 'Exenta', 'Iva 5%', 'Iva 10%', 'Total']],
                body: this.listaVentasFiltradas.map(item => [
                    item.id,
                    item.numero_factura,
                    item.documento,
                    dayjs(item.fechaD).format('DD/MM/YYYY'),
                    item.timbrado,
                    item.cliente,
                    item.exenta,
                    item.iva5,
                    item.iva10,
                    item.monto_total
                ]),
                theme: 'grid',
                styles: styles,
                //columnStyles: { 0: { cellWidth: 20 }, 1: { cellWidth: 25 }, 2: { cellWidth: 25 }, 3: { cellWidth: 20 }, 4: { cellWidth: 25 }, 5: { cellWidth: 40 } },
                alternateRowStyles: styles.alternateRow, // Aplica estilo de fila alternativa
                margin: { top: 20 }, // Ajusta el margen superior
                tableWidth: 'auto' // Ancho de tabla automático
            });

            doc.output('dataurlnewwindow');
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
        this.ObtenerCliente()
        this.ObtenerVentas()
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