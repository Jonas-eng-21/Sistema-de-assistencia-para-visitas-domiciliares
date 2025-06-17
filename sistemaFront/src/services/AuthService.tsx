import axios from "axios";
import { handleError } from "../helpers/ErrorHandler.";
import type { Profession, User, UserProfileToken } from "../models/User";
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

export const forgotPasswordAPI = async (email: string) => {
  try {
    const response = await axios.post(api + "/api/forgot-password", { email });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const getAllUsersAPI = async () => {
  try {
    const response = await axios.get<User[]>(api + "/api/usuarios");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const getUserByIdAPI = async (id: number) => {
  try {
    const response = await axios.get<User>(`${api}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const updateUserAPI = async (id: number, user: Partial<User>) => {
  try {
    const response = await axios.put<User>(`${api}/${id}`, user);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const deleteUserAPI = async (id: number) => {
  try {
    await axios.delete(`${api}/${id}`);
  } catch (error) {
    handleError(error);
  }
};


export const findUsersByNameAPI = async (name: string) => {
  try {
    const response = await axios.get<User[]>(`${api}/search/nome`, {
      params: { name },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const findUsersByProfessionAPI = async (profession: Profession) => {
  try {
    const response = await axios.get<User[]>(`${api}/search/profissao`, {
      params: { profession },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const getAllAtivosAPI = async () => {
  try {
    const response = await axios.get<User[]>(`${api}api/usuarios/ativos`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const getAllInativosAPI = async () => {
  try {
    const response = await axios.get<User[]>(`${api}api/usuarios/inativos`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};