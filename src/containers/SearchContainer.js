export class SearchContainer {
  constructor(props) {
    this.props = props;
    this.state = {
      currentTab: null
    };
  }

  changeCurrentTab(tab) {
    this.state.currentTab = tab;
  }
}
