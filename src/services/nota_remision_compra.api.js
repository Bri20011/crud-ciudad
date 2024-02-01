import axios from '@/plugins/axios'


export const NRCompraApi = {
    getAll: () => axios.get('/nota_remision_compra'),
    getById: (id) => axios.get(`/nota_remision_compra/${id}`),
    create: (data) => axios.post('/nota_remision_compra', data),
    update: (id, data) => axios.put(`/nota_remision_compra/${id}`, data),
    delete: (id) => axios.delete(`/nota_remision_compra/${id}`)
}