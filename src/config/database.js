const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/api_fitness";
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB conectado");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err.message);
    // não finalizar em teste
    if (process.env.NODE_ENV !== "test") process.exit(1);
  }
};

module.exports = connectDB;
