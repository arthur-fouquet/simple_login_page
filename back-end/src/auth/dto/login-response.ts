import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entity/user.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  authToken: string;

  @Field(() => User)
  user: User;
}
