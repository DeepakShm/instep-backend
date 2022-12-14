import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit,OnModuleDestroy{
    constructor() {
        super()
    }
    
    onModuleDestroy() {
        this.$disconnect()
    }

    onModuleInit() {
        this.$connect()
    }
    
}