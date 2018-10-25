export class PlayerComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
  }

  render() {
    return `
      <div class="mdc-typography--headline5">
        Player
      </div>
    `;
  }
}
