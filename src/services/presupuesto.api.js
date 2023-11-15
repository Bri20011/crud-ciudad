import axios from '@/plugins/axios'


export const PresupuestoApi = {
    getAll: () => axios.get('/presupuesto'),
    getById: (id) => axios.get(`/presupuesto/${id}`),
    create: (data) => axios.post('/presupuesto', data),
    update: (id, data) => axios.put(`/presupuesto/${id}`, data),
    delete: (id) => axios.delete(`/presupuesto/${id}`)
}