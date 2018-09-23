"use strict";

const svg = document.querySelector("svg");
const rollingPart = document.querySelector(".rolling");
const triangle = document.querySelector(".triangle");
const square = document.querySelector(".square");
const pentagon = document.querySelector(".pentagon");
const hexagon = document.querySelector(".hexagon");
const octagon = document.querySelector(".octagon");
const h1 = document.querySelector("h1");
let h1CollapseState = false;
let svgShrunkState = false;
let timeout;
const windowHeight = window.innerHeight;

window.addEventListener("DOMContentLoaded", init);
function init() {
  console.log(document.scrollingElement.scrollTop);
  // document.scrollingElement.scrollTop = `0`;
  let angle = 0;
  triangleTurn();
  // from triangle to square
  function triangleTurn() {
    triangle.setAttribute("fill", "transparent"); // need fill because otherwise mouse enter/leave only triggers when crossing stroke
    rollingPart.setAttribute("fill", "var(--fill)");
    rollingPart.setAttribute("transform", `rotate(${angle} 200 400)`);
    triangle.nextElementSibling.nextElementSibling.style.display = "inherit";
    if (angle < 150) {
      angle += 150 / 60;
      timeout = setTimeout(triangleTurn, 1000 / 60);
    } else {
      clearTimeout(timeout);
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
    timeout = setTimeout(turnToSquare, 3);
  } else {
    clearTimeout(timeout);
    square.classList.remove("hide");
    square.nextElementSibling.nextElementSibling.style.display = "inherit";
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
    angle2 += 180 / 60;
    timeout = setTimeout(squareTurn, 1000 / 60);
  } else {
    clearTimeout(timeout);
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
      timeout = setTimeout(turnToPentagon, 3);
    } else {
      clearTimeout(timeout);
      pentagon.classList.remove("hide");
      pentagon.nextElementSibling.nextElementSibling.style.display = "inherit";
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
    angle3 += 180 / 60;
    timeout = setTimeout(pentagonTurn, 1000 / 60);
  } else {
    clearTimeout(timeout);
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
      timeout = setTimeout(turnToHexagon, 3);
    } else {
      clearTimeout(timeout);
      hexagon.classList.remove("hide");
      hexagon.nextElementSibling.nextElementSibling.style.display = "inherit";
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
    angle4 += 120 / 60;
    scale += 0.0015;
    timeout = setTimeout(hexagonTurn, 1000 / 60);
  } else {
    clearTimeout(timeout);
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
      timeout = setTimeout(turnToOctagon, 3);
    } else {
      clearTimeout(timeout);
      // show h1
      octagon.nextElementSibling.nextElementSibling.style.display = "inherit";
      extendH1();
      //hide rollingpart, show octagon
      rollingPart.classList.add("hide");
      octagon.classList.remove("hide");
      octagon.setAttribute("fill", "var(--fill)");
      ////////////////////////////////////////////////////////
      const allPolygonS = document.querySelectorAll("polygon");
      // liston to all polygons and list project with hover/mouseenter
      allPolygonS.forEach(p => {
        p.addEventListener("mouseenter", listProjectGroups);
        function listProjectGroups(m) {
          clearOtherFill();
          fill(m);
          let targetY2 = m.target.nextElementSibling.getAttribute("y3");
          let currentY2 = m.target.nextElementSibling.getAttribute("y2");
          showVertiLine();
          function showVertiLine() {
            if (currentY2 < targetY2 - 1) {
              // because of the ease method below, currentY2 will always be smaller than targetY2, need -1 to stop
              currentY2 = m.target.nextElementSibling.getAttribute("y2");
              m.target.nextElementSibling.setAttribute(
                "y2",
                `${Number(currentY2) + Number(targetY2 - currentY2) / 10}`
              ); // ease-in effect
              //              m.target.removeEventListener("mouseleave", removeFill); // so when svg scrolls up, won't trigger mouse leave;
              if (
                document.scrollingElement.scrollTop <
                windowHeight * 0.35 // restrict scroll, no need to move all the way up and lose polygons out of sight
              ) {
                document.scrollingElement.scrollTop = `${document
                  .scrollingElement.scrollTop +
                  Number(targetY2 - currentY2) / 7}`; // use document.scrollingElement.scrollTop instead of document.body.scrollTop, which always gives 0
              }
              let groupCount =
                m.target.nextElementSibling.nextElementSibling
                  .nextElementSibling.children[0].children.length;
              m.target.nextElementSibling.nextElementSibling.nextElementSibling.children[0].style.height = `${groupCount *
                24}px`;
              timeout = setTimeout(showVertiLine, 1000 / 60);
            } else {
              clearTimeout(timeout);
            }
          }
          const groupArea =
            p.nextElementSibling.nextElementSibling.nextElementSibling;
          groupArea.addEventListener("mouseenter", showEachGroup);
          function showEachGroup(m) {
            document.querySelectorAll("polygon").forEach(p => {
              p.setAttribute("fill", "transparent");
            });
            // fill the corresponding polygon
            m.target.previousElementSibling.previousElementSibling.previousElementSibling.setAttribute(
              "fill",
              "var(--fill)"
            );
            collapseH1();
            m.target.removeEventListener("mouseenter", showEachGroup);
            let group = m.target.previousElementSibling.textContent;
            let horiLinesInGroup = document.querySelectorAll(
              `.${group}.hori-line`
            );
            horiLinesInGroup.forEach(extendEachHoriLine);
            function extendEachHoriLine(hl) {
              let targetX = Number(hl.getAttribute("x3"));
              let currentX = Number(hl.getAttribute("x2"));
              extend();
              function extend() {
                if (currentX < targetX - 1) {
                  currentX = Number(hl.getAttribute("x2"));
                  hl.setAttribute(
                    "x2",
                    `${currentX + (targetX - currentX) / 20}`
                  );
                  timeout = setTimeout(extend, 10);
                } else {
                  clearTimeout(timeout);
                }
              }
            }
          }
          console.log(m.target.dataset.project);
          //          m.target.addEventListener("mouseleave", removeFill);
        }
      });
      //  display project with click
      allPolygonS.forEach(p => {
        p.addEventListener("click", showProject);
        function showProject(m) {
          shrinkSVG();
          collapseH1();
          clearOtherFill();
          fill(m);
        }
      });
    }
  }
}

