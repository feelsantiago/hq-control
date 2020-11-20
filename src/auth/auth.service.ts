import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.schema';
import { UserInfo } from './types/user-info';
import { UserService } from '../user/user.service';
import { JwtPayload } from './types/jwt-payload';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService) {}

    public async validateUser(email: string, pass: string): Promise<UserInfo> {
        const user = await this.usersService.findUserByEmail(email);

        let userInfo: UserInfo;

        if (user && user.password === pass) {
            const { name, id } = user;
            userInfo = { email, name, id };
        }

        return userInfo;
    }

    public login(user: User): JwtPayload {
        const payload: UserInfo = { name: user.name, email: user.email, id: user.id };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    public async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
