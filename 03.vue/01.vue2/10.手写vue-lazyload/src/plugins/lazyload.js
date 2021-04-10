let plugin = {
  install (Vue, options) {
    const LazyClass = lazy(Vue)
    const instance = new LazyClass(options)
    Vue.directive('lazy', {
      bind: instance.add.bind(instance),
      unbind: instance.remove.bind(instance)
    })
  }
}

const render = (instance, status) => {
  let el = instance.el
  let src = ''
  switch (status) {
    case 'loading':
      src = instance.options.loading
      break
    case 'loaded':
      src = instance.src
      break
    case 'error':
      src = instance.options.error
  }
  el.setAttribute('src', src)
}

const loadImg = (src, resolve, reject) => {
  const img = new Image()
  img.src = src
  img.onload = resolve
  img.onerror = reject
}

const lazy = (Vue) => {
  class ReactiveImg {
    constructor({ el, src, options }) {
      this.el = el
      this.options = options
      this.src = src
      this.state = { loading: false }
    }
    checkInView () {
      const { top } = this.el.getBoundingClientRect()
      return top < window.innerHeight * this.options.preload
    }
    load () {
      // 图片加载中... 
      // 图片加载成功显示真实图片，图片加载失败显示失败信息
      render(this, 'loading')
      setTimeout(() => {
        loadImg(this.src, () => {
          this.state.loading = true
          render(this, 'loaded')
        }, () => {
          this.state.loading = true
          render(this, 'error')
        })
      }, 1000)
    }
  }

  return class LazyClass {
    constructor(options) {
      this.options = options
      this.handler = false
      this.listerens = []
    }
    add (el, bindings) {
      Vue.nextTick(() => {
        const listeren = new ReactiveImg({
          el,
          src: bindings.value,
          options: this.options
        })
        // 找到父级元素，绑定滚动事件
        const elm = scrollParent(el)
        this.listerens.push(listeren)
        if (!this.handler) {
          elm.addEventListener('scroll', this.scroll.bind(this))
          this.handler = true
        }
        // 初始化显示图片
        this.scroll()
      })
    }
    scroll () {
      this.listerens.forEach(listeren => {
        if (listeren.state.loading) return
        // 判断是否需要显示
        listeren.checkInView() && listeren.load()
      })
    }
    remove () { }
  }
}

const scrollParent = (el) => {
  let parentNode = el.parentNode
  while (parentNode) {
    if (/scroll/.test(getComputedStyle(parentNode)['overflow'])) {
      return parentNode
    }
    parentNode = parentNode.parentNode
  }
  return parentNode
}

export default plugin