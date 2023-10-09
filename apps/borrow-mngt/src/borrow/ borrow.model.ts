export class Borrow {
  id: string;
  bookId: string;
  memberId: string;
  status: string;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(partial: Partial<Borrow>) {
    Object.assign(this, partial);
  }
}
