import axios from '@/plugins/axios'


export const MonedaAPI = {
    getAll: () => axios.get('/moneda'),
    getById: (id) => axios.get(`/moneda/${id}`),
    create: (data) => axios.post('/moneda', data),
    update: (id, data) => axios.put(`/moneda/${id}`, data),
    delete: (id) => axios.delete(`/moneda/${id}`)
}