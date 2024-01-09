import axios from "axios";

const baseUrl = "http://localhost:7777";

export const getBetHistory = async (dateFilter) => {
  try {
    const response = await axios.get(`${baseUrl}/api/betting/logs`, {
      params: {
        dateFilter: dateFilter,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while getting bet history.");
  }
};
