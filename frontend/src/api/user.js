import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const myAccount = async (token) => {
  return axios
    .get("/users/me", setAuthToken(token))
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

export const getUserId = async (token) => {
  return axios
    .get("/users/id", setAuthToken(token))
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

export const getUserEmailPhoneById = async (id) => {
  return axios
    .get("/users/email-phone")
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

export const updateUser = async (userData) => {
  const token = localStorage.getItem("token");
  setAuthToken(token);

  return axios
    .patch(`/users/me`, userData)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const approveSeller = async (id) => {
  const token = localStorage.getItem("token");
  setAuthToken(token);

  const userData = {id: id};

  return axios
    .patch(`/users/approve-seller`, userData)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const downgradeUser = async (id) => {

  const userData = {id: id};

  return axios
    .patch(`/users/downgrade-user`, userData)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getCustomers = async (token) => {
  return axios
    .get("/users/customers", setAuthToken(token))
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

export const getSellers = async (token) => {
  return axios
    .get("/users/sellers", setAuthToken(token))
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

export const getPendingSellers = async (token) => {
  return axios
    .get("/users/pending-sellers", setAuthToken(token))
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

export const getModerators = async (token) => {
  return axios
    .get("/users/moderators", setAuthToken(token))
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
