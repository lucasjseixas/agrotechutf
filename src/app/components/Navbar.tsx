"use client";

import { useState, useEffect } from "react";
import { FaGroupArrowsRotate } from "react-icons/fa6";
import { CiLogin } from "react-icons/ci";

import Link from "next/link";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "sobre", "servicos", "contato"];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + height
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLogo}>
          <FaGroupArrowsRotate />
          <span>AgroTech</span>
        </div>

        <div className={`${styles.navMenu} ${isMenuOpen ? styles.active : ""}`}>
          <a
            href="/"
            className={`${styles.navLink} ${
              activeSection === "home" ? styles.active : ""
            }`}
            // onClick={(e) => {
            //   e.preventDefault();
            //   scrollToSection("home");
            // }}
          >
            Início
          </a>
          <a
            href="#sobre"
            className={`${styles.navLink} ${
              activeSection === "sobre" ? styles.active : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("sobre");
            }}
          >
            Sobre
          </a>
          {/* <a
            href="#servicos"
            className={`${styles.navLink} ${
              activeSection === "servicos" ? styles.active : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("servicos");
            }}
          >
            Serviços
          </a> */}
          <Link className={`${styles.navLink}`} href="/servicos">
            Serviços
          </Link>
          <a
            href="#contato"
            className={`${styles.navLink} ${
              activeSection === "contato" ? styles.active : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contato");
            }}
          >
            Contato
          </a>
          <Link className={`${styles.navLink}`} href="/login">
            <CiLogin size={24} />
            <span>Login</span>
          </Link>
        </div>

        <div
          className={`${styles.navToggle} ${isMenuOpen ? styles.active : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
