const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
  // 用户名
  username: String,
  // 密码
  password: String,
  // 登录令牌
  token: String,
  // 按钮权限
  menuPermission: Array,
  // 菜单权限
  router: Array
});

module.exports = mongoose.model('LoginSchema', loginSchema)