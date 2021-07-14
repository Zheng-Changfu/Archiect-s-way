(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Canvas = {}));
}(this, (function (exports) { 'use strict';

  var frames$2 = {
  	"cannon1.png": {
  		frame: {
  			x: 0,
  			y: 0
  		}
  	},
  	"cannon2.png": {
  		frame: {
  			x: 0,
  			y: 0
  		}
  	},
  	"cannon3.png": {
  		frame: {
  			x: 0,
  			y: 0
  		}
  	},
  	"cannon4.png": {
  		frame: {
  			x: 0,
  			y: 0
  		}
  	},
  	"cannon5.png": {
  		frame: {
  			x: 0,
  			y: 0
  		}
  	},
  	"cannon6.png": {
  		frame: {
  			x: 0,
  			y: 0
  		}
  	},
  	"cannon7.png": {
  		frame: {
  			x: 0,
  			y: 0
  		}
  	},
  	"bottom-bar.png": {
  		frame: {
  			x: 0,
  			y: 0,
  			w: 765,
  			h: 72
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 765,
  			h: 72
  		},
  		sourceSize: {
  			w: 765,
  			h: 72
  		}
  	},
  	"cannon_minus.png": {
  		frame: {
  			x: 132,
  			y: 72,
  			w: 44,
  			h: 31
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 44,
  			h: 31
  		},
  		sourceSize: {
  			w: 44,
  			h: 31
  		}
  	},
  	"cannon_minus_down.png": {
  		frame: {
  			x: 88,
  			y: 72,
  			w: 44,
  			h: 31
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 44,
  			h: 31
  		},
  		sourceSize: {
  			w: 44,
  			h: 31
  		}
  	},
  	"cannon_plus.png": {
  		frame: {
  			x: 44,
  			y: 72,
  			w: 44,
  			h: 31
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 44,
  			h: 31
  		},
  		sourceSize: {
  			w: 44,
  			h: 31
  		}
  	},
  	"cannon_plus_down.png": {
  		frame: {
  			x: 0,
  			y: 72,
  			w: 44,
  			h: 31
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 44,
  			h: 31
  		},
  		sourceSize: {
  			w: 44,
  			h: 31
  		}
  	},
  	"energy-bar.png": {
  		frame: {
  			x: 0,
  			y: 103,
  			w: 213,
  			h: 19
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 213,
  			h: 19
  		},
  		sourceSize: {
  			w: 213,
  			h: 19
  		}
  	}
  };
  var bottomJson = {
  	frames: frames$2
  };

  var frames$1 = {
  	"bullet1.png": {
  		frame: {
  			x: 86,
  			y: 0,
  			w: 24,
  			h: 26
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 24,
  			h: 26
  		},
  		sourceSize: {
  			w: 24,
  			h: 26
  		}
  	},
  	"bullet2.png": {
  		frame: {
  			x: 61,
  			y: 0,
  			w: 25,
  			h: 29
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 25,
  			h: 29
  		},
  		sourceSize: {
  			w: 25,
  			h: 29
  		}
  	},
  	"bullet3.png": {
  		frame: {
  			x: 32,
  			y: 35,
  			w: 27,
  			h: 31
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 27,
  			h: 31
  		},
  		sourceSize: {
  			w: 27,
  			h: 31
  		}
  	},
  	"bullet4.png": {
  		frame: {
  			x: 30,
  			y: 82,
  			w: 29,
  			h: 33
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 29,
  			h: 33
  		},
  		sourceSize: {
  			w: 29,
  			h: 33
  		}
  	},
  	"bullet5.png": {
  		frame: {
  			x: 0,
  			y: 82,
  			w: 30,
  			h: 34
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 30,
  			h: 34
  		},
  		sourceSize: {
  			w: 30,
  			h: 34
  		}
  	},
  	"bullet6.png": {
  		frame: {
  			x: 30,
  			y: 0,
  			w: 31,
  			h: 35
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 31,
  			h: 35
  		},
  		sourceSize: {
  			w: 31,
  			h: 35
  		}
  	},
  	"bullet7.png": {
  		frame: {
  			x: 0,
  			y: 44,
  			w: 32,
  			h: 38
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 32,
  			h: 38
  		},
  		sourceSize: {
  			w: 32,
  			h: 38
  		}
  	},
  	"bullet8.png": {
  		frame: {
  			x: 0,
  			y: 0,
  			w: 30,
  			h: 44
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 30,
  			h: 44
  		},
  		sourceSize: {
  			w: 30,
  			h: 44
  		}
  	}
  };
  var bulletJson = {
  	frames: frames$1
  };

  var frames = {
  	"web1.png": {
  		frame: {
  			x: 319,
  			y: 355,
  			w: 116,
  			h: 118
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 116,
  			h: 118
  		},
  		sourceSize: {
  			w: 116,
  			h: 118
  		}
  	},
  	"web2.png": {
  		frame: {
  			x: 0,
  			y: 399,
  			w: 137,
  			h: 142
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 137,
  			h: 142
  		},
  		sourceSize: {
  			w: 137,
  			h: 142
  		}
  	},
  	"web3.png": {
  		frame: {
  			x: 163,
  			y: 355,
  			w: 156,
  			h: 162
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 156,
  			h: 162
  		},
  		sourceSize: {
  			w: 156,
  			h: 162
  		}
  	},
  	"web4.png": {
  		frame: {
  			x: 242,
  			y: 181,
  			w: 180,
  			h: 174
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 180,
  			h: 174
  		},
  		sourceSize: {
  			w: 180,
  			h: 174
  		}
  	},
  	"web5.png": {
  		frame: {
  			x: 0,
  			y: 244,
  			w: 163,
  			h: 155
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 163,
  			h: 155
  		},
  		sourceSize: {
  			w: 163,
  			h: 155
  		}
  	},
  	"web6.png": {
  		frame: {
  			x: 242,
  			y: 0,
  			w: 191,
  			h: 181
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 191,
  			h: 181
  		},
  		sourceSize: {
  			w: 191,
  			h: 181
  		}
  	},
  	"web7.png": {
  		frame: {
  			x: 0,
  			y: 0,
  			w: 242,
  			h: 244
  		},
  		rotated: false,
  		trimmed: false,
  		spriteSourceSize: {
  			x: 0,
  			y: 0,
  			w: 242,
  			h: 244
  		},
  		sourceSize: {
  			w: 242,
  			h: 244
  		}
  	}
  };
  var webJson = {
  	frames: frames
  };

  const res = [bottomJson, bulletJson, webJson];
  const initRequestData = ({
    ctx: _ctx,
    W,
    H,
    handlesInfo
  }) => {
    let count = 0;
    let total = res.reduce((p, {
      frames
    }) => p + Object.keys(frames).length, 0);
    return new Promise(resolve => {
      const result = res.reduce((p, c) => {
        const {
          frames
        } = c;
        Object.keys(frames).forEach(key => {
          const {
            frame: {
              x,
              y
            }
          } = frames[key];
          const img = new Image();
          img.src = `../01.捕鱼达人/images/${key}`;

          img.onload = function () {
            count++;
            p[key] = {
              x,
              y,
              w: img.width,
              h: img.height,
              img,
              ctx: _ctx,
              W,
              H,
              handlesInfo
            };

            if (count === total) {
              loadResolve();
            }
          };
        });
        return p;
      }, {});

      function loadResolve() {
        resolve(result);
      }
    });
  };

  class Bulltecontroller {
    constructor() {
      this.baseName = 'bullet';
      this.endType = 'png';
      this.speed = 5;
    } // 安装炮弹


    installBullte = (data, type, bulltes) => {
      const key = `${this.baseName}${type}.${this.endType}`;
      const info = data[key];
      bulltes.forEach(bullte => {
        this.drawBullte(info, bullte);
      });
    }; // 绘制炮弹

    drawBullte = (info, bullte) => {
      const {
        w,
        h,
        img,
        W,
        H
      } = info;
      const {
        x,
        y,
        type,
        arc
      } = bullte;
      exports.ctx.save();
      exports.ctx.translate(x, y);
      exports.ctx.rotate(arc); // 要将炮弹绘制到炮台上

      exports.ctx.drawImage(img, -w / 2, -h / 2, w, h);
      exports.ctx.restore();
    }; // 发射炮弹

    launchBullte(bulltes) {
      bulltes.forEach(bullet => {
        // 已知角度，自定义速度(斜边)，求对边和临边
        const x = Math.sin(bullet.arc) * this.speed;
        const y = Math.cos(bullet.arc) * this.speed;
        bullet.x += x;
        bullet.y -= y;
      });
    }

  }

  var Bullte = new Bulltecontroller();

  class Cannocontroller {
    constructor() {
      // 底座名称
      this.baseName = 'bottom-bar.png'; // 炮台名称前缀

      this.cannoNamePrefix = 'cannon'; // 炮台名称后缀

      this.cannoNameEndFix = 'png'; // 图片详情

      this.imgInfo = {}; // 

      this.frame = 0;
      this.bulltes = []; // {type:?,x:?,y:?,arc:?}

      this.positionInfo = {};
    } // 安装炮台底座


    installCannoBase = (data, options) => {
      const info = data[this.baseName];
      this.drawCannoBase(info);
      this.imgInfo[this.baseName] = info;
    }; // 绘制底座

    drawCannoBase = info => {
      const {
        w,
        h,
        img,
        W,
        H
      } = info; // 绘制到底部中心

      const x = (W - w) / 2,
            y = H - h + 2;
      exports.ctx.drawImage(img, x, y, w, h);
    }; // 安装炮台

    installCanno = (data, type) => {
      const key = `${this.cannoNamePrefix}${type}.${this.cannoNameEndFix}`;
      const info = data[key];
      this.drawCanno(info);
      this.imgInfo[key] = info;
      this.positionInfo.type = type;
    }; // 绘制炮台

    drawCanno = info => {
      /*
          计算弧度:
            1. 我们知道炮台中心点位置 a
            2. 我们知道鼠标移动位置 b
            3. 炮台是垂直于canvas的
            4. 弧度 === tan(对边 / 临边)
      */
      const {
        w,
        h,
        img,
        W,
        H,
        handlesInfo: {
          mousemove
        }
      } = info;
      const canvas = exports.ctx.canvas;
      const offsetLeft = canvas.offsetLeft;
      const offsetTop = canvas.offsetTop;
      const x = (W - w) / 2 + 43,
            y = H - h / 4 + 20;
      const a = x + offsetLeft - mousemove.x + w / 2;
      const b = y + offsetTop - mousemove.y;
      const arc = Math.atan2(b, a) - Math.PI / 2;
      exports.ctx.save();
      exports.ctx.translate(x + w / 2, y + h / 10);
      exports.ctx.rotate(arc);
      exports.ctx.drawImage(img, 0, h / 5 * this.frame, w, h / 5, -w / 2, -(h / 10), w, h / 5);
      exports.ctx.restore();
      this.positionInfo = { ...this.positionInfo,
        x: x + w / 2,
        y: y + h / 10,
        arc
      };
    }; // 安装炮弹/发射炮弹

    installBullte = (data, type) => {
      // 安装炮弹
      Bullte.installBullte(data, type, this.bulltes); // 发射炮弹

      Bullte.launchBullte(this.bulltes);
    }; // 添加炮弹

    addBullte = () => {
      this.bulltes.push(this.positionInfo);
    }; // 控制炮台发送炮弹动画

    setFrame = () => {
      window.requestAnimationFrame(this.transition);
    };
    transition = () => {
      this.frame++;

      if (this.frame >= 5) {
        this.frame = 0;
        return;
      }

      window.requestAnimationFrame(this.setFrame);
    };
  }

  var cannoInstance = new Cannocontroller();

  /**
   * 工具函数
   */
  const createInstance = (instance, options = {}) => {
    return new instance(options);
  };
  function registerListener(eventName, el, cb) {
    let handles = {
      mousemove: {},
      click: {}
    };
    el.addEventListener(eventName, e => {
      handles[eventName] = {
        x: e.clientX,
        y: e.clientY
      };
      cb && cb(e);
    });
    return handles;
  }

  class Canno {
    constructor(data, options = {}) {
      this.data = data; // 炮台有分颜色 1-7

      this.type = options.type || 1;
      this.addBullte(); // 安装

      this.install();
    } // 安装炮台底座


    installCannoBase = () => {
      cannoInstance.installCannoBase(this.data, this.type);
    }; // 安装炮台

    installCanno = () => {
      cannoInstance.installCanno(this.data, this.type);
    }; // 安装炮弹

    installBullte = () => {
      cannoInstance.installBullte(this.data, this.type);
    }; // 添加炮弹

    addBullte = () => {
      registerListener('click', exports.ctx.canvas, () => {
        cannoInstance.addBullte();
        cannoInstance.setFrame();
      });
    };
    install = () => {
      window.requestAnimationFrame(this.draw);
    };
    draw = () => {
      const canvas = exports.ctx.canvas;
      exports.ctx.clearRect(0, 0, canvas.width, canvas.height); // 绘制顺序，后面会覆盖前面

      this.installCannoBase();
      this.installBullte();
      this.installCanno();
      window.requestAnimationFrame(this.install);
    };
  }

  function initAllInstance() {
    return {
      Canno
    };
  }

  /**
   * 入口
   */
  exports.ctx = void 0;

  async function init() {
    // 初始化canvas
    const {
      ctx: _ctx,
      W,
      H,
      handlesInfo
    } = initCanvas('fishing'); // 初始化数据

    const data = await initRequestData({
      ctx: _ctx,
      W,
      H,
      handlesInfo
    });
    exports.ctx = _ctx; // 初始化类

    const {
      Canno
    } = initAllInstance(); // 创建炮台实例

    createInstance(Canno, data);
  }

  init();

  function initCanvas(id) {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext('2d'); // 注册事件

    const handlesInfo = registerListener('mousemove', canvas);
    return {
      ctx,
      W: canvas.width,
      H: canvas.height,
      handlesInfo
    };
  }

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=canvas.js.map
