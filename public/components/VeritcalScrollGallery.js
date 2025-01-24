class VerticalScrollGallery {
  constructor(nodeArray, offsetY) {
    this.nodeArray = nodeArray;
    this.size = nodeArray.length;
    this.offsetY = offsetY;

    const firstNodeRect = nodeArray[0].getBoundingClientRect();

    this.staticPos = document.documentElement.scrollTop + firstNodeRect.top;
    this.nodeSize = firstNodeRect.height;
  }

  fullscreenNode() {
    // 1. Get original card "projfs" attribute and getElementById using that attirbute (which will be the fs card)
    
    // 2. Show fs card
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

export default { VerticalScrollGallery };
