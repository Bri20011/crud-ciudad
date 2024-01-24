import axios from '@/plugins/axios'


export const TimbradoAPI = {
    getAll: () => axios.get('/timbrado'),
    getById: (id) => axios.get(`/timbrado/${id}`),
    create: (data) => axios.post('/timbrado', data),
    update: (id, data) => axios.put(`/timbrado/${id}`, data),
    delete: (id) => axios.delete(`/timbrado/${id}`)
}