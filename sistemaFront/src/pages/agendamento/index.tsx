import * as S from './style'
import Header from '../../components/Header'
import React from 'react';

const Principal = () => {
  // Set the page title
  React.useEffect(() => {
    document.title = "Página Inicial - Agendamento de visitas";
  }, []);

  return (
    <S.Container>
      <Header />
    <form>
        <S.FormGroup>
            <label htmlFor="paciente">Paciente:</label>
            <select id="paciente" name="paciente">
                <option value="paciente1">Paciente 1</option>
                <option value="paciente2">Paciente 2</option>
                <option value="paciente3">Paciente 3</option>
            </select>
        </S.FormGroup>
        <S.FormGroup>
            <label htmlFor="paciente">Profissional:</label>
            <select id="profissional" name="profissional">
                <option value="profissional1">Profissional 1</option>
                <option value="profissional2">Profissional 2</option>
                <option value="profissional3">Profissional 3</option>
            </select>
        </S.FormGroup>
        <S.FormGroup>
            <label htmlFor="data">Data da Visita:</label>
            <input type="date" id="data" name="data" />
        </S.FormGroup>
        <S.FormGroup>
            <label htmlFor="Turno">Turno:</label>
            <select id="turno" name="turno">
                <option value="manha">Manhã</option>
                <option value="tarde">Tarde</option>
            </select>
        </S.FormGroup>
        <S.FormGroup>
            <label htmlFor="observacoes">Observações:</label>
            <textarea id="observacoes" name="observacoes" rows={4} />
        </S.FormGroup>
        <S.FormGroup>
            <button type="submit">Agendar</button>
        </S.FormGroup>

    </form>
    </S.Container>
  )
}

export default Principal
