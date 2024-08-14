import { Request, Response, NextFunction } from 'express';

export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
    req.session?.destroy((err) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({ message: 'Logout bem-sucedido' });
    });
};