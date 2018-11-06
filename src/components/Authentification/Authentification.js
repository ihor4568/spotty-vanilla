import { MDCTextField } from "@material/textfield";
import { MDCRipple } from "@material/ripple";
import { MDCTabBar } from "@material/tab-bar";

import authentificationTemplate from "./Authentification.html";

export class AuthentificationComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.email = this.mountPoint.querySelector(".auth__email");
    this.password = this.mountPoint.querySelectorAll(".auth__password");
    this.name = this.mountPoint.querySelector(".auth__name");
    this.next = this.mountPoint.querySelector(".auth__button");
    this.tabBar = this.mountPoint.querySelector(".auth__tab-bar");
    this.tabSignIn = this.mountPoint.querySelector(".auth__tab-sign-in");
    this.tabSignUp = this.mountPoint.querySelector(".auth__tab-sign-up");
    this.input = this.mountPoint.querySelectorAll(".auth__input");
  }

  initMaterial() {
    this.emailPoint = new MDCTextField(this.email);
    Array.from(this.password).forEach(el => {
      this.passwordPoint = new MDCTextField(el);
    });
    this.namePoint = new MDCTextField(this.name);
    this.nextPoint = new MDCRipple(this.next);
    this.tabBarPoint = new MDCTabBar(this.tabBar);
  }

  addEventListeners() {
    this.tabSignIn.addEventListener(
      "click",
      this.handleSignInBtnClick.bind(this)
    );
    this.tabSignUp.addEventListener(
      "click",
      this.handleSignUpBtnClick.bind(this)
    );
    this.next.addEventListener("click", this.handleNextClick.bind(this));
  }

  handleSignInBtnClick() {
    if (this.tabSignIn.classList.contains("auth__input--active") === false) {
      this.name.classList.add("auth__elem_disable");
      this.password[1].classList.add("auth__elem_disable");
      this.tabSignIn.classList.add("auth__input--active");
      this.tabSignUp.classList.remove("auth__input--active");
      this.input[0].value = "";
      this.input[1].value = "";
      this.input[2].value = "";
      this.input[3].value = "";
      this.next.innerText = "sign in";
    }
  }

  handleSignUpBtnClick() {
    if (this.tabSignUp.classList.contains("auth__input--active") === false) {
      this.name.classList.remove("auth__elem_disable");
      this.password[1].classList.remove("auth__elem_disable");
      this.tabSignUp.classList.add("auth__input--active");
      this.tabSignIn.classList.remove("auth__input--active");
      this.input[0].value = "";
      this.input[1].value = "";
      this.input[2].value = "";
      this.input[3].value = "";

      this.next.innerText = "sign up";
    }
  }

  handleNextClick() {
    window.location.reload();
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
    this.addEventListeners();
  }

  render() {
    return authentificationTemplate();
  }
}
