import { MDCDialog } from "@material/dialog";
import licenseDialogTemplate from "./LicenseDialog.html";

export class LicenseDialogComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.dialogPopup = this.mountPoint.querySelector(".dialog");
  }

  initMaterial() {
    this.dialog = new MDCDialog(this.dialogPopup);
  }

  handleOpen() {
    this.dialog.open();
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
    this.handleOpen();
  }

  render() {
    return licenseDialogTemplate(this.props);
  }
}
