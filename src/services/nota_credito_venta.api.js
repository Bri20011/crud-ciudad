import axios from '@/plugins/axios'


export const NCVentaApi = {
    getAll: () => axios.get('/nota_credito_venta'),
    getById: (id) => axios.get(`/nota_credito_venta/${id}`),
    create: (data) => axios.post('/nota_credito_venta', data),
    update: (id, data) => axios.put(`/nota_credito_venta/${id}`, data),
    delete: (id) => axios.delete(`/nota_credito_venta/${id}`)
}