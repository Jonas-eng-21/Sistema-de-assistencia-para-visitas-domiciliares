import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Comentado para evitar chamadas à API

// Tipagem
interface Agendamento {
  id: number;
  data: string;
  pacienteNome: string;
  prioridade: 'ALTA' | 'MEDIA' | 'BAIXA';
}

// Mock de 5 agendamentos estáticos
const mockAgendamentos: Agendamento[] = [
  { id: 1, data: '10/06/2025', pacienteNome: 'João Silva', prioridade: 'ALTA' },
  { id: 2, data: '11/06/2025', pacienteNome: 'Maria Oliveira', prioridade: 'MEDIA' },
  { id: 3, data: '12/06/2025', pacienteNome: 'Carlos Souza', prioridade: 'BAIXA' },
  { id: 4, data: '13/06/2025', pacienteNome: 'Ana Paula', prioridade: 'MEDIA' },
  { id: 5, data: '14/06/2025', pacienteNome: 'Pedro Lima', prioridade: 'ALTA' },
];

const Container = styled.div`
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Card = styled.div<{ prioridade: 'ALTA' | 'MEDIA' | 'BAIXA' }>`
  background-color: white;
  border: 1px solid #ddd;
  border-left: 5px solid ${({ prioridade }) =>
    prioridade === 'ALTA' ? 'red' : prioridade === 'MEDIA' ? 'orange' : 'green'};
  padding: 12px 16px;
  margin-bottom: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const AgendamentoInfo = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
`;

const AgendamentosPreview: React.FC = () => {
  const navigate = useNavigate();

  // Código de chamada à API removido para evitar quebra da aplicação
  // const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  // useEffect(() => {
  //   axios.get<Agendamento[]>('/api/agendamentos/proximos')
  //     .then(response => {
  //       if (response.data && response.data.length > 0) {
  //         setAgendamentos(response.data);
  //       } else {
  //         setAgendamentos(mockAgendamentos);
  //       }
  //     })
  //     .catch(error => {
  //       console.error("Erro ao buscar agendamentos, usando mock:", error);
  //       setAgendamentos(mockAgendamentos);
  //     });
  // }, []);

  const handleClick = () => {
    navigate('/calendario');
  };

  return (
    <Container>
      {mockAgendamentos.map(agendamento => (
        <Card
          key={agendamento.id}
          prioridade={agendamento.prioridade}
          onClick={handleClick}
        >
          <AgendamentoInfo><strong>Data:</strong> {agendamento.data}</AgendamentoInfo>
          <AgendamentoInfo><strong>Paciente:</strong> {agendamento.pacienteNome}</AgendamentoInfo>
          <AgendamentoInfo><strong>Prioridade:</strong> {agendamento.prioridade}</AgendamentoInfo>
        </Card>
      ))}
    </Container>
  );
};

export default AgendamentosPreview;
