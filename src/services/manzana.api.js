import axios from '@/plugins/axios'


export const ManzanaAPI = {
    getAll: () => axios.get('/manzana'),
    getById: (id) => axios.get(`/manzana/${id}`),
    create: (data) => axios.post('/manzana', data),
    update: (id, data) => axios.put(`/manzana/${id}`, data),
    delete: (id) => axios.delete(`/manzana/${id}`)
}