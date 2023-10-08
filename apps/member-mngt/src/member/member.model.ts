export class Member {
    id: string;
    title: string;
    student_id: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(partial: Partial<Member>) {
        Object.assign(this, partial);
    }
}