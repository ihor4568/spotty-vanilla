import mySongsTableTemplate from "./MySongsTable.html";

export class MySongsTableComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
  }

  render() {
    return mySongsTableTemplate({ tableData: this.props.tableData });
  }
}
