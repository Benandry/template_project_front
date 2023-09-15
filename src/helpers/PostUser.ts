import axios from "axios";
import { ISubscription } from "../interfaces/ISubscription";

export const postUser = async (userData: ISubscription) => {
  const api_url: string = `http://localhost:9000/register`;

  const response = await axios.post(api_url, userData);

  // Handle the response as needed
  console.log("Response from server:", response.data);

  const data = response.data;
  return data;
};
