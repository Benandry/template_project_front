import { ISubscription } from "../interfaces/Iuser/ISubscription";

export const passwordValidator = (userData: ISubscription): boolean => {
  if (userData.password_confirmation === userData.password) {
    return true;
  } else {
    return false;
  }
};
