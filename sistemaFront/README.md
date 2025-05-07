# 💻 Frontend – Sistema de Assistência Domiciliar

Este diretório contém o frontend da aplicação, criado com **React + Vite + TypeScript**, estilizado com **Styled Components**.
---

## 🛠️ Tecnologias Utilizadas  
- React
- TypeScript
- Vite
- Styled Components
- React Router DOM (rotas)

## 📁 Estrutura do Projeto  
```
src/
├── assets/ # Imagens e ícones
├── components/ # Componentes reutilizáveis
│ └── CountButton.tsx
├── pages/ # Páginas da aplicação
│ └── Home/
│ ├── index.tsx # Estrutura da página
│ └── style.ts # Estilização com styled-components
├── routes/ # Arquivo central de rotas da aplicação
├── App.tsx # Componente raiz
├── main.tsx # Ponto de entrada

```

## 📏 Padrões e Boas Práticas

- **Styled Components**: Todos os estilos são feitos com `styled-components` e separados em arquivos `style.ts` por página ou componente.
- **Organização de Páginas**: Cada página tem sua pasta (`/Home`, `/Login`, etc.) com `index.tsx` e `style.ts`.
- **Rotas**: Usamos `react-router-dom` para gerenciar as rotas. O componente `AppRoutes` é centralizado em `src/routes/index.tsx`.
- **Componentes Reutilizáveis**: Devem ser criados na pasta `components` com estrutura própria se necessário.
- **Sem CSS externo**: Não utilizar arquivos `.css`, toda estilização deve ser feita via `styled-components`.

## 🚧 Em Desenvolvimento  

Funcionalidades futuras planejadas:
- Integração com API (autenticação e dados dos pacientes)
- Roteirização geográfica
- Dashboard para controle dos atendimentos

## 🏃‍♂️ Primeiros Passos

Para começar a trabalhar no projeto, siga os seguintes passos:

1. **Instale as dependências** do projeto:

    ```bash
    npm install
    ```

2. **Inicie o servidor de desenvolvimento**:

    ```bash
    npm run dev
    ```

Isso vai iniciar o projeto no seu ambiente local, e você poderá acessar o front no seu navegador através de `http://localhost:3000` (ou outra porta que for definida no terminal).

Pronto! Agora é só começar a desenvolver e mandar ver nas funcionalidades! 🚀  


## 🌿 Versionamento e Fluxo de Trabalho com Git  

Para manter a organização e a qualidade do código, seguimos uma estratégia de versionamento baseada em **branches** e **Pull Requests (PRs)**.

### 📌 Regras de Versionamento  

- A branch `main` deve conter **apenas código estável e aprovado**.
- **Não é permitido fazer commits diretamente na `main`**.
- Cada desenvolvedor deve criar uma branch separada para cada funcionalidade ou correção.

#### 📛 Nomenclatura de branches sugerida:  

- `feature/nome-da-funcionalidade`
- `fix/nome-da-correção`
- `refactor/nome-da-refatoração`

### ✅ Fluxo de Trabalho

1. Crie uma nova branch a partir da `main`.
2. Desenvolva sua funcionalidade ou correção. Faça commits claros e organizados.
4. Ao finalizar, abra um **Pull Request (PR)** para a branch `main`.
5. Aguarde a revisão de pelo menos **um colaborador da equipe**.
6. Após aprovação, o PR poderá ser mesclado à `main`.

### 🧠 Por que isso é importante?

- Garante colaboração segura e controlada.
- Permite revisões de código antes da entrega.
- Ajuda a manter um histórico limpo e compreensível.
- Facilita o uso de integração contínua e testes automatizados.

> 🔁 Lembre-se: mantenha sua branch sempre atualizada com a `main` usando:
>
> ```bash
> git pull origin main
---

Para dúvidas ou sugestões, consulte o repositório principal ou entre em contato com o mantenedor do projeto.
