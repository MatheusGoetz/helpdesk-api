<h1 align="center">🎯 Helpdesk API</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green?logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/Prisma-ORM-blueviolet?logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/Jest-Testing-red?logo=jest" alt="Jest" />
  <img src="https://img.shields.io/badge/Render-Deploy-3ddc84?logo=render" alt="Render" />
  <img src="https://img.shields.io/badge/Docker-Enabled-0db7ed?logo=docker" alt="Docker" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License" />
</p>

<p align="center">
  <strong>API moderna e segura para gestão de times, tarefas e permissões de acesso.</strong><br />
  Desenvolvida em Node.js, com autenticação JWT, validação com Zod e ORM Prisma.
</p>

---

## 🌐 Deploy Online

> **Base URL:**  
> 🔗 [https://helpdesk-api-ghm0.onrender.com](https://helpdesk-api-ghm0.onrender.com)

---

## 🧩 Tecnologias Utilizadas

| Categoria | Tecnologias |
|------------|--------------|
| **Backend** | Node.js • Express.js • TypeScript |
| **Banco de Dados** | PostgreSQL + Prisma ORM |
| **Autenticação** | JWT (JSON Web Token) |
| **Validação** | Zod |
| **Testes** | Jest |
| **Infraestrutura** | Docker • Render (Deploy) |
| **Build** | tsup |
| **Scripts** | npm scripts com TSX |

---

## ⚙️ Como Rodar o Projeto Localmente

### 🔧 Pré-requisitos
Certifique-se de ter instalado:
- **Node.js** >= 18  
- **npm** ou **yarn**  
- **Docker** e **Docker Compose**

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

# Rode as migrações do banco
npx prisma migrate dev

# Execute em modo desenvolvimento
npm run dev
