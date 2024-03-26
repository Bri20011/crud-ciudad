import axios from '@/plugins/axios'


export const RescisionAPI = {
    getAll: () => axios.get('/rescision'),
    getById: (id) => axios.get(`/rescision/${id}`),
    create: (data) => axios.post('/rescision', data),
    update: (id, data) => axios.put(`/rescision/${id}`, data),
    delete: (id) => axios.delete(`/rescision/${id}`)
}