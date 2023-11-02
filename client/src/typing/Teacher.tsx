import { ITeacher } from "./validation";

type ITcreate = {
  create: ITeacher;
};

type ITEdit = { id: number; ImageFile: File | undefined };

type ITDelete = { id: number };

interface Teachers extends ITeacher {
  id: number;
  Avatar: string;
}

export type { ITcreate, ITEdit, ITDelete, Teachers };
