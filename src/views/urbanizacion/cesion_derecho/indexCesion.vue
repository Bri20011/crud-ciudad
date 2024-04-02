

<template>
    <v-container>
        <ContratoCesion :prop_listado_cesion="listado_cesion" />
    </v-container>
</template>
<script>
import ContratoCesion from './cesion-lista.vue'
import {CesionAPI} from '@/services/cesion.api'
export default {
    components: {
        ContratoCesion
    },
    data() {
        return {
            listado_cesion: []
        }
    },
    created() {
        
        this.ObtenerCesion()
    },
    methods: {
        ObtenerCesion() {
            CesionAPI.getAll().then(({ data }) => {
                this.listado_cesion = data.map(item => {
                    return {       
                        id: item.idCesion_derecho_deuda,
                        numero_orden: item.idContrato,
                        cliente: item.nombreCliente,
                        idCliente: item.idCliente,
                        fechaD: item.fecha_rescision,
                        motivoCesion: item.nonmbremotivo,
                        detalle: item.detalle


                    }
                })
            })
        },
    }
}
</script>