///////////////////////////////////
function clearOtherFill() {
  document.querySelectorAll("polygon").forEach(p => {
    p.setAttribute("fill", "transparent");
    p.removeEventListener("mouseleave", removeFill); // so that when svg is shrinking and mouse leaves the polygon area, the fill won't be removed
    p.removeEventListener("mouseenter", fill); // so that hover doesn't trigger fill anymore when svg is used at corner as nav
  });
}
function fill(m) {
  octagon.setAttribute("fill", "transparent"); // because after animation, octagon has fill
  m.target.setAttribute("fill", "var(--fill)");
}
function removeFill(m) {
  m.target.setAttribute("fill", "transparent");
}
function extendH1() {
  let currentH1Width = 9;
  h1Width();
  function h1Width() {
    if (currentH1Width < 36) {
      h1.style.width = `${currentH1Width}vw`;
      currentH1Width++;
      timeout = setTimeout(h1Width, 1000 / 60);
    } else {
      clearTimeout(timeout);
    }
  }
  h1CollapseState = false;
}
function collapseH1() {
  if (h1CollapseState === false) {
    let currentH1Width = 36;
    h1Width();
    function h1Width() {
      if (currentH1Width >= 9) {
        h1.style.width = `${currentH1Width}vw`;
        currentH1Width--;
        timeout = setTimeout(h1Width, 1000 / 60);
      } else {
        clearTimeout(timeout);
      }
    }
    h1CollapseState = true;
  }
}
function shrinkSVG() {
  if (svgShrunkState === false) {
    let currentSVGPosition = -14;
    let currentSVGWidth = 190;
    shrinkAndMove();
    function shrinkAndMove() {
      if (currentSVGPosition > -23) {
        //      svg.style.top = `${currentSVGPosition}vw`;
        svg.style.width = `${currentSVGWidth}vw`;
        currentSVGPosition--;
        currentSVGWidth -= 11;
        timeout = setTimeout(shrinkAndMove, 500 / 60);
      } else {
        clearTimeout(timeout);
      }
    }
    svgShrunkState = true;
  }
}
//////////////////////////////////
// leave 1 polygon with fill
// temp h1 animation needs to be changed
// when show line and scroll up, shouldn't trigger mouse leave
// highlight group area
// foreignObject mouseenter trigger not always working
// give timeout individual name in order to control cancal
// when show verticle line, check if already in view then no scroll down
