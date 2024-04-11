import axios from "axios";

const fetchDataFromApi = async (URL, params) => {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("authToken"),
  };

  const BASE_URL = "http://localhost:5000/";
  try {
    const Data = await axios.post(`${BASE_URL}${URL}`, params, { headers });

    return Data;
  } catch (error) {
    return error;
  }
};

export default fetchDataFromApi;
