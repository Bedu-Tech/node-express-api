import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';

// Getting secret key from environment
const secretKey = process.env.JWT_KEY_SECRET || '';

@Injectable()
export class AuthService {
  async createToken() {
    const user: JwtPayload = { email: 'test@email.com' };
    const expiresIn: number = Number(process.env.JWT_EXPIRES_IN) || 3600;
    const accessToken = jwt.sign(user, secretKey, { expiresIn })
    return {
      expiresIn,
      accessToken
    }
  }

  async validateUser(payload: JwtPayload) {
    return (payload.email === 'test@email.com') ? { email: payload.email } : null;
  }
}