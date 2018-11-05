export function findAllOccurrences(array, string) {
  const indices = [];
  let index = array.indexOf(string);
  while (index !== -1) {
    indices.push(index);
    index = array.indexOf(string, index + 1);
  }
  return indices;
}
