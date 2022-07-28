import axios from "axios";
import TokenManager from "../../lib/tokenManager";

export const TransactionImageUploadHandler = async (url, fileData) => {
  console.log(fileData);
  const data = new FormData();
  data.append("file", fileData);
  try {
    await axios({
      method: "post",
      url: url,
      data,
      data: {
        id: "62d3b35ae8d08e78b96b0112",
        image: fileData,
      },
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: TokenManager.getToken().access_token,
      },
    }).then((res) => console.log(res));
  } catch (err) {
    console.log(err);
  }
};
