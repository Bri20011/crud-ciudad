

<template>
    <v-container>
        <UrbanizacionLista :prop_listado_urbanizacion="listado_urbanizacion" />
    </v-container>
</template>
<script>
import UrbanizacionLista from './urbanizacion-lista.vue'
import { UrbanizacionApi } from '@/services/urbanizacion.api'
import { CiudadAPI } from '@/services/ciudad.api'
export default {
    components: {
        UrbanizacionLista
    },
    data() {
        return {
            listado_urbanizacion: []
        }
    },
    created() {
        this.ObtenerUrbanizacion()
    },
    methods: {
        ObtenerUrbanizacion() {
            UrbanizacionApi.getAll().then(({ data }) => {
                this.listado_urbanizacion = data.map(item => {
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
                        detalleItems: item.detalle
                    }
                })
            })
        },
    }
}
</script>