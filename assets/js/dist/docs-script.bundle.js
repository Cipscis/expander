(()=>{"use strict";const e=new Map;function t(e,t,n){if("string"==typeof e)try{e=document.querySelectorAll(e)}catch(t){throw new DOMException(`${n===r?"deactivate":"activate"} failed because it was passed an invalid selector string: '${e}'`)}e instanceof HTMLElement?n(e,t):e.forEach((e=>n(e,t)))}function n(t,n){if(!(t instanceof HTMLElement))throw new TypeError("activate failed because a valid HTMLElement was not passed");if(!(o(t,n)||(t.addEventListener("click",n),t instanceof HTMLButtonElement))){!1===a(t)&&t.addEventListener("keydown",i);const r=function(e){return function(t){if(c(t))return e.call(this,t)}}(n);t.addEventListener("keyup",r);const o={spacebarFn:r};if(!(t instanceof HTMLAnchorElement)){const e=function(e){return function(t){if(function(e){return!(!e.key||"enter"!==e.key.toLowerCase())}(t))return e.call(this,t)}}(n);t.addEventListener("keydown",e),o.enterFn=e}!function(t,n,r){let o=e.get(t);o||(o=new Map([[n,r]]),e.set(t,o));let a=o.get(n);a?Object.assign(a,r):(a=Object.assign({},r),o.set(n,a))}(t,n,o)}}function r(t,n){if(!(t instanceof HTMLElement))throw new TypeError("deactivate failed because a valid HTMLElement was not passed");t.removeEventListener("click",n);const r=o(t,n);r&&(t instanceof HTMLButtonElement||(r.spacebarFn&&t.removeEventListener("keyup",r.spacebarFn),t instanceof HTMLAnchorElement||r.enterFn&&t.removeEventListener("keydown",r.enterFn),function(t,n){const r=e.get(t);r&&(r.delete(n),e.delete(t))}(t,n),!1===a(t)&&t.removeEventListener("keydown",i)))}function o(t,n){const r=e.get(t);if(r)return r.get(n)}function a(t){return e.has(t)}function i(e){const t=this,n=t instanceof HTMLButtonElement,r=t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement,o=c(e);n||r||!o||e.preventDefault()}function c(e){return!(!e.key||" "!==e.key&&"spacebar"!==e.key.toLowerCase())}var s;!function(e){e.OPENED="Opened",e.CLOSED="Closed"}(s||(s={}));const u=Object.freeze({expander:".js-expander",trigger:".js-expander__trigger"});function f(e){let t;const n=e.getAttribute("aria-controls");return n&&(t=document.getElementById(n)||void 0),t||(t=e.closest(u.expander)||void 0),t}function d(e){const t=e.getAttribute("aria-expanded");return"true"===t?s.OPENED:"false"===t?s.CLOSED:void 0}function l(e,t){if(d(e)===t)return;const n=function(e){return Array.from(document.querySelectorAll(u.trigger)).filter((t=>f(t)===e))}(e);switch(t){case s.OPENED:e.setAttribute("aria-expanded","true"),n.forEach((e=>e.setAttribute("aria-expanded","true")));break;case s.CLOSED:e.setAttribute("aria-expanded","false"),n.forEach((e=>e.setAttribute("aria-expanded","false")))}}function E(){const e=document.querySelector(":target");if(e){for(let t=e.closest(u.expander);t;t=t.parentElement?.closest(u.expander))l(t,s.OPENED);window.setTimeout((()=>e.scrollIntoView()),0)}}t(u.trigger,(function(e){const t=this.closest(u.trigger);if(t){e.preventDefault();const n=f(t);n&&function(e){d(e)===s.OPENED?l(e,s.CLOSED):l(e,s.OPENED)}(n)}}),n),window.addEventListener("hashchange",E),document.querySelectorAll(u.expander).forEach((e=>l(e,s.CLOSED))),requestAnimationFrame(E)})();
//# sourceMappingURL=docs-script.bundle.js.map