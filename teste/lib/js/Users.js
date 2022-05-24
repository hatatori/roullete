"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var User = /*#__PURE__*/function () {
  function User() {
    _classCallCheck(this, User);

    this.balance = 0;
    this.bet = 0;
    this.choice = 0;
  }

  _createClass(User, [{
    key: "setBet",
    value: function setBet(value) {
      this.bet = value;
      this.refresh();
    }
  }, {
    key: "setBalance",
    value: function setBalance(value) {
      this.balance = value;
      this.refresh();
    }
  }, {
    key: "setChoice",
    value: function setChoice(value) {
      this.choice = value;
      this.refresh();
    }
  }, {
    key: "toDollar",
    value: function toDollar(value) {
      return "U$ ".concat(value.toFixed(2).replace(/\./g, ","));
    }
  }, {
    key: "group",
    get: function get() {
      if (this.choice == 0) return 'zero';
      if (Number(this.choice)) return 'empty';
      if (!isNaN(Number(this.choice))) return 'number';
      return this.choice;
    }
  }, {
    key: "refresh",
    value: function refresh() {
      div_balance.innerHTML = this.toDollar(this.balance);
      div_bet.innerHTML = this.toDollar(this.bet);
      div_chosen.innerHTML = this.choice;
      if (this.choice == 'to18') div_chosen.innerHTML = '1to18';
      if (this.choice == 'to36') div_chosen.innerHTML = '1to36';
    }
  }]);

  return User;
}();