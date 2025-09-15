"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Navbar from "../components/Navbar";

interface EndpointData {
  [key: string]: string;
}

interface ApiResponse {
  versao_api?: string;
  versao_dados?: string;
  nome_cientifico?: string;
  classificacao?: string;
  nome_comum?: string[];
  cultura?: Array<{
    nome: string;
    url_agrofit: string;
  }>;
  nome?: string;
  cod_agrofit?: string;
  numero_registro?: string;
  ingrediente_ativo?: {
    nome: string;
  };
  titular_registro?: {
    nome_razao_social: string;
  };
}

const endpoints: EndpointData = {
  pragas: "pragas",
  "marcas-comerciais": "marcas-comerciais",
  "produtos-formulados": "produtos-formulados",
  culturas: "culturas",
  "titulares-registros": "titulares-registros",
  "classificacoes-toxicologicas": "classificacoes-toxicologicas",
  formulacoes: "formulacoes",
  "modos-acoes": "modos-acoes",
  "tecnicas-aplicacoes": "tecnicas-aplicacoes",
  "pragas-nomes-comuns": "pragas-nomes-comuns",
  "produtos-tecnicos": "produtos-tecnicos",
  "classes-categorias-agronomicas": "classes-categorias-agronomicas",
  "ingredientes-ativos": "ingredientes-ativos",
  "plantas-daninhas-nomes-comuns": "plantas-daninhas-nomes-comuns",
  "plantas-daninhas": "plantas-daninhas",
  "classificacoes-ambientais": "classificacoes-ambientais",
  versao: "versao",
  health: "health",
};

