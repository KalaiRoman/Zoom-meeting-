import axios from "axios";
const token=localStorage.getItem("zoom_token");
axios.interceptors.request.use(function (config) {
  if (config.url.search("/zoom/meeting/track-mail/")) {
    config.url=process.env.REACT_APP_LIVE_URL_BACKEND+config.url;
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
      Authorization:`bearer ${JSON.parse(token)}`
    };
    config.withCredentials = true;
    return config;
  }
  else{
    config.url=process.env.REACT_APP_LIVE_URL_BACKEND+config.url;
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
      Authorization:`bearer ${JSON.parse(token)}`
    };
    config.withCredentials = true;
    return config;
  }
    
  }, function (error) {
    return error;
  });

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return error;
});

const InstanceUrl=axios;
export default InstanceUrl;