import { Query, Resolver } from '@nestjs/graphql';
import { UserResponse } from './dto/user-response';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserResponse], { name: 'findAllUsers', nullable: true })
  async findAll(): Promise<UserResponse[]> {
    return this.userService.findAll();
  }
}
