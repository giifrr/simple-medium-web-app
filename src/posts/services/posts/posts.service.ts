import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserPostDto } from 'src/posts/dtos/CreateUserPost.dto';
import { UpdateUserPostDto } from 'src/posts/dtos/UpdateUserPost.dto';
import { Post } from 'src/typeorm/entities/Post';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  getPosts() {
    return this.postRepository.find({relations: ['user']});
  }

  async getPostById(id: number) {
    const currentPost =  this.postRepository.find({relations: ['user'], where: {id: id}});

    if (!currentPost) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return currentPost;
  }

  async createUserPost(userId: number, body: CreateUserPostDto) {
    const user = await this.userRepository.findOneBy({id: userId});

    if (!user) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    let newPost =  this.postRepository.create({...body, user});

    return this.postRepository.save(newPost);
  }

  async updateUserPost(userId: number, id: number, body: UpdateUserPostDto) {
    const currentPost = await this.postRepository.findOneBy({id: id});

    if (!currentPost) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    return this.postRepository.update(currentPost, body);
  }

  async deleteUserPost(userId: number, id: number) {
    const currentPost = await this.postRepository.findOneBy({id: id});

    if (!currentPost) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    await this.postRepository.delete({id: id});
  }
}
