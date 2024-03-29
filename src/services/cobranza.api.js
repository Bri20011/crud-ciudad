import axios from '@/plugins/axios'


export const CobranzaApi = {
    getAll: () => axios.get('/cobranza'),
    getById: (id) => axios.get(`/cobranza/${id}`),
    create: (data) => axios.post('/cobranza', data),
    update: (id, data) => axios.put(`/cobranza/${id}`, data),
    delete: (id) => axios.delete(`/cobranza/${id}`)
}