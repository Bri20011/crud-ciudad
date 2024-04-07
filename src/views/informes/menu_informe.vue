<template>
    <v-container>
        <v-card>
            <v-toolbar color="blue-grey">
                <v-toolbar-title>Informes</v-toolbar-title>
            </v-toolbar>
            <div class="d-flex flex-row">
                <v-tabs v-model="tab" direction="vertical" color="blue-grey">
                    <v-tab value="option-1">
                        <v-icon start>
                            mdi-chart-bar
                        </v-icon>
                        Compras
                    </v-tab>
                    <v-tab value="option-2">
                        <v-icon start>
                            mdi-chart-bar
                        </v-icon>
                        Produccion
                    </v-tab>
                    <v-tab value="option-3">
                        <v-icon start>
                            mdi-chart-bar
                        </v-icon>
                        Ventas
                    </v-tab>
                    <v-tab value="option-4">
                        <v-icon start>
                            mdi-chart-bar
                        </v-icon>
                        Mantenimientos
                    </v-tab>
                </v-tabs>
                <v-window v-model="tab">
                    <v-window-item value="option-1">
                        <v-card flat>
                            <v-tabs v-model="tabCompras" color="blue-grey">
                                <v-tab value="option-compras-1">Pedido</v-tab>
                                <v-tab value="option-compras-2">Presupuesto</v-tab>
                                <v-tab value="option-compras-3">Orden de compra</v-tab>
                                <v-tab value="option-compras-4">Compras</v-tab>
                                <v-tab value="option-compras-5">Nota de Credito</v-tab>
                                <v-tab value="option-compras-6">Nota de Debito</v-tab>
                                <v-tab value="option-compras-7">Nota de Remision</v-tab>
                            </v-tabs>

                            <v-card-text>
                                <v-window v-model="tabCompras">
                                    <v-window-item value="option-compras-1" v-if="$tienePermiso('/nota_credito_compras')">
                                        <ComponenteNotaCreditoCompra/>
                                    </v-window-item>

                                    <v-window-item value="option-compras-6"  v-if="$tienePermiso('/nota_debito_compra')">
                                       <ComponenteNotaDebitoCompra/>
                                    </v-window-item>

                                    <v-window-item value="option-compras-7">
                                        <ComponenteNotaRemisionCompra/>
                                    </v-window-item>
                                </v-window>
                            </v-card-text>
                        </v-card>
                    </v-window-item>

                    <v-window-item value="option-2">
                        <v-card flat>
                            <v-tabs v-model="tabProduccion" color="blue-grey">
                                <v-tab value="option-produccion-1">Orden de Compra Urbanizacion</v-tab>
                                <v-tab value="option-produccion-2">Registro de Compras de Lotes</v-tab>
                                <v-tab value="option-produccion-3">Registro de Urbanizacion</v-tab>
                                <v-tab value="option-produccion-4">Registro precio de Lotes</v-tab>
                                <v-tab value="option-produccion-5">Registro Contrato</v-tab>
                                <v-tab value="option-produccion-6">Registro Rescision de Contrato</v-tab>
                                <v-tab value="option-produccion-7">Registro de Cesión de Derechos y Deudas</v-tab>
                            </v-tabs>

                            <v-card-text>
                                <v-window v-model="tabProduccion">
                                    <v-window-item value="option-produccion-1">
                                        <ComponenteOrdenCompraLote/>
                                    </v-window-item>

                                    <v-window-item value="option-produccion-2">
                                        <ComponenteCompraLote/>
                                    </v-window-item>

                                    <v-window-item value="option-produccion-3">
                                        <ComponenteUrbanizacion/>
                                    </v-window-item>

                                    <v-window-item value="option-produccion-4">
                                        Compras
                                    </v-window-item>

                                    <v-window-item value="option-produccion-5">
                                       <ComponenteContrato/>
                                    </v-window-item>

                                    <v-window-item value="option-produccion-6">
                                        Nota de Debito
                                    </v-window-item>

                                    <v-window-item value="option-produccion-7">
                                        Nota de Remision
                                    </v-window-item>
                                </v-window>
                            </v-card-text>
                        </v-card>
                    </v-window-item>

                    <v-window-item value="option-3">
                        <v-card flat>
                            <v-tabs v-model="tabVenta" color="blue-grey">
                                <v-tab value="option-venta-1">Venta</v-tab>
                                <v-tab value="option-venta-2">Notas de Credito Ventas</v-tab>
                                <v-tab value="option-venta-3">Notas de Debitos Ventas</v-tab>
                                <v-tab value="option-venta-4">Notas de Remisiones Ventas</v-tab>
                                <v-tab value="option-venta-5">Registro de Ventas</v-tab>
                                <v-tab value="option-venta-6">Cobranza por forma de Cobro</v-tab>
                                <v-tab value="option-venta-7">Registro de Notas de Creditos</v-tab>
                                <v-tab value="option-venta-8">Registro de Notas de Debitos</v-tab>
                                <v-tab value="option-venta-9">Registro de Notas de Remision</v-tab>
                             
                            </v-tabs>

                            <v-card-text>
                                <v-window v-model="tabVenta">
                                    <v-window-item value="option-venta-1">
                                        <ComponenteVenta/>
                                    </v-window-item>

                                    <v-window-item value="option-venta-2">
                                        <ComponenteNotaCreditoVenta/>
                                    </v-window-item>

                                    <v-window-item value="option-venta-3">
                                        <ComponenteNotaDebitoVenta/>
                                    </v-window-item>

                                    <v-window-item value="option-venta-4">
                                        <ComponenteNotaRemisionVenta/>
                                    </v-window-item>

                                    <v-window-item value="option-venta-5">
                                        Nota de Credito
                                    </v-window-item>

                                    <v-window-item value="option-venta-6">
                                        Nota de Debito
                                    </v-window-item>

                                    <v-window-item value="option-venta-7">
                                        Nota de Remision
                                    </v-window-item>
                                </v-window>
                            </v-card-text>
                        </v-card>
                    </v-window-item>

                    <v-window-item value="option-4">
                        <v-card flat>
                            <v-tabs v-model="tabmantenimiento" color="blue-grey">
                                <v-tab value="option-mantenimiento-1">Barrio</v-tab>
                                <v-tab value="option-mantenimiento-2">Caja</v-tab>
                                <v-tab value="option-mantenimiento-3">Ciudad</v-tab>
                                <v-tab value="option-mantenimiento-4">Categoria</v-tab>
                                <v-tab value="option-mantenimiento-5">Cliente</v-tab>
                                <v-tab value="option-mantenimiento-6">Efectivo</v-tab>
                                <v-tab value="option-mantenimiento-7">Forma de Cobro</v-tab>
                                <v-tab value="option-mantenimiento-8">Funcionario</v-tab>
                                <v-tab value="option-mantenimiento-9">Iva</v-tab>
                                <v-tab value="option-mantenimiento-10">Manzana</v-tab>
                                <v-tab value="option-mantenimiento-11">Marca</v-tab>
                                <v-tab value="option-mantenimiento-12">Moneda</v-tab>
                                <v-tab value="option-mantenimiento-13">Motivo Cesion Contrato</v-tab>
                                <v-tab value="option-mantenimiento-14">Motivo Rescicion Contrato</v-tab>
                                <v-tab value="option-mantenimiento-15">Motivo Traslado</v-tab>
                                <v-tab value="option-mantenimiento-16">Niveles</v-tab>
                                <v-tab value="option-mantenimiento-17">Numero de Establecimiento</v-tab>
                                <v-tab value="option-mantenimiento-18">Numreo de Expedicion</v-tab>
                                <v-tab value="option-mantenimiento-19">Producto</v-tab>
                                <v-tab value="option-mantenimiento-20">Producto</v-tab>
                                <v-tab value="option-mantenimiento-21">Proveedor</v-tab>
                                <v-tab value="option-mantenimiento-22">Sucursal</v-tab>
                                <v-tab value="option-mantenimiento-23">Timbrado</v-tab>
                                <v-tab value="option-mantenimiento-24">Tipo Documento</v-tab>
                                <v-tab value="option-mantenimiento-25">Tipo Producto</v-tab>
                                <v-tab value="option-mantenimiento-26">Tipo Venta</v-tab>
                                <v-tab value="option-mantenimiento-27">Tipo Usuario</v-tab>





                             
                            </v-tabs>

                            <v-card-text>
                                <v-window v-model="tabmantenimiento">
                                    <v-window-item value="option-mantenimiento-1">
                                        <ComponenteBarrio/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-2">
                                        <ComponenteCaja/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-3">
                                        <ComponenteCiudad/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-4">
                                        <ComponenteCategoria/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-5">
                                        <ComponenteCliente/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-6">
                                        <ComponenteEfectivo/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-7">
                                        <ComponenteFormaCobro/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-8">
                                        <ComponenteFuncionario/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-9">
                                        <ComponenteIva/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-10">
                                        <ComponenteManzana/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-11">
                                        <ComponenteMarca/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-12">
                                        <ComponenteMoneda/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-13">
                                        <ComponenteMotivoCesionContrato/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-14">
                                        <ComponenteMotivoRescicionContrato/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-15">
                                        <ComponenteMotivoTraslado/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-16">
                                        <ComponenteNiveles/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-17">
                                        <ComponenteNumeroEstablecimiento/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-18">
                                        <ComponenteNumeroExpedicion/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-19">
                                        <ComponenteProducto/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-20">
                                        <ComponenteProducto/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-21">
                                        <ComponenteProveedor/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-22">
                                        <ComponenteSucursal/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-23">
                                        <ComponenteTimbrado/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-24">
                                        <ComponenteTipoDocumento/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-25">
                                        <ComponenteTipoProducto/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-26">
                                        <ComponenteTipoVenta/>
                                    </v-window-item>
                                    <v-window-item value="option-mantenimiento-27">
                                        <ComponenteUsuario/>
                                    </v-window-item>
                                </v-window>
                            </v-card-text>
                        </v-card>
                    </v-window-item>

                </v-window>
                
            </div>
        </v-card>
    </v-container>
