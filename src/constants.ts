const isDevelopment = /localhost/.test(window.location.toString());

const constants = {
  baseUrl: isDevelopment ? "http://localhost:8002/api" : "https://content-manager-backend.herokuapp.com/api",
};

export default constants;
