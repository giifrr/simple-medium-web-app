import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts/posts.controller';
import { PostsService } from './services/posts/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Post } from 'src/typeorm/entities/Post';
import { UserPostController } from './controllers/posts/userPosts.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post])
  ],
  controllers: [PostsController, UserPostController],
  providers: [PostsService]
})
export class PostsModule {}
