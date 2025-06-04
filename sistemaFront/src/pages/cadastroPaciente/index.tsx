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
      <S.Card className="divcadastro" style={{ width: "100%", minWidth: "400px", alignItems: "stretch", padding: "20px" }}>
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
              <S.TituloForm>Prioridade:</S.TituloForm>
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
              <S.TituloForm>Doença(s):</S.TituloForm>
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
          </S.ContainerInputs>
          <S.ContainerInputs>
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
              onClick={() => window.history.back()}
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
              className="button"
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
              Cadastrar
            </Button>

          </div>

        </form>
      </S.Card>
    </S.Container>
  );
};

export default CadastroPaciente;
