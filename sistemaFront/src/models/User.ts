export type Profession =
  | "MEDICO"
  | "ENFERMEIRO"
  | "ENFERMEIRO_CHEFE"
  | "ASSISTENTE_SOCIAL"
  | "PACIENTE"
  | "AGENTE_DE_SAÚDE_ACS"
  | "CLINICO_GERAL"
  | "NUTRICIONISTA"
  | "FISIOTERAPEUTA"
  | "DENTISTA"
  | "PSICOLOGO"
  | "PSIQUIATRA"
  | "PEDIATRA";


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
