import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const Entrada = styled.div`
  margin-bottom: 5%;
  margin-top: 5%;
  .prioridade {
    width: 200%;
  }
`;

export const ContainerInputs = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1rem;
  align-items: center;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 900px;
  padding: 2em;
  background-color: #ffffff;
  border-radius: 30px;
  margin-bottom: 1rem;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.1);
  gap: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;

  .input {
    width: 100%;
    flex: 1;
    justify-content: flex-start;
  }

  .button {
    background-color: #98b8f3;
  }

  .padd {
    margin-bottom: 5%;
    margin-top: 5%;
  }

  .txt {
    mmargin-top: 5%;
    text-align: center;
    font-size: 0.8rem;
  }

  .txt2 {
    color: #1976d2;
    text-decoration: none;
    font-weight: 500;
  }
`;

export const Background = styled.div`
  background-color: #d2d2d2;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TituloForm = styled.label`
  font-size: 1.1rem;
  font-weight: 500;
  text-align: start;
  margin-bottom: 4px;
  display: block;
`;
