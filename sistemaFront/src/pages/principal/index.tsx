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
      <div style={{ display: "flex", width: "100%" }}>
        <S.LadoEsquerdo>
          <S.Subtitle>Agendamento de Visitas</S.Subtitle>
          <S.ProximasVisitas>
            <p> Listagem das proximas visitas </p>
          </S.ProximasVisitas>
        </S.LadoEsquerdo>
        <S.LadoDireito>
          <S.Button2>
            <img src="/calendar-plus.svg" alt="Agendar visita" style={{ width: 75, height: 85 }} />
            <S.TextoButton2>Agendar <br /> Visita</S.TextoButton2>
          </S.Button2>
          <S.Button2>
            <img src="/calendar.svg" alt="Calendário de visitas" style={{ width: 75, height: 85 }} />
            <S.TextoButton2>Calendário <br /> de visitas</S.TextoButton2>
          </S.Button2>
          <S.Button2>
            <img src="/list.svg" alt="Listar Pacientes" style={{ width: 75, height: 85 }} />
            <S.TextoButton2>Listar <br /> Pacientes</S.TextoButton2>
          </S.Button2>
        </S.LadoDireito>
      </div>
    </S.Container>
  )
}

export default Principal
