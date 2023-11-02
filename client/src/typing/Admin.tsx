import { ISignUp } from "./validation";

type IAcreate = {
  create: Omit<ISignUp, "DOB" | "Class">;
};

type IAEdit = {
  id: number;
  ImageFIle: File | undefined;
};

type IADelete = { id: number };

interface IAdministrator extends Omit<ISignUp, "Class" | "DOB"> {
  id: number;
  Avatar: string;
}

export type { IAcreate, IAEdit, IADelete, IAdministrator };
