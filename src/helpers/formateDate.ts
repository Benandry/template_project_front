export const formttedDate = (dateString: string | Date): string | undefined => {
  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0, donc ajoutez 1 et formatez avec 2 chiffres
  const day = String(dateObject.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
