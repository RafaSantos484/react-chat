import { Button, CircularProgress, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getUserDoc } from "../firebase";
import { AddComment, MoreVert } from "@mui/icons-material";

import styles from "../assets/style/mainPage.module.css";

function MainPage() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [userDoc, setUserDoc] = useState(null);

  useEffect(() => {
    if (loading) return;
    document.title = "Página Principal";
    if (!user) {
      navigate("/login");
    } else {
      async function asyncGetUser() {
        if (!userDoc) setUserDoc(await getUserDoc(user));
      }
      asyncGetUser();
    }
  });

  //if (loading) return <></>;
  if (!userDoc) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress size="7rem" sx={{ color: "yellow" }} />
        <h2>Carregando</h2>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.leftBar}>
        <div
          style={{
            display: "flex",
            backgroundColor: "gray",
            alignItems: "center",
          }}
        >
          <p style={{ marginLeft: "1rem" }}>{userDoc.username}</p>
          <div className={styles.iconsContainer}>
            <IconButton
              aria-label="Opções"
              onClick={() => {
                alert("Ver opções");
              }}
            >
              <MoreVert />
            </IconButton>
            <IconButton
              aria-label="Novo Canal"
              onClick={() => {
                alert("Criar novo canal");
              }}
            >
              <AddComment />
            </IconButton>
          </div>
        </div>
      </div>
      <div className={styles.channelContainer}>
        <h2>Selecione um canal e começe a conversar!</h2>
        <Button
          onClick={async () => {
            await auth.signOut();
            navigate("/login");
          }}
        >
          Sair (TEMP)
        </Button>
      </div>
    </div>
  );
}

export default MainPage;
