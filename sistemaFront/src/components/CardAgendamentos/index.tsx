import React from 'react';
import AgendamentosPreview from '../AgendamentosPreview';
import * as S from './style';

const CardAgendamentos: React.FC = () => {
  return (
    <S.CardWrapper>
      <S.Background />
      <S.Blob />
      <S.Content>
        <S.Title>Próximas Visitas</S.Title>
        <AgendamentosPreview />
      </S.Content>
    </S.CardWrapper>
  );
};

export default CardAgendamentos;