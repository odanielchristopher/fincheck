import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findFirst(findFirstDto: Prisma.UserFindFirstArgs) {
    return this.prismaService.user.findFirst(findFirstDto);
  }

  findUnique(findUniqueDto: Prisma.UserFindUniqueArgs) {
    return this.prismaService.user.findUnique(findUniqueDto);
  }

  create(createDto: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(createDto);
  }
}
