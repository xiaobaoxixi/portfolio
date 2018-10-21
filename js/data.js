"use strict";

let selector;
if (window.matchMedia("(max-width: 768px)").matches) {
  selector = "#single-project-square";
} else {
  selector = "#single-project";
}

let projectName = document.querySelector(`${selector} .desc h3`);
let projectType = document.querySelector(`${selector} .type p:nth-of-type(1)`);
let myRoll = document.querySelector(`${selector} .type p:nth-of-type(2)`);
let note1 = document.querySelector(`${selector} .notes li:nth-of-type(1)`);
let note2 = document.querySelector(`${selector} .notes li:nth-of-type(2)`);
let note3 = document.querySelector(`${selector} .notes li:nth-of-type(3)`);
let icon1 = document.querySelector(`${selector} .tech li:nth-of-type(1)`);
let icon2 = document.querySelector(`${selector} .tech li:nth-of-type(2)`);
let icon3 = document.querySelector(`${selector} .tech li:nth-of-type(3)`);
let url = document.querySelector(`${selector} .url`);
let reportS = document.querySelectorAll(`${selector} .report`);
let img = document.querySelector(`${selector} .img img`);

function getData(project) {
  console.log(selector);
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
          if (projects[index].url.length === 1) {
            url.innerHTML = "";
            let a = document.createElement("a");
            a.setAttribute("href", projects[index].url[0]);
            a.setAttribute("target", "_blank");
            a.textContent = "see original project";
            url.appendChild(a);
          } else if (projectNr === "26") {
            // nr26 is "circle of mice", has more than one url
            url.innerHTML = "local use only<br>concept ";
            projects[index].url.forEach(addAnchor);
            function addAnchor(u, i) {
              let a = document.createElement("a");
              a.setAttribute("href", u);
              a.setAttribute("target", "_blank");
              a.textContent = "demo" + (i + 1) + " ";
              url.appendChild(a);
            }
          } else if (projects[index].url.length === 0) {
            document.querySelector(".url").innerHTML = "";
          }
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
