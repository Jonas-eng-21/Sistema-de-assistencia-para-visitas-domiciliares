import axios from "axios";
import { handleError } from "../helpers/ErrorHandler.";
import type { UserProfileToken } from "../models/User";
import type { RegisterData } from "../context/AuthContext";

const api = "http://localhost:8080";

export const loginAPI = async (email: string, senha: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "/auth/login", {
      email: email,
      senha: senha,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (dados: RegisterData) => {
  try {
    const data = await axios.post(api + "/api/usuarios", {
      nome: dados.nome,
      email: dados.email,
      senha: dados.senha,
      cpf: dados.cpf,
      profissao: dados.profissao,
      consenhoRegional: dados.consenhoRegional,
      ativo: true,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
