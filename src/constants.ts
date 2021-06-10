const isDevelopment = /localhost/.test(window.location.toString());

const constants = {
  baseUrl: isDevelopment ? "http://localhost:3000/api" : "https://content-manager-backend.herokuapp.com/api",
};

export default constants;
