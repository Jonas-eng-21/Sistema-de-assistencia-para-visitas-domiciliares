import * as S from './style'

const Home = () => {
  return (
    <S.Container>
      <S.Title>Agendamento de visitas</S.Title>
      <S.Card>
        <S.LoginBoxText>
          Usuário:
        </S.LoginBoxText>
        <S.Input placeholder="Insira o seu usuário" />
        <S.LoginBoxText>
          Senha:
        </S.LoginBoxText>
        <S.Input type="password" placeholder="Insira a sua senha" />
        <S.Button>Entrar</S.Button>
      </S.Card>
    </S.Container>
  )
}

export default Home
