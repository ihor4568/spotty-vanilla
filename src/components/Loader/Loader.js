import loaderTemplate from "./Loader.html";

export class Loader {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
  }

  render() {
    return loaderTemplate();
  }
}
