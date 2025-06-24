import React from 'react';
import * as S from './style';

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onClick, color }) => {
  return (
    <S.ButtonContainer onClick={onClick} color={color}>
      <S.IconWrapper>{icon}</S.IconWrapper>
      <S.Label>
        {label.split('<br />').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </S.Label>
    </S.ButtonContainer>
  );
};

export default ActionButton;