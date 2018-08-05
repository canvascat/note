// console.log([...new Array(10)].map((_, i) => i * (i + 1)).reduce((a, b) => a + b) * 2 / 90)

(function (global, factory) {
  if (typeof define === 'function' && (define.amd || define.cmd)) {
    define(factory);
  } else {
    global.Inertia = factory();
  }
}(this, function () {
  'use strict';

  var Inertia = function (ele, options) {

    if (!ele) {
      return;
    }

    var defaults = {
      // 是否吸附边缘
      edge: true
    };

    var params = {};
    options = options || {};
    for (var key in defaults) {
      if (typeof options[key] !== 'undefined') {
        params[key] = options[key];
      } else {
        params[key] = defaults[key];
      }
    }

    var win = window;

    // 浏览器窗体尺寸
    var winWidth = win.innerWidth;
    var winHeight = win.innerHeight;

    var link = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533415536627&di=5e9f6817f04a8f87474265db8546c3ca&imgtype=0&src=http%3A%2F%2Fs2.sinaimg.cn%2Fmw690%2F005LKisygy722sIQw2B41%26690'
    var img = document.createElement('img')
    img.src = link
    ele.appendChild(img)

    img.style.top = (winWidth - img.offsetWidth) / 2 + 'px'
    img.style.left = (winHeight - img.offsetHeight) / 2 + 'px'

    // 初始移动方向
    var angle = ~~(Math.random() * 2 * Math.PI)
    var offset = ~~(Math.random() * 10 + 2)
    var [xoffset, yoffset] = [offset * Math.cos(angle), offset * Math.sin(angle)]

    var move = function () {
      var imgInformation = img.getBoundingClientRect()
      var [t, r, b, l] = [
        imgInformation.top,
        winWidth - imgInformation.right,
        winHeight - imgInformation.bottom,
        imgInformation.left
      ]
      if (t <= 0 || b <= 0) {
        yoffset = -yoffset
      }
      if (l <= 0 || r <= 0) {
        xoffset = -xoffset
      }
      img.style.left = l + xoffset + 'px'
      img.style.top = t + yoffset + 'px'
    }
    setInterval(move, 16)
  };

  return Inertia;
}));