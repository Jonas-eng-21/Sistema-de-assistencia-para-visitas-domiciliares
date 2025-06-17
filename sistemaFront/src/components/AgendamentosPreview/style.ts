import styled, { css } from "styled-components";
import { Priority } from "../../models/Schedule";

const getPriorityStyles = (prioridade: Priority) => {
  switch (prioridade) {
    case Priority.VERMELHO:
      return css`
        background-color: #fee2e2; // bg-red-100
        border-left-color: #ef4444; // border-red-500
        color: #7f1d1d; // text-red-900
        svg {
          color: #dc2626; // text-red-600
        }
        &:hover {
          background-color: #fecaca; // hover:bg-red-200
        }
      `;
    case Priority.AMARELO:
      return css`
        background-color: #fef3c7; // bg-yellow-100
        border-left-color: #f59e0b; // border-yellow-500
        color: #78350f; // text-yellow-900
        svg {
          color: #d97706; // text-yellow-600
        }
        &:hover {
          background-color: #fde68a; // hover:bg-yellow-200
        }
      `;
    case Priority.VERDE:
      return css`
        background-color: #dcfce7; // bg-green-100
        border-left-color: #22c55e; // border-green-500
        color: #14532d; // text-green-900
        svg {
          color: #16a34a; // text-green-600
        }
        &:hover {
          background-color: #bbf7d0; // hover:bg-green-200
        }
      `;
    default:
      return css`
        background-color: #f3f4f6; // bg-gray-100
        border-left-color: #6b7280; // border-gray-500
        color: #1f2937; // text-gray-900
        svg {
          color: #4b5563; // text-gray-600
        }
        &:hover {
          background-color: #e5e7eb; // hover:bg-gray-200
        }
      `;
  }
};

export const Container = styled.div`
  max-height: 400px; /* Mantém a altura máxima com scroll */
  overflow-y: auto;
  padding: 1rem; /* p-4 */
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* space-y-2 */
`;

export const Card = styled.div<{ prioridade: Priority }>`
  border-left-width: 4px;
  padding: 0.75rem; /* p-3 para um visual um pouco mais compacto */
  border-radius: 0.5rem; /* rounded-lg */
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  ${({ prioridade }) => getPriorityStyles(prioridade)}

  &:hover {
    transform: scale(1.02); /* Efeito de zoom sutil no hover */
  }

  svg {
    height: 1.25rem; /* h-5 */
    width: 1.25rem; /* w-5 */
    flex-shrink: 0;
    margin-right: 0.75rem; /* mr-3 */
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoText = styled.p`
  font-size: 0.875rem; /* text-sm */
  font-weight: 500;
  margin: 0;
`;
