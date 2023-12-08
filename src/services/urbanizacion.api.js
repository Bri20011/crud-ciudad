import axios from '@/plugins/axios'


export const UrbanizacionApi = {
    getAll: () => axios.get('/urbanizacion'),
    getById: (id) => axios.get(`/urbanizacion/${id}`),
    create: (data) => axios.post('/urbanizacion', data),
    update: (id, data) => axios.put(`/urbanizacion/${id}`, data),
    delete: (id) => axios.delete(`/urbanizacion/${id}`)
}