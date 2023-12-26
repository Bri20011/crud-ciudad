import axios from '@/plugins/axios'


export const StockAPI = {
    getAll: () => axios.get('/stock'),
    getById: (id) => axios.get(`/stock/${id}`),
    findByTipo: (id) => axios.get('/stock/obtener-por-tipo/'+id),
    create: (data) => axios.post('/stock', data),
    update: (id, data) => axios.put(`/stock/${id}`, data),
    delete: (id) => axios.delete(`/stock/${id}`)
}