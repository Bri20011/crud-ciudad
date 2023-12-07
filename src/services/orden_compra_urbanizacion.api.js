import axios from '@/plugins/axios'


export const OrdenUrbApi = {
    getAll: () => axios.get('/orden_compra_urb'),
    getById: (id) => axios.get(`/orden_compra_urb/${id}`),
    create: (data) => axios.post('/orden_compra_urb', data),
    update: (id, data) => axios.put(`/orden_compra_urb/${id}`, data),
    delete: (id) => axios.delete(`/orden_compra_urb/${id}`)
}