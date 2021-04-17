import axios from '@/utils/request'

// 请求登录
export const fetchLogin = (data) => axios.post('/user/login', data)
// 验证是否登录过
export const fetchValidate = () => axios.post('/user/validate')