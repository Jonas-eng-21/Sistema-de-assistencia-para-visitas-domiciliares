import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import CountButton from '../../components/CountButton'
import * as S from './style'

const Home = () => {
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
      <S.Paragraph>
        Click on the Vite and React logos to learn more
      </S.Paragraph>
    </S.Container>
  )
}

export default Home
