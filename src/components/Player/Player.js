import playerTemplate from "./Player.html";

export class PlayerComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
  }

  render() {
    return playerTemplate();
  }
}
