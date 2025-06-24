import styled, { keyframes } from 'styled-components';

const bellRingAnimation = keyframes`
  0%, 100% {
    transform-origin: top;
  }
  15% {
    transform: rotateZ(10deg);
  }
  30% {
    transform: rotateZ(-10deg);
  }
  45% {
    transform: rotateZ(5deg);
  }
  60% {
    transform: rotateZ(-5deg);
  }
  75% {
    transform: rotateZ(2deg);
  }
`;

export const Button = styled.button`
  width: 50px;
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  transition-duration: .3s;
  border: none;

  svg {
    width: 28px; 
    path {
      fill: #333; 
    }
  }

  &:hover svg {
    animation: ${bellRingAnimation} 0.9s both;
  }

  &:active {
    transform: scale(0.9);
  }
`;