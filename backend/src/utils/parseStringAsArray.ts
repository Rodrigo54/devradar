export default function parseStringAsArray(stringToArray: string) {
  return stringToArray.split(',').map(value => value.trim());
}
