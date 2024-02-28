import axios from '@/plugins/axios'


export const CuentaPagarApi = {
    getAll: () => axios.get('/cuenta_pagar_compra'),
    getById: (id) => axios.get(`/cuenta_pagar_compra/${id}`),
    create: (data) => axios.post('/cuenta_pagar_compra', data),
    update: (id, data) => axios.put(`/cuenta_pagar_compra/${id}`, data),
    delete: (id) => axios.delete(`/cuenta_pagar_compra/${id}`)
}