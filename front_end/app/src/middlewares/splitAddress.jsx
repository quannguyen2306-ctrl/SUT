export default function splitAddress(address) {
  const splitted = address.split(", ");
  return `${splitted[0]}, ${splitted[2]}`;
}