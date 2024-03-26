<template>
    <v-row>
        <v-col cols="12" sm="5" md="5">
            <v-text-field density="compact" v-model="buscador" variant="solo" label="Buscar"
                append-inner-icon="mdi-magnify" single-line hide-details rounded click:prependInner></v-text-field>
        </v-col>

        <v-col cols="12" sm="7" md="7" class="d-flex justify-end align-center">
            Cantidad de Contratos: {{ prop_listado_rescision.length }}
        </v-col>

    </v-row>
    <v-card class="mt-5 rounded-xl">
        <v-data-table items-per-page-text="Item por pagina" :headers="headers" :items="itemsComputed">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>
                        <p class="font-weight-bold">Registro de Contratos</p>
                    </v-toolbar-title>

                    <v-btn class="custom-font" color="primary" prepend-icon="mdi-content-save-plus" variant="text"
                        @click="abrirDialogo">Registrar
                    </v-btn>


                    <!-- Diálogo de confirmación -->
                    <v-dialog v-model="dialogoCambiarEstado" max-width="400">
                        <v-card>
                            <v-container>
                                <v-card-title class="headline">Confirmar Eliminación</v-card-title>
                                <v-card-text>
                                    ¿Está seguro de que desea Anular este elemento?
                                </v-card-text>


                                <v-row>
                                    <v-col cols="12" class="d-flex justify-end">
                                        <v-btn color="#E0E0E0" class="mx-2" text
                                            @click="cambiarEstadoContrato">Anular</v-btn>
                                        <v-btn color="primary" text @click="cancelarCambiarEstado">Cancelar</v-btn>
                                    </v-col>
                                </v-row>


                            </v-container>
                        </v-card>

                    </v-dialog>
                    <!-- FIN DIALOGO -->
                </v-toolbar>
            </template>
            <template v-slot:item.fechaD="{ item }">
                {{ formatearFecha(item.raw.fechaD) }}
            </template>
            <template v-slot:item.action="{ item }">
                <v-icon color="#C62828" size="small" @click="confirmarCambiarEstado(item.raw)">
                    mdi-trash-can-outline
                </v-icon>
                <!-- AQUI hay un boton que valida para poder imprimir un contrato. En caso de que el registro haya sido TipoVenta == 1 Usar el ImprimirContratoContado, en caso de TipoVenta == 2  usa el ImprimirContratoCredito -->

                <v-icon color="#1976D2" size="small" @click="imprimirContrato(item.raw)">
                    mdi-printer
                </v-icon>
            </template>
        </v-data-table>
    </v-card>
    <RescisionFormulario v-if="dialogoFormulario" @cerrar-dialogo="dialogoFormulario = false" />
