export class Book {
  id: string;
  title: string;
  isbn: string;
  shortDescription: string;
  categoryId: string;
  location: string;
  status: string;
  author: string;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(partial: Partial<Book>) {
    Object.assign(this, partial);
  }
}
