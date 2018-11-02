import notFoundTemplate from "./NotFound.html";

export class NotFoundComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
  }

  render() {
    return notFoundTemplate();
  }
}
