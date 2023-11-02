import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// internally crafted imports of resources
import { UserSignIn, IResponse } from "@/typing/validation";
import { ISignUp } from "@/typing/validation";
import { IInfo } from "@/typing/validation";

// Define a service using a base URL and expected endpoints
export const NextjsApi = createApi({
  reducerPath: "nextJsApi",
  // Globally customizing cache data to 25 second after a component unmounts
  // to remove the suscribed data from the cache
  keepUnusedDataFor: 25,
  tagTypes: ["students", "teachers", "administrators", "notifications"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    prepareHeaders: async (headers, { getState }) => {
      const token = localStorage.getItem("TOKEN");

      if (typeof window !== undefined) {
        if (token) headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    TestingApi: builder.query<{ data: string }, void>({
      query: () => "/testing",
    }),
    UserProfileInfo: builder.query<IInfo, void>({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
    }),
    UserSignIn: builder.mutation<IResponse, Partial<UserSignIn>>({
      query: (data) => ({
        url: "/auth/signin",
        method: "POST",
        body: data,
      }),
      // transform the query response grab the data from this place on
      transformResponse: (response: IResponse, meta, arg) => {
        if (response.success !== false && response.access_token) {
          window.localStorage.setItem("TOKEN", response.access_token);
          return response;
        }
        return response;
      },
    }),
    UserSignUp: builder.mutation<IResponse, Partial<ISignUp>>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: IResponse, meta, arg) => {
        if (response.success === true && response.access_token) {
          window.localStorage.setItem("TOKEN", response.access_token);
          return response;
        }

        return response;
      },
      transformErrorResponse: (response: { status: string | number }) =>
        response.status,
    }),
    MakePayment: builder.mutation({
      query: (data) => ({
        url: "/stripe/createpayment",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useUserProfileInfoQuery,
  useTestingApiQuery,
  useUserSignInMutation,
  useUserSignUpMutation,
  useMakePaymentMutation,
} = NextjsApi;

// im using code splitting for the rest of the application enpoint
// they're located in Component/CodeSpliting
