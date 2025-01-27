import ScrollView from "../components/ScrollView.js";
import VeritcalScrollGallery from "../components/VeritcalScrollGallery.js";

// Scroll to top when website reloads (very cool)
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// ** Navbar Section **
const navbarContainer = document.getElementById("navbar__ul");
const navHomeItem = document.getElementById("nav_home");
const navSkillItem = document.getElementById("nav_skill");
const navProjItem = document.getElementById("nav_proj");
const navContactItem = document.getElementById("nav_contact");

navbarContainer.classList.add("show_nav_bg");
function showNavbarBackground() {
  navbarContainer.classList.add("show_nav_bg");
}

function hideNavbarBackground() {
  navbarContainer.classList.remove("show_nav_bg");
}

// ** Title Section **

const titleSectionContainer = document.getElementById("title__container");

// Bubbles
class Bubbles {
  constructor(container, numOfBubbles, color, moveSpeed) {
    this.container = container;
    this.size = numOfBubbles;
    this.color = color;
    this.moveSpeed = moveSpeed;
    this.bubbleArray = [];

    const containerRect = container.getBoundingClientRect();
    this.xLimit = containerRect.width;
    this.yLimit = containerRect.height;

    this.createBubbles(numOfBubbles, color);

    setInterval(() => {
      this.moveBubbles();
    }, 10000);
  }

  createBubbles(numOfBubbles, color) {
    for (let i = 0; i < numOfBubbles; ++i) {
      const bubble = document.createElement("div");

      const randomXPos = Math.floor(Math.random() * this.xLimit);
      const randomYPos = Math.floor(Math.random() * this.yLimit);

      bubble.className = "bubbles";
      bubble.style.backgroundColor = color;
      bubble.style.top = `${randomYPos}px`;
      bubble.style.left = `${randomXPos}px`;

      this.bubbleArray.push(bubble);
      this.container.appendChild(bubble);
    }
  }

  moveBubbles() {
    for (let i = 0; i < this.size; ++i) {
      const bubbleXPos = Number.parseInt(
        this.bubbleArray[i].style.left.slice(0, 3)
      );
      const bubbleYPos = Number.parseInt(
        this.bubbleArray[i].style.top.slice(0, 3)
      );

      const randomXPos = Math.floor(Math.random() * 2) === 1 ? -1 : 1;
      const randomYPos = Math.floor(Math.random() * 2) === 1 ? -1 : 1;

      let newXPos = bubbleXPos + this.moveSpeed * randomXPos;
      let newYPos = bubbleYPos + (this.moveSpeed / 2) * randomYPos;

      if (newXPos < 0 || newXPos > this.xLimit) {
        newXPos *= -1;
      }

      if (newYPos < 0 || newYPos > this.yLimit) {
        newYPos *= -1;
      }

      this.bubbleArray[i].style.top = `${newYPos}px`;
      this.bubbleArray[i].style.left = `${newXPos}px`;
    }
  }
}

const bubble = new Bubbles(titleSectionContainer, 2, "#AADCEC", 300);

// ** Skills Section **

// ScrollView Initialization
const leftArrowIcon = document.getElementById("left-arrow");
const rightArrowIcon = document.getElementById("right-arrow");

const skillCardContainer = document.getElementById("skills__scroll");
const skillCards = document.querySelectorAll(".skills__card");

const scrollView = new ScrollView.ScrollView(skillCards, skillCardContainer, 5);
scrollView.initializeScrollView();

leftArrowIcon.addEventListener("click", () => scrollView.moveNodeToLeft());
rightArrowIcon.addEventListener("click", () => scrollView.moveNodeToRight());

// Language Card
const skillIcons = document.querySelectorAll(".skill-icon");

skillIcons.forEach((icon) => {
  icon.addEventListener("mouseover", () => { // if mouse over
    const iconPaths = icon.getElementsByClassName("skill-icon-path"); // get all the child nodes that has that class name
    const pathArray = Array.from(iconPaths); // turn HTML collection to Array

    pathArray.forEach((path) => {
      if (path.attributes.originalfill) { // if it has the original fill attribute
        const originalFillColor = path.getAttribute("originalfill"); // get the attribute value
        path.setAttribute("fill", originalFillColor); // change the fill to the attribute value
      }
    });
  });

  icon.addEventListener("mouseout", () => { // if mouse not over
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

const marginValue = (projectNodeHeight + nodeOffsetValue) * projectNodeArray.length; // Calculate the margin needed for scroll

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
const btn = document.querySelector(".project_details_btn");
btn.addEventListener("click", () => {
  const btnFsAttribute = btn.getAttribute("projfs");
  console.log(btnFsAttribute);
  
  const fsDetailsContainer = document.getElementById(`${btnFsAttribute}`);
  console.log(fsDetailsContainer);
  
  fsDetailsContainer.style.visibility = "visible";
  fsDetailsContainer.style.opacity = "1";
});

const closeBtn = document.querySelectorAll(".fs_card_close_icon");
closeBtn.forEach(btn => btn.addEventListener("click", () => {
  allFsCards.forEach(card => {
    card.style.opacity = 0;
    card.style.visibility = "hidden";
  });
}));

// Scroll Event Logic
const projectRect = projectContainer.getBoundingClientRect();
const projectYPos = projectRect.top + window.scrollY;

// add logic for scroll
document.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    showNavbarBackground();
  } else {
    hideNavbarBackground();
  }
  if (window.scrollY >= projectYPos) { 
    const nodeScrollValue = document.documentElement.scrollTop - projectYPos;
    projectScrollGallery.moveNodes(nodeScrollValue);
  } else {
    projectScrollGallery.resetNodes();
  }
});
