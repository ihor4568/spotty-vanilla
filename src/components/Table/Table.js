import _ from "lodash";
import { MDCRipple } from "@material/ripple";

import tableTemplate from "./Table.html";
import { DotsMenuComponent } from "../DotsMenu/DotsMenu";

const INITIAL_ORDER = 0;
const ASC_ORDER = 1;
const DESC_ORDER = 2;

const ORDER_TYPES = {
  [INITIAL_ORDER]: "initial",
  [ASC_ORDER]: "asc",
  [DESC_ORDER]: "desc"
};

export class TableComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.state = {
      data: this.fillObjectsWithNumbersAsIndices(this.props.data),
      initialData: this.fillObjectsWithNumbersAsIndices(this.props.data),
      currentOrderTypeIndex: 1,
      columnName: ""
    };

    this.handleOrderClick = this.handleOrderClick.bind(this);
  }

  fillObjectsWithNumbersAsIndices(array) {
    return array.map((item, index) =>
      Object.assign({}, array[index], { number: index })
    );
  }

  getColumnName(target) {
    if (target.tagName === "SPAN") {
      return target.firstElementChild.attributes.data.value;
    }
    if (target.tagName === "I") {
      return target.attributes.data.value;
    }
    return null;
  }

  handleOrderClick(e) {
    const { data, initialData, currentOrderTypeIndex } = this.state;

    this.state.columnName = this.getColumnName(e.target);
    if (!this.state.columnName) {
      return;
    }

    if (currentOrderTypeIndex === INITIAL_ORDER) {
      this.state.data = initialData;
    } else {
      this.state.data = _.orderBy(
        data,
        this.state.columnName,
        ORDER_TYPES[currentOrderTypeIndex].toLowerCase()
      );
    }

    this.mount();
  }

  querySelectors() {
    const { mountPoint } = this;
    this.tableHead = mountPoint.querySelector(".table__head");
    this.iconButtonRipples = mountPoint.querySelectorAll(".material-icons");
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

    if (currentOrderTypeIndex === ASC_ORDER) {
      this.orderIcon.classList.add("table__th-icon_order_asc");
    } else if (currentOrderTypeIndex === DESC_ORDER) {
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
    Array.from(this.iconButtonRipples).forEach(item => {
      const iconButtonRipple = new MDCRipple(item);
      iconButtonRipple.unbounded = true;
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
