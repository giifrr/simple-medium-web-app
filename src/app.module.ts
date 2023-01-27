import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/typeorm/entities/User';
import { PostsModule } from './posts/posts.module';

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
      entities: [User],
      synchronize: true
    }),
    PostsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
