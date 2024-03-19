import axios from '@/plugins/axios'


export const NDVentaApi = {
    getAll: () => axios.get('/nota_debito_venta'),
    getById: (id) => axios.get(`/nota_debito_venta/${id}`),
    create: (data) => axios.post('/nota_debito_venta', data),
    update: (id, data) => axios.put(`/nota_debito_venta/${id}`, data),
    delete: (id) => axios.delete(`/nota_debito_venta/${id}`)
}