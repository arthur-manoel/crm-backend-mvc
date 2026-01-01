# CRM Backend - Refatorando para MVC

### 🚀 Sobre o projeto
Esse sistema de gestão (CRM) foi desenvolvido para uma **empresa de contabilidade** através de um programa de bolsa da minha escola, onde fui selecionado junto com outros 10 alunos na Escola Técnica onde estudo. Eu fui o **responsável pela arquitetura e desenvolvimento do Back-end** durante o projeto em 2025 no meu 1° ano do EM.

O sistema é robusto: resolve o fluxo de abertura de empresas (CNPJ), gera links dinâmicos para processos de alteração e possui um dashboard administrativo completo.

### 🛠️ Por que estou refatorando?
Mesmo o projeto tendo sido entregue e aprovado em 2025, eu tinha em mente que a estrutura original poderia ser mais profissional. Como eu fiquei responsável pela parte do backend, decidi agora refatorar o código para aplicar o padrão **MVC**, separando as responsabilidades e deixando o sistema pronto para o mercado.

### 📂 O que está mudando na arquitetura
Estou saindo de um modelo onde o código era muito misturado para uma estrutura organizada onde pretendo:

*   **Models:** Agora fica todo o código SQL e a comunicação com o banco de dados.
*   **Middlewares:** Filtros de segurança que validam o token JWT e os dados de entrada antes de qualquer processamento.
*   **Controllers:** Funções limpas que apenas coordenam as requisições e enviam as respostas.
*   **Cloudflare R2:** Integração para armazenamento de arquivos e documentos na nuvem de forma profissional.

### 💻 Principais Tecnologias utilizadas
*   **Node.js e Express**
*   **MySQL** (gerenciado via phpMyAdmin)
*   **JWT e Bcrypt** (autenticação e criptografia de senhas)
*   **Cloudflare R2** (armazenamento de arquivos S3-Compatible)
*   **Dotenv** (proteção de chaves e credenciais)

---

### 🛠️ Como rodar o projeto
1. Clone o repositório: `git clone https://github.com/arthur-manoel/crm-backend-mvc`
2. Instale as dependências: `npm install`
3. Configure o seu arquivo `.env` usando o `.env.example` como guia.
4. Inicie o servidor: `npm run dev`
