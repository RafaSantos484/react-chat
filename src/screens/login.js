import {
  Alert,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
  Slide,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import styles from "../assets/style/login.module.css";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Login() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [sloganSlide, setSloganSlide] = useState(false);
  const [formSlide, setFormSlide] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const timeout = 800;

  function getErrorMessage(errorCode) {
    console.log(errorCode);
    switch (errorCode) {
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Email ou senha incorreto";
      default:
        return "Houve um erro ao tentar se registrar. Tente novamente mais tarde";
    }
  }

  function setErrorStates(errorMessage) {
    setIsSigningIn(false);
    setErrorMessage(errorMessage);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSigningIn(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setErrorStates(getErrorMessage(error.code));
      });
  };

  useEffect(() => {
    if (loading) return;
    document.title = "Login";
    if (user) {
      navigate("/");
    } else {
      setTimeout(() => setSloganSlide(true), 300);
      setTimeout(() => setFormSlide(true), 700);
    }
  });

  //if (loading) return <></>;
  return (
    <div className={styles.container}>
      <Collapse
        style={{ position: "absolute", top: "5%" }}
        in={errorMessage !== ""}
      >
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="Fechar"
              color="error"
              size="small"
              onClick={() => {
                setErrorMessage("");
              }}
            >
              <Close />
            </IconButton>
          }
        >
          {errorMessage}
        </Alert>
      </Collapse>
      <Slide direction="right" in={formSlide} timeout={timeout}>
        <div className={styles.formContainer}>
          <div style={{ margin: "2rem" }}>
            <h1>Login</h1>
            <p style={{ marginTop: "-0.3rem" }}>
              Não possui conta ? <a href="/cadastro">crie uma agora!</a>
            </p>
            <form
              onSubmit={async (event) => await handleSubmit(event)}
              className={styles.form}
            >
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                style={{ width: "80%", marginBottom: "1rem" }}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <TextField
                label="Senha"
                variant="outlined"
                type="password"
                style={{ width: "80%" }}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <Button
                variant="contained"
                type="submit"
                disabled={isSigningIn}
                style={{ backgroundColor: "gray", marginTop: "1rem" }}
              >
                Login
                {isSigningIn && (
                  <CircularProgress
                    size="2rem"
                    sx={{
                      color: "yellow",
                      position: "absolute",
                    }}
                  />
                )}
              </Button>
            </form>
            <Button
              variant="text"
              style={{ color: "#ad323f", marginTop: "0.5rem" }}
            >
              Esqueci a senha
            </Button>
          </div>
        </div>
      </Slide>
      <Slide direction="right" in={sloganSlide} timeout={timeout}>
        <div className={styles.sloganContainer}>
          <div style={{ marginLeft: "1rem" }}>
            <h1 style={{ color: "white" }}>React Chat</h1>
            <p style={{ color: "white", marginTop: "-0.7rem" }}>
              O seu App de mensagens
            </p>
          </div>
        </div>
      </Slide>
    </div>
  );
}

export default Login;
