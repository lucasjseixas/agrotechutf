"use client";

import styles from "./AboutSection.module.css";
import { GiRadarDish, GiBrain, GiSmartphone, GiWheat } from "react-icons/gi";

const AboutSection = () => {
  return (
    <section id="sobre" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <span className={styles.sectionBadge}>Sobre Nós</span>
            <h2>Inovação que Alimenta o Futuro</h2>
            <p>
              Há mais de uma década desenvolvendo soluções tecnológicas que
              revolucionam a agricultura brasileira. Nossa missão é democratizar
              o acesso às ferramentas mais avançadas do agronegócio.
            </p>
            <div className={styles.features}>
              <div className={styles.feature}>
                <GiRadarDish size={24} />
                <div>
                  <h4>Monitoramento por Satélite</h4>
                  <p>Acompanhe suas culturas em tempo real</p>
                </div>
              </div>
              <div className={styles.feature}>
                <GiBrain size={24} />
                <div>
                  <h4>Inteligência Artificial</h4>
                  <p>Previsões precisas e recomendações personalizadas</p>
                </div>
              </div>
              <div className={styles.feature}>
                <GiSmartphone size={24} />
                <div>
                  <h4>App Mobile</h4>
                  <p>Acesse todos os dados na palma da sua mão</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.aboutImage}>
            <div className={styles.imagePlaceholder}>
              <GiWheat size={48} />
              <p>Agricultura Inteligente</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
