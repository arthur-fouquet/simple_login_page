import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      signOptions: { expiresIn: '12h' },
      secret: 'secretnotverysecret',
    }),
  ],
  providers: [UserService, JwtModule, UserResolver],
  exports: [UserService],
})
export class UserModule {}
