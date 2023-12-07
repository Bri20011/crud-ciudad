import axios from '@/plugins/axios'


export const NCCompraApi = {
    getAll: () => axios.get('/nota_credito_compra'),
    getById: (id) => axios.get(`/nota_credito_compra/${id}`),
    create: (data) => axios.post('/nota_credito_compra', data),
    update: (id, data) => axios.put(`/nota_credito_compra/${id}`, data),
    delete: (id) => axios.delete(`/nota_credito_compra/${id}`)
}