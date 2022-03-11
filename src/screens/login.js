import { Button, Slide, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

import styles from "../assets/style/login.module.css";
import { useNavigate } from "react-router-dom";

function handleSubmit() {
  alert("enviou form");
}

function Login() {
  const [isRetrievingUser, setIsRetrievingUser] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();
  auth.onAuthStateChanged(() => {
    setIsRetrievingUser(false);
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [sloganSlide, setSloganSlide] = useState(false);
  const [formSlide, setFormSlide] = useState(false);

  const timeout = 800;

  useEffect(() => {
    document.title = "Login";
    if (isRetrievingUser) return;

    if (auth.currentUser) {
      navigate("/");
      return;
    }

    setTimeout(() => setSloganSlide(true), 300);
    setTimeout(() => setFormSlide(true), 700);
  });

  if (isRetrievingUser) return <></>;
  return (
    <div className={styles.container}>
      <Slide direction="right" in={formSlide} timeout={timeout}>
        <div className={styles.formContainer}>
          <div style={{ margin: "2rem" }}>
            <h1>Login</h1>
            <p style={{ marginTop: "-0.3rem" }}>
              Não possui conta ? <a href="/cadastro">crie uma agora!</a>
            </p>
            <form onSubmit={handleSubmit} className={styles.form}>
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
                style={{ backgroundColor: "gray", marginTop: "1rem" }}
              >
                Login
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
