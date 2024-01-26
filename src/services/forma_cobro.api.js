import axios from '@/plugins/axios'


export const FormaCobroAPI = {
    getAll: () => axios.get('/forma_cobro'),
    getById: (id) => axios.get(`/forma_cobro/${id}`),
    create: (data) => axios.post('/forma_cobro', data),
    update: (id, data) => axios.put(`/forma_cobro/${id}`, data),
    delete: (id) => axios.delete(`/forma_cobro/${id}`)
}