import aboutTemplate from "./About.html";

export class AboutComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
  }

  render() {
    return aboutTemplate();
  }
}
