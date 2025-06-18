import styled from 'styled-components';

export const ButtonContainer = styled.button<{ color?: string }>`
  --color: ${({ color }) => color || '#0077ff'};
  
  font-family: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.4em;
  
  width: 8em;
  height: 8em;
  line-height: 1.2em;
  
  position: relative;
  overflow: hidden;
  border: 2px solid var(--color);
  transition: color 0.5s;
  z-index: 1;
  font-size: 17px;
  border-radius: 6px;
  font-weight: 500;
  color: var(--color);
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    background: var(--color);
    height: 150px;
    width: 250px;
    border-radius: 50%;
    top: 100%;
    left: 100%;
    transition: all 0.7s;
  }

  &:hover {
    color: #fff;
  }

  &:hover::before {
    top: -30px;
    left: -30px;
  }

  &:active::before {
    background: #3a0ca3;
    transition: background 0s;
  }
`;

export const IconWrapper = styled.div`
  svg {
    width: 2.5em;
    height: 2.5em;
  }
`;

export const Label = styled.span`
  text-align: center;
`;