// generateJwtSecret.ts
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

const jwtSecret = crypto.randomBytes(32).toString('hex');

const envFilePath = path.join(__dirname, '.env');

fs.writeFileSync(
    envFilePath,
    `JWT_SECRET=${jwtSecret}\n`,
    { flag: 'a' }
);
