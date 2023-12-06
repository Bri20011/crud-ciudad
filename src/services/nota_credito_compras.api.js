import axios from '@/plugins/axios'


export const NCCompraApi = {
    getAll: () => axios.get('/nccompra'),
    getById: (id) => axios.get(`/nccompra/${id}`),
    create: (data) => axios.post('/nccompra', data),
    update: (id, data) => axios.put(`/nccompra/${id}`, data),
    delete: (id) => axios.delete(`/nccompra/${id}`)
}