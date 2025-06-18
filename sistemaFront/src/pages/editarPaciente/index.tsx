import * as S from "./style";
import TextField from "@mui/material/TextField";
import { Button, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "../../components/Header";
import {
  getPatientByIdAPI,
  updatePatientAPI,
} from "../../services/PacienteService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const schema = yup.object({
  nome: yup.string().required("Nome é obrigatório"),
  cpf: yup
    .string()
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF deve estar no formato 000.000.000-00"
    )
    .required("CPF é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  doenca: yup.string().required("Doença é obrigatória"),
  observacao: yup.string().required(),
  cep: yup.string().required("CEP é obrigatório"),
  rua: yup.string().required("Rua é obrigatória"),
  numero: yup.string().required("Número é obrigatório"),
  bairro: yup.string().required("Bairro é obrigatória"),
  complemento: yup.string().required(),
  cidade: yup.string().required("Cidade é obrigatória"),
  estado: yup.string().required("Estado é obrigatória"),
  prioridade: yup
    .number()
    .oneOf([0, 1, 2], "Selecione uma prioridade válida")
    .required("Prioridade é obrigatória"),
});

type FormData = yup.InferType<typeof schema>;

const EditarPaciente = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const prioridadeToNumber = (prioridadeStr: string): number => {
    switch (prioridadeStr.toUpperCase()) {
      case "VERMELHO":
        return 0;
      case "AMARELO":
        return 1;
      case "VERDE":
        return 2;
      default:
        return 2;
    }
  };


  useEffect(() => {
    const fetchPaciente = async () => {
      if (!id) return;

      const paciente = await getPatientByIdAPI(Number(id));

      if (paciente) {
        reset({
          nome: paciente.nome,
          cpf: paciente.cpf,
          email: paciente.email,
          doenca: paciente.doenca,
          observacao: paciente.observacao,
          cep: paciente.cep,
          rua: paciente.rua,
          numero: paciente.numero,
          bairro: paciente.bairro,
          complemento: paciente.complemento,
          cidade: paciente.cidade,
          estado: paciente.estado,
          prioridade: prioridadeToNumber(String(paciente.prioridade)),
        });
      } else {
        toast.error("Paciente não encontrado");
      }
    };

    fetchPaciente();
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (!id) return;

      await updatePatientAPI(Number(id), {
        ...data,
        observacao: data.observacao ?? "",
        complemento: data.complemento ?? "",
      });
      toast.success("Paciente atualizado com sucesso!");
      navigate("/listagem");
    } catch (error) {
      console.error("Erro ao atualizar paciente:", error);
      toast.error("Erro ao atualizar paciente");
    }
  };

  return (
    <S.Container>
      <Header />
      <S.Title>Editar dados do Paciente</S.Title>
      <S.Card style={{ width: "100%", minWidth: "400px", alignItems: "stretch", padding: "20px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.ContainerInputs>
            <S.Entrada>
              <S.TituloForm>Nome:</S.TituloForm>
              <TextField
                fullWidth
                label="Nome"
                variant="filled"
                {...register("nome")}
                error={!!errors.nome}
                helperText={errors.nome?.message}
              />
            </S.Entrada>
          </S.ContainerInputs>
          <S.ContainerInputs>
            <S.Entrada>
              <S.TituloForm>CPF:</S.TituloForm>
              <TextField
                fullWidth
                label="CPF"
                variant="filled"
                {...register("cpf")}
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
              />
            </S.Entrada>
          </S.ContainerInputs>
          <S.ContainerInputs>
            <S.Entrada>
              <S.TituloForm>Email:</S.TituloForm>
              <TextField
                fullWidth
                label="Email"
                variant="filled"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </S.Entrada>
          </S.ContainerInputs>
          <S.ContainerInputs>
            <S.Entrada>
              <S.TituloForm>Doença:</S.TituloForm>
              <TextField
                fullWidth
                label="Doença"
                variant="filled"
                {...register("doenca")}
                error={!!errors.doenca}
                helperText={errors.doenca?.message}
              />
            </S.Entrada>
            <S.Entrada>
              <S.TituloForm>CEP:</S.TituloForm>
              <TextField
                fullWidth
                label="CEP"
                variant="filled"
                {...register("cep")}
                error={!!errors.cep}
                helperText={errors.cep?.message}
              />
            </S.Entrada>
          </S.ContainerInputs>
          <S.ContainerInputs>
            <S.Entrada>
              <S.TituloForm>Rua:</S.TituloForm>
              <TextField
                fullWidth
                label="Rua"
                variant="filled"
                {...register("rua")}
                error={!!errors.rua}
                helperText={errors.rua?.message}
              />
            </S.Entrada>
          </S.ContainerInputs>
          <S.ContainerInputs>
            <S.Entrada>
              <S.TituloForm>Número:</S.TituloForm>
              <TextField
                fullWidth
                label="Número"
                variant="filled"
                {...register("numero")}
                error={!!errors.numero}
                helperText={errors.numero?.message}
              />
            </S.Entrada>
            <S.Entrada>
              <S.TituloForm>Bairro:</S.TituloForm>
              <TextField
                fullWidth
                label="Bairro"
                variant="filled"
                {...register("bairro")}
                error={!!errors.bairro}
                helperText={errors.bairro?.message}
              />
            </S.Entrada>
          </S.ContainerInputs>
          <S.ContainerInputs>
            <S.Entrada>
              <S.TituloForm>Complemento:</S.TituloForm>
              <TextField
                fullWidth
                label="Complemento"
                variant="filled"
                {...register("complemento")}
                error={!!errors.complemento}
                helperText={errors.complemento?.message}
              />
            </S.Entrada>
            <S.Entrada>
              <S.TituloForm>Cidade:</S.TituloForm>
              <TextField
                fullWidth
                label="Cidade"
                variant="filled"
                {...register("cidade")}
                error={!!errors.cidade}
                helperText={errors.cidade?.message}
              />
            </S.Entrada>
          </S.ContainerInputs>
          <S.ContainerInputs>
            <S.Entrada>
              <S.TituloForm>Estado:</S.TituloForm>
              <TextField
                fullWidth
                label="Estado"
                variant="filled"
                {...register("estado")}
                error={!!errors.estado}
                helperText={errors.estado?.message}
              />
            </S.Entrada>
            <S.Entrada>
              <S.TituloForm>Prioridade:</S.TituloForm>
              <TextField
                fullWidth
                select
                label="Prioridade"
                variant="filled"
                {...register("prioridade")}
                error={!!errors.prioridade}
                helperText={errors.prioridade?.message}
              >
                <MenuItem value={0}> <img src="/PrioridadeAlta.svg" style={{paddingRight: "5px", height: "10px"}}/> Vermelho</MenuItem>
                <MenuItem value={1}> <img src="/PrioridadeMedia.svg" style={{paddingRight: "5px", height: "10px"}}/> Amarelo</MenuItem>
                <MenuItem value={2}> <img src="/PrioridadeBaixa.svg" style={{paddingRight: "5px", height: "10px"}}/> Verde</MenuItem>
              </TextField>
            </S.Entrada>
          </S.ContainerInputs>
          <S.Entrada>
            <S.TituloForm>Observação:</S.TituloForm>
            <TextField
              fullWidth
              label="Observação"
              variant="filled"
              {...register("observacao")}
              error={!!errors.observacao}
              helperText={errors.observacao?.message}
            />
          </S.Entrada>
          <div style={{ display: "flex", gap: "16px" }}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/listagem")}
              sx={{
                backgroundColor: "#bdbdbd",
                color: "#000000",
                padding: "10px 0",
                borderRadius: "8px",
                fontSize: "1rem",
                boxShadow: "0 2px 8px rgba(189, 189, 189, 0.15)",
                textTransform: "none",
                transition: "background 0.2s",
                "&:hover": {
                  backgroundColor: "#9e9e9e",
                },
              }}
            >
              Voltar
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!isValid}
              sx={{
                backgroundColor: "#98B8F3",
                color: "#000000",
                padding: "10px 0",
                borderRadius: "8px",
                fontSize: "1rem",
                boxShadow: "0 2px 8px rgba(25, 118, 210, 0.15)",
                textTransform: "none",
                transition: "background 0.2s",
                "&:hover": {
                  backgroundColor: "#6f87b3",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#bdbdbd",
                  color: "#000000",
                },
              }}
            >
              Atualizar
            </Button>
          </div>
        </form>
      </S.Card>
    </S.Container>
  );
};

export default EditarPaciente;
