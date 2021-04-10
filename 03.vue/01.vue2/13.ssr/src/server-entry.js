import createApp from './main'

export default () => {
  console.log('xxxx')
  // 每次调用都返回一个新的实例
  const { app } = createApp()
  return app
}