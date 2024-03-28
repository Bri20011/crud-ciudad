

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
                //         idRescision_contrato: '',
                // idContrato: this.formulario.numero_orden,
                // idCliente: this.formulario.cliente,
                // fecha_rescision: this.formulario.fechaD,
                // idmotivo_rescision_contrato: this.formulario.motivoRescision,
                // detalle: this.formulario.detalle
                        

                        id: item.idRescision_contrato,
                        numero_orden: item.idContrato,
                        cliente: item.nombreCliente,
                        idCliente: item.idCliente,
                        fechaD: item.fecha_rescision,
                        motivoRescision: item.DescripcionMotivo,
                        detalle: item.detalle


                    }
                })
            })
        },
    }
}
</script>