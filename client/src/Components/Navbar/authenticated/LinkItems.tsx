import { LinkItemProps } from "@/typing/validation";
import {
  FiTrendingUp,
  FiCalendar,
} from "react-icons/fi";
import {
  FaChalkboardTeacher,
  FaUserTie,
  FaHouseUser,
  FaUserLock,
} from "react-icons/fa";

const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FaHouseUser },
  { name: "Analitics", icon: FiTrendingUp },
  { name: "Students", icon: FaUserTie },
  { name: "Administrators", icon: FaUserLock },
  { name: "Courses", icon: FiCalendar },
  { name: "Teachers", icon: FaChalkboardTeacher },
];

export default LinkItems;
