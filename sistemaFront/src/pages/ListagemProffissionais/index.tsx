import * as S from "./style";
import * as React from "react";
import Header from "../../components/Header";
import { getAllUsersAPI } from "../../services/AuthService"; 
import type { User } from "../../models/User";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ControlPointTwoToneIcon from "@mui/icons-material/ControlPointTwoTone";
import { useNavigate } from "react-router-dom";

const Row = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell sx={{ borderRight: "1px solid #e0e0e0" }} align="center">{user.nome}</TableCell>
      <TableCell sx={{ borderRight: "1px solid #e0e0e0" }} align="center">{user.email}</TableCell>
      <TableCell sx={{ borderRight: "1px solid #e0e0e0" }} align="center">{user.cpf}</TableCell>
      <TableCell sx={{ borderRight: "1px solid #e0e0e0" }} align="center">{user.profissao}</TableCell>
      <TableCell sx={{ borderRight: "1px solid #e0e0e0" }} align="center">{user.consenhoRegional}</TableCell>
      <TableCell sx={{ borderRight: "1px solid #e0e0e0" }} align="center">
        <span style={{ color: user.ativo ? "green" : "red", fontWeight: "bold" }}>
          {user.ativo ? "Sim" : "Não"}
        </span>
      </TableCell>
      <TableCell align="center">
        <Button
          onClick={() => navigate("/editar-profissional", { state: { id: user.id } })}
        >
          <EditIcon style={{ color: "black" }} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

const ListagemProfissionais = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsersAPI();
      if (data) {
        setUsers(data);
        console.log("Profissionais carregados:", data);
      }
    };

    fetchUsers();
  }, []);

  return (
    <S.Container>
      <Header />
      <S.ContainerTable>
        <Button
          className="button"
          onClick={() => navigate("/cadastro-de-profissional")}
        >
          <p className="text" style={{ textTransform: "none" }}>Novo Profissional</p>
          <ControlPointTwoToneIcon />
        </Button>
        <TableContainer component={Paper} className="table">
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ borderRight: "1px solid #e0e0e0", fontWeight: "bold" }}>Nome</TableCell>
                <TableCell align="center" sx={{ borderRight: "1px solid #e0e0e0", fontWeight: "bold" }}>Email</TableCell>
                <TableCell align="center" sx={{ borderRight: "1px solid #e0e0e0", fontWeight: "bold" }}>CPF</TableCell>
                <TableCell align="center" sx={{ borderRight: "1px solid #e0e0e0", fontWeight: "bold" }}>Profissão</TableCell>
                <TableCell align="center" sx={{ borderRight: "1px solid #e0e0e0", fontWeight: "bold" }}>Conselho Regional</TableCell>
                <TableCell align="center" sx={{ borderRight: "1px solid #e0e0e0", fontWeight: "bold" }}>Ativo</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <Row key={user.id} user={user} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </S.ContainerTable>
    </S.Container>
  );
};

export default ListagemProfissionais;
