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

const Principal = () => {
  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [profissionais, setProfissionais] = useState<User[]>([]);
  const navigate = useNavigate();

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
        <form style={{ width: "70%", height: "100%" }}>
          <S.FormGroup>
            <S.FormRow style={{ alignItems: "end", width: "100%" }}>
              <S.FormGroup style={{ minWidth: "40%", width: "100%" }}>
                <S.FormFonte htmlFor="paciente">Paciente:</S.FormFonte>
                <S.SelectForm id="paciente" name="paciente">
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
              <S.DataForm type="date" id="data" name="data" />
            </S.FormGroup>
            <S.FormGroup>
              <S.FormFonte htmlFor="Turno">Turno:</S.FormFonte>
              <S.SelectForm id="turno" name="turno">
                <option value="manha">Manhã</option>
                <option value="tarde">Tarde</option>
              </S.SelectForm>
            </S.FormGroup>
          </S.FormRow>
          <S.FormGroup>
            <S.FormFonte htmlFor="observacoes">Observações:</S.FormFonte>
            <S.ObservacoesForm id="observacoes" name="observacoes" />
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
