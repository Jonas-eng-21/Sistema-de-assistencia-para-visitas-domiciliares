import * as S from "./style";
import RegisterForm from "../../components/RegisterForm";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header";

const ListagemPaciente = () => {
  const { logout } = useAuth();
  return (
    <S.Container>
      <Header />
      <RegisterForm />
      <button onClick={logout}>Sair</button>
    </S.Container>
  );
};

export default ListagemPaciente;
