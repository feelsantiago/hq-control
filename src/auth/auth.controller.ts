import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/signin.dto';
import { SignUpDto } from './dtos/signup.dto';
import { JwtPayload } from './types/jwt-payload';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

    @Post('signin')
    public async signin(@Body() signInInfo: SignInDto): Promise<JwtPayload> {
        const user = await this.authService.validateUser(signInInfo.email, signInInfo.password);

        if (!user) {
            throw new UnauthorizedException();
        }

        return this.authService.login(user);
    }

    @Post('signup')
    public async signup(@Body() singUpInfo: SignUpDto): Promise<JwtPayload> {
        const user = await this.userService.create(singUpInfo);

        const { id, email, name } = user;
        return this.authService.login({ id, email, name });
    }
}
