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
import Paper from "@mui/material/Paper";
import ControlPointTwoToneIcon from "@mui/icons-material/ControlPointTwoTone";
import { useNavigate } from "react-router-dom";

const Row = ({ patient }: { patient: Patient }) => {
  const [open, setOpen] = React.useState(false);

  const getPrioridadeColor = (prioridade: string | number) => {
    const prioridadeStr = String(prioridade).toUpperCase();
    switch (prioridadeStr) {
      case "VERMELHO":
      case "0":
        return "black";
      case "AMARELO":
      case "1":
        return "black";
      case "VERDE":
      case "2":
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
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{patient.nome}</TableCell>
        <TableCell>{patient.cpf}</TableCell>
        <TableCell>{patient.email}</TableCell>
        <TableCell>{patient.doenca}</TableCell>
        <TableCell>
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
      console.log("Pacientes carregados:", data);
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
                <TableCell />
                <TableCell>Nome</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Doença</TableCell>
                <TableCell>Prioridade</TableCell>
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
