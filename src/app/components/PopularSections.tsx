import React from "react";
import styles from "./PopularSections.module.css";

const PopularSections = () => {
  const popularItems = [
    {
      id: 1,
      title: "Fertilizantes",
      icon: "🌱",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      id: 2,
      title: "Receita Agronômica",
      icon: "📋",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      id: 3,
      title: "Análise de Solo",
      icon: "⚗️",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 4,
      title: "Defensivos Agrícolas",
      icon: "🛡️",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      id: 5,
      title: "Sementes & Mudas",
      icon: "🌿",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
    },
    {
      id: 6,
      title: "Irrigação & Drenagem",
      icon: "💧",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-700",
    },
    {
      id: 7,
      title: "Guia de Pragas",
      icon: "⚙️",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-600",
    },
    {
      id: 8,
      title: "Manejo Integrado",
      icon: "👥",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      id: 9,
      title: "Relatórios Técnicos",
      icon: "📊",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-600",
    },
    {
      id: 10,
      title: "Monitoramento de Cultivo",
      icon: "🔬",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const getBackgroundColor = (bgColor: string) => {
    const colorMap: { [key: string]: string } = {
      "bg-red-50": "#fef2f2",
      "bg-orange-50": "#fff7ed",
      "bg-blue-50": "#eff6ff",
      "bg-yellow-50": "#fefce8",
      "bg-pink-50": "#fdf2f8",
      "bg-gray-50": "#f9fafb",
      "bg-purple-50": "#faf5ff",
    };
    return colorMap[bgColor] || "#f9fafb";
  };

  const getTextColor = (iconColor?: string) => {
    const colorMap: Record<string, string> = {
      "text-red-600": "#dc2626",
      "text-orange-600": "#ea580c",
      "text-blue-600": "#2563eb",
      "text-yellow-600": "#ca8a04",
      "text-yellow-700": "#a16207",
      "text-pink-600": "#db2777",
      "text-gray-600": "#4b5563",
      "text-purple-600": "#9333ea",
    };
    return iconColor && colorMap[iconColor] ? colorMap[iconColor] : "#4b5563";
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>MAIS POPULARES</h2>
      <div className={styles.itemsGrid}>
        {popularItems.map((item) => (
          <div key={item.id} className={styles.item}>
            <div
              className={styles.iconContainer}
              style={{
                backgroundColor: getBackgroundColor(item.bgColor),
                color: getTextColor(item.iconColor),
              }}
            >
              {item.icon}
            </div>
            <h3 className={styles.itemTitle}>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSections;
