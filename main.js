"use strict";
console.log(50 * Math.sqrt(3));

const rollingPart = document.querySelector("polygon");
const square = document.querySelector(".square");
const pentagon = document.querySelector(".pentagon");
// const timeline = new TimelineMax();
// timeline.to(triangle, 1, {
//   rotation: 150,
//   transformOrigin: "100% 100%"
// });
let angle = 0;
triangleTurn();
function triangleTurn() {
  rollingPart.setAttribute("transform", `rotate(${angle} 200 400)`);
  if (angle < 150) {
    angle++;
    setTimeout(triangleTurn, 10);
  } else {
    turnToSquare();
  }
}
let topPointPositionY = 400;
let bottomPointPositionY = 400;
let rightBorderPosition = 286.6;
//200 350, 286.6 350, 286.6 450, 200 450
function turnToSquare() {
  rollingPart.setAttribute("transform", "");
  if (topPointPositionY > 350) {
    topPointPositionY--;
    bottomPointPositionY++;
    rightBorderPosition += 0.268;
    rollingPart.setAttribute(
      "points",
      `200 ${topPointPositionY}, ${rightBorderPosition} 350, ${rightBorderPosition} 450, 200 ${bottomPointPositionY}`
    );
    setTimeout(turnToSquare, 10);
  } else {
    square.classList.remove("hide");
    squareTurn();
  }
}
let angle2 = 0;
let bottomLeftPositionX = 300;
let bottomPositionY = 490;
let bottomRightPositionX = 400;
let centerBottomPositionY = 490;
function squareTurn() {
  rollingPart.setAttribute("transform", `rotate(${angle2} 300 420)`);
  if (angle2 < 180) {
    angle2++;
    setTimeout(squareTurn, 10);
  } else {
    rollingPart.setAttribute("transform", "");
    turnToPentagon();
  }
  function turnToPentagon() {
    if (bottomRightPositionX < 430) {
      bottomRightPositionX += 30 / 50; // in 50 steps therefor divide by 50
      bottomLeftPositionX -= 30 / 50;
      bottomPositionY -= 6 / 50;
      centerBottomPositionY += 50 / 50;
      rollingPart.setAttribute(
        "points",
        `300 390, 400 390, ${bottomRightPositionX} ${bottomPositionY},350 ${centerBottomPositionY},${bottomLeftPositionX} ${bottomPositionY}`
      );
      setTimeout(turnToPentagon, 10);
    } else {
      pentagon.classList.remove("hide");
      pentagonTurn();
    }
  }
}
let angle3 = 0;

function pentagonTurn() {
  rollingPart.setAttribute("transform", `rotate(${angle3} 410 400)`);
  if (angle3 < 180) {
    angle3++;
    setTimeout(pentagonTurn, 10);
  } else {
    //    rollingPart.setAttribute("transform", "");
    turnToHexagon();
  }
  function turnToHexagon() {}
}
