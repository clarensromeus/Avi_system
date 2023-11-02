"use client";

import React from "react";
import { redirect } from "next/navigation";

// internally crafted imports of resources
import SignUp from "@/Components/Auth/SignUp";
import { isAuthenticated } from "@/Components/Auth/isAuthenticated";

export default function SignUpPage(): JSX.Element {
  const isAuth = isAuthenticated(localStorage.getItem("TOKEN"));

  React.useEffect(() => {
    redirect("/dashboard");
  }, [isAuth]);

  return (
    <>
      <SignUp />
    </>
  );
}
