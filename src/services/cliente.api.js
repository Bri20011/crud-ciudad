import axios from '@/plugins/axios'


export const ClienteAPI = {
    getAll: () => axios.get('/cliente'),
    getById: (id) => axios.get(`/cliente/${id}`),
    create: (data) => axios.post('/cliente', data),
    update: (id, data) => axios.put(`/cliente/${id}`, data),
    delete: (id) => axios.delete(`/cliente/${id}`)
}