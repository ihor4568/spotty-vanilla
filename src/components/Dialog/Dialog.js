import { MDCDialog } from "@material/dialog";
import dialogTemplate from "./Dialog.html";

export class DialogComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.dialogRiplePoint = this.mountPoint.querySelector(".dialog");
    this.dialogButton = this.mountPoint.querySelector(".dialog__button");
    this.login = this.mountPoint.querySelector(".dialog__login");
    this.password = this.mountPoint.querySelector(".dialog__password");
  }

  initMaterial() {
    this.dialog = new MDCDialog(this.dialogRiplePoint);
  }

  addEventListeners() {
    this.dialog.listen(
      "MDCDialog:closing",
      this.handleDialogClosing.bind(this)
    );
  }

  handleDialogClosing(e) {
    if (
      e.detail.action !== "accept" ||
      this.login.value !== "admin" ||
      this.password.value !== "admin"
    ) {
      this.dialog.open();
    }
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
    this.dialog.open();
    this.addEventListeners();
  }

  render() {
    return dialogTemplate();
  }
}
