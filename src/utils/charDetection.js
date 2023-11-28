const charDetection = (str) => {
  if (str.length < 3) return;
  return str[0].charCodeAt().toString().length === 4 ||
    str[1].charCodeAt().toString().length === 4 ||
    str[2].charCodeAt().toString().length === 4
    ? "uk"
    : "en";
};
export default charDetection;
