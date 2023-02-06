import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { AuthService } from './auth.service';
import { RegisterUserInput } from './dto/create-user.input';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { GqlAuthGuard } from './guards/gql-auth.guards';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => LoginResponse)
  register(@Args('registerUserInput') registerUserInput: RegisterUserInput) {
    return this.authService.register(registerUserInput);
  }
}
