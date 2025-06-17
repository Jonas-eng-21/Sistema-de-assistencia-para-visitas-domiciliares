import styled, { keyframes } from 'styled-components';

const blobBounce = keyframes`
  0% {
    transform: translate(-100%, -100%) translate3d(0, 0, 0);
  }
  25% {
    transform: translate(-100%, -100%) translate3d(100%, 0, 0);
  }
  50% {
    transform: translate(-100%, -100%) translate3d(100%, 100%, 0);
  }
  75% {
    transform: translate(-100%, -100%) translate3d(0, 100%, 0);
  }
  100% {
    transform: translate(-100%, -100%) translate3d(0, 0, 0);
  }
`;

export const CardWrapper = styled.div`
  position: relative;
  width: 450px; /* Aumentei a largura para acomodar a lista */
  height: 500px; /* Aumentei a altura */
  border-radius: 14px;
  z-index: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
`;

export const Background = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  z-index: 2;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(24px);
  border-radius: 10px;
  overflow: hidden;
  outline: 2px solid white;
`;

export const Blob = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  width: 300px; /* Aumentei o tamanho */
  height: 300px;
  border-radius: 50%;
  background-color: #98b8f3; /* Cor azulada para combinar com seus botões */
  opacity: 0.5;
  filter: blur(20px);
  animation: ${blobBounce} 8s infinite ease;
`;

export const Content = styled.div`
  position: relative;
  z-index: 3;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Title = styled.h2`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  margin-bottom: 15px;
`;