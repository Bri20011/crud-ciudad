import axios from '@/plugins/axios'


export const MotivoTrasladoAPI = {
    getAll: () => axios.get('/motivo_traslado_remision'),
    getById: (id) => axios.get(`/motivo_traslado_remision/${id}`),
    create: (data) => axios.post('/motivo_traslado_remision', data),
    update: (id, data) => axios.put(`/motivo_traslado_remision/${id}`, data),
    delete: (id) => axios.delete(`/motivo_traslado_remision/${id}`)
}