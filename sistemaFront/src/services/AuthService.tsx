import axios from "axios";
import { handleError } from "../helpers/ErrorHandler.";
import type { UserProfileToken } from "../models/User";

const api = "http://localhost:8080";

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/login", {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await axios.post(api + "/api/usuarios", {
      nome: username,               
      email: email,
      senha: password,             
      cpf: "000.000.000-00",        
      profissao: "MEDICO",          
      consenhoRegional: "CRM0000", 
      ativo: true                   
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
