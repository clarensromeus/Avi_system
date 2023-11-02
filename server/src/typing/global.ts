import { Admin } from 'src/auth/entities/admin.entity';
import { Student } from 'src/auth/entities/student.entity';

type ISignIn = {
  success: boolean;
  access_token?: string;
  message: string;
};

interface ISignUp {
  access_token?: string;
  success: boolean;
  message: string;
}

interface IStore {
  userId: string;
  authentication: string;
}

export { ISignIn, ISignUp, IStore };
