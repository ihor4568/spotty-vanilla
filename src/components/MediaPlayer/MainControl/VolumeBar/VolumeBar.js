import { MDCSlider } from "@material/slider";

import volumeBarTemplate from "./VolumeBar.html";

export class VolumeBarComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
    this.defaultView = this.defaultView.bind(this);
    // this.defaultView = this.defaultView.bind(this);
    // this.changeVolumeLevel = this.changeVolumeLevel.bind(this);
    // this.mouseDownHandler = this.mouseDownHandler.bind(this);
    // this.mouseUpHandler = this.mouseUpHandler.bind(this);
    // this.volumeIconHandler = this.volumeIconHandler.bind(this);
  }

  defaultView() {
    this.thumb.style.setProperty(
      "transform",
      `translateX(57.6px) translateX(-50%)`
    );
    this.track.style.setProperty("transform", `scaleX(0.5)`);
  }

  initMaterial() {
    this.slider = new MDCSlider(document.querySelector(".volume-bar__slider"));
    this.defaultView();
  }

  querySelectors() {
    this.thumb = this.mountPoint.querySelector(".volume-bar__thumb-container");
    this.track = this.mountPoint.querySelector(".volume-bar__track");
  }

  addEventListeners() {}

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();

    this.initMaterial();

    this.addEventListeners();
  }

  render() {
    return volumeBarTemplate();
  }
}
