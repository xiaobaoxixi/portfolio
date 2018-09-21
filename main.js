"use strict";
console.log(50 * Math.sqrt(3));

const triangle = document.querySelector("polygon");
// const timeline = new TimelineMax();
// timeline.to(triangle, 1, {
//   rotation: 150,
//   transformOrigin: "100% 100%"
// });
let angle = 1;
turn();
function turn() {
  triangle.setAttribute("transform", `rotate(${angle} 200 400)`);
  if (angle < 150) {
    angle++;
    setTimeout(turn, 10);
  } else {
    turnToSquare();
  }
}
let topPointPositionY = 400;
let bottomPointPositionY = 400;
let rightBorderPosition = 286.6;
//200 350, 286.6 350, 286.6 450, 200 450
function turnToSquare() {
  triangle.setAttribute("transform", "");
  if (topPointPositionY > 350) {
    topPointPositionY--;
    bottomPointPositionY++;
    rightBorderPosition += 0.268;
    triangle.setAttribute(
      "points",
      `200 ${topPointPositionY}, ${rightBorderPosition} 350, ${rightBorderPosition} 450, 200 ${bottomPointPositionY}`
    );
    setTimeout(turnToSquare, 10);
  }
}
