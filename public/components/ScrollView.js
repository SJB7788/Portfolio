class ScrollView {
    constructor(scrollDiv, scrollContainer, offset) {
        // this.node_array = Array.from(node_array) // convert HTML collections to array
        // this.size = node_array.length;
        // this.offset = offset;

        // const nodeRect = node_array[0].getBoundingClientRect();
        // this.node_width = nodeRect.width;

        // this.scroll_container = scroll_container;
        // this.scroll_container.style.width = `${this.node_width * (this.size - 1)}px`;
        
        // create a scroll node array
        this.scrollNodeArray = [];

        // deep clone the original scroll node and create two more
        this.scrollNodeArray.push(scrollDiv.cloneNode(true));
        this.scrollNodeArray.push(scrollDiv.cloneNode(true));

        // append the clone nodes to the DOM 
        this.scrollNodeArray.forEach(node => scrollContainer.appendChild(node));

        // add the original node to the array
        this.scrollNodeArray.push(scrollDiv);

        // get scroll node width
        const scrollRect = scrollDiv.getBoundingClientRect();
        this.nodeWidth = scrollRect.width;

        this.scrollStatus = true;
    }

    initializeScrollView() {
        // for (let i = 0; i < this.size; i++) {
        //     const offsetY = this.node_width * i;            
        //     this.node_array[i].style.transform = `translateX(${offsetY}px)`;
        // }
        
    }

    moveNodeToLeft() {
        if (!this.scrollStatus) return;

        // this.hideHiddenNodes(true);
        // const lastNode = this.node_array.pop();
        // this.node_array.unshift(lastNode);

        // let focusedNodeIndex = this.size / 2;
        // focusedNodeIndex = Math.round(focusedNodeIndex) - 1;

        // const focusedNode = this.node_array[focusedNodeIndex];
        // const prevFocusedNode = this.node_array[focusedNodeIndex + 1];

        // this.moveNodes(focusedNode, prevFocusedNode);

        // ** new code **
        // check if any node 
    }

    moveNodeToRight() {
        if (!this.scrollStatus) return;

        // this.hideHiddenNodes(false);
        // const firstNode = this.node_array.splice(0, 1)[0];
        // this.node_array.push(firstNode);

        // let focusedNodeIndex = this.size / 2;
        // focusedNodeIndex = Math.round(focusedNodeIndex) - 1;

        // const focusedNode = this.node_array[focusedNodeIndex];
        // const prevFocusedNode = this.node_array[focusedNodeIndex - 1];

        // this.moveNodes(focusedNode, prevFocusedNode);

        // ** new code **
        // have a variable that can know how many times we have moved left or right
        // if variable is >= 3: 
        //   then remove the last node and append to the front of the array
        //   call a function to adjust node position based on the index
        // else:
        //   just move all nodes by a certain amount (most likely by the width of a node) 
    }

    // change this so that it moves the card container, not individual nodes
    moveNodes(focusedNode, prevFocusedNode) {
        this.scrollStatus = false;

        for (let i = 0; i < this.size; i++) {
            const offsetY = (this.node_width + this.offset) * i;
            this.node_array[i].style.transform = `translateX(${offsetY}px)`;
        }

        // for the new focus node logic,
        // get how many nodes are in the scroll node (how many skills)
        // get the middle value (so if there is three skills, the middle is 1)
        // every time it moves left or right, add or sub to that variable
        // use the variable as an index to know which node to focus
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
