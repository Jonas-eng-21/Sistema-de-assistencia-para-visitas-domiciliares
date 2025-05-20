import * as S from './style'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    // aqui pode adicionar lógica de validação futuramente
    navigate('/principal')
  }

  return (
    <S.Background>
      <S.Container>
        <S.Title>Agendamento de visitas</S.Title>
        <S.Card>
          <S.LoginBoxText>Usuário:</S.LoginBoxText>
          <S.Input placeholder="Insira o seu usuário" />
          <S.LoginBoxText>Senha:</S.LoginBoxText>
          <S.Input type="password" placeholder="Insira a sua senha" />
          <S.Button onClick={handleLogin}>Entrar</S.Button>
        </S.Card>
      </S.Container>
    </S.Background>
  )
}

export default Home;
