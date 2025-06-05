import { useEffect, useState } from "react";
import * as S from "./style";
import Header from "../../components/Header";
import { getAllPatientsAPI } from "../../services/PacienteService";
import { getAllUsersAPI } from "../../services/AuthService";
import type { User } from "../../models/User";
import type { Patient } from "../../models/Patient";
import { Button } from "@mui/material";
import ControlPointTwoToneIcon from "@mui/icons-material/ControlPointTwoTone";
import { useNavigate } from "react-router-dom";
import { createScheduleAPI } from "../../services/AgendamentoService";
import { toast } from "react-toastify";

const Principal = () => {
  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [profissionais, setProfissionais] = useState<User[]>([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pacienteId: "",
    profissionalId: "",
    data: "",
    turno: "MANHA",
    motivo: "",
    prioridade: "ALTA",
    observacoes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const agendamento = {
        pacienteId: parseInt(formData.pacienteId),
        profissionalId: parseInt(formData.profissionalId),
        dataVisita: formData.data,
        turno: formData.turno.toUpperCase(),
        motivoDoAtendimento: formData.motivo,
        prioridade:
          formData.prioridade === "0"
            ? "ALTA"
            : formData.prioridade === "1"
            ? "MEDIA"
            : "BAIXA",
        observacao: formData.observacoes || undefined,
      };

      await createScheduleAPI(agendamento);
      toast.success("Agendamento criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      toast.error("Erro ao criar agendamento.");
    }
  };

  useEffect(() => {
    document.title = "Página Inicial - Agendamento de visitas";

    const fetchDados = async () => {
      try {
        const pacientesResponse = await getAllPatientsAPI();
        setPacientes(pacientesResponse || []);

        const profissionaisResponse = await getAllUsersAPI();
        setProfissionais(profissionaisResponse || []);
      } catch (error) {
        console.error("Erro ao buscar pacientes ou profissionais:", error);
      }
    };

    fetchDados();
  }, []);

  return (
    <S.Container>
      <Header />
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <S.AgendamentoTitle>Agendamento de Visitas</S.AgendamentoTitle>
        <form style={{ width: "70%", height: "100%" }} onSubmit={handleSubmit}>
          <S.FormGroup>
            <S.FormRow style={{ alignItems: "end", width: "100%" }}>
              <S.FormGroup style={{ minWidth: "40%", width: "100%" }}>
                <S.FormFonte htmlFor="paciente">Paciente:</S.FormFonte>
                <S.SelectForm
                  onChange={(e) =>
                    setFormData({ ...formData, pacienteId: e.target.value })
                  }
                  id="paciente"
                  name="paciente"
                  value={formData.pacienteId}
                >
                  {pacientes.map((paciente) => (
                    <option key={paciente.id} value={paciente.id}>
                      {paciente.nome}
                    </option>
                  ))}
                </S.SelectForm>
              </S.FormGroup>
              <S.FormGroup
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                }}
              >
                <S.TextoAjuda style={{ textAlign: "center", marginBottom: 5 }}>
                  Caso não encontre, <br /> cadastre um novo paciente:
                </S.TextoAjuda>
              </S.FormGroup>
              <S.FormGroup style={{ display: "flex", alignItems: "start" }}>
                <Button
                  className="button"
                  onClick={() => navigate("/cadastro-de-Paciente")}
                >
                  <p className="text">Novo Paciente</p>
                  <ControlPointTwoToneIcon />
                </Button>
              </S.FormGroup>
            </S.FormRow>
          </S.FormGroup>
          <S.FormGroup>
            <S.FormFonte htmlFor="paciente">Profissional:</S.FormFonte>
            <S.SelectForm
              id="profissional"
              name="profissional"
              style={{ width: "43%" }}
              value={formData.profissionalId}
              onChange={(e) =>
                setFormData({ ...formData, profissionalId: e.target.value })
              }
            >
              {profissionais.map((prof) => (
                <option key={prof.id} value={prof.id}>
                  {prof.nome} - {prof.profissao}
                </option>
              ))}
            </S.SelectForm>
          </S.FormGroup>
          <S.FormRow>
            <S.FormGroup>
              <S.FormFonte htmlFor="data">Data da Visita:</S.FormFonte>
              <S.DataForm
                type="date"
                id="data"
                name="data"
                value={formData.data}
                onChange={(e) =>
                  setFormData({ ...formData, data: e.target.value })
                }
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.FormFonte htmlFor="Turno">Turno:</S.FormFonte>
              <S.SelectForm
                id="turno"
                name="turno"
                value={formData.turno}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    turno: e.target.value.toUpperCase(),
                  })
                }
              >
                <option value="MANHA">Manhã</option>
                <option value="TARDE">Tarde</option>
              </S.SelectForm>
            </S.FormGroup>
          </S.FormRow>
          <S.FormRow>
            <S.FormGroup style={{ width: "100%" }}>
              <S.FormFonte htmlFor="motivoAtendimento">
                Motivo do Atendimento:
              </S.FormFonte>
              <S.ObservacoesForm
                id="motivoAtendimento"
                name="motivoAtendimento"
                placeholder="Descreva brevemente o motivo do atendimento"
                value={formData.motivo}
                onChange={(e) =>
                  setFormData({ ...formData, motivo: e.target.value })
                }
              />
            </S.FormGroup>

            <S.FormGroup style={{ width: "100%" }}>
              <S.FormFonte htmlFor="prioridade">Prioridade:</S.FormFonte>
              <S.SelectForm
                id="prioridade"
                name="prioridade"
                value={formData.prioridade}
                onChange={(e) =>
                  setFormData({ ...formData, prioridade: e.target.value })
                }
              >
                <option value="0">Vermelho</option>
                <option value="1">Amarelo</option>
                <option value="2">Verde</option>
              </S.SelectForm>
            </S.FormGroup>
          </S.FormRow>
          <S.FormGroup>
            <S.FormFonte htmlFor="observacoes">Observações:</S.FormFonte>
            <S.ObservacoesForm
              id="observacoes"
              name="observacoes"
              value={formData.observacoes}
              onChange={(e) =>
                setFormData({ ...formData, observacoes: e.target.value })
              }
            />
          </S.FormGroup>
          <S.FormRow style={{ justifyContent: "center", marginTop: "30px" }}>
            <S.ButtonVoltar type="button">Voltar</S.ButtonVoltar>
            <S.ButtonAgendamento type="submit">Salvar</S.ButtonAgendamento>
          </S.FormRow>
        </form>
      </div>
    </S.Container>
  );
};

export default Principal;
