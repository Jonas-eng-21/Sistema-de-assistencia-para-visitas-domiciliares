import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin: 1.5rem 0;
  color: #333;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 800px; /* Aumentado para um formulário mais largo */
  padding: 2em;
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;
  margin-bottom: 1.5rem;

  /* Faz os itens dentro da linha terem o mesmo tamanho */
  > * {
    flex: 1;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  width: 100%;
`;

export const TituloForm = styled.label`
  font-size: 1.1rem;
  font-weight: 500;
  text-align: start;
  margin-bottom: 4px;
  display: block;
`;

