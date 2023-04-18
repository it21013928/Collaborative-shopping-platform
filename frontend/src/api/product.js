import axios from "axios";

export const getProducts = async () => {
  return axios
    .get("/products")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
