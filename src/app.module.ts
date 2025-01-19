import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MultiStepFormModule } from './multi-step-form/multi-step-form.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './app/posts/posts.module';
import { CommentModule } from './app/comment/comment.module';

@Module({
  imports: [MultiStepFormModule, PrismaModule, UsersModule, PostsModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
