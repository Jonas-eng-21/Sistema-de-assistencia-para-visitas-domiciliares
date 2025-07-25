import { useEffect, useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Header from "../../components/Header";
import * as S from "./style";

import { getAllUsersAPI } from "../../services/AuthService";
import { getAllPatientsAPI } from "../../services/PacienteService";
import { createScheduleAPI } from "../../services/AgendamentoService";
import { type User } from "../../models/User";
import { type Patient } from "../../models/Patient";
import {
  Shift,
  Priority,
  type ScheduleRequestDTO,
} from "../../models/Schedule";

const schema = yup.object({
  pacienteId: yup.number().required("Selecione um paciente."),
  userId: yup.number().required("Selecione um profissional."),
  dataAgendamento: yup.string().required("A data da visita é obrigatória."),
  turno: yup
    .string()
    .oneOf(Object.values(Shift))
    .required("Selecione um turno."),
  motivoDoAtendimento: yup.string().required("O motivo é obrigatório."),
  prioridade: yup
    .string()
    .oneOf(Object.values(Priority))
    .required("Selecione uma prioridade."),
  observacao: yup.string().required().default(""), // <-- Make required with default
});

type FormData = yup.InferType<typeof schema>;

const AgendarVisita = () => {
  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [profissionais, setProfissionais] = useState<User[]>([]);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      dataAgendamento: "",
      turno: Shift.MATUTINO,
      prioridade: Priority.VERDE,
      motivoDoAtendimento: "",
      observacao: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pacientesData, profissionaisData] = await Promise.all([
          getAllPatientsAPI(),
          getAllUsersAPI(),
        ]);
        setPacientes(pacientesData || []);
        setProfissionais(profissionaisData || []);
      } catch (error) {
        console.error("Erro ao buscar dados para o formulário:", error);
        toast.error(
          "Não foi possível carregar os dados de pacientes e profissionais."
        );
      }
    };
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const agendamentoParaAPI: ScheduleRequestDTO = {
        userId: data.userId,
        pacienteId: data.pacienteId,
        dataAgendamento: data.dataAgendamento,
        turno: data.turno as Shift,
        prioridade: data.prioridade as Priority,
        motivoDoAtendimento: data.motivoDoAtendimento,
        observacao: data.observacao || "",
      };

      await createScheduleAPI(agendamentoParaAPI);
      toast.success("Agendamento criado com sucesso!");
      navigate('/principal');
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      toast.error("Erro ao criar agendamento.");
    }
  };

  return (
    <S.Container>
      <Header />
      <S.Title>Agendamento de Visitas</S.Title>
      <S.Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.FormRow>
            <div style={{ width: "100%", paddingRight: 8 }}>
              <S.TituloForm>Paciente:</S.TituloForm>
              <Controller
                name="pacienteId"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth variant="filled">
                    <Select {...field} error={!!errors.pacienteId}>
                      {pacientes.map((paciente) => (
                        <MenuItem key={paciente.id} value={paciente.id}>
                          {paciente.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </div>
            <div style={{ width: "100%", paddingLeft: 8 }}>
              <S.TituloForm>Profissional:</S.TituloForm>
              <Controller
                name="userId"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth variant="filled">
                    <Select {...field} error={!!errors.userId}>
                      {profissionais.map((prof) => (
                        <MenuItem key={prof.id} value={prof.id}>
                          {prof.nome} - {prof.profissao}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </div>
          </S.FormRow>


          {/* Linha 2: Data e Turno */}
          <S.FormRow>
            <div style={{ width: "100%", paddingRight: 8 }}>
              <S.TituloForm>Data de agendamento:</S.TituloForm>
            <Controller
              name="dataAgendamento"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  label="Data da Visita"
                  variant="filled"
                  fullWidth
                  error={!!errors.dataAgendamento}
                  helperText={errors.dataAgendamento?.message}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
            </div>
            <div style={{ width: "100%", paddingLeft: 8 }}>
              <S.TituloForm>Turno:</S.TituloForm>
            <Controller
              name="turno"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth variant="filled">
                  <InputLabel>Turno</InputLabel>
                  <Select {...field} error={!!errors.turno}>
                    <MenuItem value={Shift.MATUTINO}>Manhã</MenuItem>
                    <MenuItem value={Shift.VESPERTINO}>Tarde</MenuItem>
                    <MenuItem value={Shift.NOTURNO}>Noite</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            </div>
          </S.FormRow>

          {/* Linha 3: Motivo e Prioridade */}
          <S.FormRow>
            <div style={{ width: "100%", paddingRight: 8 }}>
              <S.TituloForm>Motivo de atendimento:</S.TituloForm>
            <Controller
              name="motivoDoAtendimento"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Motivo do Atendimento"
                  variant="filled"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.motivoDoAtendimento}
                  helperText={errors.motivoDoAtendimento?.message}
                />
              )}
            />
            </div>
            <div style={{ width: "100%", paddingLeft: 8 }}>
              <S.TituloForm>Prioridade:</S.TituloForm>
            <Controller
              name="prioridade"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth variant="filled">
                  <InputLabel>Prioridade</InputLabel>
                  <Select {...field} error={!!errors.prioridade}>
                    <MenuItem value={Priority.VERDE}>Baixa (Verde)</MenuItem>
                    <MenuItem value={Priority.AMARELO}>
                      Média (Amarelo)
                    </MenuItem>
                    <MenuItem value={Priority.VERMELHO}>
                      Alta (Vermelho)
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            </div>
          </S.FormRow>

          {/* Linha 4: Observações */}
          <div style={{ width: "100%", paddingRight: 8 }}>
              <S.TituloForm>Observações (opcional):</S.TituloForm>
          <Controller
            name="observacao"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Observações (opcional)"
                variant="filled"
                fullWidth
                multiline
                rows={3}
                margin="normal"
              />
            )}
          />
          </div>

          {/* Linha 5: Botões */}
          <S.ButtonContainer>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate(-1)}
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
              Salvar Agendamento
            </Button>
          </S.ButtonContainer>

        </form>
      </S.Card>
    </S.Container>
  );
};

export default AgendarVisita;
