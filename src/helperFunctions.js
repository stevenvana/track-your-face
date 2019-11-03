import axios from "axios";

const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const slicedB64Data = b64Data.split(",")[1];
  const byteCharacters = atob(slicedB64Data);

  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  const newFile = new File(byteArrays, "newFile.jpg", { type: contentType });
  return newFile;
};

async function calculateEmotionData(provisionalPicture) {
  try {
    const contentType = "image/jpeg";
    const blob = await b64toBlob(provisionalPicture, contentType);
    const fData = new FormData();
    fData.append("image_file", blob);
    const result = await axios.post(
      "https://api-us.faceplusplus.com/facepp/v3/detect",
      fData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        params: {
          api_key: "8lb1wAluXKIn5fy87EZRk3poxNNMq1zw",
          api_secret: "sYdXH5dYYpPWSknrzy3Kb6LUy-_lxATO",
          return_attributes: "emotion"
        }
      }
    );
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export { calculateEmotionData };