export default function Servicos() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("pragas");
  const [data, setData] = useState<ApiResponse[] | ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Função genericApiCall mantida igual com tipagem
  async function genericApiCall(
    url: string,
    method: string = "GET",
    data: any = null,
    headers: Record<string, string> = {}
  ): Promise<any> {
    const options: RequestInit = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        let errorData: any = await response.text();
        try {
          errorData = JSON.parse(errorData);
        } catch (e) {
          errorData = { message: errorData };
        }
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${
            errorData.message || "Unknown error"
          }`
        );
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  }

  // Função para carregar dados do endpoint selecionado
  const handleCarregarDados = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/agrofit?endpoint=${selectedEndpoint}&page=1`
      );
      if (!res.ok) {
        throw new Error("Erro ao buscar dados");
      }

      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Erro na chamada:", error);
      setError(error instanceof Error ? error.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const renderData = (data: ApiResponse[] | ApiResponse, endpoint: string) => {
    if (endpoint === "health") {
      return (
        <p className={styles.successMessage}>Status da API: Operacional</p>
      );
    }

    if (endpoint === "versao") {
      const versionData = data as ApiResponse;
      return (
        <div className={styles.item}>
          <h3>Informações da API</h3>
          <p>
            <strong>Versão da API:</strong> {versionData.versao_api}
          </p>
          <p>
            <strong>Versão dos Dados:</strong> {versionData.versao_dados}
          </p>
        </div>
      );
    }

    if (!Array.isArray(data) || data.length === 0) {
      return <p>Nenhum dado encontrado.</p>;
    }

    return (data as ApiResponse[]).map((item: ApiResponse, index: number) => {
      switch (endpoint) {
        case "pragas":
          return (
            <div key={index} className={styles.item}>
              <h3>{item.nome_cientifico}</h3>
              <p>
                <strong>Classificação:</strong> {item.classificacao}
              </p>
              <p>
                <strong>Nomes Comuns:</strong>{" "}
                {item.nome_comum?.join(", ") || "-"}
              </p>
              <p>
                <strong>Culturas Afetadas:</strong>
              </p>
              <ul>
                {item.cultura?.map((cultura, idx) => (
                  <li key={idx}>
                    <a
                      href={cultura.url_agrofit}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkCultura}
                    >
                      {cultura.nome}
                    </a>
                  </li>
                )) || <li>Nenhuma cultura associada.</li>}
              </ul>
            </div>
          );

        case "culturas":
          return (
            <div key={index} className={styles.item}>
              <h3>{item.nome}</h3>
              <p>
                <strong>Nome Científico:</strong> {item.nome_cientifico || "-"}
              </p>
              <p>
                <strong>Código Agrofit:</strong> {item.cod_agrofit || "-"}
              </p>
            </div>
          );

        case "ingredientes-ativos":
          return (
            <div key={index} className={styles.item}>
              <h3>{item.nome_comum}</h3>
              <p>
                <strong>Nome Científico:</strong> {item.nome_cientifico || "-"}
              </p>
            </div>
          );

        case "produtos-formulados":
        case "produtos-tecnicos":
          return (
            <div key={index} className={styles.item}>
              <h3>{item.nome}</h3>
              <p>
                <strong>Número de Registro:</strong> {item.numero_registro}
              </p>
              <p>
                <strong>Ingrediente Ativo:</strong>{" "}
                {item.ingrediente_ativo?.nome}
              </p>
              <p>
                <strong>Titular de Registro:</strong>{" "}
                {item.titular_registro?.nome_razao_social}
              </p>
            </div>
          );

        case "plantas-daninhas":
          return (
            <div key={index} className={styles.item}>
              <h3>{item.nome_cientifico}</h3>
              <p>
                <strong>Nomes Comuns:</strong>{" "}
                {item.nome_comum?.join(", ") || "-"}
              </p>
            </div>
          );

        default:
          return (
            <div key={index} className={styles.item}>
              <pre>{JSON.stringify(item, null, 2)}</pre>
            </div>
          );
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.heroContainer}>
        <Navbar />
        <header>
          <h1>Chamada API Agrofit</h1>
          <p>
            Selecione a fonte de dados e clique no botão para carregar as
            informações.
          </p>
        </header>

        <div className={styles.controls}>
          <label htmlFor="endpoint-select">Escolha o Endpoint:</label>
          <select
            id="endpoint-select"
            value={selectedEndpoint}
            onChange={(e) => setSelectedEndpoint(e.target.value)}
          >
            <option value="pragas">Pragas</option>
            <option value="marcas-comerciais">Marcas Comerciais</option>
            <option value="produtos-formulados">Produtos Formulados</option>
            <option value="culturas">Culturas</option>
            <option value="titulares-registros">Titulares de Registros</option>
            <option value="classificacoes-toxicologicas">
              Classificações Toxicológicas
            </option>
            <option value="formulacoes">Formulações</option>
            <option value="modos-acoes">Modos de Ações</option>
            <option value="tecnicas-aplicacoes">Técnicas de Aplicações</option>
            <option value="pragas-nomes-comuns">Nomes Comuns de Pragas</option>
            <option value="produtos-tecnicos">Produtos Técnicos</option>
            <option value="classes-categorias-agronomicas">
              Classes e Categorias Agronômicas
            </option>
            <option value="ingredientes-ativos">Ingredientes Ativos</option>
            <option value="plantas-daninhas-nomes-comuns">
              Nomes Comuns de Plantas Daninhas
            </option>
            <option value="plantas-daninhas">Plantas Daninhas</option>
            <option value="classificacoes-ambientais">
              Classificações Ambientais
            </option>
            <option value="versao">Versão da API</option>
            <option value="health">Verificação de Status (Health)</option>
          </select>
          <button onClick={handleCarregarDados} disabled={loading}>
            {loading ? "Carregando..." : "Carregar Dados"}
          </button>
        </div>

        <div id="lista-dados">
          {loading && <p className={styles.loadingMessage}>Carregando...</p>}
          {error && <p className={styles.errorMessage}>Erro: {error}</p>}
          {data && !loading && !error && renderData(data, selectedEndpoint)}
        </div>
      </div>
    </div>
  );
}
