import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const login = async (email, password) => {
  try {
    const response = await axios.post("/users/login", {
      email,
      password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    setAuthToken(token);
    return response.data.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerAccount = async (data) => {
  try {
    const response = await axios.post("/users/register", data);
    console.log(response.data);
    if (response.status === 200) {
      window.location.reload();
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
