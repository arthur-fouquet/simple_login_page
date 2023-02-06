import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field(() => String)
  @IsNotEmpty({ message: 'Username is missing' })
  @IsString({ message: 'Incorrect username' })
  username: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'Veuillez rentrer un mot de passe' })
  @IsString({ message: 'Incorrect password' })
  password: string;
}
