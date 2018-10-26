import ratingHTML from "./RatingComponent.html";

export class RatingComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.stars = document.getElementsByClassName("audioRating__star");
    this.arr = Array.from(this.stars);
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
  }

  render() {
    return ratingHTML();
  }
}
