import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Send,
  X,
  Sparkles,
  Loader2,
  Image as ImageIcon,
  Paperclip,
} from "lucide-react";
import styles from "./GeminiFloatingButton.module.css";
import ReactMarkdown from "react-markdown";

const GeminiFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  type Message = {
    id: number;
    text: string;
    image?: string | null;
    isUser: boolean;
    timestamp: Date;
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  type SelectedImage = {
    file: File;
    data: string;
    mimeType: string;
    preview: string;
  };

  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Função para chamar a API do Gemini
  const callGeminiAPI = async (
    userMessage: string,
    imageData: { data: string; mimeType: string } | null = null
  ) => {
    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          image: imageData, // Base64 da imagem se houver
          config: {
            model: "gemini-2.5-flash",
            thinkingBudget: 0,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na resposta da API: ${response.status}`);
      }

      const data = await response.json();
      return data.text || data.response;
    } catch (error) {
      console.error("Erro ao chamar API do Gemini:", error);
      return "Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.";
    }
  };

  // Função para converter arquivo para base64
  const fileToBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Remove o prefixo data:image/...;base64,
        if (typeof reader.result === "string") {
          const base64 = reader.result.split(",")[1];
          resolve({
            data: base64,
            mimeType: file.type,
          });
        } else {
          reject(new Error("Falha ao ler o arquivo como base64."));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Função para lidar com upload de imagem
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    if (file && file.type.startsWith("image/")) {
      // Verifica se o arquivo não é muito grande (máximo 4MB)
      if (file.size > 4 * 1024 * 1024) {
        alert("Imagem muito grande. Máximo 4MB.");
        return;
      }

      try {
        const imageData = await fileToBase64(file);
        setSelectedImage({
          file: file,
          data: (imageData as { data: string; mimeType: string }).data,
          mimeType: (imageData as { data: string; mimeType: string }).mimeType,
          preview: URL.createObjectURL(file),
        });
      } catch (error) {
        console.error("Erro ao processar imagem:", error);
        alert("Erro ao processar a imagem.");
      }
    }
    // Limpa o input para permitir selecionar a mesma imagem novamente
    event.target.value = "";
  };

  // Função para remover imagem selecionada
  const removeSelectedImage = () => {
    if (selectedImage?.preview) {
      URL.revokeObjectURL(selectedImage.preview);
    }
    setSelectedImage(null);
  };

  const handleSendMessage = async () => {
    if ((!message.trim() && !selectedImage) || isLoading) return;

    const userMessage =
      message.trim() || (selectedImage ? "Analise esta imagem" : "");
    setMessage("");

    // Adiciona mensagem do usuário
    const newUserMessage = {
      id: Date.now(),
      text: userMessage,
      image: selectedImage?.preview || null,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    // Chama a API do Gemini com imagem se houver
    const imageData = selectedImage
      ? {
          data: selectedImage.data,
          mimeType: selectedImage.mimeType,
        }
      : null;

    const aiResponse = await callGeminiAPI(userMessage, imageData);

    // Remove imagem selecionada após envio
    removeSelectedImage();

    // Adiciona resposta da IA
    const aiMessage = {
      id: Date.now() + 1,
      text: aiResponse,
      isUser: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: {
    key: string;
    shiftKey: any;
    preventDefault: () => void;
  }) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const clearChat = () => {
    setMessages([]);
    removeSelectedImage();
  };

  return (
    <div className={styles.container}>
      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <Sparkles className="w-5 h-5" />
              <span className={styles.headerTitle}>Gemini AI</span>
            </div>
            <div className={styles.headerActions}>
              <button
                onClick={clearChat}
                className={styles.headerButton}
                title="Limpar chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className={styles.messagesArea}>
            {messages.length === 0 ? (
              <div className={styles.emptyState}>
                <Sparkles className={styles.emptyStateIcon} />
                <p className={styles.emptyStateText}>
                  Olá! Como posso te ajudar hoje?
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${styles.messageContainer} ${
                    msg.isUser ? styles.user : styles.assistant
                  }`}
                >
                  <div
                    className={`${styles.message} ${
                      msg.isUser ? styles.user : styles.assistant
                    }`}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Imagem enviada"
                        className={styles.messageImage}
                      />
                    )}

                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              ))
            )}

            {/* Loading indicator */}
            {isLoading && (
              <div className={styles.loadingContainer}>
                <div className={styles.loadingMessage}>
                  <Loader2 className={styles.loadingSpinner} />
                  <span className={styles.loadingText}>Pensando...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={styles.inputArea}>
            {/* Preview da imagem selecionada */}
            {selectedImage && (
              <div className={styles.imagePreview}>
                <img
                  src={selectedImage.preview}
                  alt="Preview"
                  className={styles.previewImage}
                />
                <button
                  onClick={removeSelectedImage}
                  className={styles.removeImageButton}
                  title="Remover imagem"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            <div className={styles.inputContainer}>
              {/* Botão de upload */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className={styles.uploadButton}
                title="Enviar imagem"
              >
                <ImageIcon className="w-4 h-4" />
              </button>

              {/* Input de arquivo oculto */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className={styles.hiddenFileInput}
              />

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  selectedImage
                    ? "Descreva o que você quer saber sobre a imagem..."
                    : "Digite sua mensagem..."
                }
                rows={1}
                className={styles.textarea}
              />
              <button
                onClick={handleSendMessage}
                disabled={(!message.trim() && !selectedImage) || isLoading}
                className={styles.sendButton}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button onClick={toggleChat} className={styles.floatingButton}>
        {isOpen ? (
          <X className={styles.buttonIcon} />
        ) : (
          <>
            <MessageCircle className={styles.buttonIcon} />
            <span className={styles.buttonText}>Pergunte a IA</span>
            <div className={styles.statusIndicator}></div>
          </>
        )}
      </button>
    </div>
  );
};

export default GeminiFloatingButton;
