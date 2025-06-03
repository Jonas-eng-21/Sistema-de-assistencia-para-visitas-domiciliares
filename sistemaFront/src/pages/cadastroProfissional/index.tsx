import React from "react";
import * as S from "../Login/style";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header";

const schema = yup.object({
  nome: yup.string().required("Nome é obrigatório"),
  cpf: yup
    .string()
    .matches(/^\d{11}$/, "CPF deve conter 11 dígitos numéricos")
    .required("CPF é obrigatório"),
  consenhoRegional: yup.string().required("Conselho Regional é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  senha: yup
    .string()
    .min(6, "Mínimo de 6 caracteres")
    .required("Senha é obrigatória"),
  profissao: yup.string().required("Profissão é obrigatória"),
});

type FormData = yup.InferType<typeof schema>;

const CadastroProfissional = () => {
  const { registerUser } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();

  const onSubmit = (data: FormData) => {
    registerUser({
      ...data,
      ativo: true,
    });
  };

  return (
      <S.Container>
        <Header />
        <S.Title>Cadastro de Profissional</S.Title>
        <S.Card className="divcadastro" style={{ width: "100%", minWidth: "400px", alignItems: "stretch", padding: "20px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="padd">
              <S.TituloForm>Nome:</S.TituloForm>
              <TextField
                fullWidth
                label="Nome"
                variant="filled"
                {...register("nome")}
                error={!!errors.nome}
                helperText={errors.nome?.message}
              />
            </div>
            <div className="padd">
              <S.TituloForm>CPF:</S.TituloForm>
              <TextField
                fullWidth
                label="CPF"
                variant="filled"
                {...register("cpf")}
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
              />
            </div>
            <div className="padd">
              <S.TituloForm>Conselho Regional:</S.TituloForm>
              <TextField
                fullWidth
                label="Conselho Regional"
                variant="filled"
                {...register("consenhoRegional")}
                error={!!errors.consenhoRegional}
                helperText={errors.consenhoRegional?.message}
              />
            </div>
            <div className="padd">
              <S.TituloForm>Email:</S.TituloForm>
              <TextField
                fullWidth
                label="Email"
                variant="filled"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </div>
            <div className="padd">
              <S.TituloForm>Senha:</S.TituloForm>
              <FormControl variant="filled" fullWidth>
                <InputLabel htmlFor="filled-password">Senha</InputLabel>
                <FilledInput
                  id="filled-password"
                  type={showPassword ? "text" : "password"}
                  {...register("senha")}
                  error={!!errors.senha}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.senha && (
                  <p style={{ color: "#d32f2f", marginTop: "4px" }}>
                    {errors.senha.message}
                  </p>
                )}
              </FormControl>
            </div>
            <div className="padd">
              <S.TituloForm>Profissão:</S.TituloForm>
              <FormControl fullWidth variant="filled">
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
                  <MenuItem value="ASSISTENTE_SOCIAL">
                    Assistente Social
                  </MenuItem>
                  <MenuItem value="PACIENTE">Paciente</MenuItem>
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
                {errors.profissao && (
                  <p style={{ color: "#d32f2f", marginTop: "4px" }}>
                    {errors.profissao.message}
                  </p>
                )}
              </FormControl>
            </div>
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
          </form>
        </S.Card>
      </S.Container>
  );
};

export default CadastroProfissional;
