"use strict";

let projectName = document.querySelector(".desc h3");
let projectType = document.querySelector(".type p:nth-of-type(1)");
let myRoll = document.querySelector(".type p:nth-of-type(2)");
let note1 = document.querySelector(".notes li:nth-of-type(1)");
let note2 = document.querySelector(".notes li:nth-of-type(2)");
let note3 = document.querySelector(".notes li:nth-of-type(3)");
let icon1 = document.querySelector(".tech li:nth-of-type(1)");
let icon2 = document.querySelector(".tech li:nth-of-type(2)");
let icon3 = document.querySelector(".tech li:nth-of-type(3)");
let url = document.querySelector(".url a");
let reportS = document.querySelectorAll(".report");
let img = document.querySelector(".img img");

function getData(project) {
  let projectNr = project.dataset.projectnr; // return string
  fetch("projects.json")
    .then(data => data.json())
    .then(projects => {
      projects.forEach((p, index) => checkMatch(p, index));
      function checkMatch(p, index) {
        if (p.nr === projectNr) {
          projectName.textContent = projects[index].name;
          if (projects[index].type === "single") {
            projectType.textContent = "solo project";
            myRoll.classList.add("hide");
          }
          if (projects[index].type !== "single") {
            projectType.textContent = "team project";
            myRoll.classList.remove("hide");
            myRoll.textContent = projects[index].myRoll;
          }
          note1.textContent = projects[index].notes[0];
          note2.textContent = projects[index].notes[1];
          note3.textContent = projects[index].notes[2];
          img.setAttribute("src", projects[index].img);
          url.setAttribute("href", projects[index].url);
          if (projects[index].report) {
            reportS.forEach(eachReport);
            function eachReport(r, i) {
              let reportSInJSON = projects[index].report;
              reportSInJSON.forEach(showEachReport);
              function showEachReport(rJSON) {
                if (reportSInJSON[i]) {
                  r.querySelector("a").setAttribute("href", reportSInJSON[i]);
                  r.classList.remove("hide");
                }
              }
            }
          } else {
            reportS.forEach(r => r.classList.add("hide"));
          }
        }
      }
    });
}
