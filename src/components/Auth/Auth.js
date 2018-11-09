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
    this.passwords = this.mountPoint.querySelectorAll(".auth__password");
    this.name = this.mountPoint.querySelector(".auth__name");
    this.next = this.mountPoint.querySelector(".auth__button");
    this.tabBar = this.mountPoint.querySelector(".auth__tab-bar");
    this.tabSignIn = this.mountPoint.querySelector(".auth__tab-sign-in");
    this.tabSignUp = this.mountPoint.querySelector(".auth__tab-sign-up");
    this.errorPoint = this.mountPoint.querySelector(".auth__error");
    this.emailInput = this.mountPoint.querySelector(".auth__input_email");
    this.nameInput = this.mountPoint.querySelector(".auth__input_email");
    this.passwordInput = this.mountPoint.querySelector(".auth__input_password");
    this.confirmPasswordInput = this.mountPoint.querySelector(
      ".auth__input_confirm-password"
    );
  }

  initMaterial() {
    this.emailPoint = new MDCTextField(this.email);
    Array.from(this.passwords).forEach(el => {
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
    if (!this.tabSignIn.classList.contains("auth__input--active")) {
      this.name.classList.add("auth__elem_disable");
      this.passwords[1].classList.add("auth__elem_disable");
      this.tabSignIn.classList.add("auth__input--active");
      this.tabSignUp.classList.remove("auth__input--active");
      this.next.innerText = "SIGN IN";
      this.clearInputs();
    }
  }

  handleSignUpTabClick() {
    if (!this.tabSignUp.classList.contains("auth__input--active")) {
      this.name.classList.remove("auth__elem_disable");
      this.passwords[1].classList.remove("auth__elem_disable");
      this.tabSignUp.classList.add("auth__input--active");
      this.tabSignIn.classList.remove("auth__input--active");
      this.next.innerText = "SIGN UP";
      this.clearInputs();
    }
  }

  clearInputs() {
    this.emailInput.value = "";
    this.nameInput.value = "";
    this.passwordInput.value = "";
    this.confirmPasswordInput.value = "";
    this.errorPoint.innerText = "";
  }

  handleNextClick() {
    if (this.next.innerText === "SIGN IN") {
      AuthService.signIn(this.emailInput.value, this.passwordInput.value).catch(
        this.handleAlert.bind(this)
      );
    }
    if (this.next.innerText === "SIGN UP") {
      if (this.passwordInput.value === this.confirmPasswordInput.value) {
        AuthService.signUp(
          this.emailInput.value,
          this.nameInput.value,
          this.passwordInput.value
        ).catch(this.handleAlert.bind(this));
      } else {
        this.errorPoint.innerText = "Error: Passwords do not match.";
      }
    }
  }

  handleAlert(err) {
    this.errorPoint.innerText = err;
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
