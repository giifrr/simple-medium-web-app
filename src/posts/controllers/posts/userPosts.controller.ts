import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CreateUserPostDto } from "../../dtos/CreateUserPost.dto";
import { PostsService } from "../../services/posts/posts.service";
import { UpdateUserPostDto } from "src/posts/dtos/UpdateUserPost.dto";

@Controller('users/:userId/posts')
export class UserPostController {
  constructor(private postsService: PostsService) {}

  @Post()
  createUserPost(@Param('userId', ParseIntPipe) userId: number,@Body() body: CreateUserPostDto) {
    return this.postsService.createUserPost(userId, body);
  }

  @Put(':id')
  updateUserPost(@Param('userId', ParseIntPipe) userId: number,@Param('id', ParseIntPipe) id: number ,@Body() body: UpdateUserPostDto) {
    return this.postsService.updateUserPost(userId, id, body);
  }

  @Delete(':id')
  deleteUserPost(@Param('userId', ParseIntPipe) userId: number, @Param('id', ParseIntPipe) id: number) {
    return this.postsService.deleteUserPost(userId, id);
  }
}
