

<template>
    <v-container>
        <ContratoRescision :prop_listado_rescision="listado_rescision" />
    </v-container>
</template>
<script>
import ContratoRescision from './rescision-lista.vue'
import {RescisionAPI} from '@/services/rescision.api'
export default {
    components: {
        ContratoRescision
    },
    data() {
        return {
            listado_rescision: []
        }
    },
    created() {
        
        this.ObtenerRescision()
    },
    methods: {
        ObtenerRescision() {
            RescisionAPI.getAll().then(({ data }) => {
                this.listado_rescision = data.map(item => {
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