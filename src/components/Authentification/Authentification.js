import { MDCTextField } from "@material/textfield";
import { MDCRipple } from "@material/ripple";
import { MDCTabBar } from "@material/tab-bar";

import { AuthentificationService } from "../../services/AuthentificationService";
import authentificationTemplate from "./Authentification.html";

export class AuthentificationComponent {
  constructor(mountPoint, props = {}) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.email = this.mountPoint.querySelector(".auth__email");
    this.password = this.mountPoint.querySelector(".auth__password");
    this.name = this.mountPoint.querySelector(".auth__name");
    this.next = this.mountPoint.querySelector(".auth__button");
    this.tabBar = this.mountPoint.querySelector(".auth__tab-bar");
    this.tabSignIn = this.mountPoint.querySelector(".auth__tab-sign-in");
    this.tabSignUp = this.mountPoint.querySelector(".auth__tab-sign-up");
    this.input = this.mountPoint.querySelectorAll(".auth__input");
  }

  initMaterial() {
    this.emailPoint = new MDCTextField(this.email);
    this.passwordPoint = new MDCTextField(this.password);
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
      this.name.classList.add("auth__name_disable");
      this.tabSignIn.classList.add("auth__input--active");
      this.tabSignUp.classList.remove("auth__input--active");
      this.input[0].value = "";
      this.input[1].value = "";
      this.input[2].value = "";
      this.next.innerText = "sign in";
    }
  }

  handleSignUpBtnClick() {
    if (this.tabSignUp.classList.contains("auth__input--active") === false) {
      this.name.classList.remove("auth__name_disable");
      this.tabSignUp.classList.add("auth__input--active");
      this.tabSignIn.classList.remove("auth__input--active");
      this.input[0].value = "";
      this.input[1].value = "";
      this.input[2].value = "";
      this.next.innerText = "sign up";
    }
  }

  handleNextClick() {
    if (this.next.innerText === "SIGN IN") {
      AuthentificationService.signIn(
        this.input[0].value,
        this.input[2].value,
        res => {
          document.write(res);
        }
      );
      window.location.reload();
    } else {
      AuthentificationService.signUp(
        this.input[0].value,
        this.input[2].value,
        this.input[1].value
      );
    }
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
