import { MDCTextField } from "@material/textfield";
import { MDCRipple } from "@material/ripple";
import { MDCTabBar } from "@material/tab-bar";

import { AuthService } from "../../services/AuthService";

import authTemplate from "./Auth.html";

export class AuthComponent {
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
    this.erorPoint = this.mountPoint.querySelector(".auth__eror");
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
      this.handleSignInTabClick.bind(this)
    );
    this.tabSignUp.addEventListener(
      "click",
      this.handleSignUpTabClick.bind(this)
    );
    this.next.addEventListener("click", this.handleNextClick.bind(this));
  }

  handleSignInTabClick() {
    if (this.tabSignIn.classList.contains("auth__input--active") === false) {
      this.name.classList.add("auth__elem_disable");
      this.password[1].classList.add("auth__elem_disable");
      this.tabSignIn.classList.add("auth__input--active");
      this.tabSignUp.classList.remove("auth__input--active");
      this.input[0].value = "";
      this.input[1].value = "";
      this.input[2].value = "";
      this.input[3].value = "";
      this.erorPoint.innerText = "";
      this.next.innerText = "SIGN IN";
    }
  }

  handleSignUpTabClick() {
    if (this.tabSignUp.classList.contains("auth__input--active") === false) {
      this.name.classList.remove("auth__elem_disable");
      this.password[1].classList.remove("auth__elem_disable");
      this.tabSignUp.classList.add("auth__input--active");
      this.tabSignIn.classList.remove("auth__input--active");
      this.input[0].value = "";
      this.input[1].value = "";
      this.input[2].value = "";
      this.input[3].value = "";
      this.erorPoint.innerText = "";
      this.next.innerText = "SIGN UP";
    }
  }

  handleNextClick() {
    if (this.next.innerText === "SIGN IN") {
      AuthService.signIn(this.input[0].value, this.input[2].value, err =>
        this.handleAlert.call(this, err)
      );
    }
    if (this.next.innerText === "SIGN UP") {
      if (this.input[2].value === this.input[3].value) {
        AuthService.signUp(
          this.input[0].value,
          this.input[2].value,
          this.input[1].value,
          err => this.handleAlert.call(this, err)
        );
      } else {
        this.erorPoint.innerText = "auth/passwords must be identical";
      }
    }
  }

  handleAlert(err) {
    this.erorPoint.innerText = err;
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
    this.initMaterial();
    this.addEventListeners();
  }

  render() {
    return authTemplate();
  }
}
