import axios from '@/plugins/axios'


export const OrdenCompraApi = {
    getAll: () => axios.get('/orden_compra'),
    getById: (id) => axios.get(`/orden_compra/${id}`),
    create: (data) => axios.post('/orden_compra', data),
    update: (id, data) => axios.put(`/orden_compra/${id}`, data),
    delete: (id) => axios.delete(`/orden_compra/${id}`)
}