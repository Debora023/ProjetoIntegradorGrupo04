import { useEffect, useState } from "react";

export default function ConsentModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("consentAccepted");
    if (!accepted) setShowModal(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("consentAccepted", "true");
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "10px",
          maxWidth: "500px",
          textAlign: "center",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>Termo de Consentimento</h2>
        <p
          style={{
            fontSize: "14px",
            textAlign: "justify",
            lineHeight: "1.5",
          }}
        >
          Eu autorizo a <strong>Clínica OdontoPrime</strong> a coletar e utilizar
          meus dados pessoais e de saúde para fins de contato, agendamento e
          tratamento odontológico.
        </p>
        <p
          style={{
            fontSize: "14px",
            textAlign: "justify",
            lineHeight: "1.5",
            marginTop: "10px",
          }}
        >
          Sei que meus dados serão tratados com segurança, não serão
          compartilhados com terceiros e que posso solicitar a exclusão ou
          correção a qualquer momento.
        </p>
        <p
          style={{
            fontSize: "14px",
            textAlign: "justify",
            lineHeight: "1.5",
            marginTop: "10px",
          }}
        >
          Em caso de dúvidas ou solicitações relacionadas à Lei nº
          13.709/2018 (LGPD), posso entrar em contato pelo e-mail:{" "}
          <a href="mailto:contato@odontoprime.com.br">
            contato@odontoprime.com.br
          </a>
        </p>

        <button
          onClick={handleAccept}
          style={{
            marginTop: "20px",
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            background: "#007bff",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
