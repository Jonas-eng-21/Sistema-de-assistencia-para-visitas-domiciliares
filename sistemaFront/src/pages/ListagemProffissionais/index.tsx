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
      <TableCell>{user.nome}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.cpf}</TableCell>
      <TableCell>{user.profissao}</TableCell>
      <TableCell>{user.consenhoRegional}</TableCell>
      <TableCell>
        <span
          style={{ color: user.ativo ? "green" : "red", fontWeight: "bold" }}
        >
          {user.ativo ? "Sim" : "Não"}
        </span>
      </TableCell>
      <TableCell>
        <Button
          onClick={() =>
            navigate("/editar-profissional", { state: { id: user.id } })
          }
        >
          <EditIcon />
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
          <p className="text">Novo Profissional</p>
          <ControlPointTwoToneIcon />
        </Button>
        <TableContainer component={Paper} className="table">
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Profissão</TableCell>
                <TableCell>Conselho Regional</TableCell>
                <TableCell>Ativo</TableCell>
                <TableCell>Editar</TableCell>
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
