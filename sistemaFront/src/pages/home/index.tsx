import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";
import CountButton from "../../components/CountButton";
import * as S from "./style";
import RegisterForm from "../../components/RegisterForm";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
    login();
    navigate("/listagem");
  };

  return (
    <S.Container>
      <S.LogoGroup>
        <a href="https://vite.dev" target="_blank">
          <S.Logo src={viteLogo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <S.Logo src={reactLogo} className="react" alt="React logo" />
        </a>
      </S.LogoGroup>
      <S.Title>Vite + React</S.Title>
      <S.Card>
        <CountButton />
      </S.Card>
      <S.Paragraph>Click on the Vite and React logos to learn more</S.Paragraph>
      <RegisterForm />
      <div>
        <h2>Login</h2>
        <button onClick={handleLogin}>Entrar</button>
      </div>
    </S.Container>
  );
};

export default Home;
