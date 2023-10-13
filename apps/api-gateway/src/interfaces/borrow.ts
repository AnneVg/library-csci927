export interface ICreateBorrowInput {
    studentId: string;
    isbn: string;
    // status: string;
    // dueDate: Date;
}
export interface IUpdateBorrowInput {
    id: string;
    status: string;
    dueDate: Date;
}