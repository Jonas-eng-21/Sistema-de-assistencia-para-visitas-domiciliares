import { useState } from "react";
import { registerAPI } from "../../services/AuthService";

const RegisterForm = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [profissao, setProfissao] = useState("MEDICO");
  const [conselho, setConselho] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dados = {
      nome,
      email,
      senha,
      cpf,
      profissao,
      consenhoRegional: conselho,
      ativo: true,
    };
    try {
      const response = await registerAPI(dados);
      setMensagem("Usuário cadastrado com sucesso!");
      console.log(response);
    } catch (error) {
      setMensagem("Erro ao cadastrar usuário.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro de Usuário</h2>

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <br />

      <input
        type="text"
        placeholder="CPF"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        required
      />
      <br />

      <input
        type="text"
        placeholder="Conselho Regional"
        value={conselho}
        onChange={(e) => setConselho(e.target.value)}
        required
      />
      <br />

      <select value={profissao} onChange={(e) => setProfissao(e.target.value)}>
        <option value="MEDICO">Médico</option>
        <option value="ENFERMEIRO">Enfermeiro</option>
        <option value="ASSISTENTE_SOCIAL">Assistente Social</option>
        <option value="PSICOLOGO">Psicólogo</option>
      </select>
      <br />
      <br />

      <button type="submit">Cadastrar</button>
      <p>{mensagem}</p>
    </form>
  );
};

export default RegisterForm;
