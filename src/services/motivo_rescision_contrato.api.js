import axios from '@/plugins/axios'


export const MotivoRescisionAPI = {
    getAll: () => axios.get('/motivo_rescision_contrato'),
    getById: (id) => axios.get(`/motivo_rescision_contrato/${id}`),
    create: (data) => axios.post('/motivo_rescision_contrato', data),
    update: (id, data) => axios.put(`/motivo_rescision_contrato/${id}`, data),
    delete: (id) => axios.delete(`/motivo_rescision_contrato/${id}`)
}