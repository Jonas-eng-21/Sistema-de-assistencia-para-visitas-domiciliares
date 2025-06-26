import { createContext, useEffect, useState } from "react";
import type { UserProfileToken } from "../models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

type UserContextType = {
  user: UserProfileToken | null;
  token: string | null;
  registerUser: (dados: RegisterData) => void;
  loginUser: (email: string, senha: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  isReady: boolean;
};

export type RegisterData = {
  nome: string;
  senha: string;
  cpf: string;
  consenhoRegional: string;
  email: string;
  profissao: string;
  ativo: boolean;
};


type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfileToken | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        setToken(token);
        setUser(parsedUser);
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      } catch (e) {
        console.error("Erro ao analisar o usuário do localStorage", e);
        toast.success("Erro ao analisar o usuário do localStorage");
        logout();
      }
    }

    setIsReady(true);
  }, []);

const registerUser = async (dados: RegisterData) => {
  try {
    const res = await registerAPI(dados);

    if (!res) {
      toast.warning("Erro no registro: resposta indefinida");
      return;
    }

    const userData: UserProfileToken = {
      nome: res.data.nome,
      cpf: res.data.cpf,
      consenhoRegional: res.data.consenhoRegional,
      email: res.data.email,
      profissao: res.data.profissao,
      ativo: res.data.ativo,
      token: res.data.token
    };

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(userData));

    axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;

    setToken(res.data.token);
    setUser(userData);

    toast.success("Registro e login efetuados com sucesso!");
    navigate("/principal");
  } catch (error) {
    console.error(error);
    toast.warning("Erro no registro", );
  }
};

  const loginUser = async (email: string, senha: string) => {
    await loginAPI(email, senha)
      .then((res) => {
        if (res) {
          const userData: UserProfileToken = {
            nome: res.data.nome,
            cpf: res.data.cpf,
            consenhoRegional: res.data.consenhoRegional,
            email: res.data.email,
            profissao: res.data.profissao,
            ativo: res.data.ativo,
            token: res.data.token
          };

          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(userData));

          axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.token;

          setToken(res.data.token);
          setUser(userData);

          toast.success("Login efetuado com sucesso!");
          navigate("/principal");
        }
      })
      .catch(() => toast.warning("Erro no login"));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setToken(null);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        registerUser,
        loginUser,
        logout,
        isLoggedIn,
        isReady,
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
