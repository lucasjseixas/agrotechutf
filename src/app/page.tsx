"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import MarketPricesSection from "./components/MarketPricesSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

interface WeatherData {
  temperature: string;
  forecast: string;
}

interface MarketPrice {
  commodity: string;
  price: string;
  trend: "up" | "down" | "stable";
}

interface CropRecommendation {
  name: string;
  season: string;
  yield_estimate: string;
  days_to_harvest: string;
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [cropRecommendations, setCropRecommendations] = useState<
    CropRecommendation[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Simular dados iniciais (substitua por chamadas API reais)
  useEffect(() => {
    // Dados meteorológicos simulados
    setWeatherData({
      temperature: "25°C",
      forecast: "Condições ideais",
    });

    // Preços do mercado simulados
    setMarketPrices([
      { commodity: "Soja", price: "R$ 150,00/sc", trend: "up" },
      { commodity: "Milho", price: "R$ 85,00/sc", trend: "down" },
      { commodity: "Café", price: "R$ 680,00/sc", trend: "stable" },
      { commodity: "Algodão", price: "R$ 4,50/kg", trend: "up" },
    ]);

    // Recomendações de cultivo simuladas
    setCropRecommendations([
      {
        name: "Soja",
        season: "Outubro - Janeiro",
        yield_estimate: "60 sc/ha",
        days_to_harvest: "120",
      },
      {
        name: "Milho",
        season: "Setembro - Dezembro",
        yield_estimate: "180 sc/ha",
        days_to_harvest: "140",
      },
      {
        name: "Feijão",
        season: "Maio - Agosto",
        yield_estimate: "25 sc/ha",
        days_to_harvest: "90",
      },
    ]);
  }, []);

  // Função para atualizar dados meteorológicos
  const updateWeatherData = async () => {
    setLoading(true);
    try {
      // Simular chamada API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setWeatherData({
        temperature: `${Math.floor(Math.random() * 15 + 20)}°C`,
        forecast: ["Ensolarado", "Nublado", "Chuvoso"][
          Math.floor(Math.random() * 3)
        ],
      });
    } catch (error) {
      console.error("Erro ao atualizar dados meteorológicos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar preços do mercado
  const updateMarketPrices = async () => {
    setLoading(true);
    try {
      // Simular chamada API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const trends: ("up" | "down" | "stable")[] = ["up", "down", "stable"];
      setMarketPrices((prev) =>
        prev.map((item) => ({
          ...item,
          trend: trends[Math.floor(Math.random() * trends.length)],
        }))
      );
    } catch (error) {
      console.error("Erro ao atualizar preços do mercado:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <HeroSection
        weatherData={weatherData}
        onUpdateWeather={updateWeatherData}
        loading={loading}
      />
      <StatsSection />
      <AboutSection />
      <ServicesSection cropRecommendations={cropRecommendations} />
      <MarketPricesSection
        marketPrices={marketPrices}
        onUpdatePrices={updateMarketPrices}
        loading={loading}
      />
      <CTASection />
      <Footer />
    </div>
  );
}
