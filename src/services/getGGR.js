import axios from "axios";

const baseUrl = "http://localhost:7777";

export const getGGR = async (dateFilter, dateEnd) => {
  try {
    const response = await axios.get(`${baseUrl}/api/ggr/dashboard`, {
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
