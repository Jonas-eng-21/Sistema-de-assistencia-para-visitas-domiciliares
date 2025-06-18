import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSchedulesAPI } from "../../services/AgendamentoService";
import { type ScheduleResponseDTO, Priority } from "../../models/Schedule";
import * as S from "./style";
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

const getPriorityInfo = (prioridade: Priority) => {
  switch (prioridade) {
    case Priority.VERMELHO:
      return { label: "ALTA" };
    case Priority.AMARELO:
      return { label: "MÉDIA" };
    case Priority.VERDE:
      return { label: "BAIXA" };
    default:
      return { label: "N/A" };
  }
};

const AgendamentosPreview: React.FC = () => {
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState<ScheduleResponseDTO[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const data = await getAllSchedulesAPI();
        if (data) {
          const sortedData = data.sort(
            (a, b) =>
              new Date(b.dataAgendamento).getTime() -
              new Date(a.dataAgendamento).getTime()
          );
          setAgendamentos(sortedData);
        }
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };

    fetchSchedules();
  }, []);

  const handleClick = (dataDoAgendamento: string) => {
    navigate('/calendario', {
      state: {
        targetDate: dataDoAgendamento
      }
    });
  };

  return (
    <S.Container>
      {agendamentos.length > 0 ? (
        agendamentos.map((agendamento) => (
          <S.Card
            key={agendamento.id}
            prioridade={agendamento.prioridade}
            onClick={() => handleClick(agendamento.dataAgendamento)}
          >
            <InfoOutlineIcon /> 
            <S.InfoContainer>
              <S.InfoText>
                <strong>Data:</strong>{" "}
                {new Date(agendamento.dataAgendamento).toLocaleDateString(
                  "pt-BR",
                  { timeZone: "UTC" }
                )}
              </S.InfoText>
              <S.InfoText>
                <strong>Paciente:</strong> {agendamento.paciente.nome}
              </S.InfoText>
              <S.InfoText>
                <strong>Prioridade:</strong>{" "}
                {getPriorityInfo(agendamento.prioridade).label}
              </S.InfoText>
            </S.InfoContainer>
          </S.Card>
        ))
      ) : (
        <p>Nenhum agendamento encontrado.</p>
      )}
    </S.Container>
  );
};

export default AgendamentosPreview;
