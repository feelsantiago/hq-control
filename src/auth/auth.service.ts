import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserInfo } from './types/user-info';
import { UserService } from '../user/user.service';
import { JwtPayload } from './types/jwt-payload';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService) {}

    public async validateUser(email: string, password: string): Promise<UserInfo> {
        const user = await this.usersService.findUserByEmail(email);

        let userInfo: UserInfo;

        if (user) {
            const isPasswordMatch = await this.comparePassword(password, user.password);

            if (isPasswordMatch) {
                const { name, id } = user;
                userInfo = { email, name, id };
            }
        }

        return userInfo;
    }

    public login(user: UserInfo): JwtPayload {
        return {
            token: this.jwtService.sign(user),
        };
    }

    public async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
