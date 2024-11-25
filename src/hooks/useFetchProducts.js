import axios from "axios";

const API = axios.create({
  baseURL: "https://fakestoreapi.com"
});

const useFetchProducts = async(urlEndpoint) => {
  const response = await API.get(urlEndpoint);
  return response.data;
} 

export default useFetchProducts;