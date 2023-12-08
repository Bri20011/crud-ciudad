import axios from '@/plugins/axios'


export const NDCompraApi = {
    getAll: () => axios.get('/nota_debito_compras'),
    getById: (id) => axios.get(`/nota_debito_compras/${id}`),
    create: (data) => axios.post('/nota_debito_compras', data),
    update: (id, data) => axios.put(`/nota_debito_compras/${id}`, data),
    delete: (id) => axios.delete(`/nota_debito_compras/${id}`)
}