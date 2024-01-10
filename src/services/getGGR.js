import axios from "axios";

const baseUrl = "https://47.128.145.150";

export const getGGR = async (dateFilter, dateEnd) => {
  const start = dateFilter ? dateFilter.$d.toLocaleDateString() : null;
  const end = dateEnd.$d.toLocaleDateString();

  try {
    const response = await axios.get(`${baseUrl}/api/ggr/dashboard`, {
      params: {
        dateFilter: start,
        dateEnd: end,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while getting bet history.");
  }
};
