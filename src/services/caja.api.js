import axios from '@/plugins/axios'


export const CajaAPI = {
    getAll: () => axios.get('/caja'),
    getById: (id) => axios.get(`/caja/${id}`),
    create: (data) => axios.post('/caja', data),
    update: (id, data) => axios.put(`/caja/${id}`, data),
    delete: (id) => axios.delete(`/caja/${id}`)
}