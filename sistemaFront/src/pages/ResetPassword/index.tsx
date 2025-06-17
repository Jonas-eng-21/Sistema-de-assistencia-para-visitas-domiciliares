import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const isFormValid = newPassword.length >= 6 && newPassword === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setMessage('Token inválido ou ausente.');
      return;
    }

    try {
      const response = await fetch(
        `https://back-sus-visitas-domiciliares.onrender.com/password/reset-password?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(newPassword)}`,
        {
          method: 'POST'
        }
      );

      if (response.ok) {
        setMessage('Senha redefinida com sucesso!');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setMessage('Erro ao redefinir a senha.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Erro de rede. Tente novamente.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Redefinir Senha</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nova Senha</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mt-1 block w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Confirmar Nova Senha</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 block w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-2 rounded text-white ${
            isFormValid ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Redefinir Senha
        </button>
      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
};

export default ResetPassword;
