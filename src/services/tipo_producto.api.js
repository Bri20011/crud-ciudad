import axios from '@/plugins/axios'


export const TipoProductoAPI = {
    getAll: () => axios.get('/tipo_producto'),
    getById: (id) => axios.get(`/tipo_producto/${id}`),
    create: (data) => axios.post('/tipo_producto', data),
    update: (id, data) => axios.put(`/tipo_producto/${id}`, data),
    delete: (id) => axios.delete(`/tipo_producto/${id}`)
}