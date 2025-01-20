import ScrollView from "../components/ScrollView.js";
import VeritcalScrollGallery from "../components/VeritcalScrollGallery.js";

// window.addEventListener("load", () => {

// });

// Title Section

// Bubbles



// Skills Section

// ScrollView Initialization
const leftArrowIcon = document.getElementById("left-arrow");
const rightArrowIcon = document.getElementById("right-arrow");

const skillCardContainer = document.getElementById("skills__scroll");
const skillCards = document.querySelectorAll(".skills__card");

const scrollView = new ScrollView.ScrollView(700);
skillCards.forEach((card) => scrollView.insertNode(card));
scrollView.initializeScrollView();

leftArrowIcon.addEventListener("click", () => scrollView.moveNodeToLeft());
rightArrowIcon.addEventListener("click", () => scrollView.moveNodeToRight());


// Projects Section

const projectMarginContainer = document.getElementById("project_scroll__container");
const scrollContainer = document.getElementById("project__scroll");
const projectContainer = document.getElementById("project__container");

// Vertical Scroll Configuration
const scrollContainerRect = scrollContainer.getBoundingClientRect();
const scrollContainerHeight = scrollContainerRect.height;

projectMarginContainer.style.setProperty("--project-stack-height", `${scrollContainerHeight}px`); // set project margin container property

const projectNodeArray = document.querySelectorAll(".project__card"); 
const projectScrollGallery = new VeritcalScrollGallery.VerticalScrollGallery(projectNodeArray, 30);


// Scroll Event Logic
const projectRect = projectContainer.getBoundingClientRect();
const projectYPos = projectRect.top + window.scrollY;

document.addEventListener("scroll", () => {
  if (window.scrollY >= projectYPos) {
    const nodeScrollValue = document.documentElement.scrollTop - projectYPos;
    projectScrollGallery.moveNodes(nodeScrollValue);
  } else {
    projectScrollGallery.resetNodes()
  }
});
