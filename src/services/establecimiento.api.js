import axios from '@/plugins/axios'


export const EstablecimientoAPI = {
    getAll: () => axios.get('/establecimiento'),
    getById: (id) => axios.get(`/establecimiento/${id}`),
    create: (data) => axios.post('/establecimiento', data),
    update: (id, data) => axios.put(`/establecimiento/${id}`, data),
    delete: (id) => axios.delete(`/establecimiento/${id}`)
}