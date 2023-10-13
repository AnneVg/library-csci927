export class Member {
  id: string;
  name: string;
  studentId: string;
  status: string;
  dayOfBirth?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(partial: Partial<Member>) {
    Object.assign(this, partial);
  }
}
