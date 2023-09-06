import axios from '@/plugins/axios'


export const CiudadAPI = {
    getAll: () => axios.get('/ciudad'),
    getById: (id) => axios.get(`/ciudad/${id}`),
    create: (data) => axios.post('/ciudad', data),
    update: (id, data) => axios.put(`/ciudad/${id}`, data),
    delete: (id) => axios.delete(`/ciudad/${id}`)
}