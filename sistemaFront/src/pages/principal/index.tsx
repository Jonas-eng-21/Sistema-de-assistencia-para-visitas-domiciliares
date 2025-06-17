import * as S from './style'
import Header from '../../components/Header'
import React from 'react';
import { useNavigate } from 'react-router-dom'
import CardAgendamentos from '../../components/CardAgendamentos';
import ActionButton from '../../components/ActionButton';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListAltIcon from '@mui/icons-material/ListAlt';

const Principal = () => {
  React.useEffect(() => {
    document.title = "Página Inicial - Agendamento de visitas";
  }, []);
  const navigate = useNavigate()

  return (
    <S.Container>
      <Header />
      <div style={{ display: "flex", width: "100%" }}>
        <S.LadoEsquerdo>
          <CardAgendamentos />
        </S.LadoEsquerdo>
        <S.LadoDireito>
          <ActionButton
            label="Agendar<br />Visita"
            icon={<EventAvailableIcon />}
            onClick={() => navigate('/agendar-visita')}
            color="#6484c2"
          />
          <ActionButton
            label="Calendário<br />de Visitas"
            icon={<CalendarMonthIcon />}
            onClick={() => navigate('/calendario')}
            color="#6484c2"
          />
          <ActionButton
            label="Listar<br />Pacientes"
            icon={<ListAltIcon />}
            onClick={() => navigate('/listagem')}
            color="#6484c2"
          />
        </S.LadoDireito>
      </div>
    </S.Container>
  )
}

export default Principal
