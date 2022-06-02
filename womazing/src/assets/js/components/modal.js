const modalBtn = document.querySelector(".btn-mobile");
const modal = document.querySelector(".modal");
const body = document.querySelector("body");

const focusableItems = getKeyboardFocusableElements(modal);
const firstFocusableElement = focusableItems[0];
const lastFocusableElement = focusableItems[focusableItems.length - 1];

function getKeyboardFocusableElements(element = document) {
  return [
    ...element.querySelectorAll(
      'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
    ),
  ].filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
  );
}

function openModal() {
  modal.classList.add("show");
  body.classList.add("no-scroll");
  document.addEventListener("keydown", attachModalEvents);
  onFocusModal();
}

function closeModal() {
  modal.classList.remove("show");
  body.classList.remove("no-scroll");
  document.removeEventListener("keydown", attachModalEvents);
}

function attachModalEvents(e) {
  onEscape(e);
  //   onTab(e);
  //   trapFocus(modal);
}

function onFocusModal() {
  modal.focus();

  trapFocus(modal);
}

function onEscape(e) {
  const isEscapePressed = e.key === "Escape" || e.keyCode === 27;

  if (isEscapePressed) {
    closeModal();
  }
}

function onTab(e) {
  const isTabPressed = e.key === "Tab" || e.keyCode === 9;

  if (!isTabPressed) {
    return;
  }

  const focusableEls = e.target.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
  );

  console.log(focusableEls);
}

function trapFocus(element) {
  var focusableEls = element.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
  );
  var firstFocusableEl = focusableEls[0];
  var lastFocusableEl = focusableEls[focusableEls.length - 1];
  var KEYCODE_TAB = 9;

  element.addEventListener("keydown", function (e) {
    var isTabPressed = e.key === "Tab" || e.keyCode === KEYCODE_TAB;

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      /* shift + tab */ if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } /* tab */ else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  });
}

modalBtn.addEventListener("click", () => {
  openModal();
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
