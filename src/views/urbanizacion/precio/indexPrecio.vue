

<template>
    <v-container>
        <PrecioLista :prop_listado_precio="listado_precio" />
    </v-container>
</template>
<script>
import PrecioLista from './precio-lista.vue'
import { PrecioApi } from '@/services/precio.api'
export default {
    components: {
        PrecioLista
    },
    data() {
        return {
            listado_precio: []
        }
    },
    created() {
        this.ObtenerPrecio()
    },
    methods: {
        ObtenerPrecio() {
            PrecioApi.getAll().then(({ data }) => {
                this.listado_precio = data.map(item => {
                    return {
                        id: item.idListado_precio,
                        nombre_urb: item.Nombre_Urbanizacion,
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