(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Canvas = {}));
}(this, (function (exports) { 'use strict';

	console.log('zanvas');
	const a = 1;

	exports.a = a;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=canvas.js.map
