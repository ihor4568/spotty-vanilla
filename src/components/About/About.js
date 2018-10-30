import aboutTemplate from "./About.html";

export class AboutComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.developers = [
      "WOLFRIEND",
      "lubovgribiniyk",
      "yevheniiIvanise",
      "pavelbaranchuk",
      "gamesminer",
      "IYeskov",
      "kozak-iz-kh",
      "OlegShynkarenko"
    ];
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
  }

  render() {
    return aboutTemplate({ developers: this.developers });
  }
}
