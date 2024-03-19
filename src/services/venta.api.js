import axios from '@/plugins/axios'

export const VentaAPI = {
    getAll: () => axios.get('/venta'),
    ObtenerNumeroFactura: (id) => axios.get(`/venta/numeroFactura/${id}`),
    descargarFactura: (id) => axios.get(`/venta/descargarFactura/${id}`),
    libroventa: (id) => axios.get(`/venta/libroventa`),
    getById: (id) => axios.get(`/venta/${id}`),
    create: (data) => axios.post('/venta', data),
    update: (id, data) => axios.put(`/venta/${id}`, data),
    delete: (id) => axios.delete(`/venta/${id}`)
}