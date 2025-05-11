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

export const Card = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2em;
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.1);
  
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

export const Background = styled.div`
  background-color: #D2D2D2;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
