import { IsNotEmpty, IsString } from 'class-validator';
import LoginDto from './login.dto';

class SignupDto extends LoginDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export default SignupDto;
