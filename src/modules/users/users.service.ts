import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/users.schema';
import { Model } from 'mongoose';
import { UtilService } from 'src/util/util.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(forwardRef(() => UtilService))
    private readonly utilService: UtilService,
  ) {}

  async createUser(createUserPayload: Partial<User>): Promise<User> {
    const isExist = await this.getUserByEmail(createUserPayload.email);
    if (isExist) throw new ConflictException('This email already exist!');

    const passwordHash = await this.utilService.createPasswordHash(
      createUserPayload.password,
    );
    try {
      const user = await this.userModel.create({
        ...createUserPayload,
        password: passwordHash,
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).lean().exec();
  }
}
