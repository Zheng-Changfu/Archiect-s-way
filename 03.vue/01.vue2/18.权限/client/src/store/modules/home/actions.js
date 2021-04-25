import * as Types from '@/store/constants'
import { fetchSlides, fetchSelect } from '@/api/home'
export default {
  async [Types.GET_SWIPER] ({ commit }) {
    try {
      const data = await fetchSlides()
      commit(Types.GET_SWIPER, data)
    } catch (e) {
      console.log(e, 'e')
    }
  },
  async [Types.GET_SELECT] ({ commit }) {
    try {
      const data = await fetchSelect()
      commit(Types.GET_SELECT, data)
    } catch (error) {
      console.log(error, 'error')
    }
  }
}