import { PrismaClient } from '@prisma/client';
import { books } from './books';

const prisma = new PrismaClient();

const result = prisma.$transaction(
    books.map(book =>
        prisma.book.upsert({
            where: {
                id: book.id,
            },
            update: {},
            create: { ...book }
        })
    )
);