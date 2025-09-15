"use client";

import {
  CiFacebook,
  CiInstagram,
  CiLinkedin,
  CiYoutube,
  CiPhone,
  CiMail,
  CiMap,
} from "react-icons/ci";

import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contato" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.footerLogo}>
              <i className="fas fa-seedling"></i>
              <span>AgroTech</span>
            </div>
            <p>
              Transformando a agricultura brasileira através da tecnologia e
              inovação.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Facebook">
                <CiFacebook size={24} />
              </a>
              <a href="#" aria-label="Instagram">
                <CiInstagram size={24} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <CiLinkedin size={24} />
              </a>
              <a href="#" aria-label="YouTube">
                <CiYoutube size={24} />
              </a>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4>Serviços</h4>
            <ul>
              <li>
                <a href="#">Monitoramento Climático</a>
              </li>
              <li>
                <a href="#">Análise de Solo</a>
              </li>
              <li>
                <a href="#">Controle de Pragas</a>
              </li>
              <li>
                <a href="#">Consultoria Técnica</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>Empresa</h4>
            <ul>
              <li>
                <a href="#">Sobre Nós</a>
              </li>
              <li>
                <a href="#">Nossa Equipe</a>
              </li>
              <li>
                <a href="#">Carreiras</a>
              </li>
              <li>
                <a href="#">Imprensa</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>Contato</h4>
            <div className={styles.contactInfo}>
              <p>
                <CiPhone size={24} />

                <span>(42) 99999-9999</span>
              </p>
              <p>
                <CiMail size={24} />
                <span>contato@agrotech.com.br</span>
              </p>
              <p>
                <CiMap size={24} />
                <span>São Paulo - SP</span>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} AgroTech. Todos os direitos reservados.</p>
          <div className={styles.footerLinks}>
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
