/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Cell = __webpack_require__(1);
	
	document.addEventListener("DOMContentLoaded", () => {
	  const root = document.getElementById('canvas');
	  const ctx = root.getContext('2d');
	
	  let testCell = new Cell({vertices: [[0,0], [0,100], [50,50], [50,0]]});
	  testCell.draw(ctx)
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Cell {
	  constructor(options) {
	    this.vertices = options.vertices;
	    this.color = options.color;
	  }
	
	  draw(ctx) {
	    ctx.fillStyle = 'red';
	    ctx.beginPath();
	    ctx.moveTo(0,0);
	    this.vertices.forEach((point) => {
	      ctx.lineTo(...point);
	    });
	    ctx.closePath();
	    ctx.fill();
	  }
	}
	
	module.exports = Cell;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map