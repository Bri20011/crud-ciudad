import axios from '@/plugins/axios'


export const FuncionarioAPI = {
    getAll: () => axios.get('/funcionario'),
    getById: (id) => axios.get(`/funcionario/${id}`),
    create: (data) => axios.post('/funcionario', data),
    update: (id, data) => axios.put(`/funcionario/${id}`, data),
    delete: (id) => axios.delete(`/funcionario/${id}`)
}