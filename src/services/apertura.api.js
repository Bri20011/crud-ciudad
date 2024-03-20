import axios from '@/plugins/axios'


export const AperturaAPI = {
    getAll: () => axios.get('/apertura'),
    getById: (id) => axios.get(`/apertura/${id}`),
    create: (data) => axios.post('/apertura', data),
    update: (id, data) => axios.put(`/apertura/${id}`, data),
    delete: (id) => axios.delete(`/apertura/${id}`)
}