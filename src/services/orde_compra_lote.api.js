import axios from '@/plugins/axios'


export const OrdenUrbApi = {
    getAll: () => axios.get('/orde_compra_lote'),
    getById: (id) => axios.get(`/orde_compra_lote/${id}`),
    create: (data) => axios.post('/orde_compra_lote', data),
    update: (id, data) => axios.put(`/orde_compra_lote/${id}`, data),
    delete: (id) => axios.delete(`/orde_compra_lote/${id}`)
}