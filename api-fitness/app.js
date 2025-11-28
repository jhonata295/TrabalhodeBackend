require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const userRoutes = require('./routes/userRoutes');
const healthRoutes = require('./routes/healthRoutes');

const app = express();

// Middleware para aceitar JSON
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/health', healthRoutes);

// Evita warnings desnecessários
mongoose.set('strictQuery', false);

// Conexão com MongoDB e servidor (exceto em testes)
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB conectado com sucesso'))
    .catch((err) => {
      console.error('Erro ao conectar ao MongoDB:', err.message);
      process.exit(1); // encerra para evitar servidor rodando sem banco
    });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;
