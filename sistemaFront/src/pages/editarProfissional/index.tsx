import * as S from "./style";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserByIdAPI, updateUserAPI } from "../../services/AuthService";
import type { Profession, User } from "../../models/User";

const schema = yup.object({
  nome: yup.string().required("Nome é obrigatório"),
  cpf: yup
    .string()
    .matches(/^\d{11}$/, "CPF deve conter 11 dígitos numéricos")
    .required("CPF é obrigatório"),
  consenhoRegional: yup.string().required("Conselho Regional é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  profissao: yup.string().required("Profissão é obrigatória"),
});

type FormData = yup.InferType<typeof schema>;

const EditarProfissional = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (!id) {
      toast.error("ID do profissional não fornecido.");
      navigate("/listagem-profissionais");
      return;
    }

    const fetchProfissional = async () => {
      try {
        const user = await getUserByIdAPI(Number(id));
        if (user) {
          reset({
            nome: user.nome,
            cpf: user.cpf,
            email: user.email,
            consenhoRegional: user.consenhoRegional,
            profissao: user.profissao,
          });
          console.log("Dados do profissional", user);
        } else {
          toast.error("Profissional não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do profissional:", error);
        toast.error("Erro ao buscar dados do profissional.");
      }
    };

    fetchProfissional();
  }, [id, reset, navigate]);

  const onSubmit = async (data: FormData) => {
    try {
      const updateData: Partial<User> = {
        ...data,
        profissao: data.profissao as Profession,
      };

      await updateUserAPI(Number(id), updateData);
      toast.success("Profissional atualizado com sucesso!");
      navigate("/listagemProfissionais");
    } catch (error) {
      console.error("Erro ao atualizar profissional:", error);
      toast.error("Erro ao atualizar profissional");
    }
  };

  return (
    <S.Container>
      <Header />
      <S.Title>Editar Dados do Profissional</S.Title>
      <S.Card style={{ padding: "20px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Nome"
            variant="filled"
            {...register("nome")}
            error={!!errors.nome}
            helperText={errors.nome?.message}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <TextField
            fullWidth
            label="CPF"
            variant="filled"
            {...register("cpf")}
            error={!!errors.cpf}
            helperText={errors.cpf?.message}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            variant="filled"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Conselho Regional"
            variant="filled"
            {...register("consenhoRegional")}
            error={!!errors.consenhoRegional}
            helperText={errors.consenhoRegional?.message}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <FormControl fullWidth variant="filled" margin="normal">
            <InputLabel id="profissao-label">Profissão</InputLabel>
            <Select
              labelId="profissao-label"
              defaultValue=""
              {...register("profissao")}
              error={!!errors.profissao}
            >
              <MenuItem value="MEDICO">Médico</MenuItem>
              <MenuItem value="ENFERMEIRO">Enfermeiro</MenuItem>
              <MenuItem value="ENFERMEIRO_CHEFE">Enfermeiro Chefe</MenuItem>
              <MenuItem value="ASSISTENTE_SOCIAL">Assistente Social</MenuItem>
              <MenuItem value="AGENTE_DE_SAÚDE_ACS">
                Agente de Saúde (ACS)
              </MenuItem>
              <MenuItem value="CLINICO_GERAL">Clínico Geral</MenuItem>
              <MenuItem value="NUTRICIONISTA">Nutricionista</MenuItem>
              <MenuItem value="FISIOTERAPEUTA">Fisioterapeuta</MenuItem>
              <MenuItem value="DENTISTA">Dentista</MenuItem>
              <MenuItem value="PSICOLOGO">Psicólogo</MenuItem>
              <MenuItem value="PSIQUIATRA">Psiquiatra</MenuItem>
              <MenuItem value="PEDIATRA">Pediatra</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!isValid}
            sx={{ mt: 2 }}
          >
            Atualizar Profissional
          </Button>
        </form>
      </S.Card>
    </S.Container>
  );
};

export default EditarProfissional;
