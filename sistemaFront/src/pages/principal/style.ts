import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

export const Card = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2em;
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  
`

export const ProximasVisitas = styled.div`
  width: 90%;
  height: 70%;
  background-color: #FAFAFA;
  border: 1px solid rgb(109, 108, 108);
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin: 1em 5em;
`

export const LoginBoxText = styled.p`
  font-size: 1rem;
  margin-bottom: 0.2rem;
  font-weight: 500;
  color: black;
  text-align: left;
`

// Botão entrar
export const Button = styled.button`
  background-color: #98B8F3;
  color: black;
  margin-top: 1.5rem;
  padding: 0.5em 5em;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
  width: 100%;

  &:hover {
    background-color:#81a8f0;
  }
`

export const Button2 = styled.button`
  background-color: #98B8F3;
  color: black;
  margin-top: 1.5rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
  padding: 1em 2em;
`

export const TextoButton2 = styled.p`
  font-size: 1rem;
  margin-bottom: 0.2rem;
  font-weight: 500;
  color: black;
  text-align: center;
`

// Input de texto do login
export const Input = styled.input`
  padding: 0.6em;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin-top: 0.2rem;
  margin-bottom: 1rem;
  margin-right: 0.5rem;
  font-size: 1rem;
  width: 95%;
  background-color: #F6F9FF;
  `

export const LadoEsquerdo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4em;
  width: 50%;
  height: 100vh;

  @media (max-width: 900px) {
    width: 80%;
    height: auto;
    padding: 2em 0;
  }
`

export const LadoDireito = styled.div`
  display: flex;
  gap: 2em;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 100vh;
  flex-wrap: wrap;

  @media (max-width: 1100px) {
    width: 80%;
    height: auto;
    flex-direction: column;
    gap: 1em;
  }
`
