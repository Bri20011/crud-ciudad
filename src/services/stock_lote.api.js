import axios from '@/plugins/axios'


export const StockLoteAPI = {
    getAll: () => axios.get('/stock_lote'),
    getById: (id) => axios.get(`/stock_lote/${id}`),
    findByTipo: (id) => axios.get('/stock_lote/obtener-por-tipo/'+id),
    create: (data) => axios.post('/stock_lote', data),
    update: (id, data) => axios.put(`/stock_lote/${id}`, data),
    delete: (id) => axios.delete(`/stock_lote/${id}`)
}