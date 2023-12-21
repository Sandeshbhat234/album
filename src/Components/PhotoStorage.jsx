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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f0f8ff', padding: '20px' }}>
      <form style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label style={{ color: '#ff4500', marginBottom: '10px' }}>Photo</label>
        <input type="text" onChange={(e) => setPhotoNameU(e.target.value)} style={{ marginBottom: '10px' }} />
        <input type="file" onChange={(e) => setPhotoFile(e.target.files[0])} style={{ marginBottom: '10px' }} />
        <Button onClick={storePhoto} style={{ backgroundColor: '#32cd32', color: 'white' }}>Upload</Button>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input type="text" onChange={(e) => setPhotoNameD(e.target.value)} style={{ marginBottom: '10px' }} />
        <Button onClick={RestorePhoto} style={{ backgroundColor: '#1e90ff', color: 'white', marginBottom: '10px' }}>Show Photo</Button>
        <img src={photoUrl} alt="" width={500} />
      </div>
    </div>
  );
};

export default PhotoStorage;