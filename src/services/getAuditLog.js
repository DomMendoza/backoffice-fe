import axios from "axios";

const baseUrl = "https://47.128.145.150";

export const getAuditLog = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/get/audit`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occured while getting the recent activities.");
  }
};
