class ScrollView {
  constructor(scrollDiv, scrollContainer, offset) {
    this.scrollStatus = true;
    this.offset = offset;
    this.moveValue = 0; // move value defines the amount of times we have moved left (positive) or right (negative) from the original point
    this.currentCardIndex = 1; // default card focus is 1

    // create a scroll node array
    this.scrollNodeArray = [];

    // deep clone the original scroll node and create two more
    this.scrollNodeArray.push(scrollDiv.cloneNode(true));
    this.scrollNodeArray.push(scrollDiv.cloneNode(true));

    // append the clone nodes to the DOM
    this.scrollNodeArray.forEach((node) => scrollContainer.appendChild(node));

    // add the original node to the array
    this.scrollNodeArray.push(scrollDiv);

    // create an array of childNode collections from each ScrollNodes
    this.childNodeArray = [];

    this.scrollNodeArray.forEach((node) => {
      const childCollectionToArr = Array.from(
        node.getElementsByClassName("skills__card")
      );

      this.childNodeArray.push(childCollectionToArr);
    });

    this.singleChild = this.childNodeArray[0][0];
  }

  moveNodeToLeft() {
    // if scroll status is false, then return
    if (!this.scrollStatus) return;

    // since we are moving to the left, the focus card would be -1
    this.currentCardIndex -= 1;
    // moving left means the nodes are moving to the right side
    this.moveValue += 1;

    this.moveNodes();
  }

  moveNodeToRight() {
    // if scroll status is false, then return
    if (!this.scrollStatus) return;

    // since we are moving to the right, the focus card would be +1
    this.currentCardIndex += 1;
    // moving right means the nodes are moving to the left side
    this.moveValue -= 1;

    this.moveNodes();
  }

  moveNodes() {
    this.scrollStatus = false;
    const singleChildRect = this.singleChild.getBoundingClientRect();
    const singleCardWidth = singleChildRect.width;

    // calculate the translate value before loop
    const translateXVal = (singleCardWidth + this.offset) * this.moveValue;

    this.scrollNodeArray.forEach((node) => {
      node.style.transform = `translateX(${translateXVal}px)`;
    });

    this.adjustFocusNodes();

    setTimeout(() => {
      // if moveValue is more than or less than +/- 3, this means
      // we have moved out of bounds of the original scroll value container
      // so we need to go back to the original
      if (this.moveValue >= 3 || this.moveValue <= -3) {
        this.scrollNodeArray.forEach((node) => {
          // remove transition so that there is no animation when translating back to 0
          node.style.transition = `none`;
          node.style.transform = `translateX(${0}px)`;
        });

        // reset the current card and move value variables
        this.currentCardIndex = 1;
        this.moveValue = 0;
      }

      // then allow scroll
      this.scrollStatus = true;
    }, 500);

    // set the transform property back in
    this.scrollNodeArray.forEach(
      (node) => (node.style.transition = `transform 500ms ease-in`)
    );
  }

  adjustFocusNodes() {
    this.childNodeArray.forEach((childArray) => {
      // remove focus class for all nodes
      childArray.forEach((child) => {
        this.removeFocusNode(child);
      });

      // check for out of bounds indexes
      if (this.currentCardIndex <= -1) this.currentCardIndex = 2;
      else if (this.currentCardIndex >= 3) this.currentCardIndex = 0;

      // add focus to the card according to the current card index
      this.focusNode(childArray[this.currentCardIndex]);
    });
  }

  focusNode(node) {
    node.classList.remove("card_non_focus");
    node.classList.add("card_focus");
  }

  removeFocusNode(node) {
    node.classList.remove("card_focus");
    node.classList.add("card_non_focus");
  }
}

export default { ScrollView };
