import { MDCDialog } from "@material/dialog";
import licenseDialogTemplate from "./LicenseDialog.html";

export class LicenseDialogComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.dialogPopup = this.mountPoint.querySelector(".license-dialog");
    this.info = this.mountPoint.querySelector(".license-dialog__info");
    this.url = this.mountPoint.querySelector(".license-dialog__url");
  }

  initMaterial() {
    this.dialog = new MDCDialog(this.dialogPopup);
  }

  handleOpen() {
    this.dialog.open();
  }

  setInfo({ licenseInfo, licenseURL }) {
    this.info.innerHTML = licenseInfo;
    this.url.href = licenseURL;
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
  }

  render() {
    return licenseDialogTemplate();
  }
}
