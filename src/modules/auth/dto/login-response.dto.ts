import JwtPayloadDto from './jwt-payload.dto';

class LoginResponseDto {
  accessToken: string;
  user: JwtPayloadDto;
}

export default LoginResponseDto;
