import axios from "axios";

export const postImage = async (image: File) => {
  const formData = new FormData();
  formData.append("image", image);
  const response = await axios.post(
    `http://localhost:9000/user/uploadsImage`,
    formData,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );

  const data = response.data;
  return data;
};
