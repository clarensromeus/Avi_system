import { NotiTypeEnum } from "@/enum/notifications";

type INotification = {
  id: number;
  NotiType: NotiTypeEnum;
  PerformerFirstname: string;
  PerformerLastname: string;
  NotisenderId: number;
  createdAt: string;
  NotiSender: {
    id: number;
    Firstname: string;
    Lastname: string;
    Avatar: string;
  };
};

interface ICreate
  extends Omit<INotification, "id" | "NotiSender" | "createdAt"> {}

export type { INotification, ICreate };
