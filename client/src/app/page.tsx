"use client";

import Image from "next/image";

// internally crafted imports of resources
import SignIn from "@/Components/Auth/SignIn";

export default function Home() {
  return (
    <>
      <SignIn />
    </>
  );
}
