import aboutTpl from "./About.html";

export class About {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
  }

  render() {
    return aboutTpl();
  }
}
