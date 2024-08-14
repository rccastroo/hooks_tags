import { Router } from 'express';
import { authenticateUser } from '../middlewares/authenticateUser'; 
import { logoutUser } from '../middlewares/logoutUser'; 
import { checkAuth } from '../middlewares/checkAuth'; 
import { fetchDashboardData } from '../controllers/dashboardController';
import { fetchDashboardDataDefault } from '../controllers/dashboardControllerDefault';

const router = Router();

// Rota para login do usuário
router.post('/login', authenticateUser); 

// Rota para verificar a autenticação
router.get('/check-auth', checkAuth);

// Rota para o dashboard - só acessível se o usuário estiver autenticado
router.get('/dashboard', (req, res) => {
    const user = req.session.user;
    res.status(200).json({ message: 'Bem-vindo ao dashboard', user: user });
});

// Rota para logout do usuário
router.post('/logout', logoutUser);

// Rota para buscar dados do dashboard
router.post('/api/dashboard', fetchDashboardData);

// Rota para buscar dados de inicialização do dashboard
router.get('/api/dashboard-default', fetchDashboardDataDefault);

export default router;