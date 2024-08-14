import pool from '../config/database';

// Interface para Customer
interface Customer {
  id: number;
  name: string;
  email: string;
  password: string; // Armazene o hash da senha, não a senha em texto simples
  phone: string;
  active: boolean;
  last_login: Date;
}

// Função para obter um cliente pelo e-mail
export const getCustomerByEmail = async (email: string): Promise<Customer | null> => {
  const result = await pool.query('SELECT * FROM public.customers WHERE email = $1', [email]);
  return result.rows[0] || null;
};