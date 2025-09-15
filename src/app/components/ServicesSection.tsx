"use client";

import styles from "./ServicesSection.module.css";
import {
  GiCorn,
  GiWheat,
  GiPlantSeed,
  GiWaterDrop,
  GiGroundSprout,
  GiSpiderWeb,
} from "react-icons/gi";
import { TbPlant } from "react-icons/tb";

interface CropRecommendation {
  name: string;
  season: string;
  yield_estimate: string;
  days_to_harvest: string;
}

interface ServicesSectionProps {
  cropRecommendations: CropRecommendation[];
}

const ServicesSection = ({ cropRecommendations }: ServicesSectionProps) => {
  const getIcon = (cropName: string) => {
    switch (cropName.toLowerCase()) {
      case "milho":
        return <GiCorn size={24} />;
      case "soja":
        return <GiPlantSeed size={24} />;
      case "trigo":
        return <GiWheat size={24} />;
      default:
        return <TbPlant size={24} />;
    }
  };

  return (
    <section id="servicos" className={styles.services}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>Nossos Serviços</span>
          <h2>Soluções Completas para sua Fazenda</h2>
          <p>
            Oferecemos um ecossistema integrado de ferramentas para otimizar
            todos os aspectos da sua produção agrícola.
          </p>
        </div>

        {/* Recomendações de Cultivo da API */}
        {cropRecommendations.length > 0 && (
          <div className={styles.cropRecommendations}>
            <h3>Recomendações de Cultivo</h3>
            <div className={styles.cropGrid}>
              {cropRecommendations.map((crop, index) => (
                <div key={index} className={styles.cropCard}>
                  <div className={styles.cropIcon}>{getIcon(crop.name)}</div>
                  <h4>{crop.name}</h4>
                  <p>
                    <strong>Época:</strong> {crop.season}
                  </p>
                  <p>
                    <strong>Produtividade:</strong> {crop.yield_estimate}
                  </p>
                  <p>
                    <strong>Ciclo:</strong> {crop.days_to_harvest} dias
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <GiWaterDrop size={32} />
            </div>
            <h3>Monitoramento Climático</h3>
            <p>
              Previsões meteorológicas precisas e alertas personalizados para
              proteger suas culturas.
            </p>
            <ul>
              <li>Estações meteorológicas conectadas</li>
              <li>Alertas de geada e granizo</li>
              <li>Índices de irrigação otimizados</li>
            </ul>
            <a href="#" className={styles.serviceLink}>
              Saiba mais <i className="fas fa-arrow-right"></i>
            </a>
          </div>

          <div className={`${styles.serviceCard} ${styles.featured}`}>
            <div className={styles.serviceBadge}>Mais Popular</div>
            <div className={styles.serviceIcon}>
              <GiGroundSprout size={32} />
            </div>
            <h3>Análise de Solo</h3>
            <p>
              Mapeamento detalhado da fertilidade e recomendações de manejo
              personalizadas.
            </p>
            <ul>
              <li>Análises químicas e físicas</li>
              <li>Mapas de aplicação variável</li>
              <li>Histórico de produtividade</li>
            </ul>
            <a href="#" className={styles.serviceLink}>
              Saiba mais <i className="fas fa-arrow-right"></i>
            </a>
          </div>

          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <GiSpiderWeb size={32} />
            </div>
            <h3>Controle de Pragas</h3>
            <p>
              Identificação precoce de pragas e doenças com IA para tratamento
              eficiente.
            </p>
            <ul>
              <li>Reconhecimento por imagem</li>
              <li>Receituário agronômico digital</li>
              <li>Rastreabilidade de aplicações</li>
            </ul>
            <a href="#" className={styles.serviceLink}>
              Saiba mais <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
