import axios from "axios";

export const register = (newUser) => {
  return axios
    .post(process.env.REACT_APP_SERVER_URL + "/users/register", newUser)
    .then((res) => {
      console.log("Registered!");      
    });
};

export const login = (user) => {
  return axios
    .post(process.env.REACT_APP_SERVER_URL + "/users/login", user)
    .then((res) => {
      localStorage.setItem("usertoken", res.data.data);
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
