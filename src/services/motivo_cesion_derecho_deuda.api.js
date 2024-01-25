import axios from '@/plugins/axios'


export const MotivoCesionAPI = {
    getAll: () => axios.get('/motivo_cesion_derecho_deuda'),
    getById: (id) => axios.get(`/motivo_cesion_derecho_deuda/${id}`),
    create: (data) => axios.post('/motivo_cesion_derecho_deuda', data),
    update: (id, data) => axios.put(`/motivo_cesion_derecho_deuda/${id}`, data),
    delete: (id) => axios.delete(`/motivo_cesion_derecho_deuda/${id}`)
}
