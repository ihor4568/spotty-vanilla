export class PlayerComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
  }

  render() {
    return `
      <div>
        Content
      </div>
    `;
  }
}
