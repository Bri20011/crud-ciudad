import axios from '@/plugins/axios'


export const SucursalAPI = {
    getAll: () => axios.get('/sucursal'),
    getById: (id) => axios.get(`/sucursal/${id}`),
    create: (data) => axios.post('/sucursal', data),
    update: (id, data) => axios.put(`/sucursal/${id}`, data),
    delete: (id) => axios.delete(`/sucursal/${id}`)
}