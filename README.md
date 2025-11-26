# API Fitness
Descrição

API RESTful para gerenciamento de usuários e medidas de saúde, implementada em Node.js com Express e MongoDB.
Inclui autenticação JWT, validações, testes unitários e documentação.

Integrantes

Jhonata Matos Ribeiro – Desenvolvimento de controladores, testes e documentação

Mario Victor – Desenvolvimento de modelos, rotas e integração com MongoDB

Tecnologias

Node.js

Express

MongoDB (local ou Atlas)

Mongoose

JWT para autenticação

Jest para testes unitários

Swagger/OpenAPI para documentação (ou Markdown)

Instalação e Configuração

Clone o repositório:

git clone <URL_DO_REPOSITORIO>
cd api-fitness


Instale dependências:

npm install


Crie o arquivo .env com as variáveis:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/api-fitness
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=7d


Inicie o servidor:

npm start


O servidor estará disponível em http://localhost:5000.

Endpoints
Usuários
Método	Endpoint	Descrição	Auth	Body / Params
POST	/api/v1/users/register	Registrar usuário	❌	{ "name": "Nome", "email": "email@teste.com", "password": "senha123" }
POST	/api/v1/users/login	Login usuário	❌	{ "email": "email@teste.com", "password": "senha123" }
GET	/api/v1/users/me	Obter perfil	✅	Header: Authorization: Bearer <token>
PUT	/api/v1/users/me	Atualizar perfil	✅	{ "name": "Novo Nome" }
DELETE	/api/v1/users/me	Deletar usuário	✅	Header: Authorization: Bearer <token>
Medidas de Saúde
Método	Endpoint	Descrição	Auth	Body / Params
POST	/api/v1/health	Criar medida	✅	{ "weight": 70, "height": 1.75, "date": "2025-11-25" }
GET	/api/v1/health	Listar medidas	❌	-
GET	/api/v1/health/:id	Obter medida específica	❌	Param: id
PUT	/api/v1/health/:id	Atualizar medida	✅	{ "weight": 72 }
DELETE	/api/v1/health/:id	Deletar medida	✅	Param: id
Autenticação

JWT é necessário para rotas sensíveis (POST, PUT, DELETE)

Enviar token no header Authorization:

Authorization: Bearer <token>

Testes

Configure a variável de ambiente para teste:

$env:NODE_ENV="test" # Windows PowerShell
export NODE_ENV=test   # Linux / Mac


Execute os testes:

npm test


Os testes cobrem rotas, controladores e validações.

Utilize um MongoDB local ou em memória para evitar timeouts.

Documentação

Documentação em Markdown (ou Swagger) com exemplos de request/response e códigos de status HTTP.

Endpoints seguem padrão REST: verbos corretos, status codes adequados e versionamento /api/v1.

Estrutura do Projeto
/controllers
/models
/routes
/middleware
/tests
/app.js
/server.js
.env

Boas práticas

Rotas versionadas: /api/v1/...

Mensagens de erro consistentes

Validações de entrada e regras de negócio aplicadas

Uso de JWT seguro com segredo e expiração