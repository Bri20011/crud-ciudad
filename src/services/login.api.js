import axios from '@/plugins/axios'


export const LoginAPI = {
    login: (data) => axios.post('/login', data)
}