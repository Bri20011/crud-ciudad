import axios from '@/plugins/axios'


export const ComprasAPI = {
    getAll: () => axios.get('/compras'),
    getById: (id) => axios.get(`/compras/${id}`),
    create: (data) => axios.post('/compras', data),
    update: (id, data) => axios.put(`/compras/${id}`, data),
    delete: (id) => axios.delete(`/compras/${id}`)
}