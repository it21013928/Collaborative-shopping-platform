import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    // If token is present, set the Authorization header
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // If no token is present, remove the Authorization header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
