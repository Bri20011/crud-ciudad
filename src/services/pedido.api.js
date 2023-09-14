import axios from '@/plugins/axios'


export const PedidoAPI = {
    getAll: () => axios.get('/pedido'),
    getById: (id) => axios.get(`/pedido/${id}`),
    create: (data) => axios.post('/pedido', data),
    update: (id, data) => axios.put(`/pedido/${id}`, data),
    delete: (id) => axios.delete(`/pedido/${id}`)
}