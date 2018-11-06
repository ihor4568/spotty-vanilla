export function findAllOccurrences(array, string) {
  const indices = [];
  array.forEach((item, index) => {
    if (item.indexOf(string) !== -1) {
      indices.push(index);
    }
  });
  return indices;
}

export function retrieveArrayObjectsFields(array, field) {
  return array.map(item => item[field].toLowerCase());
}
