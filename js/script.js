"use strict";
const menu = document.querySelector(".burger");
const aside = document.querySelector("aside");

window.addEventListener("DOMContentLoaded", init);
function init() {
  menu.addEventListener("click", toggleAside);
}
function toggleAside() {
  aside.classList.toggle("show");
}
