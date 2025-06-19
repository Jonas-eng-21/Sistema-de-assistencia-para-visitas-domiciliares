import * as S from "./style";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NotificationBell from "../NotificationBell";
import LogoutButton from "../LogoutButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showOptions, setShowOptions] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleNotificationsClick = () => {
    console.log("Sino de notificações clicado!");
  };

  const renderAtalhos = () => (
    <>
      <p style={{ cursor: "pointer", transition: "background 0.2s, color 0.2s", borderRadius: "6px", padding: "4px 8px"}}
            onClick={() => navigate("/calendario")}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#f0f0f0";
              (e.currentTarget as HTMLElement).style.color = "#061a2e";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "inherit";
            }}
          > Calendário de<br />visitas</p>
      <p style={{ cursor: "pointer", transition: "background 0.2s, color 0.2s", borderRadius: "6px", padding: "4px 8px"}}
            onClick={() => navigate("/listagem")}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#f0f0f0";
              (e.currentTarget as HTMLElement).style.color = "#061a2e";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "inherit";
            }}
          > Listar<br />Pacientes</p>
      <p style={{ cursor: "pointer", transition: "background 0.2s, color 0.2s", borderRadius: "6px", padding: "4px 8px"}}
            onClick={() => navigate("/listagemProfissionais")}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#f0f0f0";
              (e.currentTarget as HTMLElement).style.color = "#061a2e";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "inherit";
            }}
          > Listar<br />Profissionais</p>
      <p style={{ cursor: "pointer", transition: "background 0.2s, color 0.2s", borderRadius: "6px", padding: "4px 8px"}}
            onClick={() => navigate("/cadastro-de-Paciente")}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#f0f0f0";
              (e.currentTarget as HTMLElement).style.color = "#061a2e";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "inherit";
            }}
          > Novo<br />Paciente</p>
      <p style={{ cursor: "pointer", transition: "background 0.2s, color 0.2s", borderRadius: "6px", padding: "4px 8px"}}
            onClick={() => navigate("/cadastro-de-Profissional")}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#f0f0f0";
              (e.currentTarget as HTMLElement).style.color = "#061a2e";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "inherit";
            }}
          > Novo<br />Profissional</p>
      <p style={{ cursor: "pointer", transition: "background 0.2s, color 0.2s", borderRadius: "6px", padding: "4px 8px"}}
            onClick={() => navigate("/agendar-visita")}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#f0f0f0";
              (e.currentTarget as HTMLElement).style.color = "#061a2e";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "inherit";
            }}
          > Nova<br />Visita</p>
    </>
  );

  return (
    <>
      <S.HeaderContainer>
        <S.HeaderAtalhos>
          {/* Sempre visível */}
          <p style={{ cursor: "pointer", transition: "background 0.2s, color 0.2s", borderRadius: "6px", padding: "4px 8px"}}
            onClick={() => navigate("/principal")}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#f0f0f0";
              (e.currentTarget as HTMLElement).style.color = "#061a2e";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "inherit";
            }}
          >
            Página<br />Inicial
          </p>

          {isSmallScreen && (
            <button
              onClick={toggleMobileMenu}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              <MenuIcon style={{ fontSize: 30, color: "#061a2e" }} />              
            </button>
          )}

          {!isSmallScreen ? (
            renderAtalhos()
          ) : (
            isMobileMenuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "60px",
                  left: "10px",
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  borderRadius: "8px",
                  padding: "10px",
                  zIndex: 999,
                }}
              >
                {renderAtalhos()}
              </div>
            )
          )}
        </S.HeaderAtalhos>

        <S.HeaderLadoDireito>
          <div style={{ display: "flex" }}>
            {user && user.nome ? (
              <p>
                Bem-vindo(a)
                <br />
                {user.nome.split(" ").slice(0, 2).join(" ")}
              </p>
            ) : (
              <p>
                Bem-vindo(a)
                <br />
              </p>
            )}
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

          <div style={{ position: "relative" }}>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "45px",
              }}
              onClick={() => setShowOptions((prev) => !prev)}
            >
              <img
                src="/Opcoes.svg"
                alt="Menu de opções"
                style={{ width: 35, height: 35 }}
              />
            </button>
            {showOptions && (
              <div
                style={{
                  position: "absolute",
                  top: "45px",
                  right: 0,
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  borderRadius: "8px",
                  zIndex: 1000,
                  minWidth: "120px",
                  padding: "10px",
                }}
              ></div>
            )}
          </div>

          <NotificationBell onClick={handleNotificationsClick} />
          <LogoutButton onClick={logout} />
        </S.HeaderLadoDireito>
      </S.HeaderContainer>
    </>
  );
};

export default Header;