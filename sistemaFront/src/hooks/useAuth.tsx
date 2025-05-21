import { useContext } from "react";
import { UserContext } from "../context/AuthContext";

export const useAuth = () => useContext(UserContext);
