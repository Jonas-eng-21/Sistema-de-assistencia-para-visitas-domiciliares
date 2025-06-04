import * as S from "./style";
import TextField from "@mui/material/TextField";
import { Button, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "../../components/Header";
import { createPatientAPI } from "../../services/PacienteService";
import { toast } from "react-toastify";

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
  observacao: yup.string().notRequired(),
  cep: yup.string().required("CEP é obrigatório"),
  rua: yup.string().required("Rua é obrigatória"),
  numero: yup.string().required("Número é obrigatório"),
  bairro: yup.string().required("Bairro é obrigatória"),
  complemento: yup.string().notRequired(),
  cidade: yup.string().required("Cidade é obrigatória"),
  estado: yup.string().required("Estado é obrigatória"),
  prioridade: yup
    .number()
    .oneOf([0, 1, 2], "Selecione uma prioridade válida")
    .required("Prioridade é obrigatória"),
});

type FormData = yup.InferType<typeof schema>;

const CadastroPaciente = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createPatientAPI({
        ...data,
        observacao: data.observacao ?? "",
        complemento: data.complemento ?? "",
        ativo: true,
      });
      toast.success("Paciente cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
      toast.error("Erro ao cadastrar paciente");
    }
  };

  return (
    <S.Container>
      <Header />
      <S.Title>Cadastro de Paciente</S.Title>
      <S.Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.ContainerInputs>
            <S.Entrada>
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
          <S.ContainerInputs><S.Entrada>
            <TextField
              fullWidth
              select
              label="Prioridade"
              variant="filled"
              {...register("prioridade")}
              error={!!errors.prioridade}
              helperText={errors.prioridade?.message}>
              <MenuItem value={0}>Vermelho</MenuItem>
              <MenuItem value={1}>Amarelo</MenuItem>
              <MenuItem value={2}>Verde</MenuItem>
            </TextField>
          </S.Entrada>
          </S.ContainerInputs>
          <S.ContainerInputs>
            <S.Entrada>
              <TextField
                fullWidth
                label="Doença"
                variant="filled"
                {...register("doenca")}
                error={!!errors.doenca}
                helperText={errors.doenca?.message}
              />
            </S.Entrada>
          </S.ContainerInputs>
          <S.ContainerInputs>
            <S.Entrada>
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
              <TextField
                fullWidth
                label="Complemento"
                variant="filled"
                {...register("complemento")}
                error={!!errors.complemento}
                helperText={errors.complemento?.message}
              />
            </S.Entrada>
          </S.ContainerInputs>
          <S.ContainerInputs>
            <S.Entrada>
              <TextField
                fullWidth
                label="Bairro"
                variant="filled"
                {...register("bairro")}
                error={!!errors.bairro}
                helperText={errors.bairro?.message}
              />
            </S.Entrada>
            <S.Entrada>
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
              <TextField
                fullWidth
                label="Cidade"
                variant="filled"
                {...register("cidade")}
                error={!!errors.cidade}
                helperText={errors.cidade?.message}
              />
            </S.Entrada>
            <S.Entrada>
              <TextField
                fullWidth
                label="Estado"
                variant="filled"
                {...register("estado")}
                error={!!errors.estado}
                helperText={errors.estado?.message}
              />
            </S.Entrada>
          </S.ContainerInputs>
          <S.Entrada>
            <TextField
              fullWidth
              label="Observação"
              variant="filled"
              {...register("observacao")}
              error={!!errors.observacao}
              helperText={errors.observacao?.message}
            />
          </S.Entrada>
          <Button
            type="submit"
            variant="contained"
            className="button"
            fullWidth
            disabled={!isValid}
          >
            Cadastrar
          </Button>
        </form>
      </S.Card>
    </S.Container>
  );
};

export default CadastroPaciente;
