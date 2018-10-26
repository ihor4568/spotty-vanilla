import MySongsViewTpl from "./MySongsViewRow.html";

export class MySongsViewRowComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
  }

  render() {
    return MySongsViewTpl(this.props);
  }
}
