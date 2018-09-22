"use strict";
console.log(50 * Math.sqrt(3));

const rollingPart = document.querySelector("polygon");
const square = document.querySelector(".square");
const pentagon = document.querySelector(".pentagon");
const hexagon = document.querySelector(".hexagon");
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
    setTimeout(triangleTurn, 5);
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
    setTimeout(turnToSquare, 5);
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
    setTimeout(squareTurn, 5);
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
      setTimeout(turnToPentagon, 5);
    } else {
      pentagon.classList.remove("hide");
      pentagonTurn();
    }
  }
}
let angle3 = 0;
//390 316, 470 260, 550 316, 520 410, 420 410
let pentagonBottomLeftPositionX = 420;
let pentagonBottomRightPositionX = 520;
let pentagonBottomPositionY = 410;
let pentagonBottomCenterPositionY = 410;
let pentagonTopCenterPositionY = 260;
function pentagonTurn() {
  rollingPart.setAttribute("transform", `rotate(${angle3} 410 400)`);
  if (angle3 < 180) {
    angle3++;
    setTimeout(pentagonTurn, 5);
  } else {
    rollingPart.setAttribute("transform", "");
    turnToHexagon();
  }
  function turnToHexagon() {
    if (pentagonBottomLeftPositionX > 390) {
      pentagonBottomLeftPositionX -= 30 / 50;
      pentagonBottomRightPositionX += 30 / 50;
      pentagonBottomPositionY -= 5 / 50;
      pentagonBottomCenterPositionY += 40 / 50;
      pentagonTopCenterPositionY += 10 / 50;
      rollingPart.setAttribute(
        "points",
        `390 316, 470 ${pentagonTopCenterPositionY}, 550 316, ${pentagonBottomRightPositionX} ${pentagonBottomPositionY}, 470 ${pentagonBottomCenterPositionY}, ${pentagonBottomLeftPositionX} ${pentagonBottomPositionY}`
      );
      setTimeout(turnToHexagon, 5);
    } else {
      hexagon.classList.remove("hide");
      hexagonTurn();
    }
  }
}
let angle4 = 0;
function hexagonTurn() {
  rollingPart.setAttribute("transform", `rotate(${angle4} 570 350)`);
  if (angle4 < 120) {
    angle4++;
    setTimeout(hexagonTurn, 5);
  }
}
