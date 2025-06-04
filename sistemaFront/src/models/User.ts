export type Profession = "MEDICO" | "ENFERMEIRO" | "ASSISTENTE_SOCIAL" | "PSICOLOGO";


export type User = {
  id: number;
  nome: string;
  cpf: string;
  consenhoRegional: string;
  email: string;
  senha?: string;
  profissao: Profession;
  ativo: boolean;
};

export type UserProfileToken = {
  nome: string;
  cpf: string;
  consenhoRegional: string;
  email: string;
  profissao: Profession;
  ativo: boolean;
  token: string;
};

export type RegisterData = {
  nome: string;
  cpf: string;
  consenhoRegional: string;
  email: string;
  senha: string;
  profissao: Profession;
};
