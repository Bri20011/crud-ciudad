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
                                    <v-window-item value="option-compras-1">
                                        <ComponenteInformePedido />
                                    </v-window-item>

                                    <v-window-item value="option-compras-2">
                                        Presupuesto
                                    </v-window-item>

                                    <v-window-item value="option-compras-3">
                                        Orden de compra
                                    </v-window-item>

                                    <v-window-item value="option-compras-4">
                                        Compras
                                    </v-window-item>

                                    <v-window-item value="option-compras-5">
                                        Nota de Credito
                                    </v-window-item>

                                    <v-window-item value="option-compras-6">
                                        Nota de Debito
                                    </v-window-item>

                                    <v-window-item value="option-compras-7">
                                        Nota de Remision
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
                                        Pedido
                                    </v-window-item>

                                    <v-window-item value="option-produccion-2">
                                        Presupuesto
                                    </v-window-item>

                                    <v-window-item value="option-produccion-3">
                                        Orden de compra
                                    </v-window-item>

                                    <v-window-item value="option-produccion-4">
                                        Compras
                                    </v-window-item>

                                    <v-window-item value="option-produccion-5">
                                        Nota de Credito
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
                            <v-card-text>
                                <p>
                                    Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin
                                    viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi
                                    mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                                </p>

                                <p class="mb-0">
                                    Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum,
                                    porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu,
                                    pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                                </p>
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
export default {
    components: {
        ComponenteInformePedido
    },
    data: () => ({
        tab: 'option-1',
        tabCompras: 'option-compras-1',
        tabProduccion: 'option-produccion-1',
    }),
}
</script>