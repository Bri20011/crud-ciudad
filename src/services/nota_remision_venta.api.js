import axios from '@/plugins/axios'


export const NRVentaApi = {
    getAll: () => axios.get('/nota_remision_venta'),
    getById: (id) => axios.get(`/nota_remision_venta/${id}`),
    create: (data) => axios.post('/nota_remision_venta', data),
    update: (id, data) => axios.put(`/nota_remision_venta/${id}`, data),
    delete: (id) => axios.delete(`/nota_remision_venta/${id}`)
}