import axios from '@/plugins/axios'


export const NivelAPI = {
    getAll: () => axios.get('/nivel'),
    getById: (id) => axios.get(`/nivel/${id}`),
    create: (data) => axios.post('/nivel', data),
    update: (id, data) => axios.put(`/nivel/${id}`, data),
    delete: (id) => axios.delete(`/nivel/${id}`)
}