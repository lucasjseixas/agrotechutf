"use client";

import styles from "./CTASection.module.css";

const CTASection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.ctaContent}>
          <h2>Pronto para Revolucionar sua Agricultura?</h2>
          <p>
            Junte-se a milhares de produtores que já transformaram suas fazendas
            com nossas soluções.
          </p>
          <div className={styles.ctaButtons}>
            <button
              className={styles.btnPrimary}
              onClick={() => scrollToSection("contato")}
            >
              Começar Gratuitamente
            </button>
            <a href="tel:+5511999999999" className={styles.btnOutline}>
              <i className="fas fa-phone"></i>
              (11) 99999-9999
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
