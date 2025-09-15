"use client";

import styles from "./MarketPricesSection.module.css";
import { GiCorn, GiWheat, GiPlantSeed, GiCoffeeBeans } from "react-icons/gi";
import { BiRefresh } from "react-icons/bi";
import { BsArrowUpShort, BsArrowDownShort, BsDash } from "react-icons/bs";

interface MarketPrice {
  commodity: string;
  price: string;
  trend: "up" | "down" | "stable";
}

interface MarketPricesSectionProps {
  marketPrices: MarketPrice[];
  onUpdatePrices: () => void;
  loading: boolean;
}

const MarketPricesSection = ({
  marketPrices,
  onUpdatePrices,
  loading,
}: MarketPricesSectionProps) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <BsArrowUpShort size={24} />;
      case "down":
        return <BsArrowDownShort size={24} />;
      default:
        return <BsDash size={24} />;
    }
  };

  const getCommodityIcon = (commodity: string) => {
    switch (commodity.toLowerCase()) {
      case "milho":
        return <GiCorn size={24} />;
      case "trigo":
        return <GiWheat size={24} />;
      case "soja":
        return <GiPlantSeed size={24} />;
      case "café":
        return <GiCoffeeBeans size={24} />;
      default:
        return <GiPlantSeed size={24} />;
    }
  };

  if (marketPrices.length === 0) {
    return null;
  }

  return (
    <section className={styles.marketPrices}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>Cotações do Mercado</h2>
          <p>Acompanhe os preços atualizados das principais commodities</p>
          <button
            className={styles.refreshBtn}
            onClick={onUpdatePrices}
            disabled={loading}
            title="Atualizar preços"
          >
            <BiRefresh className={loading ? styles.spinning : ""} size={20} />
            Atualizar
          </button>
        </div>

        <div className={styles.pricesGrid}>
          {marketPrices.map((price, index) => (
            <div key={index} className={styles.priceCard}>
              <div className={styles.priceInfo}>
                <div className={styles.commodityIcon}>
                  {getCommodityIcon(price.commodity)}
                </div>
                <h4>{price.commodity}</h4>
                <span className={styles.price}>{price.price}</span>
              </div>
              <div
                className={`${styles.priceTrend} ${
                  styles[
                    `trend${
                      price.trend.charAt(0).toUpperCase() + price.trend.slice(1)
                    }`
                  ]
                }`}
              >
                {getTrendIcon(price.trend)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketPricesSection;
