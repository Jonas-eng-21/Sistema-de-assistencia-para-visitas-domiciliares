import * as S from './style';
import React from 'react';
import { useAuth } from "../../context/AuthContext";


const Header: React.FC = () => {
    const { user, logout} = useAuth();
    const [showOptions, setShowOptions] = React.useState(false);
    // const navigate = useNavigate();

    return (
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
                    {user && user.nome ? (
                        <p>
                            Bem-vindo(a)
                            <br />
                            {user.nome.length > 30
                                ? user.nome
                                      .split(' ')
                                      .slice(0, -1)
                                      .join(' ')
                                : ` ${user.nome}`}
                        </p>
                    ) : (
                        <p>Bem-vindo(a)<br /></p>
                    )}
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}>
                        <img src="/account_circle.svg" alt="Conta do usuário" style={{ width: 35, height: 35 }} />
                    </button>
                </div>

                <div style={{ position: 'relative' }}>
                    <button
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '45px'
                        }}
                        onClick={() => setShowOptions(prev => !prev)}
                    >
                        <img src="/Opcoes.svg" alt="Menu de opções" style={{ width: 35, height: 35 }} />
                    </button>
                    {showOptions && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '45px',
                                right: 0,
                                background: '#fff',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                borderRadius: '8px',
                                zIndex: 1000,
                                minWidth: '120px',
                                padding: '10px'
                            }}
                        >
                            <p style={{ margin: 0, cursor: 'pointer' }}>Opção 1</p>
                            <p style={{ margin: 0, cursor: 'pointer' }}>Opção 2</p>
                        </div>
                    )}
                </div>

                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}>
                    <img src="/notificacao.svg" alt="Notificações" style={{ width: 35, height: 35 }} />
                </button>

        
            </S.HeaderLadoDireito>
        </S.HeaderContainer>
    );
};

export default Header;