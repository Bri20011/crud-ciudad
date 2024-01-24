import axios from '@/plugins/axios'


export const TipoVentaAPI = {
    getAll: () => axios.get('/tipoventa'),
    getById: (id) => axios.get(`/tipoventa/${id}`),
    create: (data) => axios.post('/tipoventa', data),
    update: (id, data) => axios.put(`/tipoventa/${id}`, data),
    delete: (id) => axios.delete(`/tipoventa/${id}`)
}