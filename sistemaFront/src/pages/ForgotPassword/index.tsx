import { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/forgot-password`, null, {
                params: { email: email }
            });
            setMessage('Email enviado com instruções para redefinir sua senha.');
        } catch (error) {
            setMessage('Erro ao enviar email: ' + error.response.data.message);
        }
    }

    return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-semibold">Esqueci minha senha</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <input 
                    type="email" 
                    placeholder="Seu email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full mb-4"
                    required
                />
                <button 
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Enviar
                </button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    )
}

export default ForgotPassword;
