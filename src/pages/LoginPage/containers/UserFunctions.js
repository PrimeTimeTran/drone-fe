import axios from "axios";

export const register = (newUser) => {
  return axios
    .post(process.env.REACT_APP_SERVER_URL + "/users", newUser)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("userToken", token);
      console.log("Registered!");
    });
};

export const login = (user) => {
  return axios
    .post(process.env.REACT_APP_SERVER_URL + "/users/login", user)
    .then((res) => {
      localStorage.setItem("userToken", res.data.token);
      return res.data.token;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signinWithAuthProvider = async (email) => {
  return axios
    .post(process.env.REACT_APP_SERVER_URL + "/users/auth-login", { email })
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("userToken", token);
      return true
    })
    .catch((err) => {
      console.log(err);
    });
};
