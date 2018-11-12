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
    this.sortStars();
    target.classList.add("audio-rating__star_selected");
    this.audioRating = target.getAttribute("data-about");
    MusicService.setNewRating(this.userUid, this.songId, this.audioRating);
  }

  sortStars() {
    this.starsArray.forEach((item, i) => {
      this.starsArray[i].classList.remove("audio-rating__star_selected");
    });
  }

  addEventListeners() {
    this.starsContainer.addEventListener("click", this.getRating.bind(this));
  }

  async setInfo({ songId }) {
    const userUid = await AuthService.getCurrentUser().uid;
    const arrayRating = await MusicService.getSongRating(userUid);

    this.songId = songId;
    this.userUid = userUid;

    this.sortStars();
    arrayRating.forEach((item, i) => {
      if (item === songId) {
        this.starsArray.forEach((star, k) => {
          if (this.starsArray[k].dataset.about === arrayRating[i + 1]) {
            this.starsArray[k].classList.add("audio-rating__star_selected");
            this.audioRating = arrayRating[i + 1];
          } else {
            this.starsArray[k].classList.remove("audio-rating__star_selected");
          }
        });
      } else if (i === arrayRating.length) {
        this.sortStars();
      }
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
