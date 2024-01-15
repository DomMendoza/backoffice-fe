import axios from "axios";

const baseUrl = "https://47.128.145.150";

export const postLogin = async (username, password) => {
  const body = {
    username,
    password,
  };
  try {
    const response = await axios.post(
      `${baseUrl}/api/login/backoffice/admin`,
      body
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while logging in.");
  }
};
