import axios from '@/plugins/axios'


export const PedidoUrbanizacionAPI = {
    getAll: () => axios.get('/pedido_urbanizacion'),
    getById: (id) => axios.get(`/pedido_urbanizacion/${id}`),
    create: (data) => axios.post('/pedido_urbanizacion', data),
    update: (id, data) => axios.put(`/pedido_urbanizacion/${id}`, data),
    delete: (id) => axios.delete(`/pedido_urbanizacion/${id}`)
}