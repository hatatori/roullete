"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Game = /*#__PURE__*/function () {
  function Game() {
    _classCallCheck(this, Game);

    this.choice = {};
    this.choice.empty = [];
    this.choice.zero = [0];
    this.choice.to18 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    this.choice.to36 = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36];
    this.choice.dozen1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.choice.dozen2 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    this.choice.dozen3 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
    this.choice.col1 = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
    this.choice.col2 = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
    this.choice.col3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
    this.choice.red = [1, 12, 14, 16, 18, 19, 21, 23, 25, 27, 3, 30, 32, 34, 36, 5, 7, 9];
    this.choice.black = [10, 11, 13, 15, 17, 2, 20, 22, 24, 26, 28, 29, 31, 33, 35, 4, 6, 8];
    this.choice.even = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]; // par

    this.choice.odd = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35]; // impar
    // this.choice.number   = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]

    this.porcentage = {};
    this.porcentage.zero = 4;
    this.porcentage.to18 = 1.2;
    this.porcentage.to36 = 1.2;
    this.porcentage.dozen1 = 1.3;
    this.porcentage.dozen2 = 1.3;
    this.porcentage.dozen3 = 1.3;
    this.porcentage.col1 = 1.4;
    this.porcentage.col2 = 1.4;
    this.porcentage.col3 = 1.4;
    this.porcentage.red = 1.1;
    this.porcentage.black = 1.1;
    this.porcentage.even = 1.2;
    this.porcentage.odd = 1.2;
    this.porcentage.number = 1;
  }

  _createClass(Game, [{
    key: "getGroupNumber",
    value: function getGroupNumber(n) {
      var group_number = [];

      for (var _i = 0, _Object$keys = Object.keys(this.choice); _i < _Object$keys.length; _i++) {
        var i = _Object$keys[_i];
        if (this.choice[i].includes(n)) group_number.push(i);
      }

      return group_number;
    }
  }, {
    key: "getColorNum",
    value: function getColorNum(n) {
      if (this.choice.red.includes(n)) return 'red';
      if (this.choice.black.includes(n)) return 'black';
      if (this.choice.zero.includes(n)) return 'green';else return 'green';
    }
  }, {
    key: "groupEarn",
    value: function groupEarn() {
      var Earn = [];
      Earn.push(this.ball);

      for (var _i2 = 0, _Object$keys2 = Object.keys(this.choice); _i2 < _Object$keys2.length; _i2++) {
        var i = _Object$keys2[_i2];
        if (this.choice[i].includes(this.ball)) Earn.push(i);
      }

      return Earn;
    }
  }, {
    key: "bet",
    value: function bet(n) {
      this.bet = n;
    }
  }, {
    key: "betBack",
    value: function betBack() {
      var _this = this;

      return this.bet.filter(function (e) {
        return _this.groupEarn().includes(e.local);
      });
    }
  }, {
    key: "betBackCash",
    value: function betBackCash() {
      var _this2 = this;

      var EarnWithReceive = this.betBack().map(function (e) {
        if (typeof e.local == 'string') {
          e.receive = e.payd * _this2.porcentage[e.local];
          return e;
        }

        if (e.local == 0) {
          e.receive = e.payd * _this2.porcentage.zero;
          return e;
        }

        e.receive = e.payd * _this2.porcentage.number;
        return e;
      });
      return EarnWithReceive;
    }
  }, {
    key: "totalGain",
    value: function totalGain() {
      var soma = 0;
      this.betBackCash().map(function (e) {
        return soma += e.receive;
      });
      return soma;
    }
  }]);

  return Game;
}();

var game = new Game();