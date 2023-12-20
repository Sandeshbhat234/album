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
      console.log("error fetch", error);
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
      console.log("error", error);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    loadPhotos();
    fetchPhotos();
    setName('')
    setDescription('')
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
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="upload">
          <h2>name</h2>
        </label>
        <input
          id="name"
          type="text"
          placeholder="type name"
          value={name}
          onChange={inputChangeHandler}
        />
        <label htmlFor="upload">
          <h2>descprition</h2>
        </label>
        <input
          id="description"
          type="text"
          placeholder="describe"
          value={description}
          onChange={descriptionChangeHandler}
        />
        <div>
          <button>upload</button>
        </div>
      </form>
      <Button onClick={deletePhotos}>deleteee</Button>
      <div>
        <h2>uploaded data</h2>
        <div>
          {photos.map((item) => (
            <div>
              <div key={item.id}>
                {item.name} ---{item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      ;
    </>
  );
};

export default Photo;
