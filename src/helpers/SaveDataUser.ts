import { IUserDataInfo } from "../interfaces/Iuser/IUserLogin";

export const save = (data: IUserDataInfo): string => {
  sessionStorage.setItem("dataUser", JSON.stringify(data));
  return "saved";
};
