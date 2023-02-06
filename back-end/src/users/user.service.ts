import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UserResponse } from './dto/user-response';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserResponse[]> {
    return this.userRepository.find();
  }

  async findFromUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: { username: username },
    });
  }

  async createUser(input: CreateUserInput): Promise<User> {
    const user: User = this.userRepository.create(input);
    if (user) {
      return this.userRepository.save(user);
    }
    throw new InternalServerErrorException('Internal server error');
  }
}
