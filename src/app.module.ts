import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { User } from './typeorm/entities/User';
import { Post } from './typeorm/entities/Post';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'simple_medium_web',
      entities: [User, Post],
      synchronize: true
    }),
    PostsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
