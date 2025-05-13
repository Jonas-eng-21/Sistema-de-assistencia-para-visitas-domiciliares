import * as S from './style'
import Header from '../../components/Header'
import React from 'react';

const Principal = () => {
  // Set the page title
  React.useEffect(() => {
    document.title = "Página Inicial - Agendamento de visitas";
  }, []);

  return (
    <S.Container>
      <Header />
      <S.Title>PAGINA INICIAL</S.Title>
    </S.Container>
  )
}

export default Principal
