import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { User } from 'src/users/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  // get all users
  getUsers() {
    return this.userRepository.find();
  }

  // get user by id
  getUser(id: number) {
    return this.userRepository.findOneBy({id})
  }

  createUser(body: CreateUserDto) {
    let newUser = this.userRepository.create(body);
    return this.userRepository.save(newUser);
  }

  async updateUser(id: number, body: UpdateUserDto) {
    let user = await this.userRepository.findOneBy({id});

    if (!user) throw new HttpException(" User not found", HttpStatus.NOT_FOUND);

    let updateUser = await this.userRepository.update(user, body);
    return user;
  }

  async deleteUser(id: number) {
    let user = await this.userRepository.findOneBy({id});

    if (!user) throw new HttpException(" User not found", HttpStatus.NOT_FOUND);

    return this.userRepository.delete(user);
  }
}
