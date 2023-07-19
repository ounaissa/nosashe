document.querySelector(".nav i ").onclick = function () {
  this.classList.toggle("opened");
};

let skills = document.querySelectorAll(".skills .image");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 285) {
    skills.forEach((e) => {
      e.style.transform = "translateY(0px) scale(1)";
      e.style.opacity = "1";
    });
  }
});

document.querySelector(".skills .more").onclick = function () {
  let framework = document.querySelector(".frameworks");
  framework.classList.toggle("showed");
  let current = document.querySelector(".current").classList.toggle("showed");
  if (framework.classList.contains("showed")) {
    this.innerHTML = "Show Less";
  } else {
    this.innerHTML = "See more details";
  }
};

/* get templates from git hub  */
let project = document.querySelectorAll(".project");
/* Container of the project */
let cont = document.createElement("div");
cont.className = "el-cont";
cont.style.position = "fixed";

document.querySelector(".portfolio").appendChild(cont);

let view = document.querySelector(".project .info a ");
fetch("https://api.github.com/users/ounaissa/repos")
  .then((response) => response.json())
  .then((repostires) => {
    project.forEach((e) => {
      let projectImage = e.querySelector(".tamplate-image");
      let view = e.querySelector(".info a ");
      for (let i = 0; i < repostires.length; i++) {
        if (repostires[i].name == e.dataset.project) {
          projectImage.setAttribute(
            "src",
            `https://raw.githubusercontent.com/ounaissa/${repostires[i].name}/main/${repostires[i].name}/media/landing.jpg`
          );
        }
      }

      view.onclick = function () {
        let projectView = document.createElement("iframe");
        projectView.className = "project-iframe";
        projectView.setAttribute(
          "src",
          `https://ounaissa.github.io/${view.dataset.project}/${view.dataset.project}/`
        );
        /*iframe*/

        /* open iframe */
        let openframe = document.createElement("a");
        openframe.className = "open-iframe";
        openframe.setAttribute(
          "href",
          `https://ounaissa.github.io/${view.dataset.project}/${view.dataset.project}/`
        );
        openframe.setAttribute("target", "_blank");
        let openIcon = document.createElement("i");
        openIcon.classList.add("fa-solid", "fa-arrow-up-right-from-square");
        /* open iframe */

        /* close iframe */
        let closeframe = document.createElement("i");
        closeframe.classList.add("fa-solid", "fa-close", "close-iframe");
        closeframe.onclick = function () {
          project_cont.removeChild(openframe);
          project_cont.removeChild(closeframe);
          project_cont.removeChild(projectView);
          cont.removeChild(overlay);
        };
        /* close iframe */

        /* over lay  */
        let overlay = document.createElement("div");
        overlay.className = " over-lay";
        /* over lay */

        let project_cont = document.createElement("div");
        project_cont.className = "project-cont";
        cont.appendChild(project_cont);
        openframe.appendChild(openIcon);
        cont.appendChild(overlay);
        project_cont.appendChild(openframe);
        project_cont.appendChild(closeframe);
        project_cont.appendChild(projectView);
      };
    });
  });
