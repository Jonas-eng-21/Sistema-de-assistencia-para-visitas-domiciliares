import React, { useEffect } from "react";
import * as S from "./style";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, FormControl } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  senha: yup.string().required("Senha é obrigatória"),
});

type FormData = yup.InferType<typeof schema>;

const Login = () => {
  const { loginUser, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data: FormData) => {
    loginUser(data.email, data.senha);
  };

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/principal", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <S.Background>
      <S.Container>
        <S.Title>Agendamento de visitas</S.Title>
        <S.Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <S.TituloForm>Email:</S.TituloForm>
            <div className="padd">
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
              <FormControl sx={{width: "100%" }} variant="filled"  >
                <InputLabel
                  id="filled-basic"
                  htmlFor="filled-adornment-password"
                >
                  Senha
                </InputLabel>
                <FilledInput
                  id="filled-adornment-password"
                  type={showPassword ? "text" : "password"}
                  {...register("senha")}
                  error={!!errors.senha}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.senha?.message && (
                  <p style={{ color: "#d32f2f", marginTop: "4px" }}>
                    {errors.senha.message}
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
              Entrar
            </Button>
            {/* TODO: Tirar o cadastro antes do dia da aprensentação, o usuario só pode ser cadastrado pelo admin */}
            <div className="Txt" style={{ marginTop: "1.5rem" }}>
              <span>Não tem uma conta ainda? </span>
              <Link to="/cadastro" className="txt2">
                <span>Cadastre-se</span>
              </Link>
            </div>
          </form>
        </S.Card>
      </S.Container>
    </S.Background>
  );
};

export default Login;
