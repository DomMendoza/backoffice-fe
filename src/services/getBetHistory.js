import axios from "axios";

const baseUrl = "https://47.128.145.150";

export const getBetHistory = async (dateFilter, dateEnd) => {
  try {
    const response = await axios.get(`${baseUrl}/api/betting/logs`, {
      params: {
        dateFilter: dateFilter,
        dateEnd: dateEnd,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while getting bet history.");
  }
};
