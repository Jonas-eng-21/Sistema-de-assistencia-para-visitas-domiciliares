import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #BDD0F5;
`

export const HeaderAtalhos = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 2em;
    align-items: left;
    gap: 2em;
    margin-right: 2em;
`

export const HeaderLadoDireito = styled.div`
  display: flex;
  align-items: center; /* centraliza os itens verticalmente */
  justify-content: flex-end;
  gap: 1em;
  margin-right: 2em;
`;

export const buttonStyle = styled.button`
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
`;

export const navegacaoHeader = styled.p`
   cursor: "pointer", 
   transition: "background 0.2s, 
   color 0.2s", 
   borderRadius: "6px", 
   padding: "4px 8px"
   `
