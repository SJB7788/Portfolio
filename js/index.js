const leftArrowIcon = document.getElementById("left-arrow");
const rightArrowIcon = document.getElementById("right-arrow");

const skillCardContainer = document.getElementById("skills__scroll");
const skillCards = document.querySelectorAll(".skills__card");

function moveSkillCards() {
    skillCardContainer.style.left = `calc(50% + 600px)`;
}

function moveSkillCardsToRight() {

}

function moveSkillCardsToLeft() {
    
}

class ScrollView {
    constructor(node_width) {
        this.node_array = [];
        this.node_width = node_width;
        this.size = 0;
    }

    initializeScrollView() {
        for (let i = 0; i < this.size; i++) {
            const offsetY = this.node_width * i;
            this.node_array[i].style.transform = `translateX(${offsetY}px)`;
        }
    }

    moveNodeToRight() {
        this.hideHiddenNodes();
        const lastNode = this.node_array.pop();
        this.node_array.unshift(lastNode);

        let focusedNodeIndex = this.size / 2;
        focusedNodeIndex = Math.round(focusedNodeIndex) - 1;

        const focusedNode = this.node_array[focusedNodeIndex];
        const prevFocusedNode = this.node_array[focusedNodeIndex + 1];
        
        for (let i = 0; i < this.size; i++) {
            const offsetY = this.node_width * i;
            this.node_array[i].style.transform = `translateX(${offsetY}px)`;
        }

        this.focusNode(focusedNode);
        this.removeFocusNode(prevFocusedNode);

        setTimeout(() => {
            this.showHiddenNodes();
        }, 100);
    }

    moveNodeToLeft() {

    }

    focusNode(node) {
        node.classList.remove("card_non_focus");
        node.classList.add("card_focus");
    }

    removeFocusNode(node) {
        node.classList.remove("card_focus");    
        node.classList.add("card_non_focus");    
    }

    hideHiddenNodes() {
        this.node_array[4].classList.add("card_hidden");
    }

    showHiddenNodes() {
        this.node_array[0].classList.remove("card_hidden");
    }

    insertNode(node) {
        this.node_array.push(node);
        this.size++;
    }

    getNodeList() {
        return this.node_array;
    }

}


const scrollView = new ScrollView(700);
skillCards.forEach(card => scrollView.insertNode(card));
scrollView.initializeScrollView();

leftArrowIcon.addEventListener('click', moveSkillCards);
rightArrowIcon.addEventListener('click', () => scrollView.moveNodeToRight());


