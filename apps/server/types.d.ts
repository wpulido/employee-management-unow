import {JwtPayload} from "jsonwebtoken";
import {User} from './types';

declare module 'express-serve-static-core' {
    namespace Express {
        interface Request {
            user?: User | JwtPayload;
        }
    }
}
