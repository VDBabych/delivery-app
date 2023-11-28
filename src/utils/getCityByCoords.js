import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.distancematrix.ai/maps/api/",
  timeout: 10000,
});

const getCityByCoords = async (coords) => {
  const { data } = await axiosInstance.get("geocode/json?", {
    params: {
      latlng: `${coords.latitude},${coords.longitude}`,
      key: "HiiYb9uEVcsrI0yzuZIA56udNmX1STXI3uKrgO9ihzNDyaPYBFJRoODLjP2NUlY9",
      language: "uk",
    },
  });
  const city = data?.result?.[0]?.address_components?.find((el) =>
    el?.types?.includes("locality")
  )?.long_name;
  return city;
};
export default getCityByCoords;
