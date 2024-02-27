

<template>
    <v-container>
        <PrecioLista :prop_listado_precio="listado_precio" />
    </v-container>
</template>
<script>
import PrecioLista from './precio-lista.vue'
import { UrbanizacionApi } from '@/services/urbanizacion.api'
import { CiudadAPI } from '@/services/ciudad.api'
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
        this.ObtenerUrbanizacion()
    },
    methods: {
        ObtenerUrbanizacion() {
            UrbanizacionApi.getAll().then(({ data }) => {
                this.listado_precio = data.map(item => {
                    return {
                        id: item.idUrbanizacion,
                        fechaD: item.fecha_urb,
                        nombre_urb: item.Nombre_Urbanizacion,
                        area: item.Area,
                        ladoA: item.LadoA,
                        ladoB: item.LadoB,
                        cantidad: item.Cantidad_manzana,
                        manzana: item.idManzana,
                        ubicacion: item.Ubicacion,
                        costo: item.Costo_total,
                        precio: item.Precio,
                        idCiudad: item.idCiudad,
                        nombreciudad: item.nombreciudad,
                        idBarrio: item.idBarrio,
                        nombrebarrio: item.nombrebarrio,
                        detalleItems: item.detalle_urbanizacion
                    }
                })
            })
        },
    }
}
</script>