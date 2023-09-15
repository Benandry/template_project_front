import { ISubscription } from "../interfaces/ISubscription";

export const postUser = async (userData: ISubscription) => {
  const api_url: string = `http://localhost:9000/register`;

  const response = await fetch(api_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Vous pouvez également inclure le token d'authentification ici si nécessaire
    },
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    const message = await response.json();
    return message;
  } else {
    console.log("message error");
    return new Error("Erreur lors de la création de la ressource");
  }
};
