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

---

Para dúvidas ou sugestões, consulte o repositório principal ou entre em contato com o mantenedor do projeto.
