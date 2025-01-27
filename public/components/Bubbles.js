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

    this.interval;
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

  startBubbles() {
    this.interval = setInterval(() => {
      this.moveBubbles();
    }, 10000);
  }

  stopBubbles() {
    clearInterval(this.interval);
  }
}

export default { Bubbles };
