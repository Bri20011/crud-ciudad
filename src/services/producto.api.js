import axios from '@/plugins/axios'


export const ProductoAPI = {
    getAll: () => axios.get('/producto'),
    getById: (id) => axios.get(`/producto/${id}`),
    create: (data) => axios.post('/producto', data),
    update: (id, data) => axios.put(`/producto/${id}`, data),
    delete: (id) => axios.delete(`/producto/${id}`)
}