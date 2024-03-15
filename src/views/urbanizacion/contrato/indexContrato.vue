

<template>
    <v-container>
        <ContratoLista :prop_listado_contrato="listado_contrato" />
    </v-container>
</template>
<script>
import ContratoLista from './contrato-lista.vue'
import { ContratoApi } from '@/services/contrato.api'
export default {
    components: {
        ContratoLista
    },
    data() {
        return {
            listado_contrato: []
        }
    },
    created() {
        
        this.ObtenerContrato()
    },
    methods: {
        ObtenerContrato() {
            ContratoApi.getAll().then(({ data }) => {
                this.listado_contrato = data.map(item => {
                    return {                       
                        id: item.idContrato,
                        idListado_precio: item.idListado_precio,
                        precioCredito:item.precioCredito,
                        precioContado:item.precioContado,
                        idCiudad: item.idCiudad,
                        ciudad: item.nombreciudad, 
                        idCliente: item.idCliente,
                        cliente: item.nombreCliente,
                        rucC: item.rucCliente,
                        direccionCliente: item.direccionCliente,
                        ciudadCliente: item.ciudadCliente,
                        idtipo_venta: item.idtipo_venta,
                        tipoventa: item.nombretipoventa,
                        fecha_contrato: item.fecha_contrato,
                        plazo_venta: item.plazo_venta,
                        numero_manzana: item.numero_manzana,
                        numero_lote: item.numero_lote,
                        nombre_urbanizacion: item.nombre_urbanizacion,
                        ubicacion: item.ubicacion,
                        detalle: item.detalle

                    }
                })
            })
        },
    }
}
</script>