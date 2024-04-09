import axios from '@/plugins/axios'


export const PrecioApi = {
    getAll: () => axios.get('/precio'),
    getById: (id) => axios.get(`/precio/${id}`),
    findByTipo: (id) => axios.get('/precio/obtener-por-tipo/'+id),
    create: (data) => axios.post('/precio', data),
    update: (id, data) => axios.put(`/precio/${id}`, data),
    estado: (id) => axios.put(`/precio/estado/${id}`),
    delete: (id) => axios.delete(`/precio/${id}`)
}


