import { Button } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const [isRetrievingUser, setIsRetrievingUser] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();
  auth.onAuthStateChanged(() => {
    setIsRetrievingUser(false);
  });
  /*auth.currentUser.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
    console.log("==========================================");
  });*/

  useEffect(() => {
    document.title = "Página Principal";
    if(isRetrievingUser) return;

    if (!auth.currentUser) navigate("/login");
  });

  if (isRetrievingUser) return <></>;
  return (
    <div>
      <h1>Página principal</h1>
      <Button
        onClick={async () => {
          await auth.signOut();
          navigate("/login");
        }}
      >
        Sair
      </Button>
    </div>
  );
}

export default MainPage;
