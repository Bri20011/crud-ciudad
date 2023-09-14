import axios from '@/plugins/axios'


export const IvaAPI = {
    getAll: () => axios.get('/iva'),
    getById: (id) => axios.get(`/iva/${id}`),
    create: (data) => axios.post('/iva', data),
    update: (id, data) => axios.put(`/iva/${id}`, data),
    delete: (id) => axios.delete(`/iva/${id}`)
}