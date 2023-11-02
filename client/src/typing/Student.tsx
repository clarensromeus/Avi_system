import { ISignUp } from "./validation";

type IScreation = {
  Create: Omit<ISignUp, "Role">;
};

type ISEdit = { id: number; ImageFile: File | undefined };

type ISDelete = {
  id: number;
};

interface IStudent extends Omit<ISignUp, "Role"> {
  id: number;
  Avatar: string;
}

export type { IScreation, ISEdit, ISDelete, IStudent };
