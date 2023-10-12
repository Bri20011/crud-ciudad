import axios from '@/plugins/axios'


export const ProveedorAPI = {
    getAll: () => axios.get('/proveedor'),
    getById: (id) => axios.get(`/proveedor/${id}`),
    create: (data) => axios.post('/proveedor', data),
    update: (id, data) => axios.put(`/proveedor/${id}`, data),
    delete: (id) => axios.delete(`/proveedor/${id}`)
}