import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";
import { withAuthenticator, Button, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";


import { useState } from "react";
import PhotoStorage from "./Components/PhotoStorage";
import Notes from "./Components/Notes";

Amplify.configure(config);

function App({ signOut, user }) {
  const [page, setPage] = useState("");
  return (
    <>
      <View
        className="App"
        style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}>
          <h1>Hello {user?.username}</h1>
          <Button onClick={signOut}>Sign Out</Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}>
          <Button
            onClick={() => setPage("text")}
            style={{ marginRight: "10px" }}>
            Text
          </Button>
          <Button onClick={() => setPage("photo")}>Photo</Button>
        </div>
        {page === "text" && <Notes></Notes>}
        {page === "photo" && <PhotoStorage></PhotoStorage>}
      </View>
    </>
  );
}

export default withAuthenticator(App);
