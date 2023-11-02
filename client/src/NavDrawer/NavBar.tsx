"use client";

import React from "react";
import NavBar from "@/Components/Navbar/UnauthenticatedNavbar/Nav";
import { isAuthenticated } from "@/Components/Auth/isAuthenticated";
import SidebarWithHeader from "@/Components/Navbar/authenticated/Nav";

type Props = {};

export default function NavDrawer({}: Props) {
  const isAuth = isAuthenticated(window.localStorage.getItem("TOKEN"));
  console.log("testing", isAuth);
  console.log("local", window.localStorage.getItem("TOKEN"));
  return <>{!isAuth && <NavBar />}</>;
}
