import { MDCDrawer } from "@material/drawer";
import Sidebar from "./Sidebar.html";

export class SidebarComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
  }

  render() {
    return Sidebar(this.props);
  }
}
