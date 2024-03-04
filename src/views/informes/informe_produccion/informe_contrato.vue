<template>
    <v-container>
        <toolbar flat>
            <v-row>
                <v-col cols="4">
                    <v-text-field variant="outlined" v-model="filtros.numero_factura" density="compact"
                        label="Fitro por Numero de Factura" required></v-text-field>
                </v-col>
                <v-col cols="4">
                    <input class="input-date" type="date" v-model="filtros.fecha" placeholder="Filtro por Fecha"
                        @input="formatDate" />
                </v-col>
                <v-col cols="4">
                    <v-btn size="large" @click="generatePDF" color="primary">Exportar informe <v-icon class="ml-2"
                            icon="mdi-download"></v-icon></v-btn>
                </v-col>
            </v-row>
        </toolbar>
    </v-container>
</template>
<script>
import { ComprasLoteAPI } from '@/services/compras_lote.api'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import dayjs from 'dayjs'
export default {
    data() {
        return {
            items: [],
            filtros: {
                fecha: '',
                numero_factura: ''
            }
        }
    },
    methods: {
        generarReporte(itemsFiltrados) {
            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text('Reporte de Compras de Lotes', 105, 10, { align: 'center' });
            doc.setFontSize(12);



            autoTable(doc, {
                head: [['Codigo', 'Numero de Factura', 'Fecha de Compras']],
                body: itemsFiltrados.map(item => [item.id, item.numero_factura, dayjs(item.fechaD).format('DD/MM/YYYY')]),
                theme: 'grid', // Agrega bordes a la tabla
                styles: { fillColor: [0, 170, 171] }, // Color de fondo de las celdas
                columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 'auto' }, 2: { cellWidth: 40 } }



            });
            doc.output('dataurlnewwindow');
        },
        async ObtenerComprasLote() {
            ComprasLoteAPI.getAll().then(({ data }) => {
                this.items = data.map(item => {
                    return {
                        id: item.idcompras_lote,
                        fechaD: item.fecha_doc,
                        timbrado: item.timbrado,
                        numero_factura: item.numero_factura,
                        documento: item.idTipo_Documento,
                        proveedor: item.idProveedor,
                        numero_orden: item.idorde_compra_lote,
                        caja: item.idCaja,
                        detalleItems: item.detalle

                    }
                })
            })
        },
        filtrarItems() {
            let items = this.items
            if (this.filtros.fecha) {
                items = items.filter(item => dayjs(item.fechaD).format('YYYY-MM-DD') === dayjs(this.filtros.fecha).format('YYYY-MM-DD'))
            }

            if (this.filtros.numero_factura) {
                const filtroRuc = parseFloat(this.filtros.numero_factura); // Convertir el valor del filtro a tipo double
                items = items.filter(item => parseFloat(item.numero_factura) === filtroRuc);
            }
            return items
        },
        async descargarReporte() {
            await this.ObtenerComprasLote()
            const itemsFiltrados = this.filtrarItems()
            this.generarReporte(itemsFiltrados)
        },

        generarTexto(parametro) {
            return ` En la ciudad de Dr. JUAN EULOGIO ESTIGARRIBIA, República del Paraguay, a los…………… mes de …………………. del año ………………….. Entre la Sra. ALBA CELINA CENTURION CONTRERA  con C.I. NO : 2.875.750, de Estado Civil soltera, en su carácter de propietaria , y por otra parte el ……………………………………………..….., estado civil ……………………, con C.I NO ……………..…., convienen en celebrar el presente CONTRATO PRIVADO DE ALQUILER DE UN INMUEBLE, que se regirá por las siguientes cláusulas y condiciones.
PRIMERO: La Sra. Alba Celina Centurión Contrera por este acto da por ALQUILER a favor del señor ${parametro.nombre} Una ………………………………… asentada en un INMUEBLE ubicado en el Distrito de Dr. Juan Eulogio Estigarribia lugar denominado Barrio …………………..
SEGUNDO: El plazo del alquiler acordado entre las partes  es por …………………………..  a contar a partir del presente contrato  hasta……………………………. Pudiendo renovar de común acuerdo entre las partes.
TERCERO: El precio del alquiler es la suma de guaraníes …………………………………………………….(……………………………………………………………………………..) mensual con fecha de pago cada …………………………………. Días de cada mes. 
CUARTO: La …………………………………….. cuenta con Energía Eléctrica y Agua corriente y el pago por el mismo correrán por cuenta del …………………………………..
QUINTO: El inquilino no podrá introducir mejoras dentro del previo y ………………………………………… sin la autorización del Propietario como así también no podrá sub Alquilar a terceras personas. 
SEXTO: El inquilino deja constancia que recibe la …………………………………. En buen estado de uso y conservación, deberá mantenerla en iguales condiciones hasta la desocupación siendo la de su responsabilidad la reparación de todo desperfecto que sea ocasionado como consecuencia del mal uso durante su Alquiler.
SEPTIM0: En caso de mora al pago por el servicio del alquiler el Propietario notificara al Inquilino para ponerse al día con el compromiso al pago con tolerancia de 7 días, en caso contrario debe abandonar el lugar en 24 horas sin necesidad de usar fuerza mayor.
OCTAVO: En caso de incumplimiento de alguna de las clausulas mencionadas este contrato quedara resuelto quedando a cargo del perjudicado el reclamo por el incumplimiento ante el órgano jurisdiccional competente.
NOVENO: El propietario no podrá introducir animales sin el consentimiento del Propietario y también no podrá poner alta voz o sea instrumento musicales en alta volumen para conservar la paz y tranquilidad de terceras personas. 
DECIMO: En caso de que el Inquilino quiera desocupar la …………………………………………. Antes del cumplimiento del plazo, deberá avisar al Propietario con  antelación de ……………(……………………………………………..).
En prueba de total CONFORMIDAD Y ACEPTACION FIRMAN LAS PARTES EN DOS EJEMPLATES DE UN MISMO TENOR Y A UN SOLO EFECTO
`
        },

        generatePDF() {
            var doc = new jsPDF("p", "mm", "a4");

            const textoLargo = this.generarTexto({
                nombre: 'Brayan',
                fecha: '12/12/2021'
            })

            var lMargin = 15; //left margin in mm
            var rMargin = 15; //right margin in mm
            var pdfInMM = 210;  // width of A4 in m

            var lines = doc.splitTextToSize(textoLargo, (pdfInMM - lMargin - rMargin));

            doc.setFontSize(14);
            doc.text(20, 20, lines)
            //doc.text(35, 25, "Paranyan loves jsPDF");
            //doc.addImage(imgData, 'JPEG', 15, 40, 180, 160);
            doc.save('my.pdf');
        }

    }
}
</script>
<style scoped>
.input-date {
    width: 100%;
    /* Ancho completo */
    height: 44px;
    /* Altura deseada */
    border: 1px solid #9E9E9E;
    /* Borde */
    padding: 8px;
    /* Espaciado interno */
    border-radius: 3px;
    /* Bordes redondeados */
    box-sizing: border-box;
    /* Incluir el borde en el tamaño total */
    outline: none;
    /* Quitar el contorno al hacer clic */
}
</style>