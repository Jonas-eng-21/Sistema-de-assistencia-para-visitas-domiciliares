import * as S from "./style";
import RegisterForm from "../../components/RegisterForm";
import { useAuth } from "../../context/AuthContext";

const ListagemPaciente = () => {
  const { logout } = useAuth();
  return (
    <S.Container>
      <RegisterForm />
      <button onClick={logout}>Sair</button>
    </S.Container>
  );
};

export default ListagemPaciente;
