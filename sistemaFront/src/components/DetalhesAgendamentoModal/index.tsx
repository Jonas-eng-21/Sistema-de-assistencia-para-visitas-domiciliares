import React from "react";
import { Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Priority, type ScheduleResponseDTO } from "../../models/Schedule";
import * as S from "./style";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  open: boolean;
  onClose: () => void;
  schedule: ScheduleResponseDTO | null;
}

const formatarPrioridade = (prioridade: Priority): string => {
  switch (prioridade) {
    case Priority.VERMELHO:
      return "Alta";
    case Priority.AMARELO:
      return "Média";
    case Priority.VERDE:
      return "Baixa";
    default:
      return prioridade;
  }
};

const DetalhesAgendamentoModal: React.FC<Props> = ({
  open,
  onClose,
  schedule,
}) => {
  if (!schedule) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose}>
      <S.ModalBox>
        <S.Header>
          <S.Title>Detalhes do Agendamento</S.Title>
          <IconButton onClick={onClose} aria-label="Fechar">
            <CloseIcon />
          </IconButton>
        </S.Header>
        <S.DetailGrid>
          <S.Label>Status:</S.Label>
          <S.Value>
            <S.StatusBadge concluido={schedule.concluido}>
              {schedule.concluido ? "Concluído" : "Pendente"}
            </S.StatusBadge>
          </S.Value>

          <S.Label>Paciente:</S.Label>
          <S.Value>{schedule.paciente.nome}</S.Value>

          <S.Label>Profissional:</S.Label>
          <S.Value>
            {schedule.user.nome} ({schedule.user.profissao})
          </S.Value>

          <S.Label>Data:</S.Label>
          <S.Value>
            {format(
              new Date(schedule.dataAgendamento),
              "dd 'de' MMMM 'de' yyyy",
              { locale: ptBR }
            )}
          </S.Value>

          <S.Label>Turno:</S.Label>
          <S.Value>
            {schedule.turno.charAt(0) + schedule.turno.slice(1).toLowerCase()}
          </S.Value>

          <S.Label>Prioridade:</S.Label>
          <S.Value>{formatarPrioridade(schedule.prioridade)}</S.Value>

          <S.Label>Motivo:</S.Label>
          <S.Value>{schedule.motivoDoAtendimento}</S.Value>

          <S.Label>Observações:</S.Label>
          <S.Value>{schedule.observacao || "Nenhuma observação."}</S.Value>
        </S.DetailGrid>
      </S.ModalBox>
    </Modal>
  );
};

export default DetalhesAgendamentoModal;
