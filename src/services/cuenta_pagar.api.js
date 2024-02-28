import axios from '@/plugins/axios'


export const CuentaPagarApi = {
    getAll: () => axios.get('/cuenta_pagar'),
    getById: (id) => axios.get(`/cuenta_pagar/${id}`),
    create: (data) => axios.post('/cuenta_pagar', data),
    update: (id, data) => axios.put(`/cuenta_pagar/${id}`, data),
    delete: (id) => axios.delete(`/cuenta_pagar/${id}`)
}