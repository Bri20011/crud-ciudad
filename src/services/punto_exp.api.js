import axios from '@/plugins/axios'


export const PuntoExpAPI = {
    getAll: () => axios.get('/punto_exp'),
    getById: (id) => axios.get(`/punto_exp/${id}`),
    create: (data) => axios.post('/punto_exp', data),
    update: (id, data) => axios.put(`/punto_exp/${id}`, data),
    delete: (id) => axios.delete(`/punto_exp/${id}`)
}