import axios from '@/plugins/axios'


export const MarcaApi = {
    getAll: () => axios.get('/marca'),
    getById: (id) => axios.get(`/marca/${id}`),
    create: (data) => axios.post('/marca', data),
    update: (id, data) => axios.put(`/marca/${id}`, data),
    delete: (id) => axios.delete(`/marca/${id}`)
}