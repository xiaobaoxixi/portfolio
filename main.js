"use strict";

const rollingPart = document.querySelector("polygon");
const square = document.querySelector(".square");
const pentagon = document.querySelector(".pentagon");
const hexagon = document.querySelector(".hexagon");
// from triangle to square
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
// from square to pentagon
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
// from pentagon to hexagon
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
// from hexagon to octagon
let angle4 = 0;
let scale = 1;
let translateX = 0;
let translateY = 0;
let hexagonPoint1X = 533;
let hexagonPoint1Y = 213;
let hexagonPoint2X = 620;
let hexagonPoint2Y = 157;
let hexagonPoint3X = 709;
let hexagonPoint3Y = 211;
let hexagonPoint4X = 709;
let hexagonPoint4Y = 315;
let hexagonPoint5X = 620;
let hexagonPoint5Y = 367;
let hexagonPoint6X = 533;
let hexagonPoint6Y = 315;
let addedPoint1X = 533;
let addedPoint1Y = 315;
let addedPoint2X = 533;
let addedPoint2Y = 315;
function hexagonTurn() {
  rollingPart.setAttribute(
    "transform",
    `rotate(${angle4} 633 361) scale(${scale}) `
  );
  if (angle4 < 120) {
    angle4++;
    scale += 0.0015;
    setTimeout(hexagonTurn, 5);
  } else {
    turnToOctagon();
  }
  //533 213, 620 157, 709 211, 709 315, 620 367, 533 315

  //515 262, 545 191, 620 157, 695 191,725 262, 695 333, 620 367, 545 333
  function turnToOctagon() {
    if (hexagonPoint1X < 545) {
      hexagonPoint1X += 12 / 50;
      hexagonPoint1Y -= 22 / 50;
      hexagonPoint2X += 12 / 50;
      hexagonPoint2Y -= 22 / 50;
      hexagonPoint3X += 12 / 50;
      hexagonPoint3Y -= 22 / 50;
      hexagonPoint4X += 12 / 50;
      hexagonPoint4Y -= 22 / 50;
      hexagonPoint5X += 12 / 50;
      hexagonPoint5Y -= 22 / 50;
      hexagonPoint6X += 12 / 50;
      hexagonPoint6Y -= 22 / 50;
    }
  }
}
// to future
