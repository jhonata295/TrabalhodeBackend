# API de Monitoramento Fitness/Saúde
🔧 Configuração do Projeto

Clonar o repositório

git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
cd SEU-REPOSITORIO


Instalar dependências

npm install


Criar o arquivo .env

PORT=3000
MONGO_URI=sua_string_de_conexao
JWT_SECRET=sua_chave_secreta


Iniciar o servidor

npm run dev

📦 Dependências Utilizadas

Dependências principais:

express

mongoose (ou outro banco escolhido)

jsonwebtoken

bcryptjs

express-validator

dotenv

Dependências de desenvolvimento:

nodemon

jest

supertest

▶️ Execução

Para rodar o servidor:

npm run dev


Para rodar em produção:

npm start

🧪 Como Rodar os Testes
npm run test


Os testes incluem:

Rotas

Controladores

Validações

📌 Exemplos de Uso (Requests)
Criar usuário (POST)
POST /api/v1/users


Body:

{
  "nome": "João",
  "email": "joao@email.com",
  "senha": "123456"
}

Login (POST)
POST /api/v1/login


Body:

{
  "email": "joao@email.com",
  "senha": "123456"
}

Buscar todos os usuários (GET)
GET /api/v1/users

Atualizar usuário (PUT)
PUT /api/v1/users/:id

Deletar usuário (DELETE)
DELETE /api/v1/users/:id

👥 Integrantes do Grupo e Divisão de Tarefas
Integrante	Tarefas
Jhonata Matos	
Mario Victor	

