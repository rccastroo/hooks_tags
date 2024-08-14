import express from 'express';
import session from 'express-session';
import router from './routes/routes'; // Importa o roteador de autenticação
import cors from 'cors';

const app = express();
const port = process.env.BACK_PORT;

const corsOptions = {
  origin: [`http://localhost:${process.env.FRONT_PORT}`],
  credentials: true, // Permite o envio de cookies e headers de autorização
};

app.use(cors(corsOptions));

app.use(express.json()); // Adiciona o middleware para parsing do JSON

// Configura sessões
app.use(session({
  secret: 'unica',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Ativar apenas em servidor https
}));

app.get('/status', (req, res) => {
  res.send('Server is running!');
});

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});