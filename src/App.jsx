import { Amplify } from "aws-amplify";
import { uploadData, downloadData, getUrl } from "aws-amplify/storage";
import config from "./amplifyconfiguration.json";
import { withAuthenticator, Button, View, Card } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import PhotoStorage from "./Components/PhotoStorage";
import Photo from "./Components/Photo";
// import Photo from "./Components/Photo";

Amplify.configure(config);

function App({ signOut, user }) {
  return (
    <>
      <View className="App">
        <Card>
          <h1>Hello {user?.username}</h1>
        </Card>
        <Button onClick={signOut}>Sign Out</Button>
      </View>
      <Photo></Photo>
      {/* <PhotoStorage></PhotoStorage> */}
    </>
  );
}

export default withAuthenticator(App);
