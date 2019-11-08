import axios from "axios";
import { db } from "./firebase";

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
    // const result = await axios.post(
    //   "https://api-us.faceplusplus.com/facepp/v3/detect",
    //   fData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     },
    //     params: {
    //       api_key: process.env.REACT_APP_FACEPLUPLUS_APIKEY,
    //       api_secret: process.env.REACT_APP_FACEPLUSPLUS_APISECRET,
    //       return_attributes: "emotion"
    //     }
    //   }
    // );
    // return result.data.faces[0].attributes.emotion;

    // temporary mock api in order to limit calls to real api with limited free calls
    const result = await axios.get(
      "https://ec4b5205-9d79-4cf7-960d-291e4bf15f1a.mock.pstmn.io/detect"
    );
    const date = Date.now();
    const finalResult = {
      emotion: result.data.data.faces[0].attributes.emotion,
      date
    };
    return finalResult;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserData(uid) {
  try {
    const result = await db
      .collection("users")
      .doc(uid)
      .collection("emotion-objects")
      .get();

    const processedResult = result.docs.map(doc => doc.data());
    return processedResult;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function saveUserData(uid, emotionObject) {
  try {
    const result = await db
      .collection("users")
      .doc(uid)
      .collection("emotion-objects")
      .doc(`${emotionObject.date}`)
      .set(emotionObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { calculateEmotionData, getUserData, saveUserData };
