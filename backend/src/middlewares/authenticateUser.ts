import { Request, Response, NextFunction } from 'express';
import { getCustomerByEmail } from '../models/customerModel';
import bcrypt from 'bcrypt';
import { check, validationResult } from 'express-validator';

// Função de validação de e-mail e senha
const validateEmailAndPassword = [
  check('email').isEmail().withMessage('Invalid email format'),
  check('password').isString().withMessage('Password must be a string')
];

// Middleware para autenticação de usuário
export const authenticateUser = [
  ...validateEmailAndPassword,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Obtemos o cliente do banco de dados
      const customer = await getCustomerByEmail(email);

      if (!customer) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Verifica a senha
      const isMatch = await bcrypt.compare(password, customer.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Se a autenticação for bem-sucedida, configuramos a sessão
      req.session.user = {
        id: customer.id,        // Certifique-se de que o ID é um número
        name: customer.name,
        email: customer.email,
        phone: customer.phone  // Converta o telefone para string
      };

      console.log('User session set:', req.session.user);  // Log para depuração

      res.status(200).json({ authenticated: true, user: req.session.user, redirectUrl: 'dashboard' });
    } catch (error) {
      console.error('Error during authentication:', error);
      res.status(500).json({ authenticated: false });
    }
  }
];
