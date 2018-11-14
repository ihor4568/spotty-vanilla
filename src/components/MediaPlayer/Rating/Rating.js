import ratingTemplate from "./Rating.html";

import { AuthService } from "../../../services/AuthService";
import { MusicService } from "../../../services/MusicService";

export class RatingComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.audioRating = 0;
    this.songId = "";
    this.userUid = "";
  }

  querySelectors() {
    this.starsContainer = document.querySelector(".audio-rating__stars");
    this.stars = this.mountPoint.getElementsByClassName("audio-rating__star");
    this.starsArray = Array.from(this.stars);
  }

  getRating(e) {
    const { target } = e;
    this.removeStars();
    target.classList.add("audio-rating__star_selected");
    this.audioRating = target.getAttribute("data-about");
    MusicService.setNewRating(this.userUid, this.songId, this.audioRating);
  }

  removeStars() {
    this.starsArray.forEach((item, i) => {
      this.starsArray[i].classList.remove("audio-rating__star_selected");
    });
  }

  addEventListeners() {
    this.starsContainer.addEventListener("click", this.getRating.bind(this));
  }

  async setInfo({ songId }) {
    const userUid = await AuthService.getCurrentUser().uid;
    const rating = await MusicService.getSongRating(userUid);
    const value = rating[songId];

    this.songId = songId;
    this.userUid = userUid;

    this.removeStars();

    if (value) {
      this.starsArray.forEach((item, i) => {
        if (this.starsArray[i].dataset.about === value) {
          this.starsArray[i].classList.add("audio-rating__star_selected");
          this.audioRating = value;
        } else {
          this.starsArray[i].classList.remove("audio-rating__star_selected");
        }
      });
    }
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
