import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const AgendamentoTitle = styled.h1`
  font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
    `

export const FormGroup = styled.div`
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    min-width: 18rem;
    @media (max-width: 600px) {
        min-width: 100px;
        max-width: 100%;
        margin-bottom: 12px;
    }
`

export const FormFonte = styled.label`
    font-size: 20px;
    margin-bottom: 8px;
    align-self: flex-start;
    `
export const SelectForm = styled.select`
    padding: 8px;
    border-radius: 15px;
    border: 1px solid #444444;
    font-size: 16px;
    background-color: #E8E8E8;
    `

export const DataForm = styled.input`
    padding: 8px;
    border-radius: 15px;
    font-size: 16px;
    background-color: #E8E8E8;
    border: 1px solid #444444;
`

export const ObservacoesForm = styled.textarea`
    padding: 8px;
    border-radius: 15px;
    border: 1px solid #444444;
    font-size: 16px;
    background-color: #E8E8E8;
    resize: vertical;
    min-height: 60px;
    `

export const FormRow = styled.div`
    display: flex;
    justify-content: start;
    gap: 5%;
` 

export const FormAgendamento = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    max-width: 100vw;
    margin-top: 20px;
    padding: 20px;
    box-sizing: border-box;
`
export const TextoAjuda = styled.p`
    font-size: 16px;
    color:rgb(10, 10, 10);
    margin-top: 8px;
`

export const ButtonCadastro = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  background-color: #98B8F3;
  color: black;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
    margin-top: 1rem
    
  &:hover {
    background-color:#81a8f0;
  }
`

export const TextoButton2 = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: black;
  text-align: center;
`

export const ButtonAgendamento = styled.button`
  background-color: #7BD37B;
  width:30%;
  color: black;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  align-self: center;
  font-size: 1.3rem;
    margin-top: 1rem;
    padding: 10px;
    &:hover {
    background-color:#81a8f0;
  }
`

export const ButtonVoltar = styled.button`
  background-color: #C3CCDE;
  width:30%;
  color: black;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  align-self: center;
  font-size: 1.3rem;
    margin-top: 1rem;
    padding: 10px;
    &:hover {
    background-color:#81a8f0;
  }
`