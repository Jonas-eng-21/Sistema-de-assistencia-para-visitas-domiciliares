import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const err = error.response;

    if (typeof err?.data?.message === 'string') {
      toast.warning(err.data.message);
      return;
    }

    if (Array.isArray(err?.data.errors)) {
      for (const val of err?.data.errors) {
        toast.warning(val.description);
      }
    } else if (typeof err?.data.errors === "object") {
      for (const e in err?.data.errors) {
        toast.warning(err.data.errors[e][0]);
      }
    } else if (err?.data) {
      // Este caso agora é um fallback se a mensagem não for encontrada
      toast.warning(err.data);
    } else if (err?.status == 401) {
      toast.warning("Por favor, faça o login novamente.");
      window.history.pushState({}, "LoginPage", "/login");
    } else if (err) {
      toast.warning(err?.data);
    }
  } else {
    // Fallback para erros que não são do Axios
    toast.error("Ocorreu um erro inesperado.");
    console.error("Erro não tratado:", error);
  }
};