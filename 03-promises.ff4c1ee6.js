var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},r={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in o)return o[e].exports;if(e in r){var t=r[e];delete r[e];var n={id:e,exports:{}};return o[e]=n,t.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,o){r[e]=o},e.parcelRequired7c6=t);var n=t("iQIUW"),i=t("49t2I");const l={form:document.querySelector(".form")};l.form.addEventListener("submit",(async e=>{e.preventDefault();const o=new FormData(l.form),r=Number(o.get("delay")),t=Number(o.get("step")),s=Number(o.get("amount"));for(let e=0;e<s;e+=1){const o=e+1;(0,i.createPromise)(o,r+t*e).then((({position:e,delay:o})=>{console.log(`✅ Fulfilled promise ${e} in ${o}ms`),n.Notify.success(`✅ Fulfilled promise ${e} in ${o}ms`)})).catch((({position:e,delay:o})=>{console.log(`❌ Rejected promise ${e} in ${o}ms`),n.Notify.failure(`❌ Rejected promise ${e} in ${o}ms`)}))}}));
//# sourceMappingURL=03-promises.ff4c1ee6.js.map