export interface IMember {
  id: string;
  title: string;
  student_id: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateMemberInput {
  name: string;
  studentId: string;
  status: string;
}

export type IUpdateMemberInput = Partial<IMember>;
