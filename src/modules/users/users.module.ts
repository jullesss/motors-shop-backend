/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UsersPrismaRepository } from './repositories/prisma/users.prisma.repository';
import { UsersRepository } from './repositories/users.repository';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from '../utils/mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    MailService,
    {
      provide: UsersRepository,
      useClass: UsersPrismaRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
