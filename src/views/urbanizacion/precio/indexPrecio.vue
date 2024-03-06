

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
                        detalleItems: item.detalle
                    }
                })
            })
        },
    }
}
</script>