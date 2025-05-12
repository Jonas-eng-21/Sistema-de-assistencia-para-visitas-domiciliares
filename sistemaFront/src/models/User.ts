export type Profissao = "MEDICO" | "ENFERMEIRO" | "ASSISTENTE_SOCIAL" | "PSICOLOGO"; // ajuste conforme seu Enum

export type User = {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  consenhoRegional: string;
  profissao: Profissao;
  ativo?: boolean;
};

// Se futuramente tiver login com JWT, mantenha isso:
export type UserProfileToken = {
  email: string;
  nome: string;
  token: string;
};
