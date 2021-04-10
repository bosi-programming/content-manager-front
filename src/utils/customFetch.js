import constants from "../constants";

const customFetch = async (url, options, body) => {
  const token = localStorage.getItem("token");

  const headers =
    options && options.headers
      ? { ...options.headers, "x-access-token": token }
      : {
          "x-access-token": token,
        };

  const response = await fetch(`${constants.baseUrl}/${url}`, {
    ...options,
    headers,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    console.log(message);
  }

  const data = await response.json();
  return data;
};

export default customFetch;
