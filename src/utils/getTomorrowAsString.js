const ONE_DAY_IN_MILLISECONDS = 86400000;
const getTomorrowAsString = () => {
  const tomorrow = new Date(new Date().getTime() + ONE_DAY_IN_MILLISECONDS);
  return (
    tomorrow.getFullYear() +
    "-" +
    (tomorrow.getMonth() + 1) +
    "-" +
    (tomorrow.getDate() > 9 ? tomorrow.getDate() : "0" + tomorrow.getDate())
  );
};
export default getTomorrowAsString;
