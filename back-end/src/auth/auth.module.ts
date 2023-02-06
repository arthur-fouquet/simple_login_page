import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/users/user.module';
import { AuthResolver } from './auth.reslver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalSrategy } from './strategy/local.strategy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      signOptions: { expiresIn: '12h' },
      secret: 'secretnotverysecret',
    }),
  ],
  providers: [AuthService, AuthResolver, LocalSrategy, JwtStrategy],
})
export class AuthModule {}
