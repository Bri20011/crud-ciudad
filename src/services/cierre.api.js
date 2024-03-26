import axios from '@/plugins/axios'


export const CierreAPI = {
    getAll: () => axios.get('/cierre'),
    getById: (id) => axios.get(`/cierre/${id}`),
    create: (data) => axios.post('/cierre', data),
    update: (id, data) => axios.put(`/cierre/${id}`, data),
    delete: (id) => axios.delete(`/cierre/${id}`)
}