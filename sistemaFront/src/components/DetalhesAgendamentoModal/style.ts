import styled from 'styled-components';

export const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 1.5rem 2rem;
  outline: none;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
`;

export const Label = styled.span`
  font-weight: bold;
  color: #555;
`;

export const Value = styled.span`
  color: #333;
`;

export const StatusBadge = styled.span<{ concluido: boolean }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 0.8rem;
  color: #fff;
  background-color: ${({ concluido }) => concluido ? '#4caf50' : '#f44336'}; /* Verde para concluído, Vermelho para pendente */
`;