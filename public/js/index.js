import ScrollView from "../components/ScrollView.js";
import VeritcalScrollGallery from "../components/VeritcalScrollGallery.js";
import Bubbles from "../components/Bubbles.js";

// Scroll to top when website reloads (very cool)
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// ** Title Section **

const titleSectionContainer = document.getElementById("title__container");

// Bubbles
const bubble = new Bubbles.Bubbles(titleSectionContainer, 2, "#AADCEC", 300);
bubble.startBubbles();

// ** Skills Section **

// ScrollView Initialization
const leftArrowIcon = document.getElementById("left-arrow");
const rightArrowIcon = document.getElementById("right-arrow");

const skillScrollContainer = document.getElementById("skills_card__container");
const skillScroll = document.querySelector(".skills__scroll");

const scrollView = new ScrollView.ScrollView(
  skillScroll,
  skillScrollContainer,
  10
);

leftArrowIcon.addEventListener("click", () => scrollView.moveNodeToLeft());
rightArrowIcon.addEventListener("click", () => scrollView.moveNodeToRight());

// Language Card
const skillIcons = document.querySelectorAll(".skill-icon");

skillIcons.forEach((icon) => {
  icon.addEventListener("mouseover", () => {
    // if mouse over
    const iconPaths = icon.getElementsByClassName("skill-icon-path"); // get all the child nodes that has that class name
    const pathArray = Array.from(iconPaths); // turn HTML collection to Array

    pathArray.forEach((path) => {
      if (path.attributes.originalfill) {
        // if it has the original fill attribute
        const originalFillColor = path.getAttribute("originalfill"); // get the attribute value
        path.setAttribute("fill", originalFillColor); // change the fill to the attribute value
      }
    });
  });

  icon.addEventListener("mouseout", () => {
    // if mouse not over
    const iconPaths = icon.getElementsByClassName("skill-icon-path"); // get all child nodes that has this attirebute
    const pathArray = Array.from(iconPaths); // turn HTML collection to Array

    pathArray.forEach((path) => path.setAttribute("fill", "#FFFFFF")); // change all fill attribute to white
  });
});

// ** Projects Section **

const projectMarginContainer = document.getElementById(
  "project_scroll__container"
);
const scrollContainer = document.getElementById("project__scroll");
const projectContainer = document.getElementById("project__container");
const projectNodeArray = document.querySelectorAll(".project__card");

// Vertical Scroll Configuration
const nodeOffsetValue = 10; // Vertical offset of each node

const projectNodeRect = projectNodeArray[0].getBoundingClientRect(); // Rect of one project card
const projectNodeHeight = projectNodeRect.height; // Extract height of a project node

const marginValue = projectNodeHeight * (projectNodeArray.length - 1); // Calculate the margin needed for scroll

projectMarginContainer.style.setProperty(
  "--project-stack-height",
  `${marginValue}px`
); // Set project margin container property

const projectScrollGallery = new VeritcalScrollGallery.VerticalScrollGallery(
  projectNodeArray,
  nodeOffsetValue
);

// Project Card Details
const allFsCards = document.querySelectorAll(".project_fs_container");
const projFsBtns = document.querySelectorAll(".project_details_btn");
const body = document.body;

const navbarSectionContainer = document.getElementById("navbar__container");

projFsBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    const btnFsAttribute = btn.getAttribute("projfs");
    const fsDetailsContainer = document.getElementById(`${btnFsAttribute}`);

    fsDetailsContainer.style.visibility = "visible";
    fsDetailsContainer.style.opacity = "1";
    navbarSectionContainer.style.visibility = "hidden";
    navbarSectionContainer.style.opacity = "0";

    fsDetailsContainer.scrollIntoView({behavior: "smooth"});
    body.style.overflow = "hidden";
  })
);

const closeBtn = document.querySelectorAll(".fs_card_close_icon");
closeBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    allFsCards.forEach((card) => {
      card.style.visibility = "hidden";
      card.style.opacity = 0;
      navbarSectionContainer.style.visibility = "visible";
      navbarSectionContainer.style.opacity = "1";
      body.style.overflow = "unset";
    });
  })
);

// ** Navbar Section **
const navbarContainer = document.getElementById("navbar__ul");

const navHomeItem = document.getElementById("nav_home");
const navSkillItem = document.getElementById("nav_skill");
const navProjItem = document.getElementById("nav_proj");
const navContactItem = document.getElementById("nav_contact");

const allNavItems = document.querySelectorAll(".nav_item");

const skillSection = document.getElementById("skills__container");
const skillSectionRect = skillSection.getBoundingClientRect();

const footer = document.getElementById("footer_contact");
const footerRect = footer.getBoundingClientRect();

navbarContainer.classList.add("show_nav_bg");
function showNavbarBackground() {
  navbarContainer.classList.add("show_nav_bg");
}

function hideNavbarBackground() {
  navbarContainer.classList.remove("show_nav_bg");
}

hideNavbarBackground();

// Navbar item click event
navHomeItem.addEventListener("click", () =>
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
);

navSkillItem.addEventListener("click", () =>
  skillSection.scrollIntoView({ behavior: "smooth" })
);

navProjItem.addEventListener("click", () =>
  projectContainer.scrollIntoView({ behavior: "smooth" })
);

navContactItem.addEventListener("click", () =>
  footer.scrollIntoView({ behavior: "smooth" })
);

// Scroll Event Logic
const projSectionRect = projectContainer.getBoundingClientRect();
const projectYPos = projSectionRect.top + window.scrollY;

// Navbar scroll prep

// add logic for scroll
document.addEventListener("scroll", () => {
  const windowScrollY = window.scrollY;

  // navbar item highlight logic
  if (windowScrollY >= footerRect.top - projSectionRect.height / 2){
    allNavItems.forEach((item) => item.classList.remove("nav_focus"));
    navContactItem.classList.add("nav_focus");
  }
  else if (windowScrollY >= projSectionRect.top - projSectionRect.height / 2) {
    // project is at the very bottom
    allNavItems.forEach((item) => item.classList.remove("nav_focus"));
    navProjItem.classList.add("nav_focus");
  } else if (windowScrollY >= skillSectionRect.top - skillSectionRect.height / 2) {
    allNavItems.forEach((item) => item.classList.remove("nav_focus"));
    navSkillItem.classList.add("nav_focus");
  } else {
    // if not anything else, probably at the very top (which is title section)
    allNavItems.forEach((item) => item.classList.remove("nav_focus"));
    navHomeItem.classList.add("nav_focus");
  }

  if (windowScrollY > 10) {
    showNavbarBackground();
  } else {
    hideNavbarBackground();
  }
  if (windowScrollY >= projectYPos) {
    const nodeScrollValue = document.documentElement.scrollTop - projectYPos;
    projectScrollGallery.moveNodes(nodeScrollValue);
  } else {
    projectScrollGallery.resetNodes();
  }
});
