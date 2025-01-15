class ScrollView {
    constructor(node_width) {
        this.node_array = [];
        this.node_width = node_width;
        this.size = 0;
        this.scrollStatus = true;
    }

    initializeScrollView() {
        for (let i = 0; i < this.size; i++) {
            const offsetY = this.node_width * i;
            this.node_array[i].style.transform = `translateX(${offsetY}px)`;
        }
    }

    moveNodeToLeft() {
        if (!this.scrollStatus) return;

        this.hideHiddenNodes(true);
        const lastNode = this.node_array.pop();
        this.node_array.unshift(lastNode);

        let focusedNodeIndex = this.size / 2;
        focusedNodeIndex = Math.round(focusedNodeIndex) - 1;

        const focusedNode = this.node_array[focusedNodeIndex];
        const prevFocusedNode = this.node_array[focusedNodeIndex + 1];

        this.moveNodes(focusedNode, prevFocusedNode);
    }

    moveNodeToRight() {
        if (!this.scrollStatus) return;

        this.hideHiddenNodes(false);
        const firstNode = this.node_array.splice(0, 1)[0];
        this.node_array.push(firstNode);

        let focusedNodeIndex = this.size / 2;
        focusedNodeIndex = Math.round(focusedNodeIndex) - 1;

        const focusedNode = this.node_array[focusedNodeIndex];
        const prevFocusedNode = this.node_array[focusedNodeIndex - 1];

        this.moveNodes(focusedNode, prevFocusedNode);
    }

    moveNodes(focusedNode, prevFocusedNode, ) {
        this.scrollStatus = false;
        for (let i = 0; i < this.size; i++) {
            const offsetY = this.node_width * i;
            this.node_array[i].style.transform = `translateX(${offsetY}px)`;
        }

        this.focusNode(focusedNode);
        this.removeFocusNode(prevFocusedNode);

        setTimeout(() => {
            this.showHiddenNodes();
        }, 100);

        setTimeout(() => {this.scrollStatus = true;}, 500);
    }

    focusNode(node) {
        node.classList.remove("card_non_focus");
        node.classList.add("card_focus");
    }

    removeFocusNode(node) {
        node.classList.remove("card_focus");    
        node.classList.add("card_non_focus");    
    }

    hideHiddenNodes(isDirectionLeft) {
        if (isDirectionLeft) {
            this.node_array[this.size - 1].classList.add("card_hidden");
        } else {
            this.node_array[0].classList.add("card_hidden");
        }
    }

    showHiddenNodes() {
        this.node_array.forEach(node => node.classList.remove("card_hidden"));
    }

    insertNode(node) {
        this.node_array.push(node);
        this.size++;
    }

    getNodeList() {
        return this.node_array;
    }

}

export default { ScrollView };
