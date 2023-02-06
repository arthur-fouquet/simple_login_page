import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entity/user.entity';
import { RegisterUserInput } from './dto/create-user.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findFromUsername(username);

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user?.password);

    if (valid) {
      const { password, ...res } = user;
      return user;
    }
    return null;
  }

  async login(user: User) {
    return {
      authToken: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user: user,
    };
  }

  async register(createUserInput: RegisterUserInput) {
    const user = await this.userService.findFromUsername(
      createUserInput.username,
    );

    if (user)
      throw new BadRequestException('Username already used by another account');

    const password = await bcrypt.hash(createUserInput.password, 10);
    const created = await this.userService.createUser({
      ...createUserInput,
      password,
    });
    return await this.login(created);
  }
}
