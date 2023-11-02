import { createContext } from "react";
import { data } from "@/typing/validation";

const Context = createContext<data>({} as data);

export default Context;
