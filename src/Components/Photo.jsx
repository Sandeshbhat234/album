import React from "react";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { createPhoto, deletePhoto } from "../graphql/mutations";
import { listPhotos } from "../graphql/queries";
import { Button } from "@aws-amplify/ui-react";

const client = generateClient();

const Photo = () => {
  const [photos, setPhotos] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const result = await client.graphql({ query: listPhotos });
      console.log("photo retrieved", result);
      const photoData = result.data.listPhotos.items;
      setPhotos(photoData);
    } catch (error) {
      console.log("error fetching text", error);
    }
  };

  const loadPhotos = async () => {
    try {
      const result = await client.graphql({
        query: createPhoto,
        variables: {
          input: {
            name: name,
            description: description,
            
          },
        },
      });

      console.log("photo uploaded", result);
    } catch (error) {
      console.log("error uploading", error);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    loadPhotos();
    fetchPhotos();
    setName("");
    setDescription("");
  };
  const inputChangeHandler = (event) => {
    setName(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };
  const deletePhotos = async () => {
    try {
      const result = await client.graphql({
        query: deletePhoto,
        variables: {
          input: {
            id: photos[0].id,
          },
        },
      });
      console.log(result);
    } catch (error) {
      console.log("error", error);
    }
    fetchPhotos();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f0f8ff",
        padding: "20px",
      }}>
      <form
        onSubmit={submitHandler}
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <label
          htmlFor="upload"
          style={{ color: "#ff4500", marginBottom: "10px" }}>
          <h2>Name</h2>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Type name"
          value={name}
          onChange={inputChangeHandler}
          style={{ marginBottom: "10px" }}
        />
        <label
          htmlFor="upload"
          style={{ color: "#ff4500", marginBottom: "10px" }}>
          <h2>Description</h2>
        </label>
        <input
          id="description"
          type="text"
          placeholder="Describe"
          value={description}
          onChange={descriptionChangeHandler}
          style={{ marginBottom: "10px" }}
        />
        <div>
          <button style={{ backgroundColor: "#32cd32", color: "white" }}>
            Upload
          </button>
        </div>
      </form>
      <Button
        onClick={deletePhotos}
        style={{
          backgroundColor: "#1e90ff",
          color: "white",
          marginBottom: "10px",
        }}>
        Delete
      </Button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <h2 style={{ color: "#ff4500" }}>State Data</h2>
        <div>
          {photos.map((item) => (
            <div
              style={{
                backgroundColor: "#ffe4e1",
                margin: "10px",
                padding: "10px",
              }}>
              <div key={item.id}>
                {item.name} ---{item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Photo;
