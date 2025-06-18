import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const MonthSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
`;

export const WeekNav = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  flex-grow: 1; /* Faz a grid ocupar o espaço restante */
`;

export const DayColumn = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

export const DayHeader = styled.div`
  padding: 0.75rem;
  text-align: center;
  font-weight: bold;
  color: #555;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f0f0f0;
`;

export const DayBody = styled.div`
  padding: 8px;
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AppointmentCard = styled.div<{ prioridade: string }>`
  background-color: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  border-left: 4px solid;
  border-left-color: ${({ prioridade }) => {
    switch (prioridade) {
      case "VERMELHO":
        return "red";
      case "AMARELO":
        return "orange";
      case "VERDE":
        return "green";
      default:
        return "gray";
    }
  }};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;
