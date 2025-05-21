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
            <div style={{ display: 'flex', width: '100%', height: '100px', flexDirection: 'column', alignItems: 'center' }}>
                <S.AgendamentoTitle>Agendamento de Visitas</S.AgendamentoTitle>
                <form style={{ width: '90%', height: '100%' }}>
                    <S.FormGroup>
                        <S.FormRow style={{ alignItems: 'flex-end', width: '100%' }}>
                            <S.FormGroup style={{ flex: 2, minWidth: 200 }}>
                                <S.FormFonte htmlFor="paciente">Paciente:</S.FormFonte>
                                <S.SelectForm id="paciente" name="paciente">
                                    <option value="paciente1">Paciente 1</option>
                                    <option value="paciente2">Paciente 2</option>
                                    <option value="paciente3">Paciente 3</option>
                                </S.SelectForm>
                            </S.FormGroup>
                            <S.FormGroup style={{ flex: 2, minWidth: 200, display: 'flex', flexDirection: 'column', alignItems: 'end', justifyContent: 'flex-end' }}>
                                <S.TextoAjuda style={{ textAlign: 'center' }}>
                                    Caso não encontre, <br /> cadastre um novo paciente:
                                </S.TextoAjuda>
                            </S.FormGroup>
                            <S.FormGroup style={{ flex: 1, minWidth: 150, display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
                                <S.ButtonCadastro>
                                    <S.TextoButton2>
                                        Adicionar <br />Paciente
                                    </S.TextoButton2>
                                    <img src="/plus.svg" alt="Adicionar novo paciente" style={{ width: 24, height: 24 }} />
                                </S.ButtonCadastro>
                            </S.FormGroup>
                        </S.FormRow>

                    </S.FormGroup>
                    <S.FormGroup>
                        <S.FormFonte htmlFor="paciente">Profissional:</S.FormFonte>
                        <S.SelectForm id="profissional" name="profissional">
                            <option value="profissional1">Profissional 1</option>
                            <option value="profissional2">Profissional 2</option>
                            <option value="profissional3">Profissional 3</option>
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
                    <S.FormGroup>
                        <button type="submit">Agendar</button>
                    </S.FormGroup>
                </form>
            </div>

        </S.Container >
    )
}

export default Principal
