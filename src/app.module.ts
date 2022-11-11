import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MultiStepFormModule } from './multi-step-form/multi-step-form.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [MultiStepFormModule,PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
