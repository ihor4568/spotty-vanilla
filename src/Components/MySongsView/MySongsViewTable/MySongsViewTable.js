import { MySongsViewRowComponent } from "../MySongsViweRow/MySongsViewRow";
import MySongsViewTpl from "./MySongsViewTable.html";
export class MySongsViewTableComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.rowPlace1 = this.mountPoint.querySelector(".mySongsTable__row1");
    this.rowPlace2 = this.mountPoint.querySelector(".mySongsTable__row2");
  }

  mountChildren() {
    this.row1 = new MySongsViewRowComponent(this.rowPlace1);
    this.row1.mount();
    this.row2 = new MySongsViewRowComponent(this.rowPlace2);
    this.row2.mount();
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.mountChildren();
  }

  render() {
    return MySongsViewTpl();
  }
}
