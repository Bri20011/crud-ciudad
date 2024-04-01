import axios from '@/plugins/axios'


export const CesionAPI = {
    getAll: () => axios.get('/cesion'),
    getById: (id) => axios.get(`/cesion/${id}`),
    create: (data) => axios.post('/cesion', data),
    update: (id, data) => axios.put(`/cesion/${id}`, data),
    delete: (id) => axios.delete(`/cesion/${id}`)
}