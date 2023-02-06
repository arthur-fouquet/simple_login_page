import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsEqualTo } from 'src/custom_validators/match.decorator';

const passwordErrorMsg =
  'Password must be at least 8 characters, 1 maj, 1 min, 1 number ans 1 special character';

@InputType()
export class RegisterUserInput {
  @Field(() => String)
  @IsNotEmpty({ message: 'Username is missing' })
  @IsString({ message: 'Incorrect username' })
  @MinLength(4, { message: 'Username must be at least 4 caracters' })
  @MaxLength(20, { message: 'Username must be 20 or less caracters' })
  username: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'Password is missing' })
  @IsString({ message: passwordErrorMsg })
  @MinLength(8, { message: passwordErrorMsg })
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message: passwordErrorMsg,
  })
  password: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'Passwords are not the same' })
  @IsString({ message: 'Passwords are not the same' })
  @IsEqualTo<RegisterUserInput>('password', {
    message: 'Passwords are not the same',
  })
  confirmPassword: string;
}
