import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto, LoginDto, LoginResponseDto, SignupDto } from './dto';
import { User } from '../users/schema/users.schema';
import { UtilService } from 'src/util/util.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => UtilService))
    private readonly utilService: UtilService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<JwtPayloadDto | null> {
    const user = await this.usersService.getUserByEmail(email);
    if (user && this.utilService.verifyPassword(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user; // Disable unused-vars rule here
      return result;
    }
    return null;
  }

  async signup(signupDto: SignupDto): Promise<User> {
    return await this.usersService.createUser(signupDto);
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService.getUserByEmail(loginDto.email);
    const payload: JwtPayloadDto = { _id: user._id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}
