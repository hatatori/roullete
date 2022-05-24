"use strict";

var _Roullete;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Ball = {
  velocity: 10,
  el: img_ball,
  r: 1.35,
  aceleration: 1,
  degree: 0,
  factor: 0.005,
  pos: function pos(x, y) {
    this.el.style.left = x + "px";
    this.el.style.top = y + "px";
  },
  deg: function deg(n) {
    var dx = Math.cos(n) * Roullete.roulette_img.width / this.r;
    var dy = Math.sin(n) * Roullete.roulette_img.width / this.r;
    this.pos(dx, dy);
  },
  spin: function spin() {
    var _this = this;

    if (this.r < 1.6) {
      this.r += 0.001;
    } else {
      this.r += 0.01;
      this.factor = 0.001; // this.el.classList.add('wave')
      // setTimeout(()=>this.el.classList.remove('wave'),500)
    }

    if (this.r >= 2) this.r = 2; // this.aceleration -= 0.1
    // this.velocity += this.aceleration
    // if(this.velocity > 0){
    // this.aceleration -= this.factor
    // this.velocity *= this.aceleration
    // }

    this.aceleration -= this.factor;
    if (this.aceleration < 0) this.aceleration = 0;
    this.velocity *= this.aceleration;
    if (this.velocity < 0) this.velocity = 0;
    this.degree -= this.velocity;
    this.deg(this.degree / this.dec); // Audio.roll()

    if (this.velocity.toFixed(1) == 0.9 && !this.el.classList.contains('wave')) {
      this.el.classList.add('wave');
      setTimeout(function () {
        return _this.el.classList.remove('wave');
      }, 1000);
    }
  },
  start: function start() {
    this.r = 1.35, this.velocity = 5;
  },
  go: function go() {
    this.r = 1.35; // this.velocity = 5

    this.deg(0);
    this.degree = 0;
    this.factor = 0.00001;
    this.dec = 10;
    this.aceleration = 1;
    this.velocity = 1.3045;
    Audios.roll();
  },
  "float": function float(n) {
    return parseFloat(n.toFixed(2));
  }
}; // Ball.go()
// Ball.go()

var Roullete = (_Roullete = {
  grau: 0,
  factor: 1,
  init_velocity: 1,
  velocity: 0,
  torque: 0.1
}, _defineProperty(_Roullete, "factor", 0.17785), _defineProperty(_Roullete, "aceleration", 1), _defineProperty(_Roullete, "roulette_img", img_roleta_numbers), _defineProperty(_Roullete, "order", [0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32]), _defineProperty(_Roullete, "value", 0), _defineProperty(_Roullete, "roll", function roll() {
  this.choice(this.value);
}), _defineProperty(_Roullete, "zero", function zero() {
  this.grau = 0;
}), _defineProperty(_Roullete, "animation", function animation() {
  this.roulette_img.style.transform = "rotate(".concat(this.grau, "deg)");
  this.aceleration -= 0.0005;
  if (this.aceleration <= 0) this.aceleration = 0;

  if (this.velocity > 0) {
    this.velocity = this.velocity * this.aceleration;
    this.grau += this.velocity;
  }
}), _defineProperty(_Roullete, "choice", function choice(n) {
  this.num = this.order.indexOf(n); //2

  this.grau = this.num * 9.73; // this.grau = this.num
  // this.velocity = 3.29
  // this.aceleration = 1
  // Roullete.choice(0)

  this.grau -= 180;
  this.velocity = 3.29;
  this.aceleration = 1; // Roullete.grau = 0
  // Roullete.velocity = 6.58 * 2 + this.factor * this.num
  // Roullete.aceleration = 1
  // this.grau = 0
  // this.velocity = 6.58
  // this.aceleration = 1
}), _defineProperty(_Roullete, "start", function start() {
  this.grau = 0;
  this.velocity = this.init_velocity;
  render.rotateRandom();
}), _Roullete);
var Audios = {
  roll: function roll() {
    var audio = new Audio('mp3/roll.mp3');
    audio.play();
  },
  select1: function select1() {
    var audio = new Audio('mp3/select1.mp3');
    audio.play();
  },
  select2: function select2() {
    var audio = new Audio('mp3/select2.mp3');
    audio.play();
  }
}; // Ball.go()
// render.play(5)