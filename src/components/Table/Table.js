import _ from "lodash";
import { MDCRipple } from "@material/ripple";

import tableTemplate from "./Table.html";
import { DotsMenuComponent } from "../DotsMenu/DotsMenu";

export class TableComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.state = {
      data: this.props.data,
      initialData: Array.from(this.props.data),
      orderTypes: ["initial", "asc", "desc"],
      currentOrderTypeIndex: 1,
      columnName: ""
    };

    this.handleOrderClick = this.handleOrderClick.bind(this);
  }

  getColumnName(target) {
    if (target.tagName === "BUTTON") {
      return target.firstElementChild.attributes.data.value;
    }
    if (target.tagName === "svg") {
      return target.attributes.data.value;
    }
    return null;
  }

  handleOrderClick(e) {
    const { data, initialData, orderTypes, currentOrderTypeIndex } = this.state;

    this.state.columnName = this.getColumnName(e.target);
    if (!this.state.columnName) {
      return;
    }

    if (currentOrderTypeIndex === 0) {
      this.state.data = initialData;
    } else {
      this.state.data = _.orderBy(
        data,
        this.state.columnName,
        orderTypes[currentOrderTypeIndex]
      );
    }

    this.mount();
  }

  querySelectors() {
    const { mountPoint } = this;
    this.tableHead = mountPoint.querySelector(".table__head");
    this.iconButtonRipple = mountPoint.querySelectorAll(".mdc-icon-button");
    this.dotsMenu = mountPoint.querySelectorAll(".table__td_more");
    this.orderIcon = mountPoint.querySelector(
      `.table__th-icon_${this.state.columnName}`
    );
  }

  addEventListeners() {
    this.tableHead.addEventListener("click", this.handleOrderClick);
  }

  setupOrderIconDisplay() {
    const { currentOrderTypeIndex } = this.state;

    if (!this.state.columnName) {
      return;
    }

    if (currentOrderTypeIndex === 1) {
      this.orderIcon.classList.add("table__th-icon_order_asc");
    } else if (currentOrderTypeIndex === 2) {
      this.orderIcon.classList.add("table__th-icon_order_desc");
    }

    this.changeCurrentOrderTypeIndex();
  }

  changeCurrentOrderTypeIndex() {
    if (this.state.currentOrderTypeIndex === 2) {
      this.state.currentOrderTypeIndex = 0;
      return;
    }
    this.state.currentOrderTypeIndex += 1;
  }

  mountChildren() {
    Array.from(this.dotsMenu).forEach(item => {
      this.dotsMenu = new DotsMenuComponent(item, {
        items: [
          { name: "Remove from my songs", handler: () => {} },
          { name: "Share", handler: () => {} }
        ]
      });
      this.dotsMenu.mount();
    });
  }

  initMaterial() {
    Array.from(this.iconButtonRipple).forEach(item => {
      this.iconButtonRipple = new MDCRipple(item);
      this.iconButtonRipple.unbounded = true;
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.addEventListeners();
    this.setupOrderIconDisplay();
    this.initMaterial();
    this.mountChildren();
  }

  render() {
    return tableTemplate({ data: this.state.data });
  }
}
