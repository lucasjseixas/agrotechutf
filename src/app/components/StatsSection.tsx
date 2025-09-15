"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./StatsSection.module.css";
import { GiWheat, GiCorn, GiPlantSeed, GiCoffeeBeans } from "react-icons/gi";

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const counters = document.querySelectorAll(`.${styles.statNumber}`);

    counters.forEach((counter) => {
      const target = parseInt(
        counter.textContent?.replace(/[^\d]/g, "") || "0"
      );
      if (target > 0) {
        animateNumber(counter as HTMLElement, target);
      }
    });
  };

  const animateNumber = (element: HTMLElement, target: number) => {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      const originalText =
        element.dataset.original || element.textContent || "";
      const suffix = originalText.includes("%")
        ? "%"
        : originalText.includes("+")
        ? "+"
        : originalText.includes("k")
        ? "k+"
        : "";

      element.textContent = Math.floor(current) + suffix;
    }, 16);
  };

  return (
    <section className={styles.stats} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <GiCorn size={32} />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber} data-original="+35%">
                +35%
              </h3>
              <p>Produtividade do Milho</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <GiWheat size={32} />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber} data-original="1,200+">
                1,200+
              </h3>
              <p>Toneladas de Trigo</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <GiPlantSeed size={32} />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber} data-original="500k+">
                500k+
              </h3>
              <p>Hectares de Soja</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <GiCoffeeBeans size={32} />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber} data-original="98%">
                98%
              </h3>
              <p>Qualidade do Café</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
