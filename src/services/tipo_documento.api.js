import axios from '@/plugins/axios'


export const TipoDocumentoAPI = {
    getAll: () => axios.get('/tipo_documento'),
    getById: (id) => axios.get(`/tipo_documento/${id}`),
    create: (data) => axios.post('/tipo_documento', data),
    update: (id, data) => axios.put(`/tipo_documento/${id}`, data),
    delete: (id) => axios.delete(`/tipo_documento/${id}`)
}