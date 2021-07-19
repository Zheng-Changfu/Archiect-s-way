// import './a.css'
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(111)
  })
})
  .then((res) => {
    console.log(res, 'res')
  })