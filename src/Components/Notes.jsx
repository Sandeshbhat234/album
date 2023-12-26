import React from "react";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { createPhoto, deletePhoto } from "../graphql/mutations";
import { listPhotos } from "../graphql/queries";
import { Button, Card } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";

const client = generateClient();

Amplify.configure({
  API: {
    GraphQL: {
      endpoint:
        "https://vp3locarvbczpciekehkg5lfw4.appsync-api.ap-south-1.amazonaws.com/graphql",
      region: "ap-south-1",
      defaultAuthMode: "oidc",
    },
  },
});

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const result = await client.graphql({ query: listPhotos });
      console.log("notes retrieved", result);
      const photoData = result.data.listPhotos.items;
      setNotes(photoData);
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

      console.log("notes uploaded", result);
    } catch (error) {
      console.log("error uploading", error);
    }
  };

  const deletePhotos = async () => {
    try {
      const result = await client.graphql({
        query: deletePhoto,
        variables: {
          input: {
            id: notes[0].id,
          },
        },
      });
      console.log(result);
    } catch (error) {
      console.log("error", error);
    }
    fetchNotes();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    loadPhotos();
    fetchNotes();
    setName("");
    setDescription("");
  };
  const inputChangeHandler = (event) => {
    setName(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "10px",
          }}>
          <label
            htmlFor="name"
            style={{ color: "#ff4500", marginRight: "10px" }}>
            <h2>Name</h2>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Type name"
            value={name}
            onChange={inputChangeHandler}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "10px",
          }}>
          <label
            htmlFor="description"
            style={{ color: "#ff4500", marginRight: "10px" }}>
            <h2>Description</h2>
          </label>
          <input
            id="description"
            type="text"
            placeholder="Describe"
            value={description}
            onChange={descriptionChangeHandler}
          />
          <button
            style={{
              backgroundColor: "#32cd32",
              color: "white",
              marginLeft: "10px",
            }}>
            Upload
          </button>
        </div>
        <Button
          onClick={deletePhotos}
          style={{
            backgroundColor: "#1e90ff",
            color: "white",
            marginBottom: "10px",
          }}>
          Delete
        </Button>
      </form>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <h2 style={{ color: "#ff4500" }}>Notes</h2>
        <div>
          {notes.map((item, idx) => (
            <Card
              key={item.id}
              style={{
                backgroundColor: "#ffe4e1",
                margin: "10px",
                padding: "10px",
              }}>
              <div>
                {item.name} ---{item.description}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
///added compo
export default Notes;
