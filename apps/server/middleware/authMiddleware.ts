import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Extender la interfaz Request de Express para incluir la propiedad user
interface AuthRequest extends Request {
    user?: string | JwtPayload;
}

export default (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: "No token provided. Authorization denied." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};
