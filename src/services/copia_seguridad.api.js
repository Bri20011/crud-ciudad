import axios from '@/plugins/axios'


export const CopiaSeguridadAPI = {
    create: () => axios.post('/backup'),

}