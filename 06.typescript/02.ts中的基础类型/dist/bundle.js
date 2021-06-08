(function () {
  'use strict';

  // 枚举,分为3种
  // 1. 普通枚举
  var Role;
  (function (Role) {
      Role[Role["USER"] = 0] = "USER";
      Role[Role["ADMIN"] = 1] = "ADMIN";
      Role[Role["PERMISSION"] = 2] = "PERMISSION";
  })(Role || (Role = {}));
  /**
   * {
      '0': 'USER',
      '1': 'ADMIN',
      '2': 'PERMISSION',
      USER: 0,
      ADMIN: 1,
      PERMISSION: 2
    }
   */
  // console.log(Role)
  // console.log(Role[0]) // 可以通过key拿到对应的常量值
  // console.log(Role.USER) // 也可以通过常量值拿到对应的key
  // 2. 异构枚举
  var UserRole;
  (function (UserRole) {
      UserRole["USER"] = "user";
      UserRole[UserRole["ADMIN"] = 200] = "ADMIN";
      UserRole[UserRole["PERMISSION"] = 201] = "PERMISSION";
  })(UserRole || (UserRole = {}));
  // console.log(User_Role) error
  console.log(0 /* USER */); // 0
  // null
  var name1 = null;
  console.log(name1);
  // undefined
  var str1 = undefined;
  console.log(str1);
  // fn(2)
  // Symbol,表示独一无二
  var s1 = Symbol('key');
  var s2 = Symbol('key');
  console.log(s1 === s2); // false
  // BigInt
  var n1 = Number.MAX_SAFE_INTEGER + 1;
  var n2 = Number.MAX_SAFE_INTEGER + 2;
  console.log(n1 === n2); // true
  var n3 = BigInt(Number.MAX_SAFE_INTEGER);
  console.log(n3 + BigInt(1) === n3 + BigInt(2)); // false
  // o1 = 2 error

}());
//# sourceMappingURL=bundle.js.map
