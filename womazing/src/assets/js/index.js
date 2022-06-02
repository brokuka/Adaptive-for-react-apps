"use strict";

/* Components */
// import * as smoothScroll from "./components/smoothScroll";
import * as slider from "./components/slider";
// import fixedHeader from './components/fixedHeader';
import * as gutter from "./components/gutter";
import * as modal from "./components/modal";

document.addEventListener("DOMContentLoaded", () => {
  // smoothScroll;
  slider;
  // fixedHeader;
  gutter;
  modal;
});

// document.addEventListener("keydown", function (e) {
//   let isTabPressed = e.key === "Tab" || e.keyCode === 9;

//   if (!isTabPressed) {
//     return;
//   }

//   if (e.shiftKey) {
//     // if shift key pressed for shift + tab combination
//     if (document.activeElement === firstFocusableElement) {
//       lastFocusableElement.focus(); // add focus for the last focusable element
//       e.preventDefault();
//     }
//   } else {
//     // if tab key is pressed
//     if (document.activeElement === lastFocusableElement) {
//       // if focused has reached to last focusable element then focus first focusable element after pressing tab
//       firstFocusableElement.focus(); // add focus for the first focusable element
//       e.preventDefault();
//     }
//   }
// });

// firstFocusableElement.focus();
