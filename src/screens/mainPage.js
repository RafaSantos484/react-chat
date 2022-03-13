import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function MainPage() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    document.title = "Página Principal";
    if (!user) {
      navigate("/login");
    } else {
      //...
    }
  });

  //if (loading) return <></>;
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
