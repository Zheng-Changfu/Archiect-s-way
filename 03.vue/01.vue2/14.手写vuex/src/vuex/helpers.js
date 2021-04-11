import { isArray } from "./utils";

export function mapState (states) {
  let obj = {}
  if (isArray(states)) {
    for (let i = 0; i < states.length; i++) {
      const stateName = states[i]
      obj[stateName] = function () {
        return this.$store.state[stateName]
      }
    }
  } else {
    // 对象格式
    Object.keys(states).forEach(stateName => {
      const fn = states[stateName]
      obj[stateName] = function () {
        return fn(this.$store.state)
      }
    })
  }
  return obj
}
export function mapGetters (getters) {
  let obj = {}
  if (isArray(getters)) {
    for (let i = 0; i < getters.length; i++) {
      const getterName = getters[i]
      obj[getterName] = function () {
        return this.$store.getters[getterName]
      }
    }
  } else {
    // 对象格式
    Object.keys(getters).forEach(getterName => {
      const fn = getters[getterName]
      obj[getterName] = function () {
        return fn(this.$store.state)
      }
    })
  }
  return obj
}
export function mapMutations (mutations) {
  let obj = {}
  if (isArray(mutations)) {
    for (let i = 0; i < mutations.length; i++) {
      const mutationName = mutations[i]
      obj[mutationName] = function (...args) {
        return this.$store.commit(mutationName, args)
      }
    }
  } else {
    // 对象格式
    Object.keys(mutations).forEach(methodName => {
      const type = mutations[methodName]
      obj[methodName] = function (...args) {
        return this.$store.commit(type, args)
      }
    })
  }
  return obj
}
export function mapActions (actions) {
  let obj = {}
  if (isArray(actions)) {
    for (let i = 0; i < actions.length; i++) {
      const actionName = actions[i]
      obj[actionName] = function (...args) {
        return this.$store.dispatch(actionName, args)
      }
    }
  } else {
    // 对象格式
    Object.keys(actions).forEach(methodName => {
      const type = actions[methodName]
      obj[methodName] = function (...args) {
        return this.$store.dispatch(type, args)
      }
    })
  }
  return obj
}