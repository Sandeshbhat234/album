import React, { useRef } from "react";
import {
  uploadData,
  downloadData,
  getUrl,
  list,
  remove,
} from "aws-amplify/storage";
import { useState } from "react";
import { Button } from "@aws-amplify/ui-react";

const PhotoStorage = () => {
  const [photoFile, setPhotoFile] = useState({});
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [listName, setListName] = useState([]);
  const fileInputRef = useRef();

  const uploadPhoto = async () => {
    try {
      const result = await uploadData({
        key: photoName,
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
  const restorePhoto = async () => {
    const getUrlResult = await getUrl({
      key: photoName,
      options: {
        accessLevel: "guest",
      },
    });

    setPhotoUrl(getUrlResult.url.toString());
    console.log("signed URL: ", getUrlResult.key);
  };

  const deletePhoto = async () => {
    try {
      await remove({ key: photoName });
      console.log("deleted");
    } catch (error) {
      console.log("Error ", error);
    }
  };
  const listPhoto = async () => {
    try {
      const result = await list({
        prefix: "",
      });
      setListName(result.items);
      console.log(result.items);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setPhotoName("");
    fileInputRef.current.value = "";
    listPhoto();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <form
          onSubmit={submitHandler}
          style={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "10px",
            }}>
            <label style={{ color: "#ff4500", marginRight: "10px" }}>
              Name
            </label>
            <input
              type="text"
              placeholder="to upload/show/delete"
              value={photoName}
              onChange={(e) => setPhotoName(e.target.value)}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => setPhotoFile(e.target.files[0])}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "70%",
              }}>
              <Button
                type="submit"
                onClick={uploadPhoto}
                style={{
                  backgroundColor: "#32cd32",
                  color: "white",
                  marginRight: "10px",
                }}>
                upload
              </Button>
              <Button
                type="submit"
                onClick={restorePhoto}
                style={{
                  backgroundColor: "#1e90ff",
                  color: "white",
                  marginRight: "10px",
                }}>
                Show Photo
              </Button>
              <Button
                type="submit"
                onClick={deletePhoto}
                style={{ backgroundColor: "#32cd32", color: "white" }}>
                delete
              </Button>
            </div>
            <Button
              type="submit"
              onClick={listPhoto}
              style={{ backgroundColor: "#32cd32", color: "white" }}>
              Show List
            </Button>
          </div>
        </form>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "70%",
          }}>
          <img src={photoUrl} alt="" width={300} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "30%",
          }}>
          <ul>
            {listName.map((obj, idx) => (
              <li key={idx}>{obj.key}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PhotoStorage;
