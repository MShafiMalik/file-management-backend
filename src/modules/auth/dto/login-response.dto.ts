import { User } from 'src/modules/users/schema/users.schema';

class LoginResponseDto {
  accessToken: string;
  user: User;
}

export default LoginResponseDto;