</template>
<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import RescisionFormulario from './rescision-formulario.vue'
import { MotivoRescisionAPI } from '@/services/motivo_rescision_contrato.api'
import dayjs from 'dayjs'
import jsPDF from 'jspdf'
import 'dayjs/locale/es'; // Importar el idioma español para dayjs
dayjs.locale('es'); // Establecer el idioma español para dayjs
export default {
    components: {
        VDataTable,
        RescisionFormulario
    },

    props: {
        prop_listado_rescision: {
            type: Array
        }
    },
    data() {
        return {
            headers: [
                { title: 'Codigo', align: 'start', sortable: false, key: 'id', },
                { title: 'Nombre de Urbanizacion', key: 'nombre_urbanizacion' },
                { title: 'Fecha', key: 'fechaD', align: 'center' },
                { title: 'Cliente', key: 'cliente', align: 'center' },
                { title: 'Tipo de Venta', key: 'tipoventa', align: 'center' },
                { title: 'Ubicacion', key: 'ubicacion', align: 'center' },
                { title: 'Ciudad', key: 'ciudad', align: 'center' },
                { title: 'Accion', key: 'action', sortable: false, align: 'end' },
            ],
            buscador: '',
            dialogoFormulario: false,
            dialogoCambiarEstado: false,
        }
    },
    computed: {
        itemsComputed() {
            if (!this.buscador) return this.prop_listado_rescision
            return this.prop_listado_rescision.filter((element) => element.id.toString().toLocaleLowerCase().includes(this.buscador.toLocaleLowerCase()))
        },
    },
    methods: {
        abrirDialogo() {
            this.dialogoFormulario = true;
            this.dialogoCambiarEstado = false;
        },
        formatearFecha(fechaD) {
            return dayjs(fechaD).format('DD/MM/YYYY')
        },




        confirmarCambiarEstado(elemento) {
            // Abre el diálogo de confirmación y guarda el elemento a cambiar de estado
            this.elementoACambiarEstado = elemento;
            this.dialogoCambiarEstado = true;


        },
        cancelarCambiarEstado() {
            // Cierra el diálogo de confirmación y restablece la variable
            this.dialogoCambiarEstado = false;
            this.elementoACambiarEstado = null;
        },
        cambiarEstadoContrato() {
            console.log('Cambiar Estado:',this.elementoACambiarEstado);
            if (this.elementoACambiarEstado) {
                // Realiza la actualización aquí para cambiar el estado
                MotivoRescisionAPI.update(this.elementoACambiarEstado.id, { estado_contrato: true }
                ).then(() => {
                    // Actualiza la tabla después de que la actualización se haya completado
                    this.items = [];
                    this.ObtenerContrato();

                })


                // Cierra el diálogo de confirmación
                this.dialogoCambiarEstado = false;
                this.elementoACambiarEstado = null;
            }
        },
        ObtenerContrato() {
            MotivoRescisionAPI.getAll().then(({ data }) => {
                this.listado_contrato = data.map(item => {
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


        imprimirContrato(item) {
            if (item.idtipo_venta === 1) {
                this.ImprimirContratoContado(item);
            } else if (item.idtipo_venta === 2) {
                this.ImprimirContratoCredito(item);
            } else {
                // Manejar cualquier otro tipo de venta aquí
            }
        },

        ImprimirContratoCredito(item) {
            const doc = new jsPDF();
            const fecha = dayjs(item.fecha_contrato);
            const fechaFormateada = fecha.format('DD [de] MMMM [del] YYYY');

            // Tamaño de fuente un poco más pequeño para el título
            doc.setFontSize(14);

            // Texto a imprimir (fragmentado en partes)
            const texto = [
                'BOLETO DE COMPRA-VENTA',
                'Plan: 0' + item.id,
                'En la ciudad de Dr. Juan Eulogio Estigarribia, República del Paraguay,',
                fechaFormateada + '.-',
                'Concurren por una parte denominada la VENDEDORA, la Empresa SOCIEDAD INMOBILIARIA NUEVO HORIZONTE SA con Ruc: 80115240-2, denominada la VENDEDORA, y por otra parte el/la Sr/Sra ' + item.cliente + ', con cedula de identidad N° ' + item.rucC + ' domiciliado a los efectos de este contrato en la dirección ' + item.direccionCliente + ' de la ciudad de ' + item.ciudadCliente + ', en adelante EL COMPRADOR, a fin de celebrar el presente contrato bajo las condiciones siguientes:',
                '1.- EL VENDEDOR venden y el COMPRADOR compra el lote Nº ' + item.numero_lote + ' Manzana.' + item.numero_manzana + ' terreno que se describe más abajo,',
                'Manzana: ' + item.numero_manzana,
                'Lote: ' + item.numero_lote,
                '2.- EL COMPRADOR declara que antes de la firma de este contrato ha verificado en el lugar de fraccionamiento la ubicación del lote de acuerdo al plano respectivo y que se halla pienamente conforme con el mismo.-',
                '3.- La venta se hace con reserva de la propiedad por parte del VENDEDOR, de conformidad con el artículo 780 del Código Civil, por lo que el COMPRADOR adquirirá el lote objeto de este contrato con el pago de la última cuota.',
                '4.- El precio de venta del lote es de Gs.:' + ` ${item.precioCredito.toLocaleString('es-PY')} ` + ' IVA Incluido, y el detalle del plan de pago se encuentra fijado en el ANEXO 1, que firmado por las Partes integran este contrato. EL ADMINISTRADOR, emitirá factura legal por cada pago recibido en ese concepto.',
                'La falta de pago de cualquiera de las cuotas a su vencimiento dará derecho al VENDEDOR a perseguir el cobro de la totalidad de las cuotas adeudadas por la vía ejecutiva, sin perjuicio de lo establecido en la cláusula 8), sirviendo este contrato de suficiente titulo ejecutivo.',
                '5.- Todos los pagos deberán ser realizados por EL COMPRADOR en las oficinas de SOCIEDAD INMOBILIARIA NUEVO HORIZONTE SA sito en Calle E/tajy Doctor Juan Eulogio, Proceres de Mayo, Estigarribia 3660, de Dr. J. E. Estigarribia. El ADMINISTRADOR podrá indicar al COMPRADOR otro lugar de pago, mediante comunicación escrita. Los pagos de las cuotas restantes deberán efectuarse en el dia del vencimiento según el Anexo 1 o antes.',
                '6.- Queda expresamente convenido que el mero vencimiento de los plazos fijados en la cláusula 4) para el pago de las cuotas, constituirá en mora al COMPRADOR sin que sea necesario para ello requerimiento judicial o extrajudicial alguno. Las cuotas vencidas o atrasadas devengaran desde la expiración de sus respectivos términos, un interés mensual de le tasa máxima fijada por el Banco Central del Paraguay y un interés punitorio cuya tasa será del 30% (treinta por ciento) de la tasa máxima fijadas por el Banco Central del Paraguay, por todo el tiempo de la mora y sin perjuicio de los otros derechos que el presente contrato otorga al VENDEDOR',
                '7.- Posesión del lote:',
                'En este acto, el VENDEDOR Y ADMINISTRADOR da la posesión del lote objeto del presente contrato al COMPRADOR, quien lo recibe a su entera conformidad, debidamente amojonado e identificado',
                'A partir de la fecha del presente Contrato de Compraventa, el COMPRADOR asume los siguientes:',
                'Gastos de conservación y mantenimiento del lote.',
                'Responsabilidad por los hechos que en él sucedieran',
                'Responsabilidad por los hechos que en él sucedieran',
                'plantaciones y/u otros actos en el lote antes de haber pagado la sexta (6) cuota del precio de compraventa',
                'En caso de que el COMPRADOR no mantenga limpio su terreno baldío, el VENDEDOR tienen el derecho de limpiarlo y pasar el correspondiente costo al COMPRADOR.',
                '8.- Caducidad del contrato',
                'La falta de pago por EL COMPRADOR de seis cuotas consecutivas producirá automáticamente la caducidad del presente contrato. En este caso, el COMPRADOR:',
                '• Perderá el importe de las cuotas ya abonadas, que corresponderán al VENDEDOR en concepto de Indemnización y gastos administrativos.',
                'El VENDEDOR estará facultado a:',
                '• Retomar la posesión del lote sin necesidad de formalidad alguna.',
                '• Demandar el desalojo si el COMPRADOR no desocupare el lote en un plazo de 10 (diez) días contados a partir de la comunicación por escrito de tal caducidad.',
                'Excepciones a la caducidad:',
                'a) Si la falta de pago expresada tuviera lugar después de haberse abonado el 25% del precio del lote de terreno:',
                '• VENDEDOR tendrán acción para demandar el cobro del precio adeudado por el COMPRADOR por la vía ejecutiva.',
                '• Se reputarán vencidas y exigibles todas las cuotas adeudadas en ese concepto.',
                'b) Si la falta de pago expresada tuviera lugar antes de haberse abonado el 25% del precio y existiesen en el terreno mejoras introducidas por el COMPRADOR, que equivalgan al 25% del precio del lote y que no puedan ser llevadas por éste:',
                '• VENDEDOR y ADMINISTRADOR también tendrán acción para demandar el cobro del precio adeudado por aquel por la vía ejecutiva.',
                '• Se reputarán vencidas y exigibles todas las cuotas adeudadas en ese concepto.',
                'A tal fin, podrán ser subastados los derechos y acciones que correspondan al COMPRADOR, perteneciendo a éste el excedente que resultare de la subasta',
                'Si con la caducidad del presente contrato el COMPRADOR abandona a su vez el lote de terreno, el VENDEDOR tendrá derecho a: retomar la posesión y disponer su inmediata venta a través del ADMINISTRADOR',
                '9. En caso que se suscitare alguna divergencia en la interpretación y/o aplicación de este contrato, las partes acuerdan someterse a primera instancia a la conciliación amistosa y la mediación del Centro de Mediación de la Ciudad de Dr. Juan Eulogio Estigarribia, en caso de que las partes no llegaran a un acuerdo, se someterán a los Tribunales Ordinarios de la ciudad de Caaguazú.',
                '',
                '',
                '',
                '',
                '                                                            PLAN DE PAGO                              ',
                'CLIENTE:  ' + item.cliente,
                'Numero de Manzana: ' + item.numero_manzana + '  -   Numero de Lote:  ' + item.numero_lote,



                '                    N° Cuota:          ' + '               Fecha de Vto:         ' + '           Importe Cuota: ',


            ];

            item.detalle.forEach(detalle => {

                texto.push('                       ' + detalle.id_detalle + '                                       ' + dayjs(detalle.fecha_vto).format('DD/MM/YYYY') + '                         ' + ` ${detalle.importe_cuota.toLocaleString('es-PY')} `);
                texto.push(' ');
            });

            // Calcular la posición para centrar el título
            const tituloAncho = doc.getTextWidth(texto[0]);
            const paginaAncho = doc.internal.pageSize.getWidth();
            const tituloX = (paginaAncho - tituloAncho) / 2;

            // Posición inicial
            let yPos = 10;

            // Imprimir el título centrado en la página
            doc.text(texto[0], tituloX, yPos);

            // Ajustar el tamaño de fuente para el resto del texto
            doc.setFontSize(12);

            // Imprimir el resto del texto
            yPos += doc.getTextDimensions(texto[0]).h + 5; // Añadir un espacio entre líneas
            texto.slice(1).forEach(fragmento => {
                const textoDividido = doc.splitTextToSize(fragmento, doc.internal.pageSize.getWidth() - 20); // Restar 20 para dejar un margen
                doc.text(textoDividido, 10, yPos);
                yPos += doc.getTextDimensions(textoDividido).h + 5; // Añadir un espacio entre líneas
                // Agregar nueva página si el texto no cabe en la página actual
                if (yPos > doc.internal.pageSize.getHeight() - 10) {
                    doc.addPage();
                    yPos = 10;
                }
            });

            doc.output('dataurlnewwindow');
            // doc.save('contrato.pdf')
        },




        //SEGUNDO CONTRATO INICIA AQUI
        ImprimirContratoContado(item) {
            const doc = new jsPDF();
            const fecha = dayjs(item.fecha_contrato);
            const fechaFormateada = fecha.format('DD [de] MMMM [del] YYYY');

            // Tamaño de fuente un poco más pequeño para el título
            doc.setFontSize(14);

            // Texto a imprimir (fragmentado en partes)
            const texto = [
                'BOLETO DE COMPRA-VENTA',
                'Plan: 0' + item.id,
                'En la ciudad de Dr. Juan Eulogio Estigarribia, República del Paraguay,' + fechaFormateada + '.-',
                'Concurren por una parte denominada la VENDEDORA, la Empresa SOCIEDAD INMOBILIARIA NUEVO HORIZONTE SA con Ruc: 80115240-2, denominada la VENDEDORA, y por otra parte el/la Sr/Sra ' + item.cliente + ', con cedula de identidad N° ' + item.rucC + ' domiciliado a los efectos de este contrato en la dirección ' + item.direccionCliente + ' de la ciudad de ' + item.ciudadCliente + ', en adelante EL COMPRADOR, a fin de celebrar el presente contrato bajo las condiciones siguientes:',
                'Manzana: ' + item.numero_manzana,
                'Lote: ' + item.numero_lote,
                'Precio: Gs.:' + ` ${item.precioContado.toLocaleString('es-PY')} ` + ' IVA Incluido',
                '1.-El vendedor se obliga a entregar al comprador el lote de terreno objeto de este contrato, libre de gravámenes y ocupantes.',
                '2.- El comprador se obliga a pagar al vendedor el precio pactado en la forma y plazo convenidos.',
                '3.- La posesión del lote de terreno será entregada al comprador al momento de la firma de este contrato.',
                'La falta de pago de cualquiera de las cuotas a su vencimiento dará derecho al VENDEDOR a perseguir el cobro de la totalidad de las cuotas adeudadas por la vía ejecutiva, sin perjuicio de lo establecido en la cláusula 8), sirviendo este contrato de suficiente titulo ejecutivo.',
                '4.- El comprador se obliga a realizar las mejoras en el lote de terreno dentro de los límites del mismo y en ningún caso podrá realizar mejoras antes de haber cancelado las primeras 6 (seis) cuotas mensuales del precio de compraventa.',
                '5.-Todos los impuestos, tasas y contribuciones existentes y/o a crearse, que afecten a dicho lote correrán por cuenta del comprador.',
                '6.- Los gastos, honorarios e impuestos de la escritura de transferencia del terreno serán por cuenta exclusiva del comprador.:',
                '7.- Este contrato no podrá transferirse ni cederse sus derechos sin el consentimiento previo por escrito del vendedor y administrador.',
                '8.- El comprador autoriza al vendedor y administrador a recabar información en plazo referente a su situación patrimonial, solvencia económica o el cumplimiento de sus obligaciones comerciales.',
                '9.- En caso de un atraso superior a 90 (noventa) días en el pago de las cuotas pendientes, el nombre del comprador podrá ser incluido en el registro general de morosos.',
                '10.- En caso de divergencia en la interpretación y/o aplicación de este contrato, las partes se someterán a la conciliación amistosa y la mediación del Centro de Mediación de la Ciudad de Dr. Juan E. Estigarribia.',

            ];

            // Calcular la posición para centrar el título
            const tituloAncho = doc.getTextWidth(texto[0]);
            const paginaAncho = doc.internal.pageSize.getWidth();
            const tituloX = (paginaAncho - tituloAncho) / 2;

            // Posición inicial
            let yPos = 10;

            // Imprimir el título centrado en la página
            doc.text(texto[0], tituloX, yPos);

            // Ajustar el tamaño de fuente para el resto del texto
            doc.setFontSize(12);

            // Imprimir el resto del texto
            yPos += doc.getTextDimensions(texto[0]).h + 5; // Añadir un espacio entre líneas
            texto.slice(1).forEach(fragmento => {
                const textoDividido = doc.splitTextToSize(fragmento, doc.internal.pageSize.getWidth() - 20); // Restar 20 para dejar un margen
                doc.text(textoDividido, 10, yPos);
                yPos += doc.getTextDimensions(textoDividido).h + 5; // Añadir un espacio entre líneas
                // Agregar nueva página si el texto no cabe en la página actual
                if (yPos > doc.internal.pageSize.getHeight() - 10) {
                    doc.addPage();
                    yPos = 10;
                }
            });

            doc.output('dataurlnewwindow');
            // doc.save('contrato.pdf')
        }
        //SEGUNDO CONTRATO FINALIZA AQUI

    },


}
</script>