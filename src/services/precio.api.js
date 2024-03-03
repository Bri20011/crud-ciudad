import axios from '@/plugins/axios'


export const PrecioApi = {
    getAll: () => axios.get('/precio'),
    getById: (id) => axios.get(`/precio/${id}`),
    create: (data) => axios.post('/precio', data),
    update: (id, data) => axios.put(`/precio/${id}`, data),
    delete: (id) => axios.delete(`/precio/${id}`)
}