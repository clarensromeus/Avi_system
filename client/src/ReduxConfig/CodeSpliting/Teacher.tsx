import { NextjsApi } from "../NexjsApi";
import { ITcreate, ITDelete, ITEdit } from "@/typing/Teacher";
import { IResponse } from "@/typing/validation";
import { Teachers } from "@/typing/Teacher";

const TeacherApi = NextjsApi.injectEndpoints({
  endpoints: (build) => ({
    GetTeachers: build.query<Teachers[], void>({
      query: () => ({
        url: "/teacher",
        method: "GET",
      }),
      providesTags: ["teachers"],
    }),
    CreateTeacher: build.mutation<IResponse, Partial<ITcreate["create"]>>({
      query: (data) => ({
        url: "/teacher",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["teachers"],
    }),
    EditTeacher: build.mutation<IResponse, Partial<ITEdit>>({
      query: ({ id, ImageFile }) => {
        if (!ImageFile) return { url: "" };

        let bodyFormData = new FormData();
        bodyFormData.append("file", ImageFile);

        return {
          url: `/teacher/edit/${id}`,
          method: "PATCH",
          body: bodyFormData,
          formData: true,
        };
      },
      invalidatesTags: ["teachers"],
    }),
    DeleteTeacher: build.mutation<IResponse, Partial<ITDelete>>({
      query: ({ id }) => ({
        url: `/teacher/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["teachers"],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useCreateTeacherMutation,
  useEditTeacherMutation,
  useDeleteTeacherMutation,
} = TeacherApi;
