import customFetch from "./customFetch";

const deleteResource = async (url, resourceId) => {
  const finalUrl = `${url}/${resourceId}`;
  const options = {
    method: "DELETE",
  };
  const deletedResource = customFetch(finalUrl, options);
  return deletedResource;
};

export default deleteResource;
