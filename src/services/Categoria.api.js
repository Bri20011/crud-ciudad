import axios from '@/plugins/axios'


export const CategoriaApi = {
    getAll: () => axios.get('/categoria'),
    getById: (id) => axios.get(`/categoria/${id}`),
    create: (data) => axios.post('/categoria', data),
    update: (id, data) => axios.put(`/categoria/${id}`, data),
    delete: (id) => axios.delete(`/categoria/${id}`)
}