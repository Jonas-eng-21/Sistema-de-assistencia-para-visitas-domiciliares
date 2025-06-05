import { useState } from "react";
import { forgotPasswordAPI } from "../../services/AuthService";
import { toast } from "react-toastify";
import * as S from "../Login/style";
import { Button, TextField } from "@mui/material";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await forgotPasswordAPI(email);

      if (response?.status === 200) {
        toast.success(
          "Se este e-mail estiver cadastrado, enviamos instruções para redefinição."
        );
        setMessage(
          "Se este e-mail estiver cadastrado, enviamos instruções para redefinição."
        );
      } else {
        toast.info("Erro ao enviar e-mail. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar e-mail de redefinição:", error);
      toast.error("Erro de rede. Tente novamente.");
    }
  };

  return (
    <>
      <S.Background>
        <S.Container style={{ width: "auto", minWidth: "400px" }}>
          <S.Title>Recuperação de Senha</S.Title>
          <S.Card
            className="divcadastro"
            style={{ width: "100%", alignItems: "stretch" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="padd">
                <S.TituloForm>Email:</S.TituloForm>
                <TextField
                  fullWidth
                  label="Digite seu e-mail"
                  variant="filled"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {message && (
                <p
                  style={{
                    color: "#388e3c",
                    marginTop: "8px",
                    fontSize: "0.9rem",
                  }}
                >
                  {message}
                </p>
              )}
              <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => window.history.back()}
                  sx={{
                    backgroundColor: "#bdbdbd",
                    color: "#000000",
                    padding: "10px 0",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    boxShadow: "0 2px 8px rgba(189, 189, 189, 0.15)",
                    textTransform: "none",
                    transition: "background 0.2s",
                    "&:hover": {
                      backgroundColor: "#9e9e9e",
                    },
                  }}
                >
                  Voltar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  className="button"
                  fullWidth
                  sx={{
                    backgroundColor: "#98B8F3",
                    color: "#000000",
                    padding: "10px 0",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    boxShadow: "0 2px 8px rgba(25, 118, 210, 0.15)",
                    textTransform: "none",
                    transition: "background 0.2s",
                    "&:hover": {
                      backgroundColor: "#6f87b3",
                    },
                  }}
                >
                  Enviar instruções
                </Button>
              </div>
            </form>
          </S.Card>
        </S.Container>
      </S.Background>
    </>
  );
};

export default ForgotPassword;
