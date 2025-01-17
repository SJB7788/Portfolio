import ScrollView from "../components/ScrollView.js";

// window.addEventListener("load", () => {

// });

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

// Vertical Scroll Configuration
const projectMarginContainer = document.getElementById("project_scroll__container");
const scrollContainer = document.getElementById("project__scroll");
const scrollContainerRect = scrollContainer.getBoundingClientRect();
const scrollContainerHeight = scrollContainerRect.height;

console.log(scrollContainerHeight);


projectMarginContainer.style.setProperty("--project-stack-height", scrollContainerHeight);

const projectContainer = document.getElementById("project__container");

const projectRect = projectContainer.getBoundingClientRect();
const projectYPos = projectRect.top + window.scrollY;

class VerticalScrollGallery {
  constructor(nodeArray, offsetY) {
    this.nodeArray = nodeArray;
    this.size = nodeArray.length;
    this.offsetY = offsetY;

    const firstNodeRect = nodeArray[0].getBoundingClientRect();
    
    this.staticPos = firstNodeRect.top + document.documentElement.scrollTop;
    this.nodeSize = firstNodeRect.height;
  }

  moveNodes(scrollValue) {
    for (let i = 1; i <= this.size - 1; i++) {
        const offset = this.nodeSize;

      if (scrollValue <= offset * i) {
        this.nodeArray[i].style.transform = `translateY(-${scrollValue}px)`;
      } else if (scrollValue > offset * i) {
        this.nodeArray[i].style.transform = `translateY(-${offset * i}px)`;
      }
    }
  }

  resetNodes() {
    for (let i = 1; i <= this.size - 1; i++) {
      this.nodeArray[i].style.transform = `translateY(${0}px)`;
    }
  }

  insertNode(node) {
    this.nodeArray.push(node);
  }

  getNodeArray() {
    return this.nodeArray;
  }
}

const projectNodeArray = document.querySelectorAll(".project__card");

const projectScrollGallery = new VerticalScrollGallery(projectNodeArray, 30);

document.addEventListener("scroll", () => {
  if (window.scrollY >= projectYPos) {
    const nodeScrollValue = document.documentElement.scrollTop - projectYPos;
    projectScrollGallery.moveNodes(nodeScrollValue);
  } else {
    projectScrollGallery.resetNodes()
  }
});
