export const Shift = {
  MATUTINO : "MATUTINO",
  VESPERTINO : "VESPERTINO",
  NOTURNO : "NOTURNO",
} as const;
export type Shift = typeof Shift[keyof typeof Shift];

export const Priority = {
  VERMELHO : "VERMELHO",
  AMARELO : "AMARELO",
  VERDE : "VERDE",
} as const;
export type Priority = typeof Priority[keyof typeof Priority];

export type ScheduleRequestDTO = {
  userId: number;
  pacienteId: number;
  turno: Shift;
  dataAgendamento: string; // "YYYY-MM-DD"
  observacao: string;
  motivoDoAtendimento: string;
  prioridade: Priority;
};

export type ScheduleUpdateDTO = {
  concluido?: boolean;
  turno?: Shift;
  dataAgendamento?: string;
  observacao?: string;
  motivoDoAtendimento?: string;
  prioridade?: Priority;
};

type UserInfoDTO = {
  id: number;
  nome: string;
  profissao: string;
};

type PatientInfoDTO = {
  id: number;
  nome: string;
};

export type ScheduleResponseDTO = {
  id: number;
  concluido: boolean;
  user: UserInfoDTO;
  paciente: PatientInfoDTO;
  turno: Shift;
  dataAgendamento: string;
  dataCriacao: string;
  observacao: string;
  motivoDoAtendimento: string;
  prioridade: Priority;
};