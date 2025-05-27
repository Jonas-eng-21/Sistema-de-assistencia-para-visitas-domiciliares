import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const LogoGroup = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
`

export const Logo = styled.img`
  height: 6rem;
  will-change: filter;
  transition: filter 300ms;
  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  &.react:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }
`

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`

export const Card = styled.div`
  padding: 2em;
  background-color: #f4f4f5;
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`

export const Paragraph = styled.p`
  font-size: 0.875rem;
  color: #888;
`
