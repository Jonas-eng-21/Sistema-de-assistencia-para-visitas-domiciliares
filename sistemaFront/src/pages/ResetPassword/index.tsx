import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/reset-password`, null, {
                params: {
                    token: token,
                    newPassword: newPassword
                }
            });

            setMessage('Senha alterada com sucesso!');
        } catch (error) {
            setMessage('Erro ao alterar a senha: ' + error.response.data.message);
        }
    }

    return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-semibold">Redefinir Senha</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <input 
                    type="password" 
                    placeholder="Nova senha" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border p-2 w-full mb-4"
                    required
                />
                <button 
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Alterar Senha
                </button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    )
}

export default ResetPassword;
