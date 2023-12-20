import React from "react";
import { uploadData, downloadData, getUrl } from "aws-amplify/storage";
import { useState } from "react";
import { Button } from "@aws-amplify/ui-react";

const PhotoStorage = () => {
  const [photoFile, setPhotoFile] = useState({});
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoNameD, setPhotoNameD] = useState("");
  const [photoNameU, setPhotoNameU] = useState("");

  const storePhoto = async () => {
    try {
      const result = await uploadData({
        key: photoNameU,
        data: photoFile,
        options: {
          accessLevel: "guest",
        },
      }).result;
      console.log("Succeeded: ", result);
    } catch (error) {
      console.log("Error : ", error);
    }
  };
  const RestorePhoto = async () => {
    const getUrlResult = await getUrl({
      key: photoNameD,
      options: {
        accessLevel: "guest",
      },
    });

    setPhotoUrl(getUrlResult.url.toString());
    console.log("signed URL: ", getUrlResult.url.toString());
  };

  return (
    <div>
      <form>
        <label>photo</label>
        <input type="text" onChange={(e) => setPhotoNameU(e.target.value)} />
        <input type="file" onChange={(e) => setPhotoFile(e.target.files[0])} />
        <Button onClick={storePhoto}>Upload</Button>
      </form>
      <div>
        <input type="text" onChange={(e) => setPhotoNameD(e.target.value)} />
        <Button onClick={RestorePhoto}>Show Photo</Button>
        <img src={photoUrl} alt="" width={500} />
      </div>
    </div>
  );
};

export default PhotoStorage;
