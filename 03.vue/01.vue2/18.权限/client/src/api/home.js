import axios from '@/utils/request'

// 请求轮播图
export const fetchSlides = () => axios.get('/getswiper')

// 请求下拉框数据
export const fetchSelect = () => axios.get('/getcategroies')