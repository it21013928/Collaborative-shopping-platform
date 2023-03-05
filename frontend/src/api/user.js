import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const myAccount = async (token) => {
  axios
    .get("/api/users/me", setAuthToken(token))
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      if (error.response.status === 401) {
        localStorage.removeItem("token"); // delete token from local storage
        return null;
      }
    });
};
