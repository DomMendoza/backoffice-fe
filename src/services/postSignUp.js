import axios from "axios";

const baseUrl = "https://47.128.145.150";

export const postSignUp = async (username, password, user_id) => {
  const body = {
    username,
    password,
    user_id,
  };
  try {
    const response = await axios.post(
      `${baseUrl}/api/create/backoffice/admin`,
      body
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while signing up.");
  }
};
