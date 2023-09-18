import axios from "axios";
import { IUserLogin } from "../interfaces/Iuser/IUserLogin";

export const postLogin = async (userData: IUserLogin) => {
  console.log("userData", userData);
  const api_url: string = `http://localhost:9000/login`;
  const response = await axios.post(api_url, userData);
  return response.data;
};
