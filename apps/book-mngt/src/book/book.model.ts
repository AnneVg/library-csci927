export class Book {
    id: string;
    title: string;
    isbn: string;
    shortDescription: string;
    category: string;
    location: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(partial: Partial<Book>) {
        Object.assign(this, partial);
    }
}