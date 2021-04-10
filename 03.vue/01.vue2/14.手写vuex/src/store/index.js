import Vue from 'vue'
import Vuex from '../vuex'
// import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // strict: true,
  state: {
    name: 'zcf',
    age: 22,
  },
  getters: {
    getAge (state) {
      console.log(222)
      return state.age
    }
  },
  mutations: {
    // 错误写法,不能写异步操作，如果想要异步操作，要放在action中
    // ageChange (state) {
    //   setTimeout(() => {
    //     state.age++
    //   }, 1000)
    // },
    ageChange (state) {
      console.log(state, 'state')
      state.age++
    }
  },
  actions: {
    ageChange (store) {
      setTimeout(() => {
        store.state.age++
      }, 1000)
    }
  },
  modules: {
    a: {
      namespaced: true,
      state: {
        name: 'zcf',
        age: 22,
      },
      getters: {
        getAge (state) {
          console.log(222)
          return state.age
        }
      },
      mutations: {
        // 错误写法,不能写异步操作，如果想要异步操作，要放在action中
        // ageChange (state) {
        //   setTimeout(() => {
        //     state.age++
        //   }, 1000)
        // },
        ageChange (state) {
          console.log(state, 'state')
          state.age++
        }
      },
      actions: {
        ageChange (store) {
          setTimeout(() => {
            store.state.age++
          }, 1000)
        }
      },
      modules: {
        c: {
          namespaced: true,
          state: {
            name: 'zcf',
            age: 22,
          },
          getters: {
            getAge (state) {
              console.log(222)
              return state.age
            }
          },
          mutations: {
            // 错误写法,不能写异步操作，如果想要异步操作，要放在action中
            // ageChange (state) {
            //   setTimeout(() => {
            //     state.age++
            //   }, 1000)
            // },
            ageChange (state) {
              console.log(state, 'state')
              state.age++
            }
          },
          actions: {
            ageChange (store) {
              setTimeout(() => {
                store.state.age++
              }, 1000)
            }
          },
        }
      }
    },
    b: {
      namespaced: true,
      state: {
        name: 'zcf',
        age: 22,
      },
      getters: {
        getAge (state) {
          console.log(222)
          return state.age
        }
      },
      mutations: {
        // 错误写法,不能写异步操作，如果想要异步操作，要放在action中
        // ageChange (state) {
        //   setTimeout(() => {
        //     state.age++
        //   }, 1000)
        // },
        ageChange (state) {
          console.log(state, 'state')
          state.age++
        }
      },
      actions: {
        ageChange (store) {
          setTimeout(() => {
            store.state.age++
          }, 1000)
        }
      },
    }
  }
})
