

<template>
    <v-container>
        <RescisionContratoLista :prop_listado_rescision_contrato="listado_rescision_contrato" />
    </v-container>
</template>
<script>
import RescisionContratoLista from './rescision_contrato-lista.vue'
import { UrbanizacionApi } from '@/services/urbanizacion.api'
export default {
    components: {
        RescisionContratoLista
    },
    data() {
        return {
            listado_rescision_contrato: []
        }
    },
    created() {
        this.ObtenerUrbanizacion()
    },
    methods: {
        ObtenerUrbanizacion() {
            UrbanizacionApi.getAll().then(({ data }) => {
                this.listado_rescision_contrato = data.map(item => {
                    return {
                        id: item.idUrbanizacion,
                        fechaD: item.fecha_urb,
                        nombre_urb: item.Nombre_Urbanizacion,
                        area: item.Area,
                        ladoA: item.LadoA,
                        ladoB: item.LadoB,
                        cantidad: item.Cantidad_manzana,
                        ubicacion: item.Ubicacion,
                        precio: item.Precio,
                        ciudad: item.idCiudad,
                        detalleItems: item.detalle
                    }
                })
            })
        },
    }
}
</script>