import ratingTemplate from "./RatingComponent.html";

export class RatingComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.audioRating = 0;
  }

  querySelectors() {
    this.starsContainer = document.querySelector(".audio-rating__stars");
    this.stars = this.mountPoint.getElementsByClassName("audio-rating__star");
    this.arr = Array.from(this.stars);
  }

  addEventListeners() {
    this.starsContainer.addEventListener("click", e => {
      const a = e.target;
      this.arr.forEach((item, i) => {
        this.arr[i].classList.remove("selected");
      });
      a.classList.add("selected");
      this.audioRating = a.getAttribute("about");
    });
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.addEventListeners();
  }

  render() {
    return ratingTemplate();
  }
}
