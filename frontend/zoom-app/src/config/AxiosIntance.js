import axios from "axios";

const token=localStorage.getItem("zoom_token");
axios.interceptors.request.use(function (config) {
    config.url=process.env.REACT_APP_LOCAL_URL_BACKEND+config.url;
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
      Authorization:`bearer ${JSON.parse(token)}`
    };
    config.withCredentials = true;

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

const InstanceUrl=axios;
export default InstanceUrl;