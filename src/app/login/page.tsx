"use client";

import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";
import Footer from "../components/Footer";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Pseudo-verificação simples
    if (username === "admin" && password === "123") {
      alert("Login bem-sucedido!");
      router.push("/profile"); // Redireciona para a página de perfil
    } else {
      alert("Credenciais inválidas. Tente novamente.");
    }
  };
  return (
    <div>
      <Navbar />
      <div
        className={`${styles.container} ${styles.containerFluid} ${styles.sectionPadding}`}
      >
        <div className={`${styles.loginCard} ${styles.fadeInUp}`}>
          <div className={styles.textCenter}>
            <div className={styles.sectionBadge}>Acesso</div>
            <h2>Bem-vindo de volta!</h2>
            <p>Entre com suas credenciais.</p>
          </div>
          <form className={styles.loginForm} onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Nome de usuário</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary} ${styles.loginButton}`}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
