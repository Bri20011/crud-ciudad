import axios from '@/plugins/axios'


export const ProductoAPI = {
    getAll: () => axios.get('/producto'),
    findByTipo: (id) => axios.get('/producto/obtener-por-tipo/1'),
    getById: (id) => axios.get(`/producto/${id}`),
    create: (data) => axios.post('/producto', data),
    update: (id, data) => axios.put(`/producto/${id}`, data),
    delete: (id) => axios.delete(`/producto/${id}`)
}