import * as S from "./style";
import * as React from "react";
import Header from "../../components/Header";
import { getAllPatientsAPI } from "../../services/PacienteService";
import type { Patient } from "../../models/Patient";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";
import ControlPointTwoToneIcon from "@mui/icons-material/ControlPointTwoTone";
import { useNavigate } from "react-router-dom";
import { Priority } from "../../models/Schedule";

const Row = ({ patient }: { patient: Patient }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const formatarPrioridade = (prioridade: Priority): string => {
    switch (prioridade) {
      case Priority.VERMELHO:
        return "Alta";
      case Priority.AMARELO:
        return "Média";
      case Priority.VERDE:
        return "Baixa";
      default:
        return prioridade;
    }
  };

  const getPrioridadeColor = (prioridade: Priority): string => {
    switch (prioridade) {
      case Priority.VERMELHO:
        return "black";
      case Priority.AMARELO:
        return "black";
      case Priority.VERDE:
        return "black";
      default:
        return "black";
    }
  };

  const getPrioridadeIcon = (prioridade: string | number) => {
    const prioridadeStr = String(prioridade).toUpperCase();
    switch (prioridadeStr) {
      case "VERMELHO":
      case "0":
        return "/PrioridadeAlta.svg";
      case "AMARELO":
      case "1":
        return "/PrioridadeMedia.svg";
      case "VERDE":
      case "2":
        return "/PrioridadeBaixa.svg";
      default:
        return "";
    }
  };

  const formatPrioridadeLabel = (prioridade: string | number) => {
    const prioridadeStr = String(prioridade).toUpperCase();
    switch (prioridadeStr) {
      case "VERMELHO":
      case "0":
        return "Vermelho";
      case "AMARELO":
      case "1":
        return "Amarelo";
      case "VERDE":
      case "2":
        return "Verde";
      default:
        return prioridadeStr;
    }
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={{ borderRight: "1px solid #e0e0e0" }}>{patient.nome}</TableCell>
        <TableCell sx={{ borderRight: "1px solid #e0e0e0" }}>{patient.cpf}</TableCell>
        <TableCell sx={{ borderRight: "1px solid #e0e0e0" }}>{patient.email}</TableCell>
        <TableCell sx={{ borderRight: "1px solid #e0e0e0" }}>{patient.doenca}</TableCell>
        <TableCell sx={{ borderRight: "1px solid #e0e0e0" }} align="center">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={getPrioridadeIcon(patient.prioridade)}
              style={{ paddingRight: "5px", height: "10px" }}
              alt="Ícone de prioridade"
            />
            <Typography
              component="span"
              sx={{
                color: getPrioridadeColor(patient.prioridade),
                fontWeight: "bold",
                fontSize: "0.875rem",
              }}
            >
              {formatPrioridadeLabel(patient.prioridade)}
            </Typography>
          </Box>
        </TableCell>
        <TableCell sx={{ borderRight: "1px solid #e0e0e0" }} align="center">
          <IconButton size="small" onClick={() => setOpen(!open)}>
            <img src="/observacao.svg" alt="Observações" style={{ height: 18, marginRight: 1 }} />
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* <TableCell>{patient.nome}</TableCell>
        <TableCell>{patient.cpf}</TableCell>
        <TableCell>{patient.email}</TableCell>
        <TableCell>{patient.doenca}</TableCell>
        <TableCell>
          <span
            style={{
              color: getPrioridadeColor(patient.prioridade),
              fontWeight: "bold",
            }}
          >
            {formatarPrioridade(patient.prioridade)}
          </span>
        </TableCell> */}
        <TableCell>
              <Box display="flex" justifyContent="center">
              <Button
                onClick={() =>
                navigate("/editar-paciente", { state: { id: patient.id } })
                }
              >
                <EditIcon style={{ color: "black" }} />
              </Button>
              </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>            
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Observações
              </Typography>
              <Typography variant="body2">
                {patient.observacao || "Nenhuma observação registrada."}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const ListagemPaciente = () => {
  const [patients, setPatients] = React.useState<Patient[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchPatients = async () => {
      const data = await getAllPatientsAPI();
      if (data) setPatients(data);      
    };

    fetchPatients();
  }, []);

  return (
    <S.Container>
      <Header />
      <S.ContainerTable>
        <Button
          className="button"
          onClick={() => navigate("/cadastro-de-Paciente")}
        >
          <p className="text" style={{ textTransform: "none" }}>Novo Paciente</p>
          <ControlPointTwoToneIcon />
        </Button>
        <TableContainer component={Paper} className="table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ borderRight: "1px solid #e0e0e0", fontWeight: "bold" }}>Nome</TableCell>
                <TableCell align="center" sx={{ borderRight: "1px solid #e0e0e0", fontWeight: "bold" }}>CPF</TableCell>
                <TableCell align="center" sx={{ borderRight: "1px solid #e0e0e0", fontWeight: "bold" }}>Email</TableCell>
                <TableCell align="center" sx={{ borderRight: "1px solid #e0e0e0", fontWeight: "bold" }}>Doença</TableCell>
                <TableCell align="center" sx={{ borderRight: "1px solid #e0e0e0", fontWeight: "bold" }}>Prioridade</TableCell>
                <TableCell align="center" sx={{ borderRight: "1px solid #e0e0e0", fontWeight: "bold" }}>Observações</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Editar paciente</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <Row key={patient.id} patient={patient} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </S.ContainerTable>
    </S.Container>
  );
};

export default ListagemPaciente;
