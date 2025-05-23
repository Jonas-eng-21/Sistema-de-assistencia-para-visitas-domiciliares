import * as S from './style';
import React from 'react';

const Header: React.FC = () => (
    <S.HeaderContainer>
        <S.HeaderAtalhos>
            <p>Página<br /> Inicial</p>
            <p>Calendário de <br /> de visitas</p>
            <p>Listar<br /> Pacientes</p>
            <p>Novo<br /> Paciente</p>
            <p>Nova<br /> Visita</p>
        </S.HeaderAtalhos>
        <S.HeaderLadoDireito>
            <div style={{ display: 'flex' }}>
                <p>Bem-vindo(a)<br /> Usuário</p>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}>
                    <img src="/account_circle.svg" alt="Conta do usuário" style={{ width: 35, height: 35 }} />
                </button>
            </div>

            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}>
                <img src="/Opcoes.svg" alt="Sair" style={{ width: 35, height: 35 }} />
            </button>

            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}>
                <img src="/notificacao.svg" alt="Sair" style={{ width: 35, height: 35 }} />
            </button>

    
        </S.HeaderLadoDireito>
    </S.HeaderContainer>
);

export default Header;