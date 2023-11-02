import {
  useCreateNotificationMutation,
  useDeleteNotificationMutation,
} from "@/ReduxConfig/CodeSpliting/Notification";
import { ICreate } from "@/typing/Notifications";

const useNotification = (globalId?: number) => {
  const [DeleteNoti] = useDeleteNotificationMutation();

  const [Createnotification, { isLoading: cisLoading, isSuccess: cisSuccess }] =
    useCreateNotificationMutation();

  const CreateNotification = async (notiData: ICreate) => {
    try {
      await Createnotification(notiData);
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const DeleteNotification = async (id: number) => {
    try {
      await DeleteNoti({ id: id ?? globalId });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  return {
    CreateNotification,
    DeleteNotification,
    cisLoading,
    cisSuccess,
  };
};

export default useNotification;
