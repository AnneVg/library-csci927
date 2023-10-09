import { PrismaClient } from '@prisma/client';
import { books } from './books';
import { members } from './members';
import { categories } from './categories';

const prisma = new PrismaClient();

async function main() {
    const categoryResult = await prisma.$transaction(
        categories.map(category =>
            prisma.category.upsert({
                where: {
                    id: category.id,
                },
                update: {...category},
                create: { ...category }
            })
        )
    );

    const bookresult = await prisma.$transaction(
        books.map(book =>
            prisma.book.upsert({
                where: {
                    id: book.id,
                },
                update: {...book},
                create: { ...book }
            })
        )
    );

    const memberResult = await prisma.$transaction(
        members.map(member =>
            prisma.member.upsert({
                where: {
                    id: member.id,
                },
                update: {...member},
                create: { ...member }
            })
        )
    );
}



main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
