import ratingTemplate from "./Rating.html";

export class RatingComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.audioRating = 0;
  }

  querySelectors() {
    this.starsContainer = document.querySelector(".audio-rating__stars");
    this.stars = this.mountPoint.getElementsByClassName("audio-rating__star");
    this.starsArray = Array.from(this.stars);
  }

  getRating(e) {
    const { target } = e;
    this.starsArray.forEach((item, i) => {
      this.starsArray[i].classList.remove("audio-rating__star_selected");
    });
    target.classList.add("audio-rating__star_selected");
    this.audioRating = target.getAttribute("data-about");
  }

  addEventListeners() {
    this.starsContainer.addEventListener("click", this.getRating.bind(this));
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
