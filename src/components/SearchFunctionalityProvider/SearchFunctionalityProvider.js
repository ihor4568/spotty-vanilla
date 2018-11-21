export class SearchFunctionalityProviderComponent {
  findAllOccurrences(array, string) {
    const indices = [];

    array.forEach((item, index) => {
      if (item.indexOf(string) !== -1) {
        indices.push(index);
      }
    });

    return indices;
  }

  retrieveArrayObjectsFields(array, field) {
    return array.map(item => item[field].toLowerCase());
  }

  handleSearchQuery(term) {
    const { initialData } = this.state;
    if (!initialData) {
      return;
    }

    const searchableData = this.retrieveArrayObjectsFields(initialData, "name");

    const indices = this.findAllOccurrences(searchableData, term);

    this.updateFilteredData(term, indices);
  }

  updateFilteredData(term, indices) {
    const { initialData, filteredData } = this.state;

    const nextFilteredData =
      (!term && initialData) || indices.map(item => initialData[item]);
    const componentShouldUpdate = filteredData !== nextFilteredData;

    if (componentShouldUpdate) {
      this.state.filteredData = nextFilteredData;
    }
  }
}
