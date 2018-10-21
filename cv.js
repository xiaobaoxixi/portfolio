"use strict";
window.addEventListener("DOMContentLoaded", startFromRight);
function startFromRight() {
  const svg = document.querySelector("svg#cv");
  console.log(svg.getBoundingClientRect().width - window.innerWidth);
  svg.scrollBy(-svg.getBoundingClientRect().width + window.innerWidth, 0);
}
