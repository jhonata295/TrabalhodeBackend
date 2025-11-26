# API Fitness

Repositório criado para o desenvolvimento da API Fitness, utilizada para gerenciamento de usuários e medidas de saúde.  
Inclui autenticação JWT, integração com MongoDB, validações, testes unitários e boas práticas REST.

---

## 📌 Organização do Repositório

- **controllers/** – Controladores da aplicação  
- **models/** – Modelos Mongoose  
- **routes/** – Rotas da API  
- **middleware/** – Middlewares de autenticação e validação  
- **tests/** – Testes unitários com Jest  
- **app.js** – Configuração principal do Express  
- **server.js** – Inicialização do servidor  
- **.env** – Variáveis de ambiente do projeto  

---

## 👥 Integrantes do Grupo

- **Jhonata Matos Ribeiro**  
 

---

## 🛠 Tecnologias Utilizadas

- Node.js  
- Express  
- MongoDB / Mongoose  
- JSON Web Token (JWT)  
- Jest  
- Swagger / Markdown para documentação  

---

## ⚙️ Instalação e Configuração

### 1. Clonar o repositório:
```shell
git clone <URL_DO_REPOSITORIO>
cd api-fitness

2. Instalar dependências:
npm install

3. Criar o arquivo .env:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/api-fitness
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=7d

4. Iniciar o servidor:
npm start


Servidor disponível em:

http://localhost:5000

📡 Endpoints
🔐 Usuários
Método	Endpoint	Descrição	Auth	Body / Params
POST	/api/v1/users/register	Registrar usuário	❌	{ name, email, password }
POST	/api/v1/users/login	Login	❌	{ email, password }
GET	/api/v1/users/me	Perfil do usuário	✅	Header: Authorization: Bearer <token>
PUT	/api/v1/users/me	Atualizar perfil	✅	{ name }
DELETE	/api/v1/users/me	Deletar usuário	✅	Header: Authorization: Bearer <token>
🩺 Medidas de Saúde
Método	Endpoint	Descrição	Auth	Body / Params
POST	/api/v1/health	Criar medida	✅	{ weight, height, date }
GET	/api/v1/health	Listar medidas	❌	-
GET	/api/v1/health/:id	Obter medida específica	❌	Param: id
PUT	/api/v1/health/:id	Atualizar medida	✅	{ weight }
DELETE	/api/v1/health/:id	Deletar medida	✅	Param: id
🔑 Autenticação com JWT

Header necessário:

Authorization: Bearer <token>

🧪 Execução dos Testes
Definir ambiente de teste:

Windows PowerShell:

$env:NODE_ENV="test"


Linux/Mac:

export NODE_ENV=test

Executar testes:
npm test


Os testes cobrem controladores, rotas e validações.

📘 Documentação

Documentação em Markdown ou Swagger, incluindo:

Exemplos de requests e responses

Códigos de status HTTP

Estrutura das entidades

Autenticação JWT

Versionamento padrão /api/v1

🧼 Boas Práticas Implementadas

Rotas versionadas: /api/v1/...

Padrão REST aplicado corretamente

Validações completas das entradas

Mensagens de erro consistentes

JWT com expiração segura

Estrutura modular organizada