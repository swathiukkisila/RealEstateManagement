import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};

export const listPageLoader = async ({ request }) => {
  const query = request.url.split("?")[1];
  const postResponse = await apiRequest("/posts?" + query); // Directly await the promise
  return { postResponse }; // Return the resolved data
};

export const profilePageLoader = async () => {
  const postResponse = await apiRequest("/users/profilePosts"); // Directly await the promise
  const chatResponse = await apiRequest("/chats"); // Await the chat request as well
  return { postResponse, chatResponse }; // Return resolved data
};
