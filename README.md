<h1 align="center">🎯 Helpdesk API</h1>

<p align="center">
  <a href="https://nodejs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Node.js-18+-green?logo=node.js&logoColor=white" alt="Node.js" />
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://expressjs.com/" target="_blank">
    <img src="https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express&logoColor=black" alt="Express" />
  </a>
  <a href="https://www.prisma.io/" target="_blank">
    <img src="https://img.shields.io/badge/Prisma-ORM-blueviolet?logo=prisma&logoColor=white" alt="Prisma" />
  </a>
  <a href="https://jestjs.io/" target="_blank">
    <img src="https://img.shields.io/badge/Jest-Testing-red?logo=jest&logoColor=white" alt="Jest" />
  </a>
  <a href="https://www.docker.com/" target="_blank">
    <img src="https://img.shields.io/badge/Docker-Enabled-0db7ed?logo=docker&logoColor=white" alt="Docker" />
  </a>
  <a href="https://render.com/" target="_blank">
    <img src="https://img.shields.io/badge/Render-Deploy-3ddc84?logo=render&logoColor=white" alt="Render" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License" />
  </a>
</p>

<p align="center">
  <strong>API moderna e segura para gestão de times, tarefas e permissões de acesso.</strong><br/>
  Desenvolvida com <b>Node.js, TypeScript, Prisma</b> e autenticação JWT.
</p>

---

## 🌐 Deploy Online

🔗 **Base URL:** [https://helpdesk-api-ghm0.onrender.com](https://helpdesk-api-ghm0.onrender.com)

📘 **Swagger (opcional):** [https://helpdesk-api-ghm0.onrender.com/docs](https://helpdesk-api-ghm0.onrender.com/docs)

---

## 🧩 Tecnologias Utilizadas

| Categoria | Tecnologias |
|------------|--------------|
| **Backend** | Node.js • Express.js • TypeScript |
| **Banco de Dados** | PostgreSQL • Prisma ORM |
| **Autenticação** | JWT (JSON Web Token) |
| **Validação** | Zod |
| **Testes** | Jest |
| **Infraestrutura** | Docker • Render |
| **Build** | tsup |
| **Outros** | Controle de Acesso • Boas práticas REST |

---

## ⚙️ Como Rodar o Projeto Localmente

### 🧰 Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)  
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)  
- npm ou yarn

---

### 🐳 Rodando com Docker

```bash
# Clone o repositório
git clone https://github.com/SEU_USUARIO/helpdesk-api.git

# Acesse o diretório
cd helpdesk-api

# Configure variáveis de ambiente
cp .env.example .env

# Suba os containers
docker compose up -d

# Rode as migrações do Prisma
npx prisma migrate dev

# Inicie o servidor
npm run dev
