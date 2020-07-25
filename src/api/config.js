import Axios from "axios";
const API_ROOT = process.env.REACT_APP_SERVER_URL

let ApiHelper

const api = () => {
  const token = localStorage.getItem("userToken");
  if (ApiHelper && token !== null) { return ApiHelper }

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ''
    }
  }

  ApiHelper = {
    get: (url, options = {}) =>
      Axios.get(API_ROOT + url, { ...defaultOptions, ...options }),
    post: (url, data, options = {}) =>
      Axios.post(API_ROOT + url, data, { ...defaultOptions, ...options }),
    put: (url, data, options = {}) =>
      Axios.put(API_ROOT + url, data, { ...defaultOptions, ...options }),
    delete: (url, options = {}) =>
      Axios.delete(API_ROOT + url, { ...defaultOptions, ...options })
  }
  return ApiHelper
}

export default api