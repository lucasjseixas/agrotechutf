"use client";

import { TiWeatherSunny } from "react-icons/ti";

import styles from "./HeroSection.module.css";

interface WeatherData {
  temperature: string;
  forecast: string;
}

interface HeroSectionProps {
  weatherData: WeatherData | null;
  onUpdateWeather: () => void;
  loading: boolean;
}

const HeroSection = ({
  weatherData,
  onUpdateWeather,
  loading,
}: HeroSectionProps) => {
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
    <section id="home" className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Transforme sua
            <span className={styles.highlight}> Agricultura</span>
            <br />
            com Tecnologia
          </h1>
          <p className={styles.heroDescription}>
            Monitore condições climáticas, otimize plantios e maximize sua
            produtividade com nossas soluções inteligentes para o agronegócio
            moderno.
          </p>
          <div className={styles.heroButtons}>
            <button
              className={styles.btnPrimary}
              onClick={() => scrollToSection("servicos")}
            >
              Começar Agora
            </button>
            <button
              className={styles.btnSecondary}
              onClick={() => scrollToSection("sobre")}
            >
              Saiba Mais
            </button>
          </div>
        </div>

        <div className={styles.heroImage}>
          <div className={styles.heroCard}>
            <i className="fas fa-cloud-sun"></i>
            <div className={styles.cardContent}>
              <h4>Condições Atuais</h4>
              {weatherData ? (
                <>
                  <p>{weatherData.temperature}</p>
                  <span>{weatherData.forecast}</span>
                </>
              ) : (
                <>
                  <p>25°C</p>
                  <span>Condições ideais</span>
                </>
              )}
            </div>
            <button
              className={styles.refreshBtn}
              onClick={onUpdateWeather}
              disabled={loading}
              title="Atualizar dados"
            >
              <TiWeatherSunny
                className={`${loading ? styles.spinning : ""}`}
                size={26}
              />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.heroBackground}>
        <div className={`${styles.bgShape} ${styles.shape1}`}></div>
        <div className={`${styles.bgShape} ${styles.shape2}`}></div>
        <div className={`${styles.bgShape} ${styles.shape3}`}></div>
      </div>
    </section>
  );
};

export default HeroSection;
