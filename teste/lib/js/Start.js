"use strict";

var render = new Render();
var user = new User();
user.balance = 500;
setInterval(function () {
  Roullete.animation();
  Ball.spin();
}, 1000 / 60);