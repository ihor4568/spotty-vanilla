export function findAllOccurrences(array, string) {
  const indices = [];
  let index = array.indexOf(string);
  while (index !== -1) {
    indices.push(index);
    index = array.indexOf(string, index + 1);
  }
  return indices;
}

export function getPathname(object) {
  return object.location.pathname.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
}
