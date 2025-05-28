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

const Row = ({ patient }: { patient: Patient }) => {
  const [open, setOpen] = React.useState(false);

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
        <TableCell>{patient.prioridade}</TableCell>
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
        <Button className="button">
          <p className="text">Novo Paciente</p>
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
