import { MDCTextField } from "@material/textfield";

export class SearchComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.textField = new MDCTextField(
      document.querySelector(".mdc-text-field")
    );
  }

  mount() {
    this.mountPoint.innerHTML = this.render();
    this.querySelectors();
  }

  render() {
    return `
      <div class="mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon">
        <i class="material-icons mdc-text-field__icon">search</i>
        <input type="text" id="tf-outlined" placeholder="Search..." class="mdc-text-field__input">
      </div>
    `;
  }
}
