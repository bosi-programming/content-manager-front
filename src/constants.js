const isDevelopment = /localhost/.test(window.location);

const constants = {
  baseUrl: isDevelopment ? "http://localhost:3000/api" : "",
};

export default constants;
