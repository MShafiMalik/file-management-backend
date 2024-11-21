import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.schema';
import { UtilModule } from 'src/util/util.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => UtilModule),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
