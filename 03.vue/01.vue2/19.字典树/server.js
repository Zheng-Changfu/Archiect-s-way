const http = require('http')
const fs = require('fs')
const path = require('path')

const strs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
function randomUserName (nums) {
  let cnums = nums
  let res = [], str = '', max = 5
  while (cnums--) {
    for (let i = 0; i < max; i++) {
      const randomNum = Math.floor(Math.random() * strs.length)
      const charStr = strs[randomNum]
      str += charStr
    }
    res.push({
      id: cnums,
      name: str,
      message: 'random testing'
    })
    str = ''
  }
  return res
}
const server = http.createServer((req, res) => {
  // const users = randomUserName(100000)
  // console.log(users, 'users')
  if (req.url === '/index.html') {
    res.end(fs.readFileSync(path.resolve(__dirname, './index.html')))
  }
  if (req.url === '/getUsers') {
    res.end(JSON.stringify(randomUserName(100000)))
  }
})

server.listen(3000)