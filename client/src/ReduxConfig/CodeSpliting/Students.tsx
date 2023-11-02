import { NextjsApi } from "../NexjsApi";
import { IScreation, ISEdit, ISDelete } from "@/typing/Student";
import { IResponse } from "@/typing/validation";
import { IStudent } from "@/typing/Student";

export const StudentApi = NextjsApi.injectEndpoints({
  endpoints: (build) => ({
    GetStudents: build.query<IStudent[], void>({
      query: () => "/student",
      providesTags: ["students"],
    }),
    CreateStudent: build.mutation<IResponse, Partial<IScreation["Create"]>>({
      query: (data) => ({
        url: "/student/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["students"],
    }),
    EditStudent: build.mutation<IResponse, Partial<ISEdit>>({
      query: ({ id, ImageFile }) => {
        if (!ImageFile) return { url: "" };
        let bodyFormData = new FormData();
        bodyFormData.append("file", ImageFile);

        return {
          url: `/student/edit/${id}`,
          method: "PATCH",
          body: bodyFormData,
          formData: true,
        };
      },
      invalidatesTags: ["students"],
    }),
    DeleteStudent: build.mutation<IResponse, Partial<ISDelete>>({
      query: ({ id }) => ({
        url: `/student/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["students"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useCreateStudentMutation,
  useEditStudentMutation,
  useDeleteStudentMutation,
} = StudentApi;
