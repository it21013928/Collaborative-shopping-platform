import axios from "axios";

export const getProducts = async () => {
  return axios
    .get("http://localhost:8002/product")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