</template>

<script>
import ComponenteInformePedido from './informe_compras/informe_pedido.vue';
import ComponenteOrdenCompra from './informe_compras/informe_orden_compra.vue';
import ComponenteInformePresupuesto from './informe_compras/informe_presupuesto.vue';
import ComponenteCompra from './informe_compras/informe_compra.vue';
import ComponenteNotaCreditoCompra from './informe_compras/informe_nota_credito_compra.vue';
import ComponenteNotaDebitoCompra from './informe_compras/informe_nota_debito_compra.vue';
import ComponenteNotaRemisionCompra from './informe_compras/informe_nota_remision_compra.vue';
import ComponenteBarrio from './informe_mantenimiento/informe_barrio.vue';
import ComponenteCaja from './informe_mantenimiento/informe_caja.vue';
import ComponenteCiudad from './informe_mantenimiento/informe_ciudad.vue';
import ComponenteCategoria from './informe_mantenimiento/informe_categoria.vue';
import ComponenteCliente from './informe_mantenimiento/informe_cliente.vue';
import ComponenteEfectivo from './informe_mantenimiento/informe_efectivo.vue';
import ComponenteFormaCobro from './informe_mantenimiento/informe_forma_cobro.vue';
import ComponenteFuncionario from './informe_mantenimiento/informe_funcionario.vue';
import ComponenteIva from './informe_mantenimiento/informe_iva.vue';
import ComponenteManzana from './informe_mantenimiento/informe_manzana.vue';
import ComponenteMarca from './informe_mantenimiento/informe_marca.vue';
import ComponenteMoneda from './informe_mantenimiento/informe_moneda.vue';
import ComponenteMotivoCesionContrato from './informe_mantenimiento/informe_motivo_cesion_contrato.vue';
import ComponenteMotivoRescicionContrato from './informe_mantenimiento/informe_motivo_rescision_contrato.vue';
import ComponenteMotivoTraslado from './informe_mantenimiento/informe_motivo_traslado.vue';
import ComponenteNiveles from './informe_mantenimiento/informe_nivel.vue';
import ComponenteNumeroEstablecimiento from './informe_mantenimiento/informe_numero_establecimiento.vue';
import ComponenteNumeroExpedicion from './informe_mantenimiento/informe_numero_expedicion.vue';
import ComponenteProducto from './informe_mantenimiento/informe_producto.vue';
import ComponenteProveedor from './informe_mantenimiento/informe_proveedor.vue';
import ComponenteSucursal from './informe_mantenimiento/informe_sucursal.vue';
import ComponenteTimbrado from './informe_mantenimiento/informe_timbrado.vue';
import ComponenteTipoDocumento from './informe_mantenimiento/informe_tipo_documento.vue';
import ComponenteTipoProducto from './informe_mantenimiento/informe_tipo_producto.vue';
import ComponenteTipoVenta from './informe_mantenimiento/informe_tipo_venta.vue';
import ComponenteUsuario from './informe_mantenimiento/informe_usuario.vue';
import ComponenteOrdenCompraLote from './informe_produccion/informe_orden_compra_lote.vue';
import ComponenteCompraLote from './informe_produccion/informe_compra_lote.vue';
import ComponenteUrbanizacion from './informe_produccion/informe_urbanizacion.vue';
import ComponenteContrato from './informe_produccion/informe_contrato.vue';
import ComponenteVenta from './informe_ventas/informe_venta.vue';
import ComponenteNotaCreditoVenta from './informe_ventas/informe_nota_credito_venta.vue';
import ComponenteNotaDebitoVenta from './informe_ventas/informe_nota_debito_venta.vue';
import ComponenteNotaRemisionVenta from './informe_ventas/informe_nota_remision_venta.vue';
export default {
    components: {
        ComponenteInformePedido,
        ComponenteInformePresupuesto,
        ComponenteOrdenCompra,
        ComponenteCompra,
        ComponenteNotaCreditoCompra,
        ComponenteNotaDebitoCompra,
        ComponenteNotaRemisionCompra,
        ComponenteBarrio,
        ComponenteCaja,
        ComponenteCiudad,
        ComponenteCategoria,
        ComponenteCliente,
        ComponenteEfectivo,
        ComponenteFormaCobro,
        ComponenteFuncionario,
        ComponenteIva,
        ComponenteManzana,
        ComponenteMarca,
        ComponenteMoneda,
        ComponenteMotivoCesionContrato,
        ComponenteMotivoRescicionContrato,
        ComponenteMotivoTraslado,
        ComponenteNiveles,
        ComponenteNumeroEstablecimiento,
        ComponenteNumeroExpedicion,
        ComponenteProducto,
        ComponenteProveedor,
        ComponenteSucursal,
        ComponenteTimbrado,
        ComponenteTipoDocumento,
        ComponenteTipoProducto,
        ComponenteTipoVenta,
        ComponenteUsuario,
        ComponenteOrdenCompraLote,
        ComponenteCompraLote,
        ComponenteUrbanizacion,
        ComponenteContrato,
        ComponenteVenta,
        ComponenteNotaCreditoVenta,
        ComponenteNotaDebitoVenta,
        ComponenteNotaRemisionVenta
       

    },
    data: () => ({
        tab: 'option-1',
        tabCompras: 'option-compras-1',
        tabProduccion: 'option-produccion-1',
        tabVenta: 'option-venta-1',
        tabmantenimiento: 'option-mantenimiento-1'
    }),
}
</script>