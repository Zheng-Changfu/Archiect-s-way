import * as Types from '@/store/constants'
export default {
  [Types.GET_SWIPER] (state, payload) {
    state.swiperList = payload
  },
  [Types.GET_SELECT] (state, payload) {
    state.selectList = payload.map(item => {
      return {
        text: item.stydyName,
        value: item.code
      }
    })
  },
  [Types.SET_SELECTVALUE] (state, payload) {
    state.selectValue = payload
  }
}