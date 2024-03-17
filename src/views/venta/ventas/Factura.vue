<template>
    <v-container class="d-flex justify-center">
      <v-card
        flat
        width="900px"
      >
        <v-container class="pl-10">
          <v-row dense>
            <v-col
              cols="6"
              class="d-flex align-center"
            >
              
              <img class="bg-white imagen-clase" width="400" height="150" src="../../../assets/logFac.PNG" />

            </v-col>
            <v-col
              cols="6"
              class="d-flex justify-end"
            >
              <div class="ma-5 text-center">
                <div class="text-caption">
                  <b>TIMBRADO Nº</b> {{ data.stamping }}
                </div>
                <div class="text-caption">
                  Inicio de vigencia: {{ data.start }}
                </div>
                <div class="text-caption">
                  Fin de vigencia: {{ data.end }}
                </div>
                <div class="text-caption">
                  <b>RUC: 80115240-2</b>
                </div>
                <div class="text-caption">
                  <b>FACTURA</b>
                </div>
                {{ data.invoiceNumber }}
              </div>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="6">
              <div>
                <div><b class="text-uppercase">Fecha de emision: </b> {{ data.date }}</div>
                <div><b class="text-uppercase">Razón social: </b>{{ data.social_reason }}</div>
                <div><b class="text-uppercase">Ruc: </b> {{ data.document }}</div>
              </div>
            </v-col>
            <v-col cols="1" />
            <v-col cols="5">
              <div>
                <div><b class="text-uppercase">Condición de venta: </b> {{ data.condition }}</div>
                <div><b class="text-uppercase">Tel: </b>{{ data.phone }}</div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-table density="compact">
                <thead>
                  <tr class="bg-blue-grey-lighten-5">
                    <th class="text-left font-weight-bold">
                      Cant.
                    </th>
                    <th class="text-left font-weight-bold">
                      Descripción
                    </th>
                    <th class="text-left font-weight-bold">
                      Precio unit.
                    </th>
                    <th class="text-right font-weight-bold">
                      Exentas
                    </th>
                    <th class="text-right font-weight-bold">
                      5%
                    </th>
                    <th class="text-right font-weight-bold">
                      10%
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in data.detail"
                    :key="i"
                  >
                    <td>{{ item.cant }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.price }}</td>
                    <td class="text-right">
                      {{ item.exentas }}
                    </td>
                    <td class="text-right">
                      {{ item.iva5 }}
                    </td>
                    <td class="text-right">
                      {{ item.iva10 }}
                    </td>
                  </tr>
                  <tr>
                    <td><span class="font-weight-bold">Sub totales</span></td>
                    <td colspan="2" />
                    <td class="text-right">
                      {{ data.subTotals.exentas }}
                    </td>
                    <td class="text-right">
                      {{ data.subTotals.iva5 }}
                    </td>
                    <td class="text-right">
                      {{ data.subTotals.iva10 }}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="5">
                      <span class="font-weight-bold mr-1">Total a pagar: </span>{{ data.total.literal }}
                    </td>
                    <td class="text-right text-h6">
                      {{ data.total.amount }}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="6">
                      <v-row dense>
                        <v-col cols="4">
                        

                          <span class="font-weight-bold mr-2">(5%)</span> <span>{{ data.iva.iva5 }}</span>
                          

                        </v-col>
                        <v-col
                          cols="4"
                          class="d-flex justify-center"
                        >
                          <span class="font-weight-bold mr-2">(10%)</span> <span>{{ data.iva.iva10 }}</span>
                        </v-col>
                        <v-col
                          cols="4"
                          class="d-flex justify-end"
                        >
                          <span class="font-weight-bold mr-2">Total iva:</span> <span>{{ data.iva.total }}</span>
                        </v-col>
                      </v-row>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
  </template>

  <script>
  export default {
    data: () => ({
      data: {
        stamping: '',
        start: '',
        end: '',
        invoiceNumber: '',
        date: '',
        social_reason: '',
        document: '',
        condition: '',
        phone: '',
        detail: [
          {
            cant: '',
            description: '',
            price: '',
            exentas: '',
            iva5: '',
            iva10: ''
          }
        ],
        subTotals: {
          exentas: '',
          iva5: '',
          iva10: ''
        },
        total: {
          literal: '',
          amount: ''
        },
        iva: {
          iva5: '',
          iva10: '',
          total: ''
        }
      },
    }),
    created() {
      const query = this.$route.query
      this.data = {
        ...this.data,
        ...JSON.parse(query.data)
      }
    }
  }
  </script>
  <style scoped>
  .imagen-clase {
    object-fit: contain;

  }
</style>