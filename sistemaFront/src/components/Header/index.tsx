import { useNavigate } from "react-router-dom";
import * as S from "./style";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <>
      <S.HeaderContainer>
        <S.HeaderAtalhos>
          <p
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/principal")}
          >
            Página
            <br /> Inicial
          </p>
          <p>
            Calendário de <br /> de visitas
          </p>
          <p
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/listagem")}
          >
            Listar
            <br /> Pacientes
          </p>
          <p
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/cadastro-de-Paciente")}
          >
            Novo
            <br /> Paciente
          </p>
          <p
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/cadastro-de-Profissional")}
          >
            Novo
            <br /> Profissional
          </p>
          <p
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/agendar-visita")}
          >
            Nova
            <br /> Visita
          </p>
        </S.HeaderAtalhos>
        <S.HeaderLadoDireito>
          <p style={{ cursor: "pointer", color: "red" }} onClick={logout}>
            Logout
            <br />
          </p>
          <div style={{ display: "flex" }}>
            <p>
              Bem-vindo(a)
              <br /> {user?.nome || "Usuário"}
            </p>

            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "5px",
              }}
            >
              <img
                src="/account_circle.svg"
                alt="Conta do usuário"
                style={{ width: 35, height: 35 }}
              />
            </button>
          </div>

          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "5px",
            }}
          >
            <img
              src="/Opcoes.svg"
              alt="Sair"
              style={{ width: 35, height: 35 }}
            />
          </button>

          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "5px",
            }}
          >
            <img
              src="/notificacao.svg"
              alt="Sair"
              style={{ width: 35, height: 35 }}
            />
          </button>
        </S.HeaderLadoDireito>
      </S.HeaderContainer>
    </>
  );
};

export default Header;
