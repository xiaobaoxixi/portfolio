"use strict";

const rollingPart = document.querySelector(".rolling");
const triangle = document.querySelector(".triangle");
const square = document.querySelector(".square");
const pentagon = document.querySelector(".pentagon");
const hexagon = document.querySelector(".hexagon");
const octagon = document.querySelector(".octagon");

window.addEventListener("DOMContentLoaded", init);
function init() {
  let angle = 0;
  triangleTurn();
  // from triangle to square
  function triangleTurn() {
    triangle.setAttribute("fill", "transparent"); // need fill because otherwise mouse enter/leave only triggers when crossing stroke
    rollingPart.setAttribute("fill", "var(--fill)");
    rollingPart.setAttribute("transform", `rotate(${angle} 200 400)`);
    if (angle < 150) {
      angle++;
      setTimeout(triangleTurn, 1 / 150);
    } else {
      turnToSquare();
    }
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
    square.setAttribute("fill", "transparent");
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
    setTimeout(squareTurn, 1 / 180);
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
      pentagon.setAttribute("fill", "transparent");
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
    setTimeout(pentagonTurn, 1 / 180);
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
      hexagon.setAttribute("fill", "transparent");
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
let addedPoint1X = 530;
let addedPoint2X = 713;
function hexagonTurn() {
  rollingPart.setAttribute(
    "transform",
    `rotate(${angle4} 635 363) scale(${scale}) `
  );
  if (angle4 < 120) {
    angle4++;
    scale += 0.0015;
    setTimeout(hexagonTurn, 1 / 120);
  } else {
    rollingPart.setAttribute("transform", "");
    turnToOctagon();
  }
  //         530 210, 623 155, 713 210,          713 315, 623 368, 530 315
  //516 262, 548 187, 623 155, 698 187, 730 262, 698 337, 623 369, 548 337
  //518 262, 550 187, 625 155, 700 187, 732 262, 700 337, 625 369, 550 337
  function turnToOctagon() {
    if (addedPoint1X > 518) {
      addedPoint1X -= 10 / 50;
      hexagonPoint1X += 14 / 50;
      hexagonPoint1Y -= 22 / 50;
      hexagonPoint3X -= 7 / 50;
      hexagonPoint3Y -= 20 / 50;
      addedPoint2X += 16 / 50;
      hexagonPoint4X -= 7 / 50;
      hexagonPoint4Y += 18 / 50;
      hexagonPoint6X += 14 / 50;
      hexagonPoint6Y += 18 / 50;
      rollingPart.setAttribute(
        "points",
        `${addedPoint1X} 262, ${hexagonPoint1X} ${hexagonPoint1Y}, 623 155, ${hexagonPoint3X} ${hexagonPoint3Y}, ${addedPoint2X} 262, ${hexagonPoint4X} ${hexagonPoint4Y}, 623 369, ${hexagonPoint6X} ${hexagonPoint6Y}`
      );
      setTimeout(turnToOctagon, 5);
    } else {
      //hide rollingpart, show octagon
      rollingPart.classList.add("hide");
      octagon.classList.remove("hide");
      octagon.setAttribute("fill", "var(--fill)");
      // liston to all polygons and alter fill with mouse movement
      const allPolygonS = document.querySelectorAll("polygon");
      allPolygonS.forEach(p => {
        p.addEventListener("mouseenter", () => {
          octagon.setAttribute("fill", "transparent");
          p.setAttribute("fill", "var(--fill)");
        });
        p.addEventListener("mouseleave", () => {
          p.setAttribute("fill", "transparent");
        });
      });
    }
  }
}
