import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";
import { withAuthenticator, Button, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { useState } from "react";
import PhotoStorage from "./Components/PhotoStorage";
import Notes from "./Components/Notes";

import { signUp } from "aws-amplify/auth";

Amplify.configure(config);

function App({ signOut, user }) {
  const [page, setPage] = useState("");
  
  async function handleSignUp({ username, password, email, phone_number }) {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: "xotena5673@vkr1.com",
        password: "123456789",
        options: {
          userAttributes: {
            email: "xotena5673@vkr1.com",
            // E.164 number convention
          },
          // optional
          autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        },
      });

      console.log(userId);
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

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
          <Button onClick={handleSignUp}>Sign Up</Button>
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
