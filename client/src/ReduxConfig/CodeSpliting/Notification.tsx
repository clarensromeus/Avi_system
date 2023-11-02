import { NextjsApi } from "../NexjsApi";
import { ICreate, INotification } from "@/typing/Notifications";
import { IResponse } from "@/typing/validation";

export const NotificationApi = NextjsApi.injectEndpoints({
  endpoints: (build) => ({
    GetAllNotifications: build.query<INotification[], void>({
      query: () => {
        return {
          url: "notification",
          method: "GET",
        };
      },
      providesTags: ["notifications"],
    }),
    CreateNotification: build.mutation<IResponse, ICreate>({
      query: (data) => ({
        url: "notification",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notifications"],
    }),
    DeleteNotification: build.mutation<IResponse, { id: number }>({
      query: (data) => ({
        url: `/notification/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notifications"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllNotificationsQuery,
  useCreateNotificationMutation,
  useDeleteNotificationMutation,
} = NotificationApi;
