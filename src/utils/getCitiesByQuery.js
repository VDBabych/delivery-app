import axios from "axios";
import charDetection from "./charDetection";

const axiosInstance = axios.create({
  baseURL: "https://api.visicom.ua/data-api/5.0/",
  timeout: 10000,
});

const getCitiesByQuery = async (query) => {
  const { data } = await axiosInstance.get(
    `${charDetection(query)}/geocode.json?`,
    {
      params: {
        key: "bf4e28eb72bb819fc087aee5956fcd8a",
        categories: "adm_settlement",
        text: query,
      },
    }
  );
  const cities = data?.features?.map((el) => {
    if (el?.properties?.name) {
      return el.properties.name;
    }
  });
  if (cities) return [...new Set(cities)];
  return [];
};
export default getCitiesByQuery;
