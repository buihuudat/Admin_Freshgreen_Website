import axios from "axios";

const path = "https://api.cloudinary.com/v1_1/ddtagvynp/upload";

export const imageUpload = async (image: any) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "webfood");
  data.append("clound_name", "ddtagvynp");
  const res = await axios.post(path, data);
  return res.data.url;
};
