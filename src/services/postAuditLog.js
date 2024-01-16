import axios from "axios";

const baseUrl = "https://47.128.145.150";

export const postAuditLog = async (user_id, username, action, type) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/save/audit?user_id=${user_id}&username=${username}&action=${action}&type=${type}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while registering an action.");
  }
};
//TODO: implement posting of recent activities.
