import ScrollView from "../components/ScrollView.js";

// Skills Section

// ScrollView Initialization
const leftArrowIcon = document.getElementById("left-arrow");
const rightArrowIcon = document.getElementById("right-arrow");

const skillCardContainer = document.getElementById("skills__scroll");
const skillCards = document.querySelectorAll(".skills__card");

const scrollView = new ScrollView.ScrollView(700);
skillCards.forEach(card => scrollView.insertNode(card));
scrollView.initializeScrollView();

leftArrowIcon.addEventListener('click', () => scrollView.moveNodeToLeft());
rightArrowIcon.addEventListener('click', () => scrollView.moveNodeToRight());

// Projects Section

// Vertical Scroll Configuration
const projectContainer = document.getElementById("project__container");

const projectYPos = projectContainer.getBoundingClientRect();
