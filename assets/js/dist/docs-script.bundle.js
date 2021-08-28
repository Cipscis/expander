(()=>{"use strict";var e;!function(e){e.OPENED="Opened",e.CLOSED="Closed"}(e||(e={}));const t=Object.freeze({expander:".js-expander",trigger:".js-expander__trigger"});function r(e){let r;const n=e.getAttribute("aria-controls");return n&&(r=document.getElementById(n)||void 0),r||(r=e.closest(t.expander)||void 0),r}function n(t){const r=t.getAttribute("aria-expanded");return"true"===r?e.OPENED:"false"===r?e.CLOSED:void 0}function a(a,o){if(n(a)===o)return;const i=function(e){return Array.from(document.querySelectorAll(t.trigger)).filter((t=>r(t)===e))}(a);switch(o){case e.OPENED:a.setAttribute("aria-expanded","true"),i.forEach((e=>e.setAttribute("aria-expanded","true")));break;case e.CLOSED:a.setAttribute("aria-expanded","false"),i.forEach((e=>e.setAttribute("aria-expanded","false")))}}function o(){const r=document.querySelector(":target");if(r){for(let n=r.closest(t.expander);n;n=n.parentElement?.closest(t.expander))a(n,e.OPENED);window.setTimeout((()=>r.scrollIntoView()),0)}}document.addEventListener("click",(function(o){const i=o.target;if(i instanceof HTMLElement){const c=i.closest(t.trigger);if(c){o.preventDefault();const t=r(c);t&&function(t){n(t)===e.OPENED?a(t,e.CLOSED):a(t,e.OPENED)}(t)}}})),window.addEventListener("hashchange",o),document.querySelectorAll(t.expander).forEach((t=>a(t,e.CLOSED))),requestAnimationFrame(o)})();
//# sourceMappingURL=docs-script.bundle.js.map