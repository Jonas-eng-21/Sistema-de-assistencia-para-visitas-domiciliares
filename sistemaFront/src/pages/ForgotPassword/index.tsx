import { useState } from 'react';
import * as S from "./style";
import { Button, MenuItem } from "@mui/material";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/password/forgot-password?email=${encodeURIComponent(email)}`, {
        method: 'POST',
      });


      if (response.ok) {
        setMessage('Se este e-mail estiver cadastrado, enviamos instruções para redefinição.');
      } else {
        setMessage('Erro ao enviar e-mail. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Erro de rede. Tente novamente.');
    }
  };

  return (
    <S.Background>
      <h2 className="text-xl font-bold mb-4">Esqueci minha senha</h2>
      <S.Card className="divcadastro" style={{ width: "100%", minWidth: "400px", alignItems: "stretch", padding: "20px" }}>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="email"
              style={{ alignSelf: "flex-start", fontWeight: "500", fontSize: "20px"}}
            >
              E-mail:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite seu e-mail"
              style={{
              padding: "10px 12px",
              border: "1px solid #bdbdbd",
              borderRadius: "8px",
              fontSize: "1rem",
              outline: "none",
              transition: "border-color 0.2s",
              background: "#f8fafc"
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "#1976d2")}
              onBlur={e => (e.currentTarget.style.borderColor = "#bdbdbd")}
            />
            <div style={{ display: "flex", flexDirection: "row", gap: "16px", justifyContent: "center" }}>
              <button
                type="button"
                className="custom-button"
                style={{
                  backgroundColor: "#bdbdbd",
                  color: "#000000",
                  padding: "10px 25px",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  boxShadow: "0 2px 8px rgba(189, 189, 189, 0.15)",
                  textTransform: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  maxWidth: "fit-content",
                  width: "auto",
                  minWidth: "unset",
                  alignSelf: "center"
                }}
                onClick={() => window.history.back()}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = "#9e9e9e")}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = "#bdbdbd")}
              >
                Voltar
              </button>
              <button
                type="submit"
                className="custom-button"
                style={{
                  backgroundColor: "#98B8F3",
                  color: "#000000",
                  padding: "10px",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  boxShadow: "0 2px 8px rgba(25, 118, 210, 0.15)",
                  textTransform: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  maxWidth: "fit-content",
                  width: "auto",
                  minWidth: "unset",
                  alignSelf: "center"
                }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = "#6f87b3")}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = "#98B8F3")}
              >
                Enviar instruções
              </button>
            </div>
          </div>
        </form>
        {message && <p className="mt-4 text-sm">{message}</p>}
      </S.Card>

    </S.Background>
  );
};

export default ForgotPassword;
