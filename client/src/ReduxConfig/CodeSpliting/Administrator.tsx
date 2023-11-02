import { NextjsApi } from "../NexjsApi";
import { IAcreate, IAEdit, IADelete } from "@/typing/Admin";
import { IResponse } from "@/typing/validation";
import { IAdministrator } from "@/typing/Admin";

export const AdministratorApi = NextjsApi.injectEndpoints({
  endpoints: (build) => ({
    GetAdministrators: build.query<IAdministrator[], void>({
      query: () => "/administrator",
      providesTags: ["administrators"],
    }),
    GetSingleAdministrator: build.query<
      IAdministrator,
      Pick<IAdministrator, "id">
    >({
      query: (data) => `administrator/${data.id}`,
    }),
    CreateAdministrator: build.mutation<IResponse, Partial<IAcreate["create"]>>(
      {
        query: (data) => ({
          url: "/administrator/create",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["administrators"],
      }
    ),
    EditAdministrator: build.mutation<IResponse, Partial<IAEdit>>({
      query: ({ id, ImageFIle }) => {
        if (!ImageFIle) return { url: "" };

        let bodyFormData = new FormData();
        bodyFormData.append("file", ImageFIle);

        return {
          url: `administrator/edit/${id}`,
          method: "PATCH",
          body: bodyFormData,
          formData: true,
        };
      },
      invalidatesTags: ["administrators"],
    }),
    DeleteAdministrator: build.mutation<IResponse, Partial<IADelete>>({
      query: ({ id }) => ({
        url: `/administrator/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["administrators"],
    }),
  }),
});

export const {
  useGetAdministratorsQuery,
  useCreateAdministratorMutation,
  useEditAdministratorMutation,
  useDeleteAdministratorMutation,
  useGetSingleAdministratorQuery,
} = AdministratorApi;
