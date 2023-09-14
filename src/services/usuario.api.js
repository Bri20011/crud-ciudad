import axios from '@/plugins/axios'


export const UsuarioAPI = {
    getAll: () => axios.get('/usuario'),
    getById: (id) => axios.get(`/usuario/${id}`),
    create: (data) => axios.post('/usuario', data),
    update: (id, data) => axios.put(`/usuario/${id}`, data),
    delete: (id) => axios.delete(`/usuario/${id}`)
}