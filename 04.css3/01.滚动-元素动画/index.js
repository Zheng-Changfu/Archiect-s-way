
export default class ScrollAnimate {
  constructor(els) {
    this.els = els
    this.elMap = {}
    this.checkAddName()
  }

  checkAddName = () => {
    for (let i = 0; i < this.els.length; i++) {
      const el = this.els[i]
      this.checkInVew(el) && this.addAnimateName(el)
    }
  }
  // 检查是否在视口范围内
  checkInVew = (el) => {
    const top = el.getBoundingClientRect().top
    const wTop = window.innerHeight || document.documentElement.clientHeight
    return top <= wTop
  }
  addAnimateName = (el) => {
    !this.elMap[el.outerHTML] && el.classList.add('animate-scroll')
    this.elMap[el.outerHTML] = true
  }
}

