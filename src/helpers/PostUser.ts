import axios from "axios";
import { ISubscription } from "../interfaces/Iuser/ISubscription";

export const postUser = async (userData: ISubscription) => {
  const api_url: string = `http://localhost:9000/register`;
  const response = await axios.post(api_url, userData);
  return response.data;
};
