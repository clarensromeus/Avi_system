import { Role } from "@/enum/validator";
import { BoxProps, FlexProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface zSingIn {
  Email: string;
  Password: string;
}

interface data {
  info: string;
  setInfo: React.Dispatch<React.SetStateAction<string>>;
}

type Class =
  | "9th grade"
  | "8th grade"
  | "4th grade"
  | "1st grade"
  | ""
  | "7th grade";

type Course =
  | "Mathematics"
  | "Social science"
  | "Desktop computing"
  | "Spanish"
  | "English"
  | "Data management"
  | "";

type ISignUp = {
  Firstname: string;
  Lastname: string;
  Email: string;
  Password: string;
  DOB: string;
  Role: Role;
  Class: Class;
  IsRole?: string;
};

type IInfo = ISignUp & { id: number };

type ISignIn = {
  Email: string;
  Password: string;
};

type UserSignIn = ISignIn & { IsRole: string };

type IResponse = {
  message: string;
  success: boolean;
  access_token?: string;
};

type ITeacher = {
  Firstname: string;
  Lastname: string;
  Email: string;
  PhoneNumber: string;
  Course: Course;
};

interface LinkItemProps {
  name: string;
  icon: IconType;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  name: string;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}
export type {
  zSingIn,
  data,
  ISignUp,
  LinkItemProps,
  NavItemProps,
  MobileProps,
  SidebarProps,
  ISignIn,
  ITeacher,
  UserSignIn,
  IResponse,
  IInfo,
};
