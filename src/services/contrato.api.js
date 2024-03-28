import axios from '@/plugins/axios'


export const ContratoApi = {
    getAll: () => axios.get('/contrato'),
    getById: (id) => axios.get(`/contrato/${id}`),
    IdContrCliente: (id) => axios.get(`/contrato/cliente/${id}`),
    create: (data) => axios.post('/contrato', data),
    update: (id, data) => axios.put(`/contrato/${id}`, data),
    delete: (id) => axios.delete(`/contrato/${id}`)
}