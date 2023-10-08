import { PrismaClient } from '@prisma/client';
import { books } from './books';
import { members } from './members';
import { categories } from './categories';

const prisma = new PrismaClient();

const bookresult = prisma.$transaction(
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

const memberResult = prisma.$transaction(
    members.map(member =>
        prisma.member.upsert({
            where: {
                id: member.id,
            },
            update: {},
            create: { ...member }
        })
    )
);
const catogryResult = prisma.$transaction(
    categories.map(category =>
        prisma.category.upsert({
            where: {
                id: category.id,
            },
            update: {},
            create: { ...category }
        })
    )
);