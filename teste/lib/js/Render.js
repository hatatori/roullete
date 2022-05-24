"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Render = /*#__PURE__*/function () {
  function Render() {
    var _this = this;

    _classCallCheck(this, Render);

    this.coinsToRemove = [];
    this.coinsAdded = [];
    this.squares = _toConsumableArray(document.querySelectorAll('[n]'));

    var _iterator = _createForOfIteratorHelper(this.squares),
        _step;

    try {
      var _loop = function _loop() {
        var el = _step.value;

        el.onclick = function () {
          _this.choiceBet(el.getAttribute('n')); // user.setChoice(3)


          user.setChoice(el.getAttribute('n'));

          _this.menuShow();
        };
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  _createClass(Render, [{
    key: "message_information",
    value: function message_information(txt) {
      var div = document.createElement('div');
      div.className = "message_information";
      div.innerHTML = txt;
      document.body.appendChild(div);
      setTimeout(function () {
        div.remove();
      }, 3 * 1000);
    }
  }, {
    key: "message_win",
    value: function message_win() {
      var txt1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var txt2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var div = document.createElement('div');
      div.innerHTML = "\n        <div class=\"alert fade-in\">\n            <div class=\"alert-in zoom-in\">\n                <p>".concat(txt1, "</p>\n                <h1>").concat(txt2, "</h1>\n            </div>\n        </div>\n        ");
      document.body.appendChild(div);
      setTimeout(function () {
        div.querySelector('.alert').classList.add('fade-out');
        div.querySelector('.alert-in').classList.add('zoom-out');

        div.onanimationend = function () {
          return div.remove();
        };
      }, 3 * 1000);
    }
  }, {
    key: "rotateRandomPosition",
    value: function rotateRandomPosition() {
      var r = parseInt(Math.random() * 360);
      div_roullete.style.translate = "0.5s";
      div_roullete.style.transform = "rotate(".concat(r, "deg)");
    }
  }, {
    key: "blink",
    value: function blink(group_name) {
      var all = _toConsumableArray(div_table.children);

      all.map(function (e) {
        return e.style.opacity = 0.2;
      });

      var reds = _toConsumableArray(div_table.querySelectorAll('[' + group_name + ']'));

      reds.map(function (e) {
        return e.style.removeProperty('opacity');
      });
    }
  }, {
    key: "blinkOut",
    value: function blinkOut() {
      // let all = [...div_table.querySelectorAll("[n]")]
      var all = _toConsumableArray(div_table.children);

      all.map(function (e) {
        return e.style.removeProperty('opacity');
      });
    }
  }, {
    key: "historicAdd",
    value: function historicAdd(n) {
      var div = document.createElement('div');
      var classdiv = n % 2 == 0 ? 'ball-black' : 'ball-red';
      div.innerHTML = "<div class=\"ball ".concat(classdiv, "\">").concat(n, "</div>");
      historic.style.height = '70px';
      historic.style.transition = '0.5s';
      historic.style.padding = "10px";
      historic.insertBefore(div, historic.firstChild);
    }
  }, {
    key: "roll",
    value: function roll(n) {
      var _this2 = this;

      this.showRoullete();
      this.rotateRandomPosition();
      Ball.go();
      Roullete.choice(n);
      Roullete.value = n; // Audios.roll()

      setTimeout(function () {
        // this.message_information(n)
        console.log(n);

        _this2.historicAdd(n);
      }, 5000);
      setTimeout(function () {
        _this2.hideRoullete(); // this.coinClean()


        _this2.coinClean();

        _this2.menuHide();

        if (Roullete.value == user.choice || game.choice[user.group].includes(Roullete.value)) {
          user.setBalance(user.balance + user.bet + user.bet * game.porcentage[user.group]);
          render.message_win("Ganhou", _this2.toDollar(user.bet * game.porcentage[user.group]));
          user.setBet(0);
        }

        user.setBet(0); // roullete bye
      }, 8 * 1000);
    }
  }, {
    key: "play",
    value: function play(n) {
      if (this.coinsAdded.length == 0) this.message_information("Empty table, bet some value");else this.roll(n);
    }
  }, {
    key: "showRoullete",
    value: function showRoullete() {
      roullete_group.classList.remove('none');
      roullete_group.classList.add('zoom-out-fade-in');
      roullete_group.classList.remove('zoom-in-fade-out');
    }
  }, {
    key: "hideRoullete",
    value: function hideRoullete() {
      // roullete_group.classList.remove('none')
      roullete_group.classList.remove('zoom-out-fade-in');
      roullete_group.classList.add('zoom-in-fade-out');
    }
  }, {
    key: "coinAdd",
    value: function coinAdd(value) {
      var _this3 = this;

      if (user.balance - value < 0) {
        this.message_information("Insufficient Balance");
        return false;
      } // if(coins_left.children.length == 15){
      //     render.message_information("Number max limit")
      //     return false
      // }


      user.setBet(user.bet + value);
      user.setBalance(user.balance - value);
      var coinA = document.querySelector("#coin" + value);
      var n = coins_left.children.length + 1;
      var img = new Image();
      img.src = coinA.src;
      img.style.position = 'absolute';
      img.style.top = coinA.offsetTop + 'px';
      img.style.left = coinA.offsetLeft + 'px'; // img.style.top    = coinA.y+'px'
      // img.style.left   = coinA.x+'px'

      img.style.transition = "0.3s";
      img.style.pointerEvents = 'none';
      coins_left.appendChild(img);
      img.style.top = coin0.offsetTop + 'px';
      img.style.left = n * coin0.offsetLeft + 'px';
      img.style.width = coin0.offsetWidth + 'px';
      img.style.height = coin0.offsetHeight + 'px';
      img.value = value;

      img.onclick = function () {
        return render.coinRemoveLast();
      };

      setTimeout(function () {
        img.removeAttribute('style');
        img.style.marginLeft = -34 + "px";
        img.style.width = coin0.offsetWidth + 'px';

        _this3.coinFinal();
      }, 1000);
      this.coinsAdded.push(coins_left.lastChild);
    }
  }, {
    key: "coinRemoveLast",
    value: function coinRemoveLast() {
      if (this.coinsAdded.length == 0) return false;
      var last = this.coinsAdded.at(-1);
      user.setBalance(user.balance + last.value);
      user.setBet(user.bet - last.value);

      if (this.coinsAdded.length > 0) {
        last.classList.add('zoom-in-fade-out');

        last.onanimationend = function () {
          return last.remove();
        };

        Audios.select1();
        this.coinsAdded.pop();
      }
    }
  }, {
    key: "coinRemoveAll",
    value: function coinRemoveAll() {
      do {
        this.coinRemoveLast();
      } while (this.coinsAdded.length > 0);
    }
  }, {
    key: "coinClean",
    value: function coinClean() {
      var _this4 = this;

      var _loop2 = function _loop2() {
        if (_this4.coinsAdded.length == 0) return {
          v: false
        };

        var last = _this4.coinsAdded.at(-1);

        if (_this4.coinsAdded.length > 0) {
          last.classList.add('zoom-in-fade-out');

          last.onanimationend = function () {
            return last.remove();
          };

          _this4.coinsAdded.pop();
        }
      };

      do {
        var _ret = _loop2();

        if (_typeof(_ret) === "object") return _ret.v;
      } while (this.coinsAdded.length > 0);
    }
  }, {
    key: "coinFinal",
    value: function coinFinal() {
      coins_left.scrollTo(coins_left.scrollWidth, 0);
    }
  }, {
    key: "showHide",
    value: function showHide(div) {
      div.classList.toggle('ty100');
      div.classList.toggle('ty0');
    }
  }, {
    key: "menu",
    value: function menu() {
      this.showHide(footer);
      div_table.classList.toggle('-ty20');
    }
  }, {
    key: "menuShow",
    value: function menuShow() {
      footer.classList.remove('ty100');
      footer.classList.add('ty0');
      div_table.style.transition = '0.5s';
      div_table.classList.add('-ty10');
    }
  }, {
    key: "menuHide",
    value: function menuHide() {
      footer.classList.remove('ty0');
      footer.classList.add('ty100');
      div_table.classList.remove('-ty10');
    }
  }, {
    key: "choiceBet",
    value: function choiceBet(n) {
      n = parseInt(n);
      var color_class = "";
      color_class = "chosen chosen-" + game.getColorNum(n);
      div_chosen.classList.value = color_class;
      div_chosen.innerHTML = n;
    }
  }, {
    key: "toDollar",
    value: function toDollar(value) {
      return "U$ ".concat(value.toFixed(2).replace(/\./g, ","));
    }
  }]);

  return Render;
}();