/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = function () {
    function Ball(x, y, radius, color) {
        _classCallCheck(this, Ball);

        this.x = x || 0;
        this.y = y || 0;
        this.originalX = x || 0;
        this.originalY = y || 0;
        this.vx = 0;
        this.vy = 0;
        this.radius = radius || 2;
        this.color = color || '#ff6600';
        this.friction = 0.5;
        this.springFactor = 0.2;
    }

    _createClass(Ball, [{
        key: 'setPos',
        value: function setPos(x, y) {
            this.x = x;
            this.y = y;
        }
    }, {
        key: 'think',
        value: function think(mouse) {
            var dx = this.x - mouse.x;
            var dy = this.y - mouse.y;
            var dist = Math.sqrt(dx * dx + dy * dy);

            // interactive
            if (dist < 30) {
                var angle = Math.atan2(dy, dx);
                var tx = mouse.x + Math.cos(angle) * 30;
                var ty = mouse.y + Math.cos(angle) * 30;

                this.vx += tx - this.x;
                this.vy += ty - this.y;
            }

            // spring back
            var dx1 = -(this.x - this.originalX);
            var dy1 = -(this.y - this.originalY);

            this.vx += dx1 * this.springFactor;
            this.vy += dy1 * this.springFactor;

            // function
            this.vx *= this.friction;
            this.vy *= this.friction;

            // actual move
            this.x += this.vx;
            this.y += this.vy;
        }
    }, {
        key: 'draw',
        value: function draw(ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
    }]);

    return Ball;
}();

exports.default = Ball;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mouse = function Mouse(canvas) {
    var _this = this;

    _classCallCheck(this, Mouse);

    this.x = 0;
    this.y = 0;
    var rect = canvas.getBoundingClientRect();

    canvas.onmousemove = function (e) {
        _this.x = e.clientX - rect.left;
        _this.y = e.clientY - rect.top;
    };
};

exports.default = Mouse;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mouse = __webpack_require__(1);

var _mouse2 = _interopRequireDefault(_mouse);

var _ball = __webpack_require__(0);

var _ball2 = _interopRequireDefault(_ball);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector('#drawOnMe');
var ctx = canvas.getContext('2d');
var pos = new _mouse2.default(canvas);
var balls = [];

var mouse = new _ball2.default(0, 0, 30, 'rgba(230,0,230,0.5');

for (var i = 0; i < 80; i++) {
    balls.push(new _ball2.default(200 + 100 * Math.cos(i * 2 * Math.PI / 80), 200 + 100 * Math.sin(i * 2 * Math.PI / 80)));
}

// function ConnectDots(balls) {
//     ctx.beginPath();
//     ctx.moveTo(balls[0].x,balls[0].y);
//     balls.forEach(ball => {
//         ctx.lineTo(ball.x, ball.y);
//     });
//     ctx.closePath();
//     ctx.fill();
// }

function ConnectDots1(dots) {
    ctx.beginPath();
    for (var i = 0, jlen = dots.length; i <= jlen; ++i) {
        var p0 = dots[i + 0 >= jlen ? i + 0 - jlen : i + 0];
        var p1 = dots[i + 1 >= jlen ? i + 1 - jlen : i + 1];
        ctx.quadraticCurveTo(p0.x, p0.y, (p0.x + p1.x) * 0.5, (p0.y + p1.y) * 0.5);
    }
    ctx.closePath();
    ctx.fill();
    //ctx.stroke();
}

function Render() {
    window.requestAnimationFrame(Render);
    ctx.clearRect(0, 0, 600, 600);
    mouse.setPos(pos.x, pos.y);
    mouse.draw(ctx);

    balls.forEach(function (ball) {
        ball.think(pos);
        //ball.draw(ctx);   // circles around
    });

    // ConnectDots(balls);   // rhombus
    ConnectDots1(balls);
}

Render();

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map