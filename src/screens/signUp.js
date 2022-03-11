import {
  Alert,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
  Slide,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import styles from "../assets/style/singUp.module.css";
import logo from "../assets/img/logo.png";
import { useNavigate } from "react-router-dom";

function SingnUp() {
  const [isRetrievingUser, setIsRetrievingUser] = useState(true);
  const auth = getAuth();
  onAuthStateChanged(auth, () => {
    setIsRetrievingUser(false);
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const [imgSlide, setImgSlide] = useState(false);
  const [formSlide, setFormSlide] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const imgDimension = "8.5rem";
  const timeout = 800;
  const navigate = useNavigate();

  function getErrorMessage(errorCode) {
    console.log(errorCode);
    switch (errorCode) {
      case "auth/invalid-email":
        return "Email inválido";
      case "auth/weak-password":
        return "Escolha uma senha mais segura";
      default:
        return "Houve um erro ao tentar se registrar. Tente novamente mais tarde";
    }
  }

  function validateUsername() {
    if (username.length < 3) {
      setIsSigningUp(false);
      setErrorMessage("Nome de usuário muito pequeno");
      return false;
    }
    //TODO: impedir que usuários possuam mesmo nome

    return true;
  }
  function validatePassword() {
    if (password !== confirmPassword) {
      setIsSigningUp(false);
      setErrorMessage("As senhas não coincidem");
      return false;
    }

    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSigningUp(true);

    if (!validateUsername() || !validatePassword()) return;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Logou
        //TODO: crirar usuario no banco de dados firestore
        navigate("/");
      })
      .catch((error) => {
        //const errorCode = error.code;
        //const errorMessage = error.message;

        setIsSigningUp(false);
        setErrorMessage(getErrorMessage(error.code));
      });
  };

  useEffect(() => {
    document.title = "Cadastro";
    if (isRetrievingUser) return;

    if (auth.currentUser) {
      navigate("/");
      return;
    }

    setTimeout(() => setFormSlide(true), 300);
    setTimeout(() => setImgSlide(true), 700);
  });

  if (isRetrievingUser) return <></>;
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
      <Slide direction="right" in={imgSlide} timeout={timeout}>
        <div className={styles.imgContainer} />
      </Slide>
      <Slide direction="right" in={formSlide} timeout={timeout}>
        <div className={styles.formContainer}>
          <a href="/login" style={{ alignSelf: "center" }}>
            <img
              src={logo}
              alt="logo"
              style={{
                maxWidth: imgDimension,
                maxHeight: imgDimension,
                margin: "0.5rem",
              }}
            />
          </a>
          <h1>Criar Conta</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nome do Usuário"
              variant="outlined"
              type="text"
              style={{ width: "80%", marginBottom: "1rem" }}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
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
              style={{ width: "80%", marginBottom: "1rem" }}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <TextField
              label="Confirmar Senha"
              variant="outlined"
              type="password"
              style={{ width: "80%", marginBottom: "1rem" }}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
            <Button
              variant="contained"
              type="submit"
              disabled={isSigningUp}
              style={{ backgroundColor: "gray" }}
            >
              Cadastrar-se
              {isSigningUp && (
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
        </div>
      </Slide>
    </div>
  );
}

export default SingnUp;
