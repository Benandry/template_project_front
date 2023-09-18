import { IUserDataInfo } from "../interfaces/Iuser/IUserLogin";

export const getToken = (): string | null => {
  const dataInfo: string | null = sessionStorage.getItem("dataUser");

  if (dataInfo !== null) {
    const data: IUserDataInfo = JSON.parse(dataInfo);
    return data.token;
  } else {
    return null;
    // La valeur est nulle, traitez ce cas (par exemple, l'utilisateur n'est pas connecté)
  }
};
