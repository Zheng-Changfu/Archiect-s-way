<template>
  <!-- 虚拟列表容器 -->
  <div
    class="container"
    ref="container"
    @scroll="scroll"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <!-- 滚动条高度 -->
    <div class="scroll-bar" ref="scrollBar"></div>
    <!-- 真实渲染的内容 -->
    <div
      class="scroll-list"
      :style="{ transform: `translateY(${offsetTop}px)` }"
    >
      <!-- 每次只渲染部分数据 -->
      <!-- 渲染什么由外界决定，把数据传递给外界即可 -->
      <div
        class="scroll-item"
        v-for="(item, index) in renderData"
        :vid="item"
        :key="index"
        :style="{ height: size + 'px' }"
      >
        <slot :row="item" name="scroll" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VirtualList',
  props: {
    // 每一项内容的高度,默认40px
    size: {
      type: Number,
      default: () => 40,
    },
    // 默认渲染多少条,默认8页
    rename: {
      type: Number,
      default: () => 8,
    },
    // 源数据
    data: {
      type: Array,
      default: () => [],
    },
    // 是否开启预渲染,默认不开启
    preload: {
      type: [Boolean, Object],
      default: () => false,
    },
    // 虚拟列表容器宽度,默认300px
    width: {
      type: Number,
      default: () => 300,
    },
    // 虚拟列表容器高度,默认300px
    height: {
      type: Number,
      default: () => 320,
    },
  },
  computed: {
    // 初始化渲染的数据
    renderData() {
      // const start = this.start - this.prevCount
      // const end = this.end + this.nextCount
      const start = this.start
      const end = this.end
      return this.data.slice(this.start, this.end)
    },
    // // 预渲染前面加载多少个，增加用户体验
    // prevCount() {
    //   return Math.min(this.start, this.rename)
    // },
    // // 预渲染后面加载多少个，增加用户体验
    // nextCount() {
    //   return Math.min(this.rename, this.data.length - this.end)
    // },
  },
  data() {
    return {
      start: 0,
      end: this.rename, // 第一次默认以外面传进来的条数为准
      offsetTop: 0,
    }
  },
  mounted() {
    // 计算滚动条的高度
    const height = this.size * this.data.length
    this.$nextTick(() => {
      this.setHeight(this.$refs.scrollBar, height)
    })
  },
  methods: {
    // 滚动触发的事件
    scroll() {
      // 1. 算出当前移动过去了多少个dom
      const scrollTop = this.getScrollTop('container')
      const start = Math.floor(scrollTop / this.size)
      const end = start + this.rename
      const offsetTop = start * this.size
      // 2. 修正开始和结束位置
      this.start = start
      this.end = end
      // 3. 因为是绝对定位，所以要修正top
      this.offsetTop = offsetTop
    },
    // 给dom元素设置高度
    setHeight(dom, num) {
      dom.style.height = num + 'px'
    },
    getScrollTop(ref) {
      return this.$refs[ref].scrollTop
    },
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.container {
  position: relative;
  overflow-y: auto;
  margin: 100px auto;
  border: 1px solid #ccc;
}
.scroll-list {
  position: absolute;
  top: 0;
  left: 0;
}
</style>