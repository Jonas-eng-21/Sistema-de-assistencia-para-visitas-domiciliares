import styled from "styled-components";

export const Background = styled.div`
  background-color: #d2d2d2;
  height: 100vh;
  display: flex;
  flex-direction: column;
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

export const Card = styled.div`
  width: 80%;
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
  align-items: center;
`;
