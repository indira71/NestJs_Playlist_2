import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(dto: AuthDto) {
    const user = await this.userService.findByemail(dto.email);
    if (user && (await compare(dto.password, user.password))) {
      const { password, ...result } = user;
      const payload = { sub: user.id, username: user.email };
      return {
        ...result,
        access_token: await this.jwtService.signAsync(payload, {
          secret: 'unique',
          expiresIn: '60s',
        }),
      };
    }

    throw new UnauthorizedException();
  }
}
