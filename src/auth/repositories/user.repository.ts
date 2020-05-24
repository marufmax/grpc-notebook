import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/auth.entity';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ErrorEnum } from '../../enum/error.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.password = password;

    try {
      await user.save();
    } catch (e) {
      if (e.code === ErrorEnum.EXISTS) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
