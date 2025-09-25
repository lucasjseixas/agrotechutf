import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({});

export async function POST(request: {
  json: () =>
    | PromiseLike<{ message: any; image: any; config?: {} | undefined }>
    | { message: any; image: any; config?: {} | undefined };
}) {
  try {
    const { message, image, config = {} } = await request.json();

    if (!message && !image) {
      return NextResponse.json(
        { error: "Mensagem ou imagem é obrigatória" },
        { status: 400 }
      );
    }

    // Configurações padrão
    const defaultConfig = {
      model: "gemini-2.5-flash",
      thinkingConfig: {
        thinkingBudget: 0,
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
        topP: 0.8,
        topK: 40,
      },
    };

    // Mescla configurações padrão com as enviadas
    const finalConfig = { ...defaultConfig, ...config };

    // Constrói o conteúdo baseado no que foi enviado
    let contents = [];

    // Se houver imagem, adiciona primeiro
    if (image) {
      contents.push({
        inlineData: {
          mimeType: image.mimeType || "image/jpeg",
          data: image.data,
        },
      });
    }

    // Adiciona o texto
    if (message) {
      contents.push({ text: message });
    }

    // Gera o conteúdo usando a API do Gemini
    const response = await ai.models.generateContent({
      model: finalConfig.model,
      contents: contents,
      ...finalConfig.generationConfig,
    });

    // Retorna a resposta
    return NextResponse.json({
      text: response.text,
      success: true,
    });
  } catch (error) {
    console.error("Erro na API do Gemini:", error);

    // Tratamento de erros específicos
    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as any).message === "string" &&
      (error as any).message.includes("API key")
    ) {
      return NextResponse.json(
        { error: "Chave da API inválida ou ausente" },
        { status: 401 }
      );
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as any).message === "string" &&
      (error as any).message.includes("quota")
    ) {
      return NextResponse.json(
        { error: "Limite de quota excedido" },
        { status: 429 }
      );
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as any).message === "string" &&
      (error as any).message.includes("image")
    ) {
      return NextResponse.json(
        { error: "Erro ao processar a imagem" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
