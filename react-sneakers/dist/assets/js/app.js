!function(){"use strict";var e=document.querySelectorAll(".nav__item"),t=document.querySelector(".cart"),n=document.querySelector(".cart__items-group"),c=document.body,o=document.querySelector(".btn--close"),i=["click","keydown","resize"],s=window.innerWidth-document.documentElement.clientWidth;function r(e){e.stopPropagation(),n&&(n.scrollHeight>n.clientHeight&&document.documentElement.clientWidth>1199.98?n.classList.add("fixed"):n.classList.remove("fixed")),"Escape"!==e.key&&e.target!==t||(d(),window.removeEventListener("keydown",r))}function d(){t.classList.remove("show"),c.classList.remove("no-scroll"),["class","style"].forEach((function(e){return c.removeAttribute(e)}))}e[0].addEventListener("click",(function(e){e.preventDefault(),t.classList.add("show"),c.classList.add("no-scroll"),c.style.paddingRight="".concat(s,"px"),i.forEach((function(e){return window.addEventListener(e,r)}))})),o.addEventListener("click",(function(){d()}))}();