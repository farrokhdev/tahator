import axios from "axios";

export const TransactionImageUploadHandler = async (url, fileData) => {
  const data = new FormData();
  data.append("file", fileData);
  try {
    await axios({
      method: "post",
      url: url,
      data: {
        id: "62d3b35ae8d08e78b96b0112",
        image: fileData,
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmFkN2E0YWY5YTNiYzFmOGYzZmY2NTIiLCJzdWIiOiI2MmFkN2E0YWY5YTNiYzFmOGYzZmY2NTIiLCJpc3MiOiJ0YWhhdG9yLmNvbSIsInRva2VuVHlwZSI6IkFDQ0VTU19UT0tFTiIsInJvbGVzIjoiQURNSU4iLCJ0b2tlbktleSI6ImIxMjM1NzI4LTI4YTQtNGE4My1iMDgxLWQ5MWUzZTRmMDhkNCIsImlhdCI6MTY1ODA1NDI4MiwiZXhwIjoxNjU4MjI3MDgyfQ.0TXUDpZLwq_cdWFZYz9aTSJq8bHxsRpapzWC10TEqzk",
      },
    }).then((res) => console.log(res));
  } catch (err) {
    console.log(err);
  }
};
