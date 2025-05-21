export type Profissao = "MEDICO" | "ENFERMEIRO" | "ASSISTENTE_SOCIAL" | "PSICOLOGO"; // ajuste conforme seu Enum

export type UserProfile = {
  nome: string;
  cpf: string;
  consenhoRegional: string;
  email: string;
  profissao: string;
  ativo: boolean;
};

export type UserProfileToken = {
  cpf: string;
  consenhoRegional: string;
  profissao: string;
  ativo: boolean;
  email: string;
  nome: string;
  token: string;
};
