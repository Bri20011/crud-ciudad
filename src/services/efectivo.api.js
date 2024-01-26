import axios from '@/plugins/axios'


export const EfectivoAPI = {
    getAll: () => axios.get('/efectivo'),
    getById: (id) => axios.get(`/efectivo/${id}`),
    create: (data) => axios.post('/efectivo', data),
    update: (id, data) => axios.put(`/efectivo/${id}`, data),
    delete: (id) => axios.delete(`/efectivo/${id}`)
}