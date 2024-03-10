

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
                this.listado_precio = data.map(item => {
                    return {
                        id: item.idListado_precio,
                        descripcionLP: item.Nombre_Urbanizacion,
                        fechaD: item.fecha,
                        idBarrio: item.idBarrio,
                        nombrebarrio: item.nombrebarrio,
                        idCiudad: item.idCiudad,
                        nombreciudad: item.nombreciudad,
                        costo: item.Costo_total,
                        ubicacion: item.Ubicacion,
                        idUrbanizacion: item.idUrbanizacion,
                        detalleItems: item.detalle.map(detalle => ({
                        idProducto: detalle.idProducto,
                        id_detalle: detalle.id_detalle,
                        idManzana: detalle.idManzana,
                        numeroLote: detalle.Numero_lote,
                        ancho_frente: detalle.ancho_frente,
                        ancho_atras: detalle.ancho_atras,
                        long_izquierdo: detalle.long_izquierdo,
                        long_derecho: detalle.long_derecho,
                        precioContado: detalle.precioContado,
                        precioCredito: detalle.precioCredito,
                        montoCredito: detalle.montoCredito,
                        cantidadCuota: detalle.cantidadCuota
                    }))
                    }
                })
            })
        },
    }
}
</script>