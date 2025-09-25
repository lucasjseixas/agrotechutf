"use client";

import Navbar from "../components/Navbar";
import { useState } from "react";
import styles from "./page.module.css";
import { jsPDF } from "jspdf";
import Footer from "../components/Footer";
import PopularSections from "../components/PopularSections";
import GeminiFloatingButton from "../components/GeminiFloatingButton";

export default function Profile() {
  const [name] = useState("João da Silva");
  const [email] = useState("joao.silva@email.com");
  const [role] = useState("Engenheiro Agrônomo");

  // Campos da receita
  const [cultura, setCultura] = useState("");
  const [insumos, setInsumos] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const generatePDF = () => {
    const doc = new jsPDF();

    // Logo no topo (precisa estar em base64 ou no /public)
    doc.addImage("/logo2.png", "PNG", 170, 10, 30, 30);

    // Cabeçalho
    doc.setFontSize(18);
    doc.text("Receita Agronômica", 20, 20);

    // Informações do responsável
    doc.setFontSize(12);
    doc.text(`Responsável: ${name}`, 20, 40);
    doc.text(`Email: ${email}`, 20, 48);
    doc.text(`Cargo: ${role}`, 20, 56);

    // Dados da receita
    doc.setFontSize(14);
    doc.text("Detalhes da Receita", 20, 75);
    doc.setFontSize(12);
    doc.text(`Cultura: ${cultura || "-"}`, 20, 90);
    doc.text("Insumos:", 20, 105);

    // Lista de insumos formatada
    const insumosList = insumos.split("\n");
    insumosList.forEach((item, index) => {
      doc.text(`- ${item}`, 30, 115 + index * 8);
    });

    // Observações
    doc.text("Observações:", 20, 150);
    doc.text(doc.splitTextToSize(observacoes || "-", 170), 30, 160);

    // Assinatura
    doc.line(20, 260, 120, 260);
    doc.text("Assinatura do Engenheiro Agrônomo", 20, 270);

    // Salvar
    doc.save("receita-agronomica.pdf");
  };

  return (
    <div>
      <Navbar />
      <div
        className={`${styles.container} ${styles.containerFluid} ${styles.sectionPadding}`}
      >
        <div className={`${styles.profileCard} ${styles.fadeInUp}`}>
          <header className={styles.profileHeader}>
            <img
              src="/logo2.png"
              alt="Logo AgroTech"
              className={styles.logo}
              style={{ width: "100px", height: "auto" }}
            />
          </header>

          <div className={styles.textCenter}>
            <div className={styles.sectionBadge}>Perfil</div>
            <h2>Bem-vindo, {name}!</h2>
            <p>Veja suas informações abaixo:</p>
          </div>

          <div className={styles.profileInfo}>
            <p>
              <strong>Nome:</strong> {name}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Cargo:</strong> {role}
            </p>
          </div>
          <div className={styles.popularWrapper}>
            <PopularSections />
          </div>

          {/* Formulário da Receita */}
          <form
            className={styles.recipeForm}
            onSubmit={(e) => {
              e.preventDefault();
              generatePDF();
            }}
          >
            <div className={styles.formGroup}>
              <label htmlFor="cultura">Cultura</label>
              <input
                type="text"
                id="cultura"
                placeholder="Ex: Soja"
                value={cultura}
                onChange={(e) => setCultura(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="insumos">Insumos (um por linha)</label>
              <textarea
                id="insumos"
                rows={4}
                placeholder={"Ex:\nFertilizante X - 50kg\nHerbicida Y - 2L"}
                value={insumos}
                onChange={(e) => setInsumos(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="observacoes">Observações</label>
              <textarea
                id="observacoes"
                rows={3}
                placeholder="Digite observações adicionais..."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary} ${styles.pdfButton}`}
            >
              Gerar PDF - Receita Agronômica
            </button>
          </form>
        </div>
      </div>
      <GeminiFloatingButton />
      <Footer />
    </div>
  );
}
