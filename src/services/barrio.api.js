import axios from '@/plugins/axios'


export const BarrioAPI = {
    getAll: () => axios.get('/barrio'),
    getById: (id) => axios.get(`/barrio/${id}`),
    create: (data) => axios.post('/barrio', data),
    update: (id, data) => axios.put(`/barrio/${id}`, data),
    delete: (id) => axios.delete(`/barrio/${id}`)
}