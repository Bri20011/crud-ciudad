import axios from '@/plugins/axios'


export const ComprasLoteAPI = {
    getAll: () => axios.get('/compras_lote'),
    getById: (id) => axios.get(`/compras_lote/${id}`),
    create: (data) => axios.post('/compras_lote', data),
    update: (id, data) => axios.put(`/compras_lote/${id}`, data),
    delete: (id) => axios.delete(`/compras_lote/${id}`)
